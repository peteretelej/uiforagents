// Adherence linter: lints consumer HTML/CSS against the registry this kit
// ships. Reports violations; never auto-corrects. Three violation classes:
//   - raw hex colors (in CSS contexts: stylesheets, <style> blocks, style attrs)
//   - invalid or missing data-uifa-variant (closed [data-uifa-variant] tables;
//     elements are mapped to items by their `uifa-<name>` class)
//   - undeclared tokens: a custom property used via var() that is neither
//     declared by a copied item's cssVars nor defined in the consumer's
//     tokens.css
//
// Parsing is layer-aware: item CSS arrives `@layer uif-items { ... }`-wrapped
// and dialect rules are `[data-theme]`-scoped, and the hex/token scans read
// through layer blocks and scopes, so both regions stay fully in scope. The
// one sanctioned exemption is theme dialect stylesheets (see isDialectSheet).
//
// Usage:
//   node validation/check.mjs [--config <path>]
//   node validation/check.mjs --self-test
import { readFileSync, statSync } from "node:fs";
import { join, relative, resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { findConfig, loadConfig, globToRegExp, walkFiles, resolveInRoot, resolveThemesFile, configFlagValue } from "../scripts/lib/config.mjs";

const KIT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PLANTED_DIR = join(KIT_ROOT, "validation", "fixtures", "planted");
const THEMES_FILE_DIR = join(KIT_ROOT, "validation", "fixtures", "themes-file");
const SCHEMA_PATH = join(KIT_ROOT, "schema", "registry.schema.json");
const SUPPORTED_EXTENSIONS = [".html", ".htm", ".css"];
const HEX_COLOR = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
const VAR_USE = /var\(\s*(--[a-zA-Z0-9-]+)/g;
const TOKEN_DECLARATION = /(--[a-zA-Z0-9-]+)\s*:/g;

// CSS contexts within a file: whole stylesheets, <style> blocks, and style
// attributes. Hex and var() checks scan only these regions, so anchors like
// href="#section" are not colors. The scans are plain text over the region,
// which sees inside @layer blocks and [data-theme] scopes alike.
function cssRegions(content, file) {
  const regions = [];
  const lineAt = (index) => content.slice(0, index).split("\n").length;
  if (file.endsWith(".css")) return [{ text: content, line: 1 }];
  for (const match of content.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) {
    regions.push({ text: match[1], line: lineAt(match.index) + 1 });
  }
  for (const match of content.matchAll(/style\s*=\s*"([^"]*)"|style\s*=\s*'([^']*)'/gi)) {
    regions.push({ text: match[1] ?? match[2], line: lineAt(match.index) });
  }
  return regions;
}

// Rules of a stylesheet: selector text plus body, with comments, strings,
// declaration semicolons, and nested braces handled. @layer blocks are
// descended into (their inner rules count); any other at-rule with a block
// surfaces flagged so callers can treat the file conservatively.
function topLevelRules(css) {
  const rules = [];
  const stack = [];
  let buffer = "";
  let inComment = false;
  let inString = null;
  const onlyLayers = () => stack.every((frame) => frame.layer);
  for (let i = 0; i < css.length; i++) {
    const char = css[i];
    const next = css[i + 1];
    if (inComment) {
      if (char === "*" && next === "/") {
        inComment = false;
        buffer += " ";
        i++;
      }
      continue;
    }
    if (inString) {
      buffer += char;
      if (char === "\\") {
        buffer += next ?? "";
        i++;
      } else if (char === inString) {
        inString = null;
      }
      continue;
    }
    if (char === "/" && next === "*") {
      inComment = true;
      i++;
      continue;
    }
    if (char === '"' || char === "'") {
      inString = char;
      buffer += char;
      continue;
    }
    const innermost = stack[stack.length - 1];
    if (char === "{") {
      const layer = !innermost && /^@layer\b/.test(buffer.trim());
      stack.push({ selector: buffer.trim(), bodyStart: i + 1, layer, atRule: buffer.trim().startsWith("@") });
      buffer = "";
      continue;
    }
    if (char === "}") {
      const frame = stack.pop();
      if (frame && !frame.atRule && onlyLayers()) {
        rules.push({ selector: frame.selector, body: css.slice(frame.bodyStart, i) });
      } else if (frame && frame.atRule && stack.length === 0) {
        rules.push({ selector: frame.selector, body: css.slice(frame.bodyStart, i), atRule: true });
      }
      buffer = "";
      continue;
    }
    if (!innermost && char === ";") {
      buffer = "";
      continue;
    }
    buffer += char;
  }
  return rules.filter((rule) => rule.selector);
}

// Kit targets inside a dialect scope: .uifa-* classes, data-uifa-* hooks,
// plain element selectors, pseudo-classes/elements, combinators, universal.
function isKitTarget(selector) {
  const tokens = selector.match(/\.[a-zA-Z0-9-]+|\[[^\]]*\]|::?[a-zA-Z][a-zA-Z0-9-]*(?:\([^()]*\))?|[a-zA-Z][a-zA-Z0-9-]*|\*|\s+|[>+~]/g);
  if (!tokens || tokens.join("") !== selector) return false;
  return tokens.every((token) => {
    if (/^\s+$/.test(token) || token === "*" || token === ">" || token === "+" || token === "~") return true;
    if (token.startsWith(".")) return /^\.uifa-[a-z0-9-]+$/.test(token);
    if (token.startsWith("[")) return /^\[data-uifa-[a-z0-9-]+(?:[^\]]*)?\]$/.test(token);
    if (token.startsWith(":")) return /^::?[a-zA-Z][a-zA-Z0-9-]*(?:\([^()]*\))?$/.test(token);
    return /^[a-zA-Z][a-zA-Z0-9-]*$/.test(token);
  });
}

