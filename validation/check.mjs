// Adherence linter: lints consumer HTML/CSS against the registry this kit
// ships. Reports violations; never auto-corrects. Three violation classes:
//   - raw hex colors (in CSS contexts: stylesheets, <style> blocks, style attrs)
//   - invalid or missing data-variant (closed [data-variant] tables; elements
//     are mapped to items by their `uif-<name>` class)
//   - undeclared tokens: a custom property used via var() that is neither
//     declared by a copied item's cssVars nor defined in the consumer's
//     tokens.css
//
// Usage:
//   node validation/check.mjs [--config <path>]
//   node validation/check.mjs --self-test
import { readFileSync, statSync } from "node:fs";
import { join, relative, resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { findConfig, loadConfig, globToRegExp, walkFiles, resolveInRoot, resolveDirectionsFile, configFlagValue } from "../scripts/lib/config.mjs";

const KIT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PLANTED_DIR = join(KIT_ROOT, "validation", "fixtures", "planted");
const DIRECTIONS_FILE_DIR = join(KIT_ROOT, "validation", "fixtures", "directions-file");
const SUPPORTED_EXTENSIONS = [".html", ".htm", ".css"];
const HEX_COLOR = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
const VAR_USE = /var\(\s*(--[a-zA-Z0-9-]+)/g;
const TOKEN_DECLARATION = /(--[a-zA-Z0-9-]+)\s*:/g;

// CSS contexts within a file: whole stylesheets, <style> blocks, and style
// attributes. Hex and var() checks scan only these regions, so anchors like
// href="#section" are not colors.
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

function lintFile(file, root, context, violations) {
  const rel = relative(root, file);
  const content = readFileSync(file, "utf8");
  const lineAt = (index) => content.slice(0, index).split("\n").length;

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

  if (file.endsWith(".css")) return;
  for (const match of content.matchAll(/<[a-zA-Z][^<>]*>/g)) {
    const tag = match[0];
    const line = lineAt(match.index);
    const classAttr = tag.match(/class\s*=\s*"([^"]*)"|class\s*=\s*'([^']*)'/);
    if (!classAttr) continue;
    const variantAttr = tag.match(/data-variant\s*=\s*"([^"]*)"|data-variant\s*=\s*'([^']*)'/);
    const variant = variantAttr ? (variantAttr[1] ?? variantAttr[2]) : null;
    const names = (classAttr[1] ?? classAttr[2]).split(/\s+/).filter((name) => name.startsWith("uif-"));
    for (const raw of names) {
      const item = context.items.get(raw.slice(4));
      if (!item) continue;
      if (item.variants.length === 0) {
        if (variant !== null) {
          violations.push({
            class: "variant",
            file: rel,
            line,
            message: `invalid data-variant "${variant}" - ${raw.slice(4)} has no variant table`,
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
            message: `missing data-variant - ${raw.slice(4)} has a closed variant table with no default`,
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
          message: `invalid data-variant "${variant}" - ${raw.slice(4)}'s closed table: ${table}`,
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
  const declared = new Set();
  for (const manifest of items.values()) {
    for (const token of manifest.cssVars) declared.add(token);
  }
  const tokensPath = resolveInRoot(config.root, config.dest.tokensCss, "dest.tokensCss");
  if (!statSync(tokensPath, { throwIfNoEntry: false })) {
    throw new Error(`check: tokens.css "${config.dest.tokensCss}" not found; run "uifa tokens" first`);
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
  const expected = { "clean.html": [], "hex.html": ["hex"], "variant.html": ["variant"], "token.html": ["token"] };
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
    const outside = loadConfig(join(DIRECTIONS_FILE_DIR, "uiforagents.json"));
    const source = resolveDirectionsFile(outside.root, outside.directionsFile);
    if (!statSync(source, { throwIfNoEntry: false })) {
      throw new Error(`directions module not found: ${source}`);
    }
    const { directions } = await import(pathToFileURL(source).href);
    const direction = directions.find((d) => d.slug === outside.direction);
    if (!direction || Object.keys(direction.tokens ?? {}).length === 0) {
      throw new Error(`direction "${outside.direction}" without tokens in ${source}`);
    }
    console.error("self-test: outside directionsFile resolves and yields tokens");
  } catch (err) {
    failures++;
    console.error(`self-test: directionsFile FAIL - ${err.message}`);
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
