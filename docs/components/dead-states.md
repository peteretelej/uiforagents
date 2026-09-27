# Dead states

Page-level empty states for not-found, deleted, expired, and closed content.

Category: feedback · Behavior: none · Schema: 1.0.0 · Source: original

## Variants

| `data-variant` | Description |
| --- | --- |
| `not-found` (default) | Missing or moved content; primary recovery action. |
| `deleted` | Content removed by its owner; offer restore when possible. |
| `expired` | Time-limited access ended; secondary-weighted action. |
| `closed` | Account or workspace is closed; secondary-weighted action. |

## Tokens

Reads: `--surface`, `--border`, `--text`, `--text-muted`, `--accent`, `--accent-fg`, `--radius`, `--font-display`, `--font-body`, `--text-base`, `--space`. Every color comes from a semantic role; nothing is hard-coded.

## Markup

```html
<!-- Page-level empty state; variants pick the copy intent and action weight. -->
<section class="uif-dead" data-variant="not-found">
  <h2 data-slot="title">Title</h2>
  <p data-slot="body">What happened, and what to do next.</p>
  <a data-slot="action" href="/">Recovery action</a>
</section>
```

## Files

- [dead-states.html](../../items/dead-states/dead-states.html) - markup
- [dead-states.css](../../items/dead-states/dead-states.css) - style
- [dead-states.example.html](../../items/dead-states/dead-states.example.html) - example
- [fixture.aria.yml](../../items/dead-states/fixture.aria.yml) - fixture

## Usage

Use as the page-level state when content cannot be shown. Variants set copy intent; expired and closed weight the action as secondary (outlined) since recovery is less direct. Replace the copy; keep the title plus one or two sentences.

## Validation

Open the example page and diff the rendered tree against the fixture with Playwright:

```js
const snap = await page.locator("body").ariaSnapshot();
// compare with items/dead-states/fixture.aria.yml
```
