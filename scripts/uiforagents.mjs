#!/usr/bin/env node
// Per-project flow CLI: `init | add | tokens | scaffold | check`, driven by
// the project's uiforagents.json. `init` bootstraps a project from defaults
// (kit resolved from the installed npm package), `add` copies the configured
// item subset into the project, `tokens` writes the project's themes.css
// from the chosen theme, `scaffold` writes docs/design-system.md, and
// `check` runs the adherence linter from the installed package.
//
// add/tokens/scaffold refuse to overwrite existing destination files unless
// --force is passed; init stays create-only.
//
// Usage:
//   npx uiforagents init [after: npm install uiforagents]
//   npx uiforagents add | tokens | scaffold | check [--config <path>] [--force]
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { findConfig, loadConfig, resolveInRoot, resolveThemesFile, configFlagValue } from "./lib/config.mjs";
import { themesCss, singleThemeCss } from "./lib/themes-css.mjs";
import { readText } from "./lib/items.mjs";

const USAGE = "usage: npx uiforagents init | add | tokens | scaffold | check [--config <path>] [--force]";

const pkgRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { version } = JSON.parse(readFileSync(join(pkgRoot, "package.json"), "utf8"));

const args = process.argv.slice(2);
const force = args.includes("--force");
let configFlag;
try {
  configFlag = configFlagValue(args, "uiforagents");
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
const configFlagIndex = args.indexOf("--config");
const command = args.filter((arg, index) => arg !== "--config" && index !== configFlagIndex && (configFlagIndex === -1 || index !== configFlagIndex + 1))[0];
if (!command || !["init", "add", "tokens", "scaffold", "check"].includes(command)) {
  console.error(USAGE);
  process.exit(1);
}

function writeDefaultConfig() {
  const kitInNodeModules = "node_modules/uiforagents";
  if (!statSync(join(process.cwd(), kitInNodeModules), { throwIfNoEntry: false })) {
    console.error(`uiforagents: no ${kitInNodeModules} - run "npm install uiforagents" first`);
    process.exit(1);
  }
  const registry = JSON.parse(readFileSync(join(pkgRoot, "registry.json"), "utf8"));
  const items = (registry.items ?? registry).map((entry) => entry.name ?? entry);
  const config = {
    kit: kitInNodeModules,
    theme: "paper",
    items,
    dest: { itemsDir: "src/ui", tokensCss: "src/styles/themes.css", docs: "docs/design-system.md" },
    lint: ["src/ui/**/*.html", "src/ui/**/*.css"],
  };
  writeFileSync("uiforagents.json", `${JSON.stringify(config, null, 2)}\n`);
  console.log(`init: wrote uiforagents.json (${items.length} items, theme "${config.theme}")`);
}

if (command === "init") {
  if (findConfig(process.cwd())) {
    console.error(`uiforagents: uiforagents.json already exists; edit it and run "npx uiforagents add"`);
    process.exit(1);
  }
  writeDefaultConfig();
}

const configPath = configFlag ? resolve(process.cwd(), configFlag) : findConfig(process.cwd());
if (!configPath) {
  console.error(`uiforagents: no uiforagents.json found from the working directory upward; run "npx uiforagents init" or pass --config`);
  process.exit(1);
}
const config = loadConfig(configPath);
const kitRoot = resolve(config.root, config.kit);
for (const required of ["items", "registry.json", "themes", "scripts"]) {
  if (!statSync(join(kitRoot, required), { throwIfNoEntry: false })) {
    console.error(`uiforagents: this is not a uiforagents kit checkout: ${kitRoot}`);
    process.exit(1);
  }
}

const relFromRoot = (path) => relative(config.root, path);
const writeFileManaged = (path, content) => {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
};

// Overwrite consent: without --force, never clobber an existing destination.
function assertWriteConsent(targets, label) {
  const existing = targets.filter((target) => existsSync(target));
  if (existing.length > 0 && !force) {
    console.error(`uiforagents: ${label} would overwrite existing file${existing.length === 1 ? "" : "s"}; pass --force to overwrite:\n${existing.map((target) => relFromRoot(target)).join("\n")}`);
    process.exit(1);
  }
}

function loadManifest(name) {
  const manifestPath = join(kitRoot, "items", name, "item.json");
  try {
    return JSON.parse(readFileSync(manifestPath, "utf8"));
  } catch {
    throw new Error(`uiforagents: config item "${name}" is not in the kit (missing ${manifestPath})`);
  }
}

async function loadThemes() {
  const source = config.themesFile
    ? resolveThemesFile(config.root, config.themesFile)
    : join(kitRoot, "themes", "index.mjs");
  if (!statSync(source, { throwIfNoEntry: false })) {
    throw new Error(`uiforagents: themes module not found: ${source}`);
  }
  const { themes } = await import(pathToFileURL(source).href);
  return { themes, source };
}

function findTheme(themes, source) {
  const theme = themes.find((t) => t.slug === config.theme);
  if (!theme) {
    throw new Error(`uiforagents: theme "${config.theme}" not found in ${relFromRoot(source)}`);
  }
  return theme;
}

function tokensCssPath() {
  return resolveInRoot(config.root, config.dest.tokensCss, "dest.tokensCss");
}

function add() {
  const itemsDir = resolveInRoot(config.root, config.dest.itemsDir, "dest.itemsDir");
  const tokensPath = tokensCssPath();
  const targets = [];
  for (const name of config.items) {
    const manifest = loadManifest(name);
    for (const file of manifest.files) {
      targets.push(join(itemsDir, name, basename(file.path)));
    }
  }
  assertWriteConsent(targets, "add");
  for (const name of config.items) {
    const manifest = loadManifest(name);
    const destDir = join(itemsDir, name);
    // Examples ship linking the kit's tokens.css two levels up; point them at
    // the project's own tokens file so the copies render in the chosen theme.
    const tokensHref = relative(destDir, tokensPath).split("\\").join("/");
    for (const file of manifest.files) {
      let content = readText(join(kitRoot, "items", name, file.path));
      if (file.type === "kit:example") {
        content = content.replace(/href="[^"]*themes\/tokens\.css"/, `href="${tokensHref}"`);
      }
      writeFileManaged(join(destDir, basename(file.path)), content);
    }
    console.log(`add: ${name} -> ${relFromRoot(destDir)} (${manifest.files.length} files)`);
  }
}

async function tokens() {
  const { themes, source } = await loadThemes();
  // Path-free origin for external modules; generated files must not carry
  // machine-local absolute paths.
  const origin = config.themesFile ? "the configured themes module" : "the kit's themes/index.mjs";
  const header = `/* GENERATED by uiforagents ${version} from ${origin} - do not edit. */`;
  const target = tokensCssPath();
  assertWriteConsent([target], "tokens");
  if (config.theme === "all") {
    // Same selector pattern as the kit's themes/tokens.css: the first theme owns :root.
    writeFileManaged(target, themesCss({ themes, header }));
    console.log(`tokens: all themes (${themes.length}) from ${origin} -> ${config.dest.tokensCss}`);
    return;
  }
  const theme = findTheme(themes, source);
  writeFileManaged(target, singleThemeCss({ theme, header }));
  console.log(`tokens: ${theme.name} (${theme.slug}) from ${origin} -> ${config.dest.tokensCss}`);
}

async function scaffold() {
  const { themes, source } = await loadThemes();
  const tokensPath = tokensCssPath();
  if (!existsSync(tokensPath)) {
    throw new Error(`uiforagents: ${config.dest.tokensCss} not found; run "npx uiforagents tokens" first`);
  }
  const docsPath = resolveInRoot(config.root, config.dest.docs, "dest.docs");
  assertWriteConsent([docsPath], "scaffold");
  const tokensCss = readFileSync(tokensPath, "utf8");
  // One row per token name; with "theme: all" the first block (:root, the
  // default theme) supplies the values.
  const seen = new Set();
  const tokenRows = [...tokensCss.matchAll(/(--[a-zA-Z0-9-]+)\s*:\s*([^;]+);/g)]
    .filter((match) => !seen.has(match[1]) && seen.add(match[1]))
    .map((match) => `| \`${match[1]}\` | \`${match[2]}\` |`)
    .join("\n");
  const scheme = tokensCss.match(/color-scheme\s*:\s*([^;]+);/);
  const all = config.theme === "all";
  const themeIntro = all
    ? `All ${themes.length} themes are bundled in \`${config.dest.tokensCss}\`; switch at runtime with \`document.documentElement.dataset.theme\` (theme-switcher recipe in the kit README).

${themes.map((t) => `- **${t.name}** (\`${t.slug}\`) - ${t.mood}. ${t.notes}`).join("\n")}`
    : (() => {
        const t = findTheme(themes, source);
        return `Theme: **${t.name}** (\`${t.slug}\`) - ${t.mood}. ${t.notes}`;
      })();
  const componentRows = config.items
    .map((name) => {
      const manifest = loadManifest(name);
      return `| ${manifest.title} | ${manifest.description} |`;
    })
    .join("\n");
  // Print the flow in the form the project actually uses: npm-installed
  // consumers get the npx commands, checkout-based projects the node paths
  // (as the config declares the kit path, keeping the doc portable).
  const kitBin = (script) => `node ${config.kit}/${script}`;
  const npmInstalled = config.kit.includes("node_modules");
  const flowLines = npmInstalled
    ? ["npx uiforagents tokens", "npx uiforagents add", "npx uiforagents scaffold", "npx uiforagents check"]
    : [
        kitBin("scripts/uiforagents.mjs tokens"),
        kitBin("scripts/uiforagents.mjs add"),
        kitBin("scripts/uiforagents.mjs scaffold"),
        kitBin("validation/check.mjs"),
      ];
  const docs = `# Design system

${themeIntro}

Generated by [uiforagents](https://github.com/peteretelej/uiforagents); the
committed \`${config.dest.tokensCss}\` is the source of truth. Regenerate with
the flow commands and commit the output.

## Tokens

Declared in \`${config.dest.tokensCss}\`${all ? " (the \`:root\` block is the default theme; each theme overrides via \`[data-theme]\`)" : (scheme ? ` (color-scheme: ${scheme[1]})` : "")}:

| Token | Value |
| --- | --- |
${tokenRows}

## Components

Copied subset, managed by \`uiforagents add\` under \`${config.dest.itemsDir}/\`:

| Component | Description |
| --- | --- |
${componentRows}

## Adherence

\`check\` lints the configured HTML/CSS against the registry and reports -
never auto-corrects - three violation classes: raw hex colors, invalid or
missing \`data-uifa-variant\`, and tokens outside the copied items' \`cssVars\` and
this project's \`${config.dest.tokensCss}\`. Lint scope: ${config.lint.map((globPattern) => `\`${globPattern}\``).join(", ")}.

## Flow

Config: \`uiforagents.json\`.

\`\`\`sh
${flowLines.join("\n")}
\`\`\`
`;
  writeFileManaged(docsPath, docs);
  console.log(`scaffold: ${config.dest.docs} from ${config.dest.tokensCss} + config`);
}

try {
  if (command === "init") {
    add();
    await tokens();
    await scaffold();
    console.log(`init: done - copy-in UI in ${config.dest.itemsDir}, tokens in ${config.dest.tokensCss}; validate with "npx uiforagents check"`);
  } else if (command === "check") {
    const { spawnSync } = await import("node:child_process");
    const passthrough = args.filter((arg, index) => arg !== "--config" && index !== configFlagIndex && (configFlagIndex === -1 || index !== configFlagIndex + 1)).slice(1);
    const result = spawnSync(process.execPath, [join(pkgRoot, "validation", "check.mjs"), ...passthrough], {
      stdio: "inherit",
      cwd: config.root,
    });
    process.exit(result.status ?? 1);
  } else if (command === "add") add();
  else if (command === "tokens") await tokens();
  else if (command === "scaffold") await scaffold();
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
