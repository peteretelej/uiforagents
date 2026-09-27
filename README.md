# uiforagents

An open-source, registry-shaped, agent-first vanilla UI kit. The primary
consumer is the AI agent building the UI; humans review and own the output.

Every component is a manifest item that generates the agent index, docs, and
(later) a CLI - one source, three surfaces. Distribution is copy-in: plain
HTML/CSS files with closed `[data-variant]` tables and semantic token pairs.
Zero runtime dependencies.

## How it works

`registry.json` + `items/*/item.json` (one source) generate three surfaces:

- `llms.txt` - compact agent index, pickable from the index lines alone
- `docs/components/*.md` - per-component docs twins
- `docs/arena.html` - rendered catalog across example directions

## For agents

1. Read `llms.txt` and pick a component and variant from its lines.
2. Copy the item's files (`items/<name>/`): markup + CSS, plus a script when
   `behavior` is `js-inline`.
3. Wire tokens: copy `themes/tokens.css`, or write your own stylesheet
   declaring the same semantic roles.
4. Validate: open the item's `*.example.html` and diff the rendered tree
   against `fixture.aria.yml` with Playwright's ariaSnapshot.

`SKILL.md` is the full adapter; `AGENTS.md` maps the repo for agents working
on the kit itself.

## Token contract

Directions declare the base scale as CSS custom properties (see
`themes/directions.mjs`): semantic bg/fg pairs (`--bg`/`--text`,
`--surface`/`--text`, `--accent`/`--accent-fg` + `--accent-soft`, and the
`--ok`/`--warn`/`--danger` status triplets), `--border`, `--scrim`, tone
(`--radius`, `--shadow-char`), type (`--font-display`, `--font-body`,
`--text-base`), density (`--space`), and `color-scheme`. Components read
tokens only; sizes derive from `--space` and `--text-base` via `calc()`;
touch targets stay at 44px minimum. Restyling the kit = swapping the token
set.

## Regenerating

```sh
node scripts/build-index.mjs   # validates items; writes llms.txt + docs/components/
node scripts/build-arena.mjs   # writes themes/tokens.css + docs/arena.html
```

Generated files are committed. The build fails loudly on schema violations,
undeclared tokens, or index drift.

## Per-project flow

Projects consume the kit through a `uiforagents.json` config and one CLI:

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

- `directionsFile` (optional): a directions module the project owns, same
  shape as `themes/directions.mjs`; without it the kit's example directions
  are used.
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

## License

Apache-2.0
