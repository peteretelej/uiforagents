# AGENTS.md

Structure index for agents working on this repo. The kit is generic by
construction: no machine-local paths, no private tooling, no lab-only
references.

## Layout

| Path | Role |
| --- | --- |
| `registry.json` | Root index; item summaries cross-checked against manifests by the build |
| `schema/registry.schema.json` | Manifest schema (draft-07 subset, versioned in-file) every `item.json` must satisfy |
| `items/<name>/` | One folder per component: `item.json` manifest, markup, CSS, optional script, executable example, ARIA fixture |
| `themes/index.mjs` | Example theme token sets, 12 today (loader requires at least one); optional per-theme dialect CSS in `themes/dialects/` |
| `themes/tokens.css` | GENERATED from index.mjs by build-arena; includes per-theme dialect layers |
| `scripts/build-index.mjs` | Validates items; generates `llms.txt` + `docs/components/*.md` |
| `scripts/build-arena.mjs` | Generates `themes/tokens.css` + `docs/arena.html`; enforces theme contrast pairs |
| `scripts/generate-adapters.mjs` | Emits framework adapters from manifests declaring adapter support: `adapters/react/*.jsx` (+ fixture tests), `adapters/svelte/*.svelte`, `adapters/vue/*.vue` |
| `adapters/` | GENERATED framework adapters - React components + fixture tests, Svelte/Vue templates + compile tests; committed |
| `scripts/codemod-uifa.mjs` | One-off uifa- codemod, committed evidence |
| `scripts/lib/` | Shared loaders: item/schema loading (`items.mjs`), consumer-config loading (`config.mjs`), theme-CSS serialization (`themes-css.mjs`), color math (`color.mjs`), fixture parser (`fixture.mjs`) |
| `scripts/uiforagents.mjs` | Per-project flow CLI over a consumer's `uiforagents.json`: `add \| tokens \| scaffold` |
| `scripts/self-test-flow.mjs` | Flow self-test: serializer `--uifa-*` prefix mapping, idempotence, inert-token catch |
| `validation/check.mjs` | Adherence linter: raw hex, invalid/missing `data-uifa-variant`, undeclared tokens; `--self-test` |
| `validation/fixtures/planted/` | Planted-violation inputs for the linter's self-test |
| `llms.txt`, `docs/` | GENERATED agent surfaces |
| `changelog.json` | Machine-readable `[{version, date, items[], summary}]`; latest entry matches package.json version |

## Commands

```sh
node scripts/build-index.mjs
node scripts/build-arena.mjs
node scripts/generate-adapters.mjs
npm run test-adapters
npx uiforagents init | add | tokens | scaffold | check   # against a consumer config
node validation/check.mjs --self-test
```

## Rules

- `llms.txt`, `docs/`, `themes/tokens.css`, and `adapters/react/` are
  generated: run the builders (and `generate-adapters.mjs` after manifest or
  shape changes) after changing items, schema, or themes, and commit the
  regenerated output. `npm run test-adapters` (vitest, jsdom) renders each
  generated component against its `fixture.aria.yml`.
- Item CSS reads semantic tokens only; no literal colors, no component-local
  values. The sanctioned exception is theme dialect CSS in the themes cascade
  layer, scoped to `[data-theme]` and targeting only kit hooks and classes,
  which may use literal values. Sizes derive from `--uifa-space` /
  `--uifa-text-base` via `calc()`; interactive controls keep 44px minimum
  touch targets.
- Manifest schema is 2.0.0: `behavior` is an object (`kind`/`contract`/
  `packages`), and `props` + `slots` are required on every item. Items with a
  variant table surface exactly one enum prop named `variant` mirroring the
  closed table; `adapters.react` opts an item into React codegen.
- Variant APIs are closed `[data-uifa-variant]` tables declared in the
  manifest; part hooks are `[data-uifa-slot]` attributes.
- Theme slugs and variant names are stable API from the first release: the
  tables are closed-additive - new themes and variants may be added, existing
  slugs and variant names are never renamed or removed.
- Behavior core: `behavior.kind` is `none`, `css-only`, `js-inline`, or
  `zag`. Accessible interactive state runs on `@zag-js/*` machines behind
  thin vanilla bindings (`<name>.js`), never hand-rolled FSMs; the binding
  renders machine state into the item's existing markup contract (roles,
  `[data-uifa-slot]` hooks, `data-*` state attributes) declared in
  `behavior.contract`. Zag example pages and the arena load the pinned
  packages through an esm.sh import map; the copy-in contract for consumers
  remains npm packages.
- Dependencies: css-only and `js-inline` items stay zero-runtime-dep;
  `zag` behavior items depend on `@zag-js/*` machine packages only (MIT),
  pinned to exact versions in the manifest's `behavior.packages`. No other
  runtime dependency is allowed; scripts stay on the Node stdlib.
- A version bump is a release event: `package.json`, `changelog.json`, and a
  git tag move together. Pushing the `vX.Y.Z` tag is the release; the
  `release.yml` workflow publishes to npm from it via trusted publishing.
  Ordinary commits never bump the version.
