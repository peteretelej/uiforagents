# AGENTS.md

Structure index for agents working on this repo. The kit is generic by
construction: no machine-local paths, no private tooling, no lab-only
references.

## Layout

| Path | Role |
| --- | --- |
| `registry.json` | Root index; item summaries cross-checked against manifests by the build |
| `schema/registry.schema.json` | Manifest schema (draft-07 subset) every `item.json` must satisfy |
| `items/<name>/` | One folder per component: `item.json` manifest, markup, CSS, optional script, executable example, ARIA fixture |
| `themes/directions.mjs` | Example direction token sets (exactly 3: one light, one dark, one expressive accent) |
| `themes/tokens.css` | GENERATED from directions.mjs by build-arena |
| `scripts/build-index.mjs` | Validates items; generates `llms.txt` + `docs/components/*.md` |
| `scripts/build-arena.mjs` | Generates `themes/tokens.css` + `docs/arena.html` |
| `llms.txt`, `docs/` | GENERATED agent surfaces |
| `changelog.json` | Machine-readable `[{version, date, items[]}]`; latest entry matches package.json version |

## Commands

```sh
node scripts/build-index.mjs
node scripts/build-arena.mjs
```

## Rules

- `llms.txt`, `docs/`, and `themes/tokens.css` are generated: run the builders
  after changing items, schema, or directions, and commit the regenerated
  output.
- Item CSS reads semantic tokens only; no literal colors, no component-local
  values. Sizes derive from `--space` / `--text-base` via `calc()`; interactive
  controls keep 44px minimum touch targets.
- Variant APIs are closed `[data-variant]` tables declared in the manifest;
  part hooks are `[data-slot]` attributes.
- No dependencies: Node stdlib for scripts, zero runtime deps for items.
