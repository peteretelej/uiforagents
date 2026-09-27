# Segmented control

Radio-group segment selector with selected and unselected states; keyboard navigable without JavaScript.

Category: forms · Behavior: css-only · Schema: 1.0.0 · Source: original

## Variants

No variant table; the item has a single form.

## Tokens

Reads: `--surface`, `--border`, `--text`, `--text-muted`, `--accent`, `--accent-fg`, `--radius`, `--font-body`, `--text-base`, `--space`. Every color comes from a semantic role; nothing is hard-coded.

## Markup

```html
<!-- Radio-group semantics: native inputs, no JavaScript. Group name is yours to choose. -->
<div class="uif-segmented" role="radiogroup" aria-label="Range">
  <label class="uif-segmented-option">
    <input type="radio" name="range" value="day" checked>
    <span data-slot="segment">Day</span>
  </label>
  <label class="uif-segmented-option">
    <input type="radio" name="range" value="week">
    <span data-slot="segment">Week</span>
  </label>
  <label class="uif-segmented-option">
    <input type="radio" name="range" value="month">
    <span data-slot="segment">Month</span>
  </label>
</div>
```

## Files

- [segmented-control.html](../../items/segmented-control/segmented-control.html) - markup
- [segmented-control.css](../../items/segmented-control/segmented-control.css) - style
- [segmented-control.example.html](../../items/segmented-control/segmented-control.example.html) - example
- [fixture.aria.yml](../../items/segmented-control/fixture.aria.yml) - fixture

## Usage

Use for 2-5 mutually exclusive options. Native radios carry the state: selection and arrow-key navigation come free, no JavaScript. Give each group its own `name`; the visible segment is `[data-slot="segment"]`.

## Validation

Open the example page and diff the rendered tree against the fixture with Playwright:

```js
const snap = await page.locator("body").ariaSnapshot();
// compare with items/segmented-control/fixture.aria.yml
```
