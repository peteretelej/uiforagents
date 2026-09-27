# Filter bar

Search input plus toggleable filter chips with pressed states.

Category: forms · Behavior: none · Schema: 1.0.0 · Source: original

## Variants

No variant table; the item has a single form.

## Tokens

Reads: `--surface`, `--border`, `--text`, `--text-muted`, `--accent`, `--accent-fg`, `--warn`, `--warn-fg`, `--radius`, `--font-body`, `--text-base`, `--space`. Every color comes from a semantic role; nothing is hard-coded.

## Markup

```html
<!-- Search input plus toggleable chips; pressed state is the applied filter. -->
<form class="uif-filter-bar" role="search" aria-label="Filter">
  <input data-slot="search" type="search" name="q" placeholder="Search" aria-label="Search">
  <div data-slot="chips">
    <button type="button" data-slot="chip" aria-pressed="false">Filter</button>
  </div>
</form>
```

## Files

- [filter-bar.html](../../items/filter-bar/filter-bar.html) - markup
- [filter-bar.css](../../items/filter-bar/filter-bar.css) - style
- [filter-bar.example.html](../../items/filter-bar/filter-bar.example.html) - example
- [fixture.aria.yml](../../items/filter-bar/fixture.aria.yml) - fixture

## Usage

Compose a search input and filter chips in one row. Chips are `type="button"` with `aria-pressed` carrying the applied state; CSS renders pressed chips solid. Give a chip `data-variant="warn"` for caution filters such as overdue.

## Validation

Open the example page and diff the rendered tree against the fixture with Playwright:

```js
const snap = await page.locator("body").ariaSnapshot();
// compare with items/filter-bar/fixture.aria.yml
```