// A .css file is a theme dialect stylesheet when every top-level rule in it
// is scoped under a [data-theme="<slug>"] selector and targets only kit
// selectors. All-or-nothing per file, no new violation class: dialect files'
// CSS regions are exempt from the hex and token classes; a file failing the
// shape (any unscoped rule, non-kit target, or foreign at-rule) is linted
// normally, exactly like any consumer stylesheet today.
function isDialectSheet(content) {
  const rules = topLevelRules(content);
  if (rules.length === 0 || rules.some((rule) => rule.atRule)) return false;
  return rules.every(({ selector }) =>
    selector.split(",").every((part) => {
      const match = /^\[data-theme="[^"]+"\]\s*([\s\S]+)$/.exec(part.trim());
      return match !== null && isKitTarget(match[1].trim());
    })
  );
}

function lintFile(file, root, context, violations) {
  const rel = relative(root, file);
  const content = readFileSync(file, "utf8");
  const lineAt = (index) => content.slice(0, index).split("\n").length;

  const dialect = file.endsWith(".css") && isDialectSheet(content);
  if (!dialect) {
    for (const region of cssRegions(content, file)) {
      for (const match of region.text.matchAll(HEX_COLOR)) {
        violations.push({
          class: "hex",
          file: rel,
          line: region.line + region.text.slice(0, match.index).split("\n").length - 1,
          message: `raw hex color "${match[0]}" - use a semantic token`,
        });
      }
      for (const match of region.text.matchAll(VAR_USE)) {
        const token = match[1];
        if (!context.declared.has(token)) {
          violations.push({
            class: "token",
            file: rel,
            line: region.line + region.text.slice(0, match.index).split("\n").length - 1,
            message: `undeclared token "${token}" - not in the copied items' cssVars or ${context.tokensRef}`,
          });
        }
      }
    }
  }

  if (file.endsWith(".css")) return;
  for (const match of content.matchAll(/<[a-zA-Z][^<>]*>/g)) {
    const tag = match[0];
    const line = lineAt(match.index);
    const classAttr = tag.match(/class\s*=\s*"([^"]*)"|class\s*=\s*'([^']*)'/);
    if (!classAttr) continue;
    const variantAttr = tag.match(/data-uifa-variant\s*=\s*"([^"]*)"|data-uifa-variant\s*=\s*'([^']*)'/);
    const variant = variantAttr ? (variantAttr[1] ?? variantAttr[2]) : null;
    const names = (classAttr[1] ?? classAttr[2]).split(/\s+/).filter((name) => name.startsWith("uifa-"));
    for (const raw of names) {
      const item = context.items.get(raw.slice(5));
      if (!item) continue;
      if (item.variants.length === 0) {
        if (variant !== null) {
          violations.push({
            class: "variant",
            file: rel,
            line,
            message: `invalid data-uifa-variant "${variant}" - ${raw.slice(5)} has no variant table`,
          });
        }
        continue;
      }
      if (variant === null) {
        if (!item.variants.some((v) => v.default)) {
          violations.push({
            class: "variant",
            file: rel,
            line,
            message: `missing data-uifa-variant - ${raw.slice(5)} has a closed variant table with no default`,
          });
        }
        continue;
      }
      if (!item.variants.some((v) => v.name === variant)) {
        const table = item.variants.map((v) => v.name).join(", ");
        violations.push({
          class: "variant",
          file: rel,
          line,
          message: `invalid data-uifa-variant "${variant}" - ${raw.slice(5)}'s closed table: ${table}`,
        });
      }
    }
  }
}

function buildContext(config) {
  const items = new Map();
  for (const name of config.items) {
    const manifestPath = join(KIT_ROOT, "items", name, "item.json");
    let manifest;
    try {
      manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    } catch {
      throw new Error(`check: config item "${name}" is not in this kit (missing ${manifestPath})`);
    }
    items.set(name, manifest);
  }
  const schema = JSON.parse(readFileSync(SCHEMA_PATH, "utf8"));
  if (typeof schema.version !== "string" || !schema.version.trim()) {
    throw new Error("check: schema/registry.schema.json is missing its version");
  }
  for (const [name, manifest] of items) {
    if (manifest.schemaVersion !== schema.version) {
      throw new Error(`check: item "${name}" schemaVersion ${manifest.schemaVersion} does not match schema version ${schema.version}`);
    }
  }
  const declared = new Set();
  for (const manifest of items.values()) {
    for (const token of manifest.cssVars) declared.add(token);
  }
  const tokensPath = resolveInRoot(config.root, config.dest.tokensCss, "dest.tokensCss");
  if (!statSync(tokensPath, { throwIfNoEntry: false })) {
    throw new Error(`check: tokens.css "${config.dest.tokensCss}" not found; run "npx uiforagents tokens" first`);
  }
  const tokensCss = readFileSync(tokensPath, "utf8");
  for (const match of tokensCss.matchAll(TOKEN_DECLARATION)) {
    declared.add(match[1]);
  }
  return { items, declared, tokensRef: config.dest.tokensCss };
}

