// Validates every item against the registry schema and generates the agent
// surfaces: llms.txt (compact index) and docs/components/*.md (per-item docs).
// Exits non-zero with all violations listed when validation fails.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadKit } from "./lib/items.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const LLMS_MAX_BYTES = 15360;

const { schema, baseScale, items } = await loadKit();
const errors = [];

// registry.json is the root index; keep its summaries in lockstep with manifests.
const registry = JSON.parse(readFileSync(join(ROOT, "registry.json"), "utf8"));
const manifestByName = new Map(items.map((item) => [item.name, item.manifest]));
const listed = new Set((registry.items ?? []).map((item) => item.name));
for (const item of items) {
  if (!listed.has(item.name)) errors.push(`registry.json: missing item "${item.name}"`);
}
const known = new Set(manifestByName.keys());
for (const entry of registry.items ?? []) {
  if (!known.has(entry.name)) errors.push(`registry.json: entry "${entry.name}" has no items/<name>/ folder`);
  const manifest = manifestByName.get(entry.name);
  if (!manifest) continue;
  for (const field of ["title", "description", "behavior", "category"]) {
    if (entry[field] !== manifest[field]) {
      errors.push(`registry.json: "${entry.name}" ${field} does not match items/${entry.name}/item.json`);
    }
  }
}
if (registry.schemaVersion !== undefined) {
  for (const item of items) {
    if (item.manifest.schemaVersion !== registry.schemaVersion) {
      errors.push(`registry.json: schemaVersion ${registry.schemaVersion} does not match "${item.name}" (${item.manifest.schemaVersion})`);
    }
  }
}

// changelog.json must reflect the item set, and match the package version.
const changelog = JSON.parse(readFileSync(join(ROOT, "changelog.json"), "utf8"));
const latest = changelog[changelog.length - 1];
const packageJson = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
if (latest) {
  const logged = new Set(latest.items);
  for (const item of items) {
    if (!logged.has(item.name)) errors.push(`changelog.json: latest entry ${latest.version} is missing item "${item.name}"`);
  }
  for (const name of logged) {
    if (!known.has(name)) errors.push(`changelog.json: latest entry lists unknown item "${name}"`);
  }
  if (latest.version !== packageJson.version) {
    errors.push(`changelog.json: latest entry version ${latest.version} does not match package.json version ${packageJson.version}`);
  }
} else {
  errors.push("changelog.json: no entries");
}

if (errors.length > 0) {
  console.error(`build-index: validation failed\n${errors.join("\n")}`);
  process.exit(1);
}

// llms.txt: 4-tier disclosure - index (this file) -> category -> component docs -> source files.
const categories = schema.properties.category.enum;
const lines = [];
lines.push("# uiforagents");
lines.push("");
lines.push("Agent-first vanilla UI kit: registry-shaped, copy-in HTML/CSS, zero runtime dependencies. The primary consumer is the AI agent building the UI; humans review and own the output.");
lines.push("");
lines.push("## How to use");
lines.push("");
lines.push("- Pick an item below; each line is enough to choose a component and a variant without opening other files.");
lines.push("- Copy the files from items/<name>/: markup + CSS, plus a script when behavior is js-inline.");
lines.push("- Wire direction tokens: themes/tokens.css, or your own stylesheet declaring the same roles.");
lines.push("- Validate: open the item's example page and diff the rendered tree against its fixture.aria.yml with Playwright's ariaSnapshot.");
lines.push("");
lines.push("## Token vocabulary");
lines.push("");
lines.push(`Semantic bg/fg pairs and the base scale: ${[...baseScale].join(" ")}.`);
lines.push("Pairs read as background -> foreground: --bg/--text, --surface/--text, --accent/--accent-fg, --accent-soft/--accent, and the same shape for --ok, --warn, --danger. --scrim dims overlays. --radius and --shadow-char set tone; --font-display, --font-body, --text-base set type; --space is the density unit for calc() scales.");
lines.push("Components read tokens only - no component-local colors. Variants are closed [data-variant] tables; parts are [data-slot] hooks.");
lines.push("");
for (const category of categories) {
  const inCategory = items.filter((item) => item.manifest.category === category);
  if (inCategory.length === 0) continue;
  lines.push(`## ${category[0].toUpperCase()}${category.slice(1)}`);
  lines.push("");
  for (const { name, manifest } of inCategory) {
    const variants = manifest.variants.length === 0
      ? "none"
      : manifest.variants
          .map((v) => (v.default ? `${v.name}*` : v.name))
          .join(" / ");
    lines.push(
      `- ${name} | ${manifest.title} | ${manifest.description} | data-variant: ${variants} | behavior: ${manifest.behavior} | docs: docs/components/${name}.md | src: items/${name}/`
    );
  }
  lines.push("");
}
writeFileSync(join(ROOT, "llms.txt"), lines.join("\n").trimEnd() + "\n");

// docs/components/<name>.md: the component tier.
mkdirSync(join(ROOT, "docs", "components"), { recursive: true });
for (const { name, manifest } of items) {
  const variantRows = manifest.variants
    .map((v) => `| \`${v.name}\`${v.default ? " (default)" : ""} | ${v.description} |`)
    .join("\n");
  const markup = manifest.files
    .filter((f) => f.type === "kit:markup")
    .map((f) => readFileSync(join(ROOT, "items", name, f.path), "utf8").trim())
    .join("\n");
  const fileLines = manifest.files
    .map((f) => `- [${f.path}](../../items/${name}/${f.path}) - ${f.type.replace("kit:", "")}`)
    .join("\n");
  const behaviorNote = manifest.behavior === "js-inline"
    ? "Ships a dependency-free script; wire its hooks to your own state as needed."
    : manifest.behavior === "css-only"
      ? "State lives in native inputs; no JavaScript required."
      : "Static markup; no JavaScript required.";
  const doc = [
    `# ${manifest.title}`,
    "",
    manifest.description,
    "",
    `Category: ${manifest.category} · Behavior: ${manifest.behavior} · Schema: ${manifest.schemaVersion}${manifest.meta?.source ? ` · Source: ${manifest.meta.source}` : ""}`,
    "",
    "## Variants",
    "",
    manifest.variants.length === 0 ? "No variant table; the item has a single form." : "| `data-variant` | Description |", 
    ...(manifest.variants.length === 0 ? [] : ["| --- | --- |", variantRows]),
    "",
    "## Tokens",
    "",
    `Reads: ${manifest.cssVars.map((t) => `\`${t}\``).join(", ")}. Every color comes from a semantic role; nothing is hard-coded.`,
    "",
    "## Markup",
    "",
    "```html",
    markup,
    "```",
    "",
    "## Files",
    "",
    fileLines,
    "",
    "## Usage",
    "",
    manifest.docs,
    "",
    "## Validation",
    "",
    "Open the example page and diff the rendered tree against the fixture with Playwright:",
    "",
    "```js",
    `const snap = await page.locator("body").ariaSnapshot();`,
    `// compare with items/${name}/fixture.aria.yml`,
    "```",
    "",
  ].join("\n");
  writeFileSync(join(ROOT, "docs", "components", `${name}.md`), doc);
}

const size = readFileSync(join(ROOT, "llms.txt")).length;
if (size >= LLMS_MAX_BYTES) {
  console.error(`build-index: llms.txt is ${size} bytes; must stay under ${LLMS_MAX_BYTES}`);
  process.exit(1);
}

console.log(`build-index: ${items.length} items valid; llms.txt ${size} bytes; docs/components/ regenerated`);
