# Card

Flat surface card with one radius and direction-defined shadow character.

Category: content · Behavior: none · Schema: 1.0.0 · Source: original

## Variants

No variant table; the item has a single form.

## Tokens

Reads: `--surface`, `--border`, `--radius`, `--shadow-char`, `--text`, `--text-muted`, `--font-body`, `--font-display`, `--text-base`, `--space`. Every color comes from a semantic role; nothing is hard-coded.

## Markup

```html
<!-- Flat surface, one radius; shadow character comes from --shadow-char. -->
<article class="uif-card">
  <h3 data-slot="title">Title</h3>
  <p data-slot="body">Body text.</p>
  <div data-slot="actions"><!-- actions --></div>
</article>
```

## Files

- [card.html](../../items/card/card.html) - markup
- [card.css](../../items/card/card.css) - style
- [card.example.html](../../items/card/card.example.html) - example
- [fixture.aria.yml](../../items/card/fixture.aria.yml) - fixture

## Usage

One card, one radius, no variant table by design; visual character comes entirely from the direction (`--surface`, `--radius`, `--shadow-char`). Parts: `[data-slot="title"]`, `[data-slot="body"]`, `[data-slot="actions"]`. Compose buttons or badges into the slots.

## Validation

Open the example page and diff the rendered tree against the fixture with Playwright:

```js
const snap = await page.locator("body").ariaSnapshot();
// compare with items/card/fixture.aria.yml
```
