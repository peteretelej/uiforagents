# Skill: uiforagents

Copy-in vanilla UI components whose primary consumer is the agent building
the UI. Use when a build should use kit components: pages, app screens,
artifacts, prototypes.

## Workflow

1. **Pick from the index.** Read `llms.txt`. Each line carries the component
   name, description, closed variant table (default marked `*`), and behavior -
   enough to choose a component and variant without opening other files.
2. **Wire tokens.** Copy `themes/tokens.css` for the 12 example themes, or
   declare your own theme with the same role names: `--uifa-bg`,
   `--uifa-surface`, `--uifa-surface-2`, `--uifa-border`,
   `--uifa-border-strong`, `--uifa-text`, `--uifa-text-muted`, `--uifa-faint`,
   `--uifa-accent`/`--uifa-accent-soft`/`--uifa-accent-fg`,
   `--uifa-ok`/`--uifa-ok-soft`/`--uifa-ok-fg`,
   `--uifa-warn`/`--uifa-warn-soft`/`--uifa-warn-fg`,
   `--uifa-danger`/`--uifa-danger-soft`/`--uifa-danger-fg`, `--uifa-scrim`,
   `--uifa-radius-control`/`--uifa-radius-surface`/`--uifa-radius-pill`,
   `--uifa-border-width`, `--uifa-shadow-char`, `--uifa-font-display`,
   `--uifa-font-body`, `--uifa-font-mono`, `--uifa-text-base`, `--uifa-space`,
   `--uifa-duration`, `--uifa-ease`, optional `--uifa-corner-shape` and
   `--uifa-noise`, and `color-scheme`. Theme scopes are
   `[data-theme="slug"]`; the fg/bg pairs are contrast-validated by the
   build before the generated surfaces are written.
3. **Copy items in.** From `items/<name>/`, copy the markup pattern
   (`<name>.html`) and styles (`<name>.css`); when `behavior` is `js-inline`,
   copy `<name>.js` too. Components are self-contained: the only shared file
   is the token sheet.
4. **Use the closed variant API.** Variants are `data-uifa-variant` attributes
   from the manifest table; parts are `[data-uifa-slot]` hooks; elements carry
   a `.uifa-<name>` class. Do not invent variants. Theme slugs and variant
   names are stable API from the first release: the tables are
   closed-additive, so new themes and variants may be added but existing
   slugs and variant names are never renamed or deleted.
5. **Validate.** Open the item's `<name>.example.html` and diff the rendered
   tree against `fixture.aria.yml` (Playwright ariaSnapshot YAML):

   ```js
   const snap = await page.locator("body").ariaSnapshot();
   // compare with items/<name>/fixture.aria.yml
   ```

6. **Stay on-system.** No component-local colors: every visual value comes
   from a token. Hand-rolled extras must be justified in build notes.

## Per-project flow

Install the kit in the project (`npm install uiforagents`) and run
`npx uiforagents init` for one-command onboarding: it writes a starter
`uiforagents.json` (all components, the default "paper" theme, kit resolved
from `node_modules/uiforagents`), copies the components in, and writes
tokens + docs. Projects then run the kit CLI from the project directory:

```sh
npx uiforagents tokens    # themes.css from the chosen theme(s)
npx uiforagents add       # copy the configured subset into dest.itemsDir
npx uiforagents scaffold  # docs/design-system.md from themes.css + config
npx uiforagents check     # adherence linter (reports, never fixes)
```

Config keys: `kit` (path to this kit), `theme` (slug, or `"all"` to ship
every theme), `themesFile` (optional themes module; read-only input, so it
may live outside the project), `items` (subset list), `dest` (`itemsDir`,
`tokensCss`, `docs`), `lint` (globs the linter covers). Paths resolve
against the config file's directory and may not escape it; `themesFile`
is the exception since it is read-only input. `add` copies markup, CSS,
script, example, and ARIA fixture per item, and points the copied examples'
token stylesheet at the project's themes file. `tokens` writes the project's
`themes.css`: one `[data-theme]` token block per theme (the first owning
`:root`) plus each theme's dialect-layer CSS; with a single slug it emits
just that theme.

`check` reports raw hex colors, invalid or missing `data-uifa-variant`
(closed tables; elements map to items by their `.uifa-<name>` class), and
`--uifa-*` tokens used via `var()` but declared by neither the copied items'
`cssVars` nor the project's themes file. Run
`npx uiforagents check --self-test` to verify the linter itself against its
planted violations.

## Framework adapters

Items that declare `adapters.react` in their manifest ship a generated
`adapters/react/<name>.jsx` with a named export `<Name>` (kebab-case name in
PascalCase). The adapter renders the exact vanilla DOM - same `uifa-<name>`
class, same closed `data-uifa-variant` / `data-uifa-slot` attributes - so the
item stylesheet and the adherence linter apply unchanged.

Consumption contract:

- Import `themes/tokens.css` (or your flow-emitted tokens) before item CSS;
  keep the `@layer` statement order and the imports-first rule.
- Copy `adapters/react/<name>.jsx` into your project, or consume it straight
  from the repo/package path in Vite
  (`import { Button } from "uiforagents/adapters/react/button.jsx"`).
- React is the consumer's dependency; adapters have no runtime imports.
- Props come from the manifest `props` surface (a `variant` enum mirrors the
  closed table), `children` fills the default slot, named slots are
  `ReactNode` props, and rest props spread last - onto the root element, or
  onto the rendered control for form fields.
- No Tailwind or shadcn involved; styling stays token-driven CSS.

The committed `adapters/react/<name>.test.jsx` suites render each generated
component against its `fixture.aria.yml` (`npm run test-adapters`).

## Notes

- Touch targets hold a 44px minimum; spacing derives from `--uifa-space` via
  `calc()`, so density follows the theme.
- To ship every theme and switch at runtime, set `"theme": "all"` in the
  config; the README's theme-switcher recipe covers the ~10-line runtime
  script.
- `schemaVersion` in each manifest anchors the contract; check it when items
  and kit versions drift apart.
