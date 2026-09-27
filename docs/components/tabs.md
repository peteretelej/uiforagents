# Tabs

Tab selector with underline (default) and pill styles per direction; panels switch via CSS.

Category: navigation · Behavior: css-only · Schema: 1.0.0 · Source: original

## Variants

| `data-variant` | Description |
| --- | --- |
| `underline` (default) | Accent underline on the active tab; omit data-variant. |
| `pill` | Soft accent pill on the active tab. |

## Tokens

Reads: `--border`, `--text`, `--text-muted`, `--accent`, `--accent-soft`, `--radius`, `--font-body`, `--text-base`, `--space`. Every color comes from a semantic role; nothing is hard-coded.

## Markup

```html
<!-- Radio-based tabs: native inputs keep keyboard navigation; panels switch via CSS.
     data-panel values must match the input value attributes. -->
<div class="uif-tabs">
  <div class="uif-tabs-list">
    <label class="uif-tab">
      <input type="radio" name="tabs" value="preview" checked>
      <span data-slot="tab">Tab</span>
    </label>
    <label class="uif-tab">
      <input type="radio" name="tabs" value="history">
      <span data-slot="tab">Tab</span>
    </label>
  </div>
  <div class="uif-tabs-panel" data-panel="preview">Panel one</div>
  <div class="uif-tabs-panel" data-panel="history" hidden>Panel two</div>
</div>
```

## Files

- [tabs.html](../../items/tabs/tabs.html) - markup
- [tabs.css](../../items/tabs/tabs.css) - style
- [tabs.example.html](../../items/tabs/tabs.example.html) - example
- [fixture.aria.yml](../../items/tabs/fixture.aria.yml) - fixture

## Usage

Radio inputs keep selection and arrow-key navigation JavaScript-free. Each tab's `value` must match its panel's `data-panel`; the stylesheet ships the preview/history pair, so extend the panel-switch selectors when you add tabs. Style comes from the direction: underline reads formal, pill reads casual.

## Validation

Open the example page and diff the rendered tree against the fixture with Playwright:

```js
const snap = await page.locator("body").ariaSnapshot();
// compare with items/tabs/fixture.aria.yml
```
