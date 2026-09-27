# Audio player bar

Playback bar with play toggle, meta, and a token-styled progress track.

Category: media · Behavior: js-inline · Schema: 1.0.0 · Source: original

## Variants

No variant table; the item has a single form.

## Tokens

Reads: `--surface`, `--border`, `--text`, `--text-muted`, `--accent`, `--accent-fg`, `--radius`, `--shadow-char`, `--font-body`, `--text-base`, `--space`. Every color comes from a semantic role; nothing is hard-coded.

## Markup

```html
<!-- Player bar: play toggle, meta, progress. Fill width and aria-valuenow track position. -->
<div class="uif-player">
  <button type="button" data-slot="play" aria-label="Play">▶</button>
  <div data-slot="meta">
    <span data-slot="title">Episode title</span>
    <span data-slot="time">0:00 / 35:00</span>
  </div>
  <div data-slot="progress" role="progressbar" aria-label="Playback position" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
    <span data-slot="progress-fill" style="width: 0%"></span>
  </div>
</div>
```

## Files

- [audio-player.html](../../items/audio-player/audio-player.html) - markup
- [audio-player.css](../../items/audio-player/audio-player.css) - style
- [audio-player.js](../../items/audio-player/audio-player.js) - behavior
- [audio-player.example.html](../../items/audio-player/audio-player.example.html) - example
- [fixture.aria.yml](../../items/audio-player/fixture.aria.yml) - fixture

## Usage

Reader-style player bar. The play control announces Play/Pause via `aria-label`; position lives on the `[data-slot="progress"]` element (`role="progressbar"` with value attributes) and its fill width mirrors `aria-valuenow`. The example script simulates playback; point the same hooks at a real `<audio>` element to consume it.

## Validation

Open the example page and diff the rendered tree against the fixture with Playwright:

```js
const snap = await page.locator("body").ariaSnapshot();
// compare with items/audio-player/fixture.aria.yml
```
