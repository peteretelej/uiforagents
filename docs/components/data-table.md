# Data table

Table with sortable headers, row selection, status cells, and an empty state.

Category: data · Behavior: js-inline · Schema: 1.0.0 · Source: original

## Variants

No variant table; the item has a single form.

## Tokens

Reads: `--surface`, `--border`, `--text`, `--text-muted`, `--accent`, `--ok-soft`, `--ok`, `--warn-soft`, `--warn`, `--danger-soft`, `--danger`, `--radius`, `--font-body`, `--text-base`, `--space`. Every color comes from a semantic role; nothing is hard-coded.

## Markup

```html
<!-- Sortable headers: th[aria-sort] + button. Selection: native checkboxes.
     Empty state: a table with data-state="empty" and one empty row. -->
<table class="uif-table" data-sortable>
  <thead>
    <tr>
      <th><input data-slot="select" type="checkbox" aria-label="Select all rows"></th>
      <th aria-sort="ascending"><button type="button">Name</button></th>
      <th>Status</th>
      <th><button type="button">Updated</button></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><input data-slot="select" type="checkbox" aria-label="Select row"></td>
      <td>Cell</td>
      <td><span data-slot="status">Active</span></td>
      <td>2026-01-01</td>
    </tr>
  </tbody>
</table>
<table class="uif-table" data-state="empty">
  <tbody>
    <tr>
      <td data-slot="empty" colspan="4">Nothing to show</td>
    </tr>
  </tbody>
</table>
```

## Files

- [data-table.html](../../items/data-table/data-table.html) - markup
- [data-table.css](../../items/data-table/data-table.css) - style
- [data-table.js](../../items/data-table/data-table.js) - behavior
- [data-table.example.html](../../items/data-table/data-table.example.html) - example
- [fixture.aria.yml](../../items/data-table/fixture.aria.yml) - fixture

## Usage

Mark the table `data-sortable` to wire header buttons; they set `aria-sort` on the `th` and re-order rows in place. Status cells are `[data-slot="status"]` spans mapping to the ok/warn/danger roles. For an empty table, use `data-state="empty"` with a single `[data-slot="empty"]` row.

## Validation

Open the example page and diff the rendered tree against the fixture with Playwright:

```js
const snap = await page.locator("body").ariaSnapshot();
// compare with items/data-table/fixture.aria.yml
```
