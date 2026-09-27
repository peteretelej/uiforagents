# Modal

Native dialog: centered card on desktop, bottom sheet on small screens, scrim via token.

Category: overlay · Behavior: js-inline · Schema: 1.0.0 · Source: original

## Variants

No variant table; the item has a single form.

## Tokens

Reads: `--surface`, `--border`, `--text`, `--text-muted`, `--accent`, `--danger`, `--danger-fg`, `--radius`, `--shadow-char`, `--scrim`, `--font-display`, `--font-body`, `--text-base`, `--space`. Every color comes from a semantic role; nothing is hard-coded.

## Markup

```html
<!-- Native <dialog>: showModal() gives focus trap, Esc, and scrim for free. -->
<button type="button" class="uif-modal-trigger" data-slot="open">Open modal</button>
<dialog class="uif-modal" aria-label="Title">
  <h2 data-slot="title">Title</h2>
  <p data-slot="body">Body text.</p>
  <div data-slot="actions">
    <button type="button" class="uif-modal-action" data-variant="secondary" data-slot="cancel">Cancel</button>
    <button type="button" class="uif-modal-action" data-variant="danger" data-slot="confirm">Confirm</button>
  </div>
</dialog>
```

## Files

- [modal.html](../../items/modal/modal.html) - markup
- [modal.css](../../items/modal/modal.css) - style
- [modal.js](../../items/modal/modal.js) - behavior
- [modal.example.html](../../items/modal/modal.example.html) - example
- [fixture.aria.yml](../../items/modal/fixture.aria.yml) - fixture

## Usage

Built on the native `<dialog>`: `showModal()` provides the focus trap, Esc to close, and the top layer; `::backdrop` reads `--scrim`. Confirm actions use `data-variant="danger"` for destructive flows. Below 480px the card docks to a bottom sheet.

## Validation

Open the example page and diff the rendered tree against the fixture with Playwright:

```js
const snap = await page.locator("body").ariaSnapshot();
// compare with items/modal/fixture.aria.yml
```
