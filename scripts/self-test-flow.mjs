#!/usr/bin/env node
// Flow self-test: the serializer in scripts/lib/themes-css.mjs is the ONE
// generation path for token blocks (build-arena and the flow CLI both call
// it), so its output must satisfy the kit's own consumption contract:
//   1. Prefix contract: custom properties emitted from an unprefixed fixture
//      direction all come out --uifa-*; bare standard properties (the
//      sanctioned set below) pass through unprefixed.
//   2. Idempotence: re-serializing already-prefixed names re-emits them
//      unchanged, so kit-native themes stay byte-stable.
//   3. Inert-token catch: every var(--uifa-*) referenced by kit item CSS
//      resolves to a token the serializer emitted for a complete direction.
//      Consumed-subset-of-emitted only; kit themes legitimately emit tokens
//      no item consumes. A serializer edit that re-emits unprefixed names -
//      the shipped v0.2.0 bug - fails here instead of shipping.
// Usage: node scripts/self-test-flow.mjs
import { readFileSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { themeRootBlock, themeTokenBlock } from "./lib/themes-css.mjs";
import { walkFiles } from "./lib/config.mjs";

const KIT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DECLARATION = /(--[a-zA-Z0-9-]+)\s*:\s*([^;]+);/g;
// Token lines as the serializer writes them (two-space indent, one per
// line): custom properties and bare standard properties alike.
const TOKEN_LINE = /^ {2}([a-zA-Z-][a-zA-Z0-9-]*)\s*:\s*(.+);$/gm;
const VAR_USE = /var\(\s*(--[a-zA-Z0-9-]+)/g;
// Bare standard properties a complete token set may carry unprefixed.
const BARE_PROPERTIES = new Set(["color-scheme"]);

// Complete kit vocabulary under unprefixed direction-module names, exactly
// what themes/index.mjs emits after mapping; values are placeholders, only
// names matter here.
const fixture = {
  slug: "fixture",
  name: "Fixture",
  mood: "test",
  notes: "Complete kit vocabulary under unprefixed direction names.",
  tokens: {
    "--bg": "white",
    "--surface": "white",
    "--surface-2": "whitesmoke",
    "--border": "black",
    "--border-strong": "black",
    "--text": "black",
    "--text-muted": "gray",
    "--faint": "gray",
    "--accent": "red",
    "--accent-soft": "pink",
    "--accent-fg": "white",
    "--ok": "green",
    "--ok-soft": "honeydew",
    "--ok-fg": "white",
    "--warn": "gold",
    "--warn-soft": "lightyellow",
    "--warn-fg": "black",
    "--danger": "red",
    "--danger-soft": "mistyrose",
    "--danger-fg": "white",
    "--scrim": "rgb(0 0 0 / 0.5)",
    "--radius-control": "8px",
    "--radius-surface": "12px",
    "--radius-pill": "999px",
    "--border-width": "1px",
    "--shadow-char": "0 1px 2px black",
    "--font-display": "serif",
    "--font-body": "sans-serif",
    "--font-mono": "monospace",
    "--text-base": "16px",
    "--space": "8px",
    "--duration": "140ms",
    "--ease": "linear",
    "--noise": "none",
    "color-scheme": "light",
  },
};

// CSS contexts of an item file, mirroring the adherence linter's regions:
// whole stylesheets, <style> blocks, and style attributes.
function cssRegions(content, file) {
  if (file.endsWith(".css")) return [content];
  if (!file.endsWith(".html") && !file.endsWith(".htm")) return [];
  const regions = [];
  for (const match of content.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) regions.push(match[1]);
  for (const match of content.matchAll(/style\s*=\s*"([^"]*)"|style\s*=\s*'([^']*)'/gi)) regions.push(match[1] ?? match[2]);
  return regions;
}

function declaredNames(css) {
  return [...css.matchAll(DECLARATION)].map((match) => match[1]);
}

async function selfTest() {
  let failures = 0;
  const fail = (message) => {
    failures++;
    console.error(`self-test-flow: FAIL - ${message}`);
  };

  // 1. Prefix contract over the unprefixed fixture.
  const emitted = `${themeTokenBlock(fixture, { ownsRoot: true })}\n${themeRootBlock(fixture)}`;
  const names = declaredNames(emitted);
  const unprefixed = names.filter((name) => name.startsWith("--") && !name.startsWith("--uifa-") && !BARE_PROPERTIES.has(name));
  if (unprefixed.length > 0) {
    fail(`serializer emitted unprefixed custom properties: ${[...new Set(unprefixed)].join(", ")}`);
  } else {
    console.error("self-test-flow: prefix contract holds (all custom properties --uifa-*, bare properties untouched)");
  }
  const missing = ["--uifa-bg", "--uifa-radius-control", "--uifa-duration", "--uifa-ease", "--uifa-noise"].filter((name) => !names.includes(name));
  if (missing.length > 0) {
    fail(`mapped names absent from fixture emission: ${missing.join(", ")}`);
  }
  const lineNames = [...emitted.matchAll(TOKEN_LINE)].map((match) => match[1]);
  if (lineNames.includes("color-scheme")) {
    console.error("self-test-flow: bare property color-scheme passed through unprefixed");
  } else {
    fail("bare standard property color-scheme was not passed through");
  }

  // 2. Idempotence: feeding the emitted (prefixed) token set back through the
  //    serializer re-emits the same block.
  const first = themeTokenBlock(fixture, { ownsRoot: true });
  const roundTrip = themeTokenBlock({ ...fixture, tokens: Object.fromEntries([...first.matchAll(TOKEN_LINE)].map((match) => [match[1], match[2]])) }, { ownsRoot: true });
  if (roundTrip !== first) {
    fail("mapping is not idempotent: already-prefixed names were altered");
  } else {
    console.error("self-test-flow: idempotence holds (prefixed input re-emits unchanged)");
  }

  // 3. Inert-token catch: item CSS consumes only what a complete direction
  //    emits.
  const emittedSet = new Set(names);
  const consumed = new Set();
  for (const file of walkFiles(join(KIT_ROOT, "items"))) {
    let content;
    try {
      content = readFileSync(file, "utf8");
    } catch {
      continue;
    }
    for (const region of cssRegions(content, file)) {
      for (const match of region.matchAll(VAR_USE)) {
        if (match[1].startsWith("--uifa-")) consumed.add(match[1]);
      }
    }
  }
  const inert = [...consumed].filter((name) => !emittedSet.has(name));
  if (inert.length > 0) {
    fail(`item CSS consumes tokens a complete direction does not emit: ${inert.sort().join(", ")}`);
  } else {
    console.error(`self-test-flow: inert-token catch passes (${consumed.size} consumed tokens all emitted by the fixture direction)`);
  }

  if (failures > 0) {
    console.error(`self-test-flow: ${failures} failure${failures === 1 ? "" : "s"}`);
    return 1;
  }
  console.error("self-test-flow: prefix, idempotence, and inert-token assertions pass");
  return 0;
}

process.exit(await selfTest());
