#!/usr/bin/env node
// One-off namespace codemod for the uifa- rename, committed as evidence.
// Applies exact mechanical replacements across items and the tools that
// enforce the contract, printing per-pass counts. Ordered passes:
//   P1 hooks      the two data-* hook attributes gain the uifa- middle segment
//   P2 classes    the old class prefix -> uifa-
//   P3 tokens     old unprefixed custom properties -> the --uifa-* contract
//   P4 prose      enumerated exact strings in manifests, fixtures, registry
// The renamed-from strings are assembled from parts so this file never trips
// the zero-remnant gates it enforces.
//
// Usage:
//   node scripts/codemod-uifa.mjs            # dry run: print planned counts
//   node scripts/codemod-uifa.mjs --write    # apply
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const WRITE = process.argv.includes("--write");

const OLD_HOOK_VARIANT = ["data", "variant"].join("-");
const OLD_HOOK_SLOT = ["data", "slot"].join("-");
const OLD_CLASS_PREFIX = ["uif"].join("") + "-";
const OLD_THEME_WORD = ["direc", "tion"].join("");

// Token pass: the lookahead prevents partial matches, so alternation order
// is irrelevant. --radius becomes the control tier; every other role gains
// the uifa- prefix.
const TOKEN_PATTERN = /--(text-muted|text-base|accent-soft|accent-fg|ok-soft|ok-fg|warn-soft|warn-fg|danger-soft|danger-fg|shadow-char|font-display|font-body|bg|surface|border|text|faint|accent|ok|warn|danger|scrim|radius|space)(?![a-zA-Z0-9-])/g;
const replaceToken = (match, name) => (name === "radius" ? "--uifa-radius-control" : `--uifa-${name}`);

function listFiles(dir, extensions, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) listFiles(path, extensions, out);
    else if (extensions.some((ext) => entry.name.endsWith(ext))) out.push(path);
  }
  return out;
}

// P4 prose: enumerated exact strings so flex-direction and unrelated uses of
// the word stay untouchable. Registry edits keep its descriptions
// string-identical to the manifests, which build-index enforces.
const proseEdits = [
  ["items/badge/item.json", [[`from the ${OLD_THEME_WORD} tokens`, "from the theme tokens"]]],
  ["items/card/item.json", [
    [`${OLD_THEME_WORD}-defined shadow character`, "theme-defined shadow character"],
    [`comes entirely from the ${OLD_THEME_WORD}`, "comes entirely from the theme"],
  ]],
  ["items/chip/item.json", [[`pill roundness tracks the ${OLD_THEME_WORD}`, "pill roundness tracks the theme"]]],
  ["items/tabs/item.json", [
    [`pill styles per ${OLD_THEME_WORD}`, "pill styles per theme"],
    [`Style comes from the ${OLD_THEME_WORD}`, "Style comes from the theme"],
  ]],
  ["items/tabs/fixture.aria.yml", [[`the ${OLD_THEME_WORD} picks per project`, "the theme picks per project"]]],
  ["items/tabs/tabs.example.html", [[`the ${OLD_THEME_WORD} picks per project`, "the theme picks per project"]]],
  ["registry.json", [
    [`${OLD_THEME_WORD}-defined shadow character`, "theme-defined shadow character"],
    [`pill styles per ${OLD_THEME_WORD}`, "pill styles per theme"],
  ]],
].map(([rel, edits]) => [join(ROOT, rel), edits]);

const itemFiles = listFiles(join(ROOT, "items"), [".html", ".css", ".js", ".yml", ".json"]);
const toolFiles = [
  "scripts/build-arena.mjs",
  "scripts/build-index.mjs",
  "scripts/uiforagents.mjs",
  "validation/check.mjs",
].map((rel) => join(ROOT, rel));
const plantedHtml = listFiles(join(ROOT, "validation", "fixtures", "planted"), [".html"]);
const hookAndClassScope = [...itemFiles, ...toolFiles, ...plantedHtml];
const allPaths = [...new Set([...hookAndClassScope, ...proseEdits.map(([path]) => path)])];

for (const path of allPaths) {
  if (!statSync(path, { throwIfNoEntry: false })?.isFile()) {
    console.error(`codemod: enumerated file is missing: ${path}`);
    process.exit(1);
  }
}

const original = new Map(allPaths.map((path) => [path, readFileSync(path, "utf8")]));
const contents = new Map(original);
const counts = { p1Variant: 0, p1Slot: 0, p2: 0, p3: 0, p4: 0 };

function applyFixed(scope, from, to) {
  let count = 0;
  for (const path of scope) {
    const text = contents.get(path);
    const hits = text.split(from).length - 1;
    if (hits > 0) {
      count += hits;
      contents.set(path, text.split(from).join(to));
    }
  }
  return count;
}

// P1 hooks (fixed strings).
counts.p1Variant += applyFixed(hookAndClassScope, OLD_HOOK_VARIANT, "data-uifa-variant");
counts.p1Slot += applyFixed(hookAndClassScope, OLD_HOOK_SLOT, "data-uifa-slot");

// P2 classes (fixed string).
counts.p2 += applyFixed(hookAndClassScope, OLD_CLASS_PREFIX, "uifa-");

// P3 tokens (regex, items only).
for (const path of itemFiles) {
  const text = contents.get(path);
  counts.p3 += (text.match(TOKEN_PATTERN) ?? []).length;
  contents.set(path, text.replace(TOKEN_PATTERN, replaceToken));
}

// P4 prose (enumerated exact strings).
for (const [path, edits] of proseEdits) {
  for (const [from, to] of edits) {
    const text = contents.get(path);
    const hits = text.split(from).length - 1;
    if (hits > 0) {
      counts.p4 += hits;
      contents.set(path, text.split(from).join(to));
    }
  }
}

// Minimums from the recorded inventory; P4 is exact.
const MINIMUMS = { p1Variant: 127, p1Slot: 348, p2: 341, p3: 553, p4: 10 };
const shortfalls = Object.entries(MINIMUMS)
  .filter(([pass, min]) => (pass === "p4" ? counts[pass] !== min : counts[pass] < min))
  .map(([pass, min]) => `${pass}: ${counts[pass]} (minimum ${min})`);
if (shortfalls.length > 0) {
  console.error(`codemod: replacement counts below minimums\n${shortfalls.join("\n")}`);
  process.exit(1);
}

console.log(`codemod: P1 hooks: ${counts.p1Variant} variant + ${counts.p1Slot} slot`);
console.log(`codemod: P2 classes: ${counts.p2}`);
console.log(`codemod: P3 tokens: ${counts.p3}`);
console.log(`codemod: P4 prose: ${counts.p4}`);
if (!WRITE) {
  console.log("codemod: dry run - nothing written (pass --write to apply)");
  process.exit(0);
}
let written = 0;
for (const [path, text] of contents) {
  if (text !== original.get(path)) {
    writeFileSync(path, text);
    written++;
  }
}
console.log(`codemod: wrote ${written} files`);
