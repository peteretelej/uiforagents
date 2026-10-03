// Shared kit loader: discovers items, validates manifests against the schema,
// and checks that declared files exist. Used by both build scripts so they can
// never disagree about what the registry contains.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const ITEMS_DIR = join(ROOT, "items");
const SCHEMA_PATH = join(ROOT, "schema", "registry.schema.json");
const THEMES_PATH = join(ROOT, "themes", "index.mjs");
const DIALECTS_DIR = join(ROOT, "themes", "dialects");

// Generated artifacts embed source contents verbatim, so reads are
// normalized to LF: a CRLF checkout (Windows) and an LF checkout
// (Linux CI) must produce byte-identical output.
export function readText(path) {
  return readFileSync(path, "utf8").replace(/\r\n/g, "\n");
}

// Optional contract tokens a theme may omit; the loader supplies these
// defaults so every theme's effective token set is total.
const OPTIONAL_TOKEN_DEFAULTS = {
  "--uifa-corner-shape": "round",
  "--uifa-noise": "none",
};

// Draft-07 keywords this validator understands; anything else must fail loudly
// rather than be silently ignored. "version" is a no-op here: it versions the
// schema document itself and carries no per-manifest validation.
const SUPPORTED_KEYWORDS = new Set([
  "$schema", "$id", "title", "description", "type", "const", "enum", "pattern",
  "required", "properties", "additionalProperties", "items", "version",
]);

function typeMatches(value, type) {
  switch (type) {
    case "object": return typeof value === "object" && value !== null && !Array.isArray(value);
    case "array": return Array.isArray(value);
    case "string": return typeof value === "string";
    case "number": return typeof value === "number";
    case "boolean": return typeof value === "boolean";
    case "null": return value === null;
    default: return false;
  }
}

function fileExists(path) {
  return statSync(path, { throwIfNoEntry: false })?.isFile() ?? false;
}

export function validateAgainstSchema(value, schemaNode, where, errors, isRoot = true) {
  for (const key of Object.keys(schemaNode)) {
    if (!SUPPORTED_KEYWORDS.has(key)) {
      throw new Error(`schema uses unsupported keyword "${key}" (at ${where}); extend the validator`);
    }
  }
  if ("type" in schemaNode) {
    const types = Array.isArray(schemaNode.type) ? schemaNode.type : [schemaNode.type];
    if (!types.some((t) => typeMatches(value, t))) {
      errors.push(`${where}: expected type ${types.join(" | ")}`);
      return;
    }
  }
  if ("const" in schemaNode && value !== schemaNode.const) {
    errors.push(`${where}: expected ${JSON.stringify(schemaNode.const)}, got ${JSON.stringify(value)}`);
  }
  if ("enum" in schemaNode && !schemaNode.enum.includes(value)) {
    errors.push(`${where}: ${JSON.stringify(value)} is not one of ${schemaNode.enum.map(JSON.stringify).join(", ")}`);
  }
  if ("pattern" in schemaNode && typeof value === "string" && !new RegExp(schemaNode.pattern).test(value)) {
    errors.push(`${where}: ${JSON.stringify(value)} does not match ${schemaNode.pattern}`);
  }
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    for (const key of schemaNode.required ?? []) {
      if (!(key in value)) errors.push(`${where}: missing required property "${key}"`);
    }
    // Unknown fields are tolerated at the root manifest object only (forward
    // compatibility); nested closed tables stay strictly validated.
    if (schemaNode.additionalProperties === false && !isRoot) {
      for (const key of Object.keys(value)) {
        if (!(key in (schemaNode.properties ?? {}))) {
          errors.push(`${where}: unknown property "${key}"`);
        }
      }
    }
    for (const [key, sub] of Object.entries(schemaNode.properties ?? {})) {
      if (key in value) validateAgainstSchema(value[key], sub, `${where}.${key}`, errors, false);
    }
  }
  if (Array.isArray(value) && schemaNode.items) {
    value.forEach((entry, i) => validateAgainstSchema(entry, schemaNode.items, `${where}[${i}]`, errors, false));
  }
}

const REQUIRED_FILE_TYPES = ["kit:markup", "kit:style", "kit:example", "kit:fixture"];

// The example page's import map is the hand-maintained twin of the manifest's
// pinned behavior packages; the loader cross-checks them so neither drifts.
function parseImportMap(example) {
  const match = example.match(/<script type="importmap">([\s\S]*?)<\/script>/);
  if (!match) return null;
  try {
    const imports = JSON.parse(match[1]).imports ?? {};
    const map = new Map();
    for (const [name, url] of Object.entries(imports)) {
      const at = String(url).lastIndexOf("@");
      map.set(name, at <= 0 ? "" : String(url).slice(at + 1));
    }
    return map;
  } catch {
    return null;
  }
}

