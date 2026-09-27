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

## License

Apache-2.0
