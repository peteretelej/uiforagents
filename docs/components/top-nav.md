# Top nav

Wordmark, links with an active pill, and a right-aligned actions cluster.

Category: navigation · Behavior: none · Schema: 1.0.0 · Source: original

## Variants

No variant table; the item has a single form.

## Tokens

Reads: `--surface`, `--border`, `--text`, `--text-muted`, `--accent`, `--accent-soft`, `--radius`, `--font-display`, `--font-body`, `--text-base`, `--space`. Every color comes from a semantic role; nothing is hard-coded.

## Markup

```html
<!-- Active link is marked with aria-current="page"; the pill follows from CSS. -->
<header class="uif-top-nav">
  <a data-slot="wordmark" href="/">Wordmark</a>
  <nav data-slot="links" aria-label="Main">
    <a href="#" aria-current="page">Section</a>
    <a href="#">Section</a>
  </nav>
  <div data-slot="actions">
    <a href="#">Action</a>
  </div>
</header>
```

## Files

- [top-nav.html](../../items/top-nav/top-nav.html) - markup
- [top-nav.css](../../items/top-nav/top-nav.css) - style
- [top-nav.example.html](../../items/top-nav/top-nav.example.html) - example
- [fixture.aria.yml](../../items/top-nav/fixture.aria.yml) - fixture

## Usage

Mark the current section with `aria-current="page"`; CSS renders the active pill from the accent roles. The nav needs `aria-label="Main"`. Parts: `wordmark`, `links`, `actions` (pushed right).

## Validation

Open the example page and diff the rendered tree against the fixture with Playwright:

```js
const snap = await page.locator("body").ariaSnapshot();
// compare with items/top-nav/fixture.aria.yml
```
