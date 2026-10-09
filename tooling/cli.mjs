#!/usr/bin/env node
// Zero-dependency CLI for the uiforagents catalogue. The primary consumer is
// an AI agent: list the catalogue, read a prompt-pack or foundation from
// stdout, copy an artifact identity into a project, or print the derive
// contract. React-lane identities install through the shadcn registry, so
// init only points at that command.

import { readdirSync, readFileSync, existsSync, mkdirSync, copyFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import process from "node:process";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const IDENTITIES = path.join(ROOT, "identities");

const help = `
uiforagents - design identities for agent-built apps

  npx uiforagents list                catalogue: slug, lane, lead scheme, tags
  npx uiforagents show <slug>         print the prompt-pack (or --file below)
  npx uiforagents init <slug> [dir]   copy an artifact identity into ./uiforagents/<slug>
  npx uiforagents derive              print the derive contract (DERIVE.md)

show --file:  pack (default) | foundation | theme | overrides | demo | registry | <filename>
React-lane install: npx shadcn add https://uiforagents.com/r/<slug>.json
`;

const fail = (msg) => {
  console.error(msg);
  process.exit(1);
};

const slugs = () =>
  readdirSync(IDENTITIES, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();

const laneOf = (slug) => {
  const dir = path.join(IDENTITIES, slug);
  if (existsSync(path.join(dir, "foundation.css"))) return "artifact";
  if (existsSync(path.join(dir, "theme"))) return "react";
  return null;
};

const leadScheme = (slug) => {
  const file =
    laneOf(slug) === "artifact"
      ? path.join(IDENTITIES, slug, "foundation.css")
      : path.join(IDENTITIES, slug, "theme", "theme.css");
  if (!existsSync(file)) return "-";
  const hit = readFileSync(file, "utf8").match(/color-scheme:\s*(light|dark)/);
  return hit ? hit[1] : "-";
};

const tagsOf = (slug) => {
  const file = path.join(IDENTITIES, slug, "identity.json");
  if (!existsSync(file)) return "";
  try {
    return (JSON.parse(readFileSync(file, "utf8")).vibe ?? []).join(", ");
  } catch {
    return "";
  }
};

const resolveFile = (slug, ref) => {
  const dir = path.join(IDENTITIES, slug);
  const aliases = {
    pack: "prompt-pack.md",
    foundation: "foundation.css",
    theme: path.join("theme", "theme.css"),
    overrides: path.join("overrides", "overrides.css"),
    demo: "demo.html",
    registry: path.join("registry", `${slug}.json`),
  };
  const rel = aliases[ref] ?? ref;
  const file = path.join(dir, rel);
  if (!existsSync(file)) return null;
  return file;
};

const [cmd, slug, ...rest] = process.argv.slice(2);

if (!cmd || cmd === "help" || cmd === "--help" || cmd === "-h") {
  console.log(help.trim());
  process.exit(0);
}

if (cmd === "list") {
  console.log(`${"slug".padEnd(20)} ${"lane".padEnd(9)} ${"scheme".padEnd(7)} tags`);
  for (const slug of slugs()) {
    const lane = laneOf(slug);
    if (!lane) continue;
    console.log(`${slug.padEnd(20)} ${lane.padEnd(9)} ${leadScheme(slug).padEnd(7)} ${tagsOf(slug)}`);
  }
  console.log(`\nReact lane installs: npx shadcn add https://uiforagents.com/r/<slug>.json`);
  process.exit(0);
}

if (cmd === "derive") {
  const file = path.join(ROOT, "DERIVE.md");
  if (!existsSync(file)) fail("DERIVE.md not found in this package");
  process.stdout.write(readFileSync(file, "utf8"));
  process.exit(0);
}

if (cmd !== "show" && cmd !== "init") fail(`Unknown command "${cmd}".\n${help.trim()}`);

if (!slug || !slugs().includes(slug)) {
  fail(`Unknown identity "${slug ?? ""}". Known slugs:\n  ${slugs().join(", ")}`);
}

const fileRef = (rest) => {
  if (rest[0] === "--file") return rest[1] || "";
  return rest[0]?.replace(/^--file=?/, "") || "pack";
};

if (cmd === "show") {
  const ref = fileRef(rest);
  const file = resolveFile(slug, ref);
  if (!file) fail(`No "${ref}" in ${slug}. Files: prompt-pack.md, foundation.css, theme/theme.css, overrides/overrides.css, demo.html, registry/${slug}.json, identity.json`);
  process.stdout.write(readFileSync(file, "utf8"));
  process.exit(0);
}

// init
if (laneOf(slug) === "react") {
  console.log(`${slug} is a React-lane identity - it installs through the shadcn registry:\n`);
  console.log(`  npx shadcn add https://uiforagents.com/r/${slug}.json\n`);
  process.exit(0);
}
const outDir = path.resolve(rest[0] ?? process.cwd(), "uiforagents", slug);
mkdirSync(outDir, { recursive: true });
for (const name of ["foundation.css", "prompt-pack.md", "demo.html"]) {
  const src = path.join(IDENTITIES, slug, name);
  if (existsSync(src)) copyFileSync(src, path.join(outDir, name));
}
console.log(`Copied ${slug} (artifact lane) to ${outDir}`);
console.log(`Start from prompt-pack.md, style against foundation.css; demo.html is the reference page.`);
