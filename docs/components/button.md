# Button

Primary, secondary, danger, and compact action buttons with disabled, hover, and focus states.

Category: actions · Behavior: none · Schema: 1.0.0 · Source: original

## Variants

| `data-variant` | Description |
| --- | --- |
| `primary` (default) | Solid accent fill; the main action of a view. |
| `secondary` | Outlined surface for supporting actions. |
| `danger` | Destructive actions such as delete or revoke. |
| `small` | Compact type and padding for dense toolbars; keeps the 44px touch target. |

## Tokens

Reads: `--accent`, `--accent-fg`, `--surface`, `--border`, `--text`, `--danger`, `--danger-fg`, `--faint`, `--bg`, `--radius`, `--font-body`, `--text-base`, `--space`. Every color comes from a semantic role; nothing is hard-coded.

## Markup

```html
<!-- One button per action; exactly one primary per view. -->
<button class="uif-button" data-variant="primary">Label</button>
<button class="uif-button" data-variant="secondary">Label</button>
<button class="uif-button" data-variant="danger">Label</button>
<button class="uif-button" data-variant="small">Label</button>
```

## Files

- [button.html](../../items/button/button.html) - markup
- [button.css](../../items/button/button.css) - style
- [button.example.html](../../items/button/button.example.html) - example
- [fixture.aria.yml](../../items/button/fixture.aria.yml) - fixture

## Usage

Use `data-variant` on the button element; omit it for the primary default. Disable with the native `disabled` attribute. Focus rings and hover shades derive from tokens, so no per-theme overrides are needed.

## Validation

Open the example page and diff the rendered tree against the fixture with Playwright:

```js
const snap = await page.locator("body").ariaSnapshot();
// compare with items/button/fixture.aria.yml
```
