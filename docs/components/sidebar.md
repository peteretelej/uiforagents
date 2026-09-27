# Sidebar

Vertical section nav with an active pill and grouped links; panel or flat placement.

Category: navigation · Behavior: none · Schema: 1.0.0 · Source: original

## Variants

| `data-variant` | Description |
| --- | --- |
| `panel` (default) | Owns a bordered surface for standalone placement. |
| `flat` | No surface of its own; embeds in existing chrome via `data-variant="flat"`. |

## Tokens

Reads: `--surface`, `--border`, `--text`, `--text-muted`, `--faint`, `--accent`, `--accent-soft`, `--radius`, `--font-body`, `--text-base`, `--space`. Every color comes from a semantic role; nothing is hard-coded.

## Markup

```html
<!-- Vertical section nav; mark the current page with aria-current="page". -->
<nav class="uif-sidebar" data-variant="panel" aria-label="Sections">
  <a data-slot="link" href="#" aria-current="page">Overview</a>
  <a data-slot="link" href="#">Episodes</a>
  <div data-slot="group">
    <span data-slot="heading">Library</span>
    <a data-slot="link" href="#">Clips</a>
    <a data-slot="link" href="#">Assets</a>
  </div>
</nav>
```

## Files

- [sidebar.html](../../items/sidebar/sidebar.html) - markup
- [sidebar.css](../../items/sidebar/sidebar.css) - style
- [sidebar.example.html](../../items/sidebar/sidebar.example.html) - example
- [fixture.aria.yml](../../items/sidebar/fixture.aria.yml) - fixture

## Usage

Vertical navigation: links are `data-slot="link"`; group them under `data-slot="group"` with a `data-slot="heading"` label. Mark the current section with `aria-current="page"` and give the nav an `aria-label`. Variant `panel` (default) draws its own bordered surface; `flat` drops it for embedding in app chrome.

## Validation

Open the example page and diff the rendered tree against the fixture with Playwright:

```js
const snap = await page.locator("body").ariaSnapshot();
// compare with items/sidebar/fixture.aria.yml
```
