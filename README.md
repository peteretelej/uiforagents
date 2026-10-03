# uiforagents

[![npm](https://img.shields.io/npm/v/uiforagents?color=232323&label=uiforagents)](https://www.npmjs.com/package/uiforagents)

**An open-source, agent-first frontend UI kit and design system for AI agents.**

uiforagents is a library of vanilla HTML/CSS/JS components that AI coding agents can pick, copy into your project, and wire up. No framework, no build step, no runtime dependencies - the components are just files, so they work in any stack.

Demo: Live site using the UI kit [uiforagents.com](https://uiforagents.com) - components demos and selectable theme. `llms.txt` at [https://uiforagents.com/llms.txt](https://uiforagents.com/llms.txt).


It is built for the workflow where your agent does the building and you review and own the output. Every component ships with machine-readable manifests, agent-readable docs, and a rendered catalog, so an agent can go from "I need a modal" to working, on-system markup without guessing. And because the result is small readable HTML/CSS/JS in your own repo - not a dependency you have to look inside - reviewing what your agent built stays easy.

## Why agents work well with it

- **Pickable index**: [https://uiforagents.com/llms.txt](https://uiforagents.com/llms.txt) lists every component and its variants; an agent can choose from the index lines alone.
- **Copy-in distribution**: components live under `items/<name>/`; the agent copies markup + CSS into your project. You own the code.
- **Built-in verification**: every item ships an executable example and an ARIA fixture; the agent renders the example and diffs it against the fixture with Playwright's ariaSnapshot.
- **Adherence linting**: [`validation/check.mjs`](validation/check.mjs) catches drift in generated UI - raw hex colors, off-table variants, undeclared tokens.
- **Theming by tokens**: swap a theme (a complete `--uifa-*` token set) and the whole kit restyles. Colors are semantic roles (bg/fg pairs plus status triplets), and the contrast pairs are validated in the build.

## Components

19 items, each a folder with markup, CSS, an executable example, and an ARIA fixture:

| | | | |
| --- | --- | --- | --- |
| Button | Segmented control | Toggle switch | Form field |
| Filter bar | Badge | Chip | Card |
| Link row | Toast | Dead states | Audio player bar |
| Top nav | Tabs | Modal | Data table |
| Code block | Sidebar | Footer | |

## Framework adapters

The five core primitives (button, badge, chip, card, form-field) ship generated
React adapters in [`adapters/react/`](adapters/react/) that render the same
classes, variants, and slots as the vanilla markup; tokens and item CSS apply
unchanged. Copy the files in or import them from the repo path in Vite. The
consumption contract lives in [`SKILL.md`](SKILL.md) ("Framework adapters").


## Quick start

In your project:

```sh
npm install uiforagents
npx uiforagents init
```

`init` writes a `uiforagents.json` config (all components, the default "paper" theme), copies every component into `src/ui/`, writes `src/styles/themes.css`, and scaffolds `docs/design-system.md`. Validate with:

```sh
npx uiforagents check
```

Give your agent the [`SKILL.md`](SKILL.md) - it is the full adapter - or just point it at this repo. The loop:

1. Read [`llms.txt`](llms.txt) and pick a component and variant from its lines.
2. Edit `uiforagents.json` to choose the subset and theme, then `npx uiforagents add && npx uiforagents tokens && npx uiforagents scaffold`.
3. Validate: open an item's `*.example.html` and diff the rendered tree against `fixture.aria.yml` with Playwright's ariaSnapshot, and run `npx uiforagents check`.

## Use it across a project

For ongoing work, a project consumes the kit through a `uiforagents.json` config and one CLI. After `npm install uiforagents`, `npx uiforagents init` writes a starter config with the kit resolved from `node_modules/uiforagents`; a checkout of this repo works too (`"kit": "../uiforagents"`):

```sh
npx uiforagents tokens    # write the project's themes.css from the chosen theme(s)
npx uiforagents add       # copy the configured item subset into the project
npx uiforagents scaffold  # write docs/design-system.md from the committed themes.css + config
npx uiforagents check     # adherence linter over the configured lint globs
```

Config (resolved against the config file's directory; destinations that
escape it are refused):

```json
{
  "kit": "../uiforagents",
  "theme": "paper",
  "themesFile": "themes/index.mjs",
  "items": ["badge", "button", "card"],
  "dest": {
    "itemsDir": "src/ui",
    "tokensCss": "src/styles/themes.css",
    "docs": "docs/design-system.md"
  },
  "lint": ["src/ui/**/*.html", "src/ui/**/*.css"]
}
```

- `theme` (required): a theme slug from the themes module, or `"all"` to
  ship every theme: `tokens` then writes the first theme's tokens to
  `:root` plus a `[data-theme="slug"]` block per theme (same shape as the
  kit's `themes/tokens.css`), and `scaffold` lists all themes in the
  design-system doc.

- `themesFile` (optional): a themes module, same shape as
  `themes/index.mjs`; without it the kit's example themes are used.
  It is read-only input, so it may live outside the project: relative paths
  resolve against the config file's directory and absolute paths are kept.
  Unlike `dest.*` it is not confined to the project root.
- `add` copies each item's markup, CSS, script, example, and ARIA fixture
  into `dest.itemsDir/<name>/`, rewriting the examples' token stylesheet
  link to the project's themes file.
- `check` reports three violation classes - raw hex colors, invalid or
  missing `data-uifa-variant` (closed tables from the registry; elements map
  to items by their `.uifa-<name>` class), and tokens used via `var()` but
  declared by neither the copied items' `cssVars` nor the project's themes
  file. It reports; it never auto-corrects.
- `node <kit>/validation/check.mjs --self-test` runs the linter over its
  planted-violation fixtures and exits nonzero on any miss.

## Theming: themes and tokens

A theme is a complete visual identity as one `--uifa-*` token set (see
`themes/index.mjs`): color roles (`--uifa-bg`, `--uifa-surface` with a raised
`--uifa-surface-2` tier, `--uifa-border` with a stronger `--uifa-border-strong`
step, `--uifa-text`/`--uifa-text-muted`/`--uifa-faint`, the
`--uifa-accent`/`--uifa-accent-soft`/`--uifa-accent-fg` slot, the
`--uifa-ok`/`--uifa-warn`/`--uifa-danger` status triplets, and `--uifa-scrim`),
shape (`--uifa-radius-control`/`--uifa-radius-surface`/`--uifa-radius-pill`
plus `--uifa-border-width`), shadow character (`--uifa-shadow-char`), type
(`--uifa-font-display`, `--uifa-font-body`, `--uifa-font-mono`,
`--uifa-text-base`), density (`--uifa-space`), motion (`--uifa-duration`,
`--uifa-ease`), optional texture (`--uifa-noise`, `--uifa-corner-shape`), and
`color-scheme`. Contrast pairs are validated in the build.

The launch library ships 12 themes: `paper`, `graphite`, `citrus`,
`brutalist`, `terminal`, `glass`, `swiss`, `sketch`, `clay`, `synth`,
`retro98`, and `luxe`. Theme slugs and variant names are stable API; the
tables are closed-additive - new themes and variants may be added, existing
names are never renamed or deleted. Each theme can carry a dialect layer
(a few `[data-theme]`-scoped overrides) that rides inside the generated
themes file.

Components read tokens only - no component-local colors. Sizes derive from
`--uifa-space` and `--uifa-text-base` via `calc()`; touch targets stay at
44px minimum. Restyling the kit is swapping the token set.

### Switching themes at runtime

Generate every theme (`"theme": "all"`), ship the generated themes file,
and let users flip between them. A theme switcher is site chrome, not a
component - a ~10-line script reading a persisted choice and applying it
before first paint:

```html
<select data-theme-switcher>
  <option value="paper">Paper</option>
  <option value="graphite">Graphite</option>
  <option value="citrus">Citrus</option>
</select>
<script>
  // Persisted theme, applied before first paint (no flash).
  document.documentElement.dataset.theme = localStorage.getItem("theme") || "paper";
  const switcher = document.querySelector("[data-theme-switcher]");
  switcher.value = document.documentElement.dataset.theme;
  switcher.addEventListener("change", () => {
    document.documentElement.dataset.theme = switcher.value;
    localStorage.setItem("theme", switcher.value);
  });
</script>
```

`document.documentElement.dataset.theme` sets `data-theme` on `<html>`;
tokens.css maps each `[data-theme="slug"]` block to its token set.

## How it works

`registry.json` + `items/*/item.json` (one source) generate three surfaces:

- `llms.txt` - compact agent index
- `docs/components/*.md` - per-component docs twins
- `docs/arena.html` - rendered catalog across the 12 example themes

Each `item.json` declares the manifest contract: `name`, `title`,
`description`, `category` (closed enum from the schema; drives the `llms.txt`
grouping), `behavior` (`{ kind }` of `none` | `css-only` | `js-inline`, plus
`contract` strings and `packages` framework renderers consume), `props` and
`slots` (the codegen surface), `variants` (closed `data-uifa-variant` tables
with a default), `cssVars` (the tokens the item reads), `files`, `docs`, and
`schemaVersion`. The build validates every manifest against
[`schema/registry.schema.json`](schema/registry.schema.json) and keeps
`registry.json` in lockstep. Generated files carry a `GENERATED` header
comment with the kit version, so drifted copies are easy to spot.

Regenerate after changing items or manifests:

```sh
node scripts/build-index.mjs        # validates items; writes llms.txt + docs/components/
node scripts/build-arena.mjs        # writes themes/tokens.css + docs/arena.html
node scripts/generate-adapters.mjs  # writes adapters/react/ for items declaring adapters.react
```

Generated files are committed. The build fails loudly on schema violations,
undeclared tokens, or index drift. [`AGENTS.md`](AGENTS.md) maps the repo for
agents working on the kit itself; [`changelog.json`](changelog.json) is the
machine-readable changelog.

## License

[Apache-2.0](LICENSE)
