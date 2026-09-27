# Form field

Label, text input, and textarea with an accent focus ring.

Category: forms · Behavior: none · Schema: 1.0.0 · Source: original

## Variants

| `data-variant` | Description |
| --- | --- |
| `text` (default) | Single-line input; omit data-variant. |
| `textarea` | Multi-line input via `data-variant="textarea"` on the textarea. |

## Tokens

Reads: `--surface`, `--border`, `--text`, `--text-muted`, `--accent`, `--radius`, `--font-body`, `--text-base`, `--space`. Every color comes from a semantic role; nothing is hard-coded.

## Markup

```html
<!-- Wrapping label binds the visible label to the control without ids. -->
<label class="uif-field">
  <span data-slot="label">Label</span>
  <input class="uif-field-input" type="text" name="field" placeholder="Placeholder">
</label>
<label class="uif-field">
  <span data-slot="label">Label</span>
  <textarea class="uif-field-input" data-variant="textarea" name="field" rows="4"></textarea>
</label>
```

## Files

- [form-field.html](../../items/form-field/form-field.html) - markup
- [form-field.css](../../items/form-field/form-field.css) - style
- [form-field.example.html](../../items/form-field/form-field.example.html) - example
- [fixture.aria.yml](../../items/form-field/fixture.aria.yml) - fixture

## Usage

A wrapping `<label class="uif-field">` binds the visible label to its control without ids. The focus ring uses the accent role; hover deepens the border. Keep `min-height` at the 44px touch floor on inputs.

## Validation

Open the example page and diff the rendered tree against the fixture with Playwright:

```js
const snap = await page.locator("body").ariaSnapshot();
// compare with items/form-field/fixture.aria.yml
```
