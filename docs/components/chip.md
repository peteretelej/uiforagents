# Chip

Pill-radius tag for filters and metadata: neutral, accent, and warn variants.

Category: content · Behavior: none · Schema: 1.0.0 · Source: original

## Variants

| `data-variant` | Description |
| --- | --- |
| `neutral` (default) | Outlined surface tag. |
| `accent` | Soft accent fill for highlighted tags. |
| `warn` | Soft warning fill for tags that need attention. |

## Tokens

Reads: `--surface`, `--border`, `--text`, `--accent-soft`, `--accent`, `--warn-soft`, `--warn`, `--radius`, `--font-body`, `--text-base`, `--space`. Every color comes from a semantic role; nothing is hard-coded.

## Markup

```html
<!-- Tags and metadata; for clickable filter chips use the filter-bar item. -->
<span class="uif-chip">Label</span>
<span class="uif-chip" data-variant="accent">Label</span>
<span class="uif-chip" data-variant="warn">Label</span>
```

## Files

- [chip.html](../../items/chip/chip.html) - markup
- [chip.css](../../items/chip/chip.css) - style
- [chip.example.html](../../items/chip/chip.example.html) - example
- [fixture.aria.yml](../../items/chip/fixture.aria.yml) - fixture

## Usage

Static tag for metadata. For interactive filter chips with pressed states use the `filter-bar` item. Radius derives from `--radius` so pill roundness tracks the direction.

## Validation

Open the example page and diff the rendered tree against the fixture with Playwright:

```js
const snap = await page.locator("body").ariaSnapshot();
// compare with items/chip/fixture.aria.yml
```
