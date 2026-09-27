# Link row

Title link with url line, chips, and an actions cluster; hover state on the row.

Category: content · Behavior: none · Schema: 1.0.0 · Source: original

## Variants

No variant table; the item has a single form.

## Tokens

Reads: `--accent`, `--accent-soft`, `--text`, `--text-muted`, `--radius`, `--font-body`, `--text-base`, `--space`. Every color comes from a semantic role; nothing is hard-coded.

## Markup

```html
<!-- Grid row: title link + url on line one, chips + actions below. -->
<div class="uif-link-row">
  <a data-slot="title" href="https://example.com">Title of the link</a>
  <span data-slot="url">example.com</span>
  <div data-slot="chips">
    <span data-slot="chip">tag</span>
  </div>
  <div data-slot="actions">
    <a href="https://example.com">Open</a>
  </div>
</div>
```

## Files

- [link-row.html](../../items/link-row/link-row.html) - markup
- [link-row.css](../../items/link-row/link-row.css) - style
- [link-row.example.html](../../items/link-row/link-row.example.html) - example
- [fixture.aria.yml](../../items/link-row/fixture.aria.yml) - fixture

## Usage

Use for lists of destinations: search results, recent files, reading queues. Parts: `[data-slot="title"]` (the link), `url`, `chips` (contains `[data-slot="chip"]` spans), `actions`. Hovering anywhere in the row underlines the title.

## Validation

Open the example page and diff the rendered tree against the fixture with Playwright:

```js
const snap = await page.locator("body").ariaSnapshot();
// compare with items/link-row/fixture.aria.yml
```
