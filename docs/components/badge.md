# Badge

Small status label: accent, ok, warn, danger, and muted outline variants.

Category: content · Behavior: none · Schema: 1.0.0 · Source: original

## Variants

| `data-variant` | Description |
| --- | --- |
| `accent` (default) | Neutral-highlight state such as in review or open work. |
| `ok` | Success or healthy state. |
| `warn` | Attention state such as due soon. |
| `danger` | Failed or expired state. |
| `muted` | Muted outline for closed or archived; the only outlined variant. |

## Tokens

Reads: `--accent-soft`, `--accent`, `--ok-soft`, `--ok`, `--warn-soft`, `--warn`, `--danger-soft`, `--danger`, `--border`, `--text-muted`, `--radius`, `--font-body`, `--text-base`, `--space`. Every color comes from a semantic role; nothing is hard-coded.

## Markup

```html
<!-- Status labels; data-variant maps to the semantic status roles. -->
<span class="uif-badge" data-variant="accent">Label</span>
<span class="uif-badge" data-variant="ok">Label</span>
<span class="uif-badge" data-variant="warn">Label</span>
<span class="uif-badge" data-variant="danger">Label</span>
<span class="uif-badge" data-variant="muted">Label</span>
```

## Files

- [badge.html](../../items/badge/badge.html) - markup
- [badge.css](../../items/badge/badge.css) - style
- [badge.example.html](../../items/badge/badge.example.html) - example
- [fixture.aria.yml](../../items/badge/fixture.aria.yml) - fixture

## Usage

A plain span with `data-variant`; no role so it reads as text in the accessibility tree. Keep the copy to one or two words. Pairs with the `status` roles `--ok`, `--warn`, `--danger` from the direction tokens.

## Validation

Open the example page and diff the rendered tree against the fixture with Playwright:

```js
const snap = await page.locator("body").ariaSnapshot();
// compare with items/badge/fixture.aria.yml
```
