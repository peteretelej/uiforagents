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
| `scripts/codemod-uifa.mjs` | One-off uifa- codemod, committed evidence |
| `scripts/lib/` | Shared loaders: item/schema loading (`items.mjs`), consumer-config loading (`config.mjs`), theme-CSS serialization (`themes-css.mjs`), color math (`color.mjs`) |
| `scripts/uiforagents.mjs` | Per-project flow CLI over a consumer's `uiforagents.json`: `add \| tokens \| scaffold` |
| `validation/check.mjs` | Adherence linter: raw hex, invalid/missing `data-uifa-variant`, undeclared tokens; `--self-test` |
| `validation/fixtures/planted/` | Planted-violation inputs for the linter's self-test |
| `llms.txt`, `docs/` | GENERATED agent surfaces |
| `changelog.json` | Machine-readable `[{version, date, items[], summary}]`; latest entry matches package.json version |

## Commands

```sh
node scripts/build-index.mjs
node scripts/build-arena.mjs
npx uiforagents init | add | tokens | scaffold | check   # against a consumer config
node validation/check.mjs --self-test
```

## Rules

- `llms.txt`, `docs/`, and `themes/tokens.css` are generated: run the builders
  after changing items, schema, or themes, and commit the regenerated
  output.
- Item CSS reads semantic tokens only; no literal colors, no component-local
  values. The sanctioned exception is theme dialect CSS in the themes cascade
  layer, scoped to `[data-theme]` and targeting only kit hooks and classes,
  which may use literal values. Sizes derive from `--uifa-space` /
  `--uifa-text-base` via `calc()`; interactive controls keep 44px minimum
  touch targets.
- Variant APIs are closed `[data-uifa-variant]` tables declared in the
  manifest; part hooks are `[data-uifa-slot]` attributes.
- Theme slugs and variant names are stable API from the first release: the
  tables are closed-additive - new themes and variants may be added, existing
  slugs and variant names are never renamed or removed.
- No dependencies: Node stdlib for scripts, zero runtime deps for items.
- A version bump is a release event: `package.json`, `changelog.json`, and a
  git tag move together, ideally alongside an npm publish. Ordinary commits
  never bump the version.
