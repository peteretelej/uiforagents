// Emits framework adapters from validated manifests. Items that declare
// adapters.react get adapters/react/<name>.jsx plus a fixture test
// (<name>.test.jsx) that renders the component against its fixture.aria.yml.
// Component DOM mirrors items/<name>/<name>.html verbatim - same element,
// uifa-<name> class, closed data-uifa-variant / data-uifa-slot attributes -
// so item CSS and validation/check.mjs apply unchanged. Output is
// deterministic and committed; CI's freshness check covers it.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadKit } from "./lib/items.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "adapters", "react");

const pascal = (name) => name.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join("");

// Per-item adapter shapes. The manifest drives props, defaults, slot names,
// and JSDoc; the shape fixes the element structure copied from the vanilla
// markup. leaf: single element, children is the default slot. card and
// form-field have bespoke structures; their markup is the source of truth.
const SHAPES = {
  button: {
    leaf: { element: "button", className: "uifa-button" },
    scenario: [
      "<Button>Save changes</Button>",
      "<Button variant=\"secondary\">Preview</Button>",
      "<Button variant=\"danger\">Delete project</Button>",
      "<Button variant=\"small\">Compact action</Button>",
      "<Button disabled>Saved</Button>",
    ],
  },
  badge: {
    leaf: { element: "span", className: "uifa-badge" },
    scenario: [
      "<Badge>In review</Badge>",
      "{\" \"}",
      "<Badge variant=\"ok\">Open</Badge>",
      "{\" \"}",
      "<Badge variant=\"warn\">Due soon</Badge>",
      "{\" \"}",
      "<Badge variant=\"danger\">Expired</Badge>",
      "{\" \"}",
      "<Badge variant=\"muted\">Closed</Badge>",
    ],
  },
  chip: {
    leaf: { element: "span", className: "uifa-chip" },
    scenario: [
      "<Chip>design</Chip>",
      "{\" \"}",
      "<Chip variant=\"accent\">featured</Chip>",
      "{\" \"}",
      "<Chip variant=\"warn\">needs review</Chip>",
    ],
  },
  card: {
    restOn: "root element",
    scenario: [
      "<Card",
      "  title=\"Usage summary\"",
      "  body=\"Your workspace used 42% of its monthly quota. Upgrade any time; usage resets on the first of the month.\"",
      "  actions={<button type=\"button\">View usage</button>}",
      "/>",
    ],
  },
  "form-field": {
    restOn: "rendered control (name, placeholder, value, onChange, ...)",
    scenario: [
      "<FormField label=\"Project name\" name=\"project\" placeholder=\"Acme Inc\" />",
      "<FormField label=\"Locked field\" name=\"locked\" placeholder=\"Unavailable while synced\" disabled />",
      "<FormField variant=\"textarea\" label=\"Description\" name=\"description\" placeholder=\"What is this project for?\" />",
    ],
  },
};

const typeOf = (prop) => (prop.type === "enum" ? prop.values.map((v) => JSON.stringify(v)).join("|") : prop.type);
const defaultOf = (prop) => (prop.type === "boolean" ? String(prop.default) : JSON.stringify(prop.default));
const destructure = (manifest, { children = false, slots = false } = {}) => {
  const names = manifest.props.map((prop) => `${prop.name} = ${defaultOf(prop)}`);
  if (children) names.push("children");
  if (slots) names.push(...manifest.slots.map((slot) => slot.name));
  names.push("...rest");
  return `{ ${names.join(", ")} }`;
};

