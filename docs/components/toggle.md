# Toggle switch

Switch-style checkbox with on, off, and disabled states.

Category: forms · Behavior: css-only · Schema: 1.0.0 · Source: original

## Variants

No variant table; the item has a single form.

## Tokens

Reads: `--border`, `--accent`, `--surface`, `--faint`, `--text`, `--radius`, `--font-body`, `--text-base`, `--space`. Every color comes from a semantic role; nothing is hard-coded.

## Markup

```html
<!-- role="switch" on a native checkbox: on/off state is the checked state. -->
<label class="uif-toggle">
  <input class="uif-toggle-input" type="checkbox" role="switch">
  <span data-slot="label">Label</span>
</label>
```

## Files

- [toggle.html](../../items/toggle/toggle.html) - markup
- [toggle.css](../../items/toggle/toggle.css) - style
- [toggle.example.html](../../items/toggle/toggle.example.html) - example
- [fixture.aria.yml](../../items/toggle/fixture.aria.yml) - fixture

## Usage

Wrap the input and label text in a `.uif-toggle` label so the whole row is the click target. `role="switch"` turns the native checkbox into switch semantics; `checked` is on, `disabled` is locked.

## Validation

Open the example page and diff the rendered tree against the fixture with Playwright:

```js
const snap = await page.locator("body").ariaSnapshot();
// compare with items/toggle/fixture.aria.yml
```