export async function loadKit() {
  const errors = [];
  const schema = JSON.parse(readFileSync(SCHEMA_PATH, "utf8"));
  const { themes } = await import(pathToFileURL(THEMES_PATH).href);

  if (!Array.isArray(themes) || themes.length < 1) {
    throw new Error("item validation failed:\nthemes/index.mjs: expected at least 1 example theme");
  }
  const slugs = new Set();
  for (const theme of themes) {
    if (slugs.has(theme.slug)) errors.push(`themes/index.mjs: duplicate slug "${theme.slug}"`);
    slugs.add(theme.slug);
    for (const [token, value] of Object.entries(OPTIONAL_TOKEN_DEFAULTS)) {
      if (!(token in theme.tokens)) theme.tokens[token] = value;
    }
  }
  const requiredKeySets = new Set(
    themes.map((theme) =>
      JSON.stringify(Object.keys(theme.tokens).filter((key) => !(key in OPTIONAL_TOKEN_DEFAULTS)).sort())
    )
  );
  if (requiredKeySets.size > 1) {
    errors.push("themes/index.mjs: themes do not share the same required token key set");
  }
  for (const theme of themes) {
    const dialectPath = join(DIALECTS_DIR, `${theme.slug}.css`);
    theme.dialect = fileExists(dialectPath) ? readText(dialectPath) : "";
  }
  const baseScale = new Set(Object.keys(themes[0].tokens).filter((k) => k !== "color-scheme"));

  const items = [];
  for (const entry of readdirSync(ITEMS_DIR, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (!entry.isDirectory()) continue;
    const dir = join(ITEMS_DIR, entry.name);
    let manifest;
    try {
      manifest = JSON.parse(readFileSync(join(dir, "item.json"), "utf8"));
    } catch (err) {
      errors.push(`items/${entry.name}/item.json: invalid JSON (${err.message})`);
      continue;
    }
    const where = `items/${entry.name}/item.json`;
    validateAgainstSchema(manifest, schema, where, errors);
    if (manifest.name !== entry.name) {
      errors.push(`${where}: name "${manifest.name}" does not match folder "${entry.name}"`);
    }
    for (const token of manifest.cssVars ?? []) {
      if (!baseScale.has(token)) {
        errors.push(`${where}: cssVars token "${token}" is not in the base scale declared by themes/index.mjs`);
      }
    }
    for (const file of manifest.files ?? []) {
      const filePath = join(dir, file.path);
      if (!fileExists(filePath)) {
        errors.push(`${where}: declared file "${file.path}" does not exist`);
      } else if (file.type === "kit:fixture" && !readFileSync(filePath, "utf8").trim()) {
        errors.push(`${where}: fixture "${file.path}" is empty`);
      }
    }
    const types = new Set((manifest.files ?? []).map((f) => f.type));
    for (const requiredType of REQUIRED_FILE_TYPES) {
      if (!types.has(requiredType)) errors.push(`${where}: missing a ${requiredType} file`);
    }
    const scriptedKind = manifest.behavior.kind === "js-inline" || manifest.behavior.kind === "zag";
    if (types.has("kit:behavior") !== scriptedKind) {
      errors.push(`${where}: behavior kind "${manifest.behavior.kind}" does not match the presence of a kit:behavior file`);
    }
    if (manifest.behavior.kind === "zag") {
      const packages = manifest.behavior.packages ?? [];
      if (packages.length === 0) errors.push(`${where}: zag behavior must list its @zag-js/* packages`);
      for (const pkg of packages) {
        if (!pkg.startsWith("@zag-js/")) errors.push(`${where}: zag package "${pkg}" is not an @zag-js/* package`);
      }
      const exampleFile = (manifest.files ?? []).find((f) => f.type === "kit:example");
      if (exampleFile) {
        const example = readFileSync(join(dir, exampleFile.path), "utf8");
        const map = parseImportMap(example);
        const pinned = new Map();
        for (const pkg of packages) {
          const at = pkg.lastIndexOf("@");
          if (at <= 0) {
            errors.push(`${where}: zag package "${pkg}" must pin an exact version (name@version)`);
            continue;
          }
          pinned.set(pkg.slice(0, at), pkg.slice(at + 1));
        }
        if (!map) {
          errors.push(`${where}: zag example has no import map pinning the behavior packages`);
        } else {
          for (const [name, version] of pinned) {
            if (map.get(name) !== version) {
              errors.push(`${where}: example import map pins ${name} at ${map.get(name) ?? "nothing"}, manifest says ${version}`);
            }
          }
          for (const name of map.keys()) {
            if (!pinned.has(name)) errors.push(`${where}: example import map pins undeclared package "${name}"`);
          }
        }
      }
    }
    const propNames = new Set();
    for (const prop of manifest.props) {
      if (propNames.has(prop.name)) errors.push(`${where}: duplicate prop "${prop.name}"`);
      propNames.add(prop.name);
      if (prop.type === "enum" && !(prop.values ?? []).includes(prop.default)) {
        errors.push(`${where}: prop "${prop.name}" default ${JSON.stringify(prop.default)} is not in its values`);
      }
    }
    const variantProp = manifest.props.find((prop) => prop.name === "variant");
    if ((manifest.variants.length > 0) !== (variantProp !== undefined)) {
      errors.push(`${where}: items with a variant table surface exactly one enum "variant" prop, items without one surface none`);
    } else if (variantProp) {
      if (variantProp.type !== "enum") {
        errors.push(`${where}: the "variant" prop must be an enum`);
      } else {
        const names = manifest.variants.map((v) => v.name);
        if (JSON.stringify(variantProp.values) !== JSON.stringify(names)) {
          errors.push(`${where}: "variant" prop values do not match the closed variant table (${names.join(", ")})`);
        }
      }
      const fallback = manifest.variants.find((v) => v.default);
      if (fallback && variantProp.default !== fallback.name) {
        errors.push(`${where}: "variant" prop default "${variantProp.default}" does not match the default variant "${fallback.name}"`);
      }
    }
    const slotNames = new Set();
    for (const slot of manifest.slots) {
      if (slotNames.has(slot.name)) errors.push(`${where}: duplicate slot "${slot.name}"`);
      slotNames.add(slot.name);
    }
    items.push({ name: entry.name, dir, manifest });
  }

  if (errors.length > 0) {
    throw new Error(`item validation failed:\n${errors.join("\n")}`);
  }
  return { schema, themes, baseScale, items };
}