function lint(config) {
  const context = buildContext(config);
  const files = walkFiles(config.root).filter((file) =>
    config.lint.some((globPattern) => globToRegExp(globPattern).test(relative(config.root, file)))
  );
  if (files.length === 0) {
    throw new Error(`check: no files match the lint globs (${config.lint.join(", ")})`);
  }
  const lintable = [];
  const skipped = [];
  for (const file of files) {
    if (SUPPORTED_EXTENSIONS.some((ext) => file.endsWith(ext))) lintable.push(file);
    else skipped.push(file);
  }
  if (lintable.length === 0) {
    throw new Error(`check: every file matched by the lint globs is unsupported (${SUPPORTED_EXTENSIONS.join(" ")} only)`);
  }
  const violations = [];
  for (const file of lintable) {
    lintFile(file, config.root, context, violations);
  }
  return { files: lintable, skipped, violations };
}

function report(config, { files, skipped, violations }) {
  for (const violation of violations) {
    console.error(`${violation.file}:${violation.line}: ${violation.message}`);
  }
  if (skipped.length > 0) {
    console.error(`check: skipped ${skipped.length} unsupported file${skipped.length === 1 ? "" : "s"} (${SUPPORTED_EXTENSIONS.join(" ")} only): ${skipped.map((file) => relative(config.root, file)).join(", ")}`);
  }
  const summary = violations.length === 0
    ? `check: no violations (${files.length} files)`
    : `check: ${violations.length} violation${violations.length === 1 ? "" : "s"} in ${files.length} files`;
  console.error(summary);
  return violations.length === 0 ? 0 : 1;
}

async function selfTest() {
  const config = loadConfig(join(PLANTED_DIR, "uiforagents.json"));
  const { violations } = lint(config);
  const expected = {
    "clean.html": [],
    "hex.html": ["hex"],
    "variant.html": ["variant"],
    "token.html": ["token"],
    "dialect-clean.css": [],
    "dialect-bad.css": ["hex", "token"],
  };
  let failures = 0;
  for (const [file, classes] of Object.entries(expected)) {
    const got = violations.filter((violation) => violation.file === file).map((violation) => violation.class);
    const pass = got.length === classes.length && classes.every((cls) => got.includes(cls));
    if (pass) {
      console.error(`self-test: ${file} ${classes.length === 0 ? "passed clean" : `caught (${classes.join(", ")})`}`);
    } else {
      failures++;
      console.error(`self-test: ${file} FAIL - expected [${classes.join(", ")}], got [${got.join(", ")}]`);
    }
  }
  try {
    const outside = loadConfig(join(THEMES_FILE_DIR, "uiforagents.json"));
    const source = resolveThemesFile(outside.root, outside.themesFile);
    if (!statSync(source, { throwIfNoEntry: false })) {
      throw new Error(`themes module not found: ${source}`);
    }
    const { themes } = await import(pathToFileURL(source).href);
    const theme = themes.find((t) => t.slug === outside.theme);
    if (!theme || Object.keys(theme.tokens ?? {}).length === 0) {
      throw new Error(`theme "${outside.theme}" without tokens in ${source}`);
    }
    console.error("self-test: outside themesFile resolves and yields tokens");
  } catch (err) {
    failures++;
    console.error(`self-test: themesFile FAIL - ${err.message}`);
  }
  if (failures > 0) {
    console.error(`self-test: ${failures} miss${failures === 1 ? "" : "es"}`);
    return 1;
  }
  console.error("self-test: every planted violation caught, clean control passes");
  return 0;
}

const args = process.argv.slice(2);
const selfTestRequested = args.includes("--self-test");
let configFlag;
try {
  configFlag = configFlagValue(args, "check");
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
const configFlagIndex = args.indexOf("--config");
const stray = args.filter((arg, index) => arg !== "--self-test" && arg !== "--config" && index !== configFlagIndex && index !== configFlagIndex + 1);
if (stray.length > 0) {
  console.error(`usage: node validation/check.mjs [--config <path>] | --self-test (unexpected "${stray[0]}")`);
  process.exit(1);
}
if (selfTestRequested) {
  process.exit(await selfTest());
}

const configPath = configFlag ? resolve(process.cwd(), configFlag) : findConfig(process.cwd());
if (!configPath) {
  console.error("check: no uiforagents.json found from the working directory upward; pass --config");
  process.exit(1);
}
try {
  const config = loadConfig(configPath);
  process.exit(report(config, lint(config)));
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
