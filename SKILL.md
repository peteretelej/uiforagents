# Skill: uiforagents

Copy-in vanilla UI components whose primary consumer is the agent building
the UI. Use when a build should use kit components: pages, app screens,
artifacts, prototypes.

## Workflow

1. **Pick from the index.** Read `llms.txt`. Each line carries the component
   name, description, closed variant table (default marked `*`), and behavior -
   enough to choose a component and variant without opening other files.
2. **Wire tokens.** Copy `themes/tokens.css` for the example directions, or
   declare your own direction with the same role names: `--bg`, `--surface`,
   `--border`, `--text`, `--text-muted`, `--faint`, `--accent`,
   `--accent-soft`, `--accent-fg`, `--ok`/`--ok-soft`/`--ok-fg`,
   `--warn`/`--warn-soft`/`--warn-fg`, `--danger`/`--danger-soft`/`--danger-fg`,
   `--scrim`, `--radius`, `--shadow-char`, `--font-display`, `--font-body`,
   `--text-base`, `--space`, `color-scheme`. Direction scopes are
   `[data-theme="slug"]`; the palette pairs are contrast-checked by
   construction.
3. **Copy items in.** From `items/<name>/`, copy the markup pattern
   (`<name>.html`) and styles (`<name>.css`); when `behavior` is `js-inline`,
   copy `<name>.js` too. Components are self-contained: the only shared file
   is the token sheet.
4. **Use the closed variant API.** Variants are `data-variant` attributes from
   the manifest table; parts are `[data-slot]` hooks. Do not invent variants.
5. **Validate.** Open the item's `<name>.example.html` and diff the rendered
   tree against `fixture.aria.yml` (Playwright ariaSnapshot YAML):

   ```js
   const snap = await page.locator("body").ariaSnapshot();
   // compare with items/<name>/fixture.aria.yml
   ```

6. **Stay on-system.** No component-local colors: every visual value comes
   from a token. Hand-rolled extras must be justified in build notes.

## Notes

- Touch targets hold a 44px minimum; spacing derives from `--space` via
  `calc()`, so density follows the direction.
- `schemaVersion` in each manifest anchors the contract; check it when items
  and kit versions drift apart.
