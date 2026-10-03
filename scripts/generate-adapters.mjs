// Emits framework adapters from validated manifests. Items that declare
// adapters.react get adapters/react/<name>.jsx plus a fixture test
// (<name>.test.jsx) that renders the component against its fixture.aria.yml.
// Items that declare adapters.svelte / adapters.vue get the same DOM as
// minimal templates (adapters/svelte/<name>.svelte, adapters/vue/<name>.vue),
// compile-checked per template by adapters/<fw>/compile.test.mjs.
// Component DOM mirrors items/<name>/<name>.html verbatim - same element,
// uifa-<name> class, closed data-uifa-variant / data-uifa-slot attributes -
// so item CSS and validation/check.mjs apply unchanged. Output is
// deterministic and committed; CI's freshness check covers it.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadKit } from "./lib/items.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

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

// Svelte 5 templates: props via $props(), slots as snippet props, rest props
// spread on the root element (the rendered control for form-field).
const SVELTE = {
  button: () => `<button class="uifa-button" data-uifa-variant={variant} disabled={disabled} {...rest}>
  {@render children?.()}
</button>`,
  badge: () => `<span class="uifa-badge" data-uifa-variant={variant} {...rest}>
  {@render children?.()}
</span>`,
  chip: () => `<span class="uifa-chip" data-uifa-variant={variant} {...rest}>
  {@render children?.()}
</span>`,
  card: () => `<article class="uifa-card" {...rest}>
  <h3 data-uifa-slot="title">{@render title?.()}</h3>
  <p data-uifa-slot="body">{@render body?.()}</p>
  <div data-uifa-slot="actions">{@render actions?.()}</div>
</article>`,
  "form-field": () => `<label class="uifa-field">
  <span data-uifa-slot="label">{@render label?.()}</span>
  {#if variant === "textarea"}
    <textarea class="uifa-field-input" data-uifa-variant="textarea" rows={4} disabled={disabled} {...rest}></textarea>
  {:else}
    <input class="uifa-field-input" type="text" disabled={disabled} {...rest} />
  {/if}
</label>`,
};

// Vue 3 SFCs: props via defineProps, slots as named slots; rest props ride
// Vue's attribute fallthrough (bound onto the rendered control for
// form-field, which opts out of fallthrough to keep the label root clean).
const VUE = {
  button: () => `<button class="uifa-button" :data-uifa-variant="variant" :disabled="disabled">
    <slot />
  </button>`,
  badge: () => `<span class="uifa-badge" :data-uifa-variant="variant">
    <slot />
  </span>`,
  chip: () => `<span class="uifa-chip" :data-uifa-variant="variant">
    <slot />
  </span>`,
  card: () => `<article class="uifa-card">
    <h3 data-uifa-slot="title"><slot name="title" /></h3>
    <p data-uifa-slot="body"><slot name="body" /></p>
    <div data-uifa-slot="actions"><slot name="actions" /></div>
  </article>`,
  "form-field": () => `<label class="uifa-field">
    <span data-uifa-slot="label"><slot name="label" /></span>
    <textarea v-if="variant === 'textarea'" class="uifa-field-input" data-uifa-variant="textarea" :rows="4" :disabled="disabled" v-bind="attrs"></textarea>
    <input v-else class="uifa-field-input" type="text" :disabled="disabled" v-bind="attrs" />
  </label>`,
};

const svelteProps = (manifest, { children = false, slots = false } = {}) => {
  const names = manifest.props.map((prop) => `${prop.name} = ${JSON.stringify(prop.default)}`);
  if (children) names.push("children");
  if (slots) names.push(...manifest.slots.map((slot) => slot.name));
  names.push("...rest");
  return names.join(", ");
};

const vueProps = (manifest) => manifest.props
  .map((prop) => `  ${prop.name}: { type: ${prop.type === "boolean" ? "Boolean" : "String"}, default: ${JSON.stringify(prop.default)} },`)
  .join("\n");

const htmlHeader = (name, framework) => [
  `<!-- GENERATED by scripts/generate-adapters.mjs - uiforagents ${packageJson.version} - do not edit. -->`,
  `<!-- Vanilla twin: items/${name}/${name}.html. Tokens and the item stylesheet apply`,
  `     unchanged; ${framework} is the consumer's dependency. -->`,
];

const emitSvelte = (name, manifest, shape, out) => {
  const options = shape.leaf ? { children: true } : { slots: true };
  const file = [
    ...htmlHeader(name, "Svelte"),
    "",
    "<script>",
    `  let { ${svelteProps(manifest, options)} } = $props();`,
    "</script>",
    "",
    SVELTE[name](manifest),
    "",
  ].join("\n");
  writeFileSync(join(out, `${name}.svelte`), file);
};

const emitVue = (name, manifest, shape, out) => {
  const bespoke = name === "form-field";
  const script = [
    "<script setup>",
    ...(bespoke ? ["import { useAttrs } from \"vue\";", "", "defineOptions({ inheritAttrs: false });", ""] : []),
    ...(manifest.props.length ? ["defineProps({", vueProps(manifest), "});", ""] : []),
    ...(bespoke ? ["const attrs = useAttrs();"] : []),
    "</script>",
  ];
  const file = [
    ...htmlHeader(name, "Vue"),
    ...(manifest.props.length || bespoke ? ["", ...script] : []),
    "",
    "<template>",
    `  ${VUE[name](manifest)}`,
    "</template>",
    "",
  ].join("\n");
  writeFileSync(join(out, `${name}.vue`), file);
};

const reactTest = (name, shape) => [
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

const FRAMEWORKS = {
  react: {
    emit: (name, manifest, shape, out) => {
      const options = shape.leaf
        ? { children: true, restOn: "root element" }
        : { slots: true, restOn: shape.restOn };
      const component = [
        `// GENERATED by scripts/generate-adapters.mjs - uiforagents ${packageJson.version} - do not edit.`,
        `// Vanilla twin: items/${name}/${name}.html. Tokens and the item stylesheet apply`,
        "// unchanged; React is the consumer's dependency.",
        "",
        jsdoc(manifest, options),
        COMPONENTS[name](manifest),
        "",
      ].join("\n");
      writeFileSync(join(out, `${name}.jsx`), component);
      writeFileSync(join(out, `${name}.test.jsx`), reactTest(name, shape));
    },
  },
  svelte: {
    emit: emitSvelte,
  },
  vue: {
    emit: emitVue,
  },
};

const { items, schema } = await loadKit();
const packageJson = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));

const summary = [];
for (const [framework, { emit }] of Object.entries(FRAMEWORKS)) {
  const targets = items.filter((item) => item.manifest.adapters?.[framework]);
  const out = join(ROOT, "adapters", framework);
  mkdirSync(out, { recursive: true });
  let written = 0;
  for (const { name, manifest } of targets) {
    const shape = SHAPES[name];
    if (!shape || !emit) {
      console.error(`generate-adapters: "${name}" declares adapters.${framework} but has no adapter shape; add one to SHAPES`);
      process.exit(1);
    }
    emit(name, manifest, shape, out);
    written++;
  }
  summary.push(`${written} ${framework} adapter(s) -> adapters/${framework}`);
}

console.log(`generate-adapters: schema ${schema.version}; ${summary.join(", ")}`);
