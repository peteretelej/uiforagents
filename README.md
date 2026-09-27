# uiforagents

**An open-source, agent-first frontend UI kit and design system for AI agents.**

uiforagents is a library of vanilla HTML/CSS/JS components that AI coding agents can pick, copy into your project, and wire up. No framework, no build step, no runtime dependencies - the components are just files, so they work in any stack.

It is built for the workflow where your agent does the building and you review and own the output. Every component ships with machine-readable manifests, agent-readable docs, and a rendered catalog, so an agent can go from "I need a modal" to working, on-system markup without guessing. And because the result is small readable HTML/CSS/JS in your own repo - not a dependency you have to look inside - reviewing what your agent built stays easy.

## Why agents work well with it

- **Pickable index**: [`llms.txt`](llms.txt) lists every component and its variants; an agent can choose from the index lines alone.
- **Copy-in distribution**: components live under `items/<name>/`; the agent copies markup + CSS into your project. You own the code.
- **Built-in verification**: every item ships an executable example and an ARIA fixture; the agent renders the example and diffs it against the fixture with Playwright's ariaSnapshot.
- **Adherence linting**: [`validation/check.mjs`](validation/check.mjs) catches drift in generated UI - raw hex colors, off-table variants, undeclared tokens.
- **Theming by tokens**: swap a design "direction" (a token set) and the whole kit restyles. Colors are semantic roles (bg/fg pairs plus status triplets), contrast-checked by construction.

## Components

16 items, each a folder with markup, CSS, an executable example, and an ARIA fixture:

| | | | |
| --- | --- | --- | --- |
| Button | Segmented control | Toggle switch | Form field |
| Filter bar | Badge | Chip | Card |
| Link row | Toast | Dead states | Audio player |
| Top nav | Tabs | Modal | Data table |

Browse the [rendered catalog](docs/arena.html) (self-contained page - open it locally), or read [`llms.txt`](llms.txt) the way an agent would.

## Quick start

Give your agent the [`SKILL.md`](SKILL.md) - it is the full adapter - or just point it at this repo. The loop:

1. Read [`llms.txt`](llms.txt) and pick a component and variant from its lines.
2. Copy the item's files from `items/<name>/`: markup + CSS, plus a script when its `behavior` is `js-inline`.
3. Wire tokens: copy `themes/tokens.css`, or write your own stylesheet declaring the same semantic roles.
4. Validate: open the item's `*.example.html` and diff the rendered tree against `fixture.aria.yml` with Playwright's ariaSnapshot.

## Use it across a project

For ongoing work, a project consumes the kit through a `uiforagents.json` config and one CLI. Point `kit` at a checkout of this repo (or `node_modules/uiforagents` after `npm install uiforagents`):

```sh
node <kit>/scripts/uifa.mjs tokens    # write the project's tokens.css from the chosen direction
node <kit>/scripts/uifa.mjs add       # copy the configured item subset into the project
node <kit>/scripts/uifa.mjs scaffold  # write docs/design-system.md from the committed tokens + config
node <kit>/validation/check.mjs       # adherence linter over the configured lint globs
```

Config (resolved against the config file's directory; destinations that
escape it are refused):

```json
{
  "kit": "../uiforagents",
  "direction": "paper",
  "directionsFile": "themes/directions.mjs",
  "items": ["badge", "button", "card"],
  "dest": {
    "itemsDir": "src/ui",
    "tokensCss": "src/styles/tokens.css",
    "docs": "docs/design-system.md"
  },
  "lint": ["src/ui/**/*.html", "src/ui/**/*.css"]
}
```

- `directionsFile` (optional): a directions module, same shape as
  `themes/directions.mjs`; without it the kit's example directions are used.
  It is read-only input, so it may live outside the project: relative paths
  resolve against the config file's directory and absolute paths are kept.
  Unlike `dest.*` it is not confined to the project root.
- `add` copies each item's markup, CSS, script, example, and ARIA fixture
  into `dest.itemsDir/<name>/`, rewriting the examples' token stylesheet
  link to the project's `tokens.css`.
- `check` reports three violation classes - raw hex colors, invalid or
  missing `data-variant` (closed tables from the registry; elements map to
  items by their `uif-<name>` class), and tokens used via `var()` but
  declared by neither the copied items' `cssVars` nor the project's
  `tokens.css`. It reports; it never auto-corrects.
- `node <kit>/validation/check.mjs --self-test` runs the linter over its
  planted-violation fixtures and exits nonzero on any miss.

## Theming: directions and tokens

A direction is a complete visual identity as a token set (see
`themes/directions.mjs`): semantic bg/fg pairs (`--bg`/`--text`,
`--surface`/`--text`, `--accent`/`--accent-fg` + `--accent-soft`, and the
`--ok`/`--warn`/`--danger` status triplets), `--border`, `--scrim`, tone
(`--radius`, `--shadow-char`), type (`--font-display`, `--font-body`,
`--text-base`), density (`--space`), and `color-scheme`.

Components read tokens only - no component-local colors. Sizes derive from
`--space` and `--text-base` via `calc()`; touch targets stay at 44px
minimum. Restyling the kit is swapping the token set.

## How it works

`registry.json` + `items/*/item.json` (one source) generate three surfaces:

- `llms.txt` - compact agent index
- `docs/components/*.md` - per-component docs twins
- `docs/arena.html` - rendered catalog across example directions

Each `item.json` declares the manifest contract: `name`, `title`,
`description`, `category` (closed enum from the schema; drives the `llms.txt`
grouping), `behavior` (`none` | `css-only` | `js-inline`), `variants` (closed
`[data-variant]` tables with a default), `cssVars` (the tokens the item
reads), `files`, `docs`, and `schemaVersion`. The build validates every
manifest against [`schema/registry.schema.json`](schema/registry.schema.json)
and keeps `registry.json` in lockstep.

Regenerate after changing items or manifests:

```sh
node scripts/build-index.mjs   # validates items; writes llms.txt + docs/components/
node scripts/build-arena.mjs   # writes themes/tokens.css + docs/arena.html
```

Generated files are committed. The build fails loudly on schema violations,
undeclared tokens, or index drift. [`AGENTS.md`](AGENTS.md) maps the repo for
agents working on the kit itself; [`changelog.json`](changelog.json) is the
machine-readable changelog.

## License

[Apache-2.0](LICENSE)