const COMPONENTS = {
  button: (manifest) => `export function ${pascal(manifest.name)}(${destructure(manifest, { children: true })}) {
  return (
    <button className="uifa-button" data-uifa-variant={variant} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}`,
  badge: (manifest) => `export function ${pascal(manifest.name)}(${destructure(manifest, { children: true })}) {
  return (
    <span className="uifa-badge" data-uifa-variant={variant} {...rest}>
      {children}
    </span>
  );
}`,
  chip: (manifest) => `export function ${pascal(manifest.name)}(${destructure(manifest, { children: true })}) {
  return (
    <span className="uifa-chip" data-uifa-variant={variant} {...rest}>
      {children}
    </span>
  );
}`,
  card: (manifest) => `export function ${pascal(manifest.name)}(${destructure(manifest, { slots: true })}) {
  return (
    <article className="uifa-card" {...rest}>
      <h3 data-uifa-slot="title">{title}</h3>
      <p data-uifa-slot="body">{body}</p>
      <div data-uifa-slot="actions">{actions}</div>
    </article>
  );
}`,
  "form-field": (manifest) => `export function ${pascal(manifest.name)}(${destructure(manifest, { slots: true })}) {
  return (
    <label className="uifa-field">
      <span data-uifa-slot="label">{label}</span>
      {variant === "textarea" ? (
        <textarea className="uifa-field-input" data-uifa-variant="textarea" rows={4} disabled={disabled} {...rest} />
      ) : (
        <input className="uifa-field-input" type="text" disabled={disabled} {...rest} />
      )}
    </label>
  );
}`,
};

function jsdoc(manifest, { children = false, slots = false, restOn }) {
  const lines = ["/**", ` * ${manifest.title}: ${manifest.description}`];
  if (children) lines.push(" *", " * Children fill the default slot.");
  lines.push(" *", " * @param {object} props");
  if (children) lines.push(" * @param {import(\"react\").ReactNode} [props.children] Default slot content.");
  for (const prop of manifest.props) {
    lines.push(` * @param {${typeOf(prop)}} [props.${prop.name}=${defaultOf(prop)}] ${prop.description}`);
  }
  if (slots) {
    for (const slot of manifest.slots) {
      lines.push(` * @param {import("react").ReactNode} [props.${slot.name}] ${slot.description}`);
    }
  }
  lines.push(" *", ` * Rest props spread onto the ${restOn}.`, " */");
  return lines.join("\n");
}

const { items, schema } = await loadKit();
const packageJson = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
const targets = items.filter((item) => item.manifest.adapters?.react);
mkdirSync(OUT, { recursive: true });

let written = 0;
for (const { name, manifest } of targets) {
  const shape = SHAPES[name];
  const build = COMPONENTS[name];
  if (!shape || !build) {
    console.error(`generate-adapters: "${name}" declares adapters.react but has no adapter shape; add one to SHAPES/COMPONENTS`);
    process.exit(1);
  }
  const options = shape.leaf
    ? { children: true, restOn: "root element" }
    : { slots: true, restOn: shape.restOn };
  const component = [
    `// GENERATED by scripts/generate-adapters.mjs - uiforagents ${packageJson.version} - do not edit.`,
    `// Vanilla twin: items/${name}/${name}.html. Tokens and the item stylesheet apply`,
    "// unchanged; React is the consumer's dependency.",
    "",
    jsdoc(manifest, options),
    build(manifest),
    "",
  ].join("\n");
  writeFileSync(join(OUT, `${name}.jsx`), component);

  const test = [
    `// GENERATED by scripts/generate-adapters.mjs - uiforagents ${packageJson.version} - do not edit.`,
    "// Fixture paths resolve from the kit root (npm run test-adapters cwd).",
    `import { readFileSync } from "node:fs";`,
    `import { resolve } from "node:path";`,
    `import { describe, it } from "vitest";`,
    `import { render } from "@testing-library/react";`,
    `import { assertFixture } from "../../scripts/lib/fixture.mjs";`,
    `import { ${pascal(name)} } from "./${name}.jsx";`,
    "",
    `describe("${pascal(name)} adapter", () => {`,
    `  it("renders the accessible DOM items/${name} promises", () => {`,
    "    render(",
    "      <>",
    ...shape.scenario.map((line) => `        ${line}`),
    "      </>",
    "    );",
    `    assertFixture(readFileSync(resolve("items/${name}/fixture.aria.yml"), "utf8"));`,
    "  });",
    "});",
    "",
  ].join("\n");
  writeFileSync(join(OUT, `${name}.test.jsx`), test);
  written++;
}

console.log(`generate-adapters: schema ${schema.version}; ${written} adapter(s) written to adapters/react`);
