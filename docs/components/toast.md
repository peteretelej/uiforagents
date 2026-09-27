# Toast

Bottom-center transient message with show/hide transition and info, ok, warn, danger flavors.

Category: feedback · Behavior: js-inline · Schema: 1.0.0 · Source: original

## Variants

| `data-variant` | Description |
| --- | --- |
| `info` (default) | Neutral confirmation such as a saved draft. |
| `ok` | Success completion. |
| `warn` | Recoverable problem. |
| `danger` | Failure that needs user action. |

## Tokens

Reads: `--accent-soft`, `--accent`, `--ok-soft`, `--ok`, `--warn-soft`, `--warn`, `--danger-soft`, `--danger`, `--surface`, `--border`, `--text`, `--radius`, `--shadow-char`, `--font-body`, `--text-base`, `--space`. Every color comes from a semantic role; nothing is hard-coded.

## Markup

```html
<!-- Fixed bottom-center region; toggle data-state="visible|hidden" to show/hide. -->
<div class="uif-toast-region">
  <div class="uif-toast" data-variant="info" data-state="visible" role="status">
    <span data-slot="message">Message</span>
    <button type="button" data-slot="close">Dismiss</button>
  </div>
</div>
<button type="button" class="uif-toast-trigger" data-slot="trigger">Show toast</button>
```

## Files

- [toast.html](../../items/toast/toast.html) - markup
- [toast.css](../../items/toast/toast.css) - style
- [toast.js](../../items/toast/toast.js) - behavior
- [toast.example.html](../../items/toast/toast.example.html) - example
- [fixture.aria.yml](../../items/toast/fixture.aria.yml) - fixture

## Usage

The region is fixed bottom-center; keep one region per page and stack toasts inside it. `role="status"` announces messages politely. Drive visibility with `data-state="visible|hidden"`; the script wires the trigger, auto-hide after 4s, and manual dismissal.

## Validation

Open the example page and diff the rendered tree against the fixture with Playwright:

```js
const snap = await page.locator("body").ariaSnapshot();
// compare with items/toast/fixture.aria.yml
```
