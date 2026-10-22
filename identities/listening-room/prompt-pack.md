# listening-room - Agent Prompt-Pack

> Mint record: One-shot PASS 2026-10-22 (conference-talk audio page,
> distinct from the episode-page demo; built pack-only by a fresh agent
> with no other design context).

You are building with the **listening-room** design identity: a dark-first
listening surface for spoken-audio pages - podcast episodes, narrated
reports, audio editions, briefings with a voice. The design decisions are
already made. Follow this pack exactly; do not improvise visual design.

The identity is one stylesheet, `foundation.css`. It carries the tokens,
base typography, chrome, listening components, print rules, and both
themes. Sanctioned JS ships beside it: `listening-player.js` (the player
module) and an optional theme toggle. You write content and page-specific
layout only.

## Using the identity (both modes work)

- **Single-file artifact (default)**: paste all of `foundation.css` into one
  `<style>` block in the page `<head>`. The deliverable stays fully
  self-contained. Do not edit the pasted CSS; override from a second
  unlayered block if a page truly needs it.
- **Linked file**: `<link rel="stylesheet" href="foundation.css">` works
  identically. Keep the file unmodified next to the page.
- Page CSS stays **unlayered**. The foundation is wrapped in
  `@layer foundation`, so anything you write outside a layer wins without
  `!important`. Never add `!important`; never add to the foundation layer.
- **The player**: include `listening-player.js` (inline or linked) after the
  page markup. It is the only script allowed to touch playback. The page
  must render completely without it: the `<audio class="lr-native" controls>`
  fallback is the no-JS player, the transcript is real HTML, the chapter
  list is real markup.

## Identity contract

- **Fonts**: Charter-led serif for display and reading prose
  (`--font-serif`). System sans (`--font-sans`) for chapter titles and
  body-adjacent UI. System mono (`--font-mono`) for EVERY label, timestamp,
  number, kicker, badge, and the transport buttons - numbers are always
  mono, always `tabular-nums`. Never introduce another font family.
- **Color**: amber `--accent` is for ACTION and STATE: links, playhead,
  played bars, the active chapter, the active transcript line, elapsed
  time. Never decoration, never large fills except the playing Play button
  fill. Text is `--ink` on `--bg`; secondary is `--muted`; tertiary is
  `--faint`. The neutrals are warm-tinted, never pure grey.
- **Dual theme is built in**: every token is a `light-dark()` pair and
  `:root` sets `color-scheme: dark` (the identity leads dark). A toggle
  flips `html.style.colorScheme` to `"light"`/`"dark"` and dispatches
  `lr:theme` (the player recolors from that event). `color-scheme` must
  stay on `html`/`:root`; do not create `data-theme` blocks or duplicate
  token lists.
- **Radius**: boxes and controls use `--radius` (3px). One radius per
  element.
- **Density is editorial**: generous section spacing (64px), hairline
  `--line-soft` rules between sections, no shadows, no gradients. The
  waveform is the page's one dense texture - everything around it stays
  quiet.
- **Motion**: `scroll-behavior: smooth` (disabled under
  `prefers-reduced-motion`), transcript `scrollIntoView` on follow, button
  state changes. No keyframe animation.

## Component inventory (use these classes; do not restyle or substitute)

Chrome (inherited grammar, `lr-` prefix):

- **Player placement is a rule, not a taste**: the `.lr-player` sits
  INSIDE the hero, directly under `.lr-meta-row` - the first thing on the
  page, never below a section header or a scroll on load. A
  `.lr-quicklinks` mono anchor row (page-level CSS, e.g. "Chapters ·
  Transcript") may sit between meta row and player.
- The SYNCED TRANSCRIPT and CHAPTER GRID are episode-page components:
  pages that list episodes (index cards, feeds) ship the player alone -
  never a transcript wall on a listing surface.
- `.lr-topbar` + `.lr-wrap`: 44px mono top bar on `--bg`, hairline bottom
  border. Contains `.lr-brand` (amber), `.lr-crumb`, and `nav` with the
  optional `.lr-theme-toggle`.
- `.lr-hero`: kicker (`.lr-kicker`, mono amber), `h1` (large serif,
  styled via `.lr-hero h1`), `.lr-dek` (serif standfirst), `.lr-meta-row`
  of mono facts and optional `.lr-badge` chips. The player closes the
  hero (see the placement rule above).
- `.lr-section` with `.lr-snum` (mono amber eyebrow, "01 - Listen") and a
  serif `h2`. Sections end with a hairline border.
- `.lr-lede` (serif, one size up, ink - the section's opening line),
  `.lr-small` (faint mono aside text), `.lr-skel` (loading hairline
  block), `.lr-tblwrap` (hairline data table for sources/shownotes; see
  the parent grammar's table rules).
- `.lr-sharebar`, `.lr-footer`, `.lr-mono`, `.lr-measure`: as in the
  parent grammar.
- `.lr-quicklinks` (mono anchor row, in the hero), `.lr-episode-card`
  (surface card for show-page episode lists): inventory components.

Listening components (the extension):

- `.lr-player[data-lr-player][data-audio][data-title][data-show][data-duration]`:
  one player root. `data-lr-player` (empty value) is the module's
  selector - without it the player stays dead. Inside:
  `<audio class="lr-native" controls preload="metadata">` (the no-JS
  fallback - keep it first), `.lr-wavebox` >
  `canvas.lr-wave` + `span.lr-wave-tip`, and `.lr-transport`:
  `.lr-tbtn--play` (Play/Pause, amber fill when playing),
  `.lr-tbtn--back` (-15s), `.lr-tbtn--fwd` (+30s), `.lr-speed` (cycles
  1x-2x), `.lr-time` (`.lr-elapsed` amber / `.lr-total` faint),
  `.lr-statusrow` (see below). Buttons are 40-44px tall: real
  hit targets.
- `.lr-chapters` (ul) > `li` > `button.lr-chbtn[data-start][data-title]`:
  the chapter grid, two columns, one under 800px. Active chapter gets
  `is-now` (amber border + soft wash).
- `.lr-transcript` > `p.lr-tp[data-start][data-role]` per spoken segment,
  each containing `.lr-trole` (speaker label, mono), `button.lr-tstamp`
  (mono time), `.lr-ttext`. The module stamps `.is-past` and `.is-now`.
  The transcript is a PURE reading surface: no persistent bars or chrome.
- **The floating chip (`.lr-chip`, JS-created)**: while Read Along is ON,
  a small pill floats next to the CURRENT line being read - in the right
  margin gutter on wide screens, at the line's right edge under 760px -
  tracking it as it moves (crosshair icon + "Reading along" + an x).
  Clicking it stops Read Along. It is the on-state made findable: the
  disable control lives exactly where the auto-scroll is felt.
- **Read Along persistence**: while ON, the page keeps pace with the
  voice everywhere - scrolling the page NEVER changes the mode; the page
  recenters on the active line (GPS model). OFF = the transcript never
  scrolls itself; highlights still move. The switch is exactly one of:
  the floating chip (`.lr-chip`, one click, always next to the active
  line), the transport `.lr-follow` ("Read Along"), or the mini
  `.lr-mini-follow` crosshair - all three always state-correlated.
- `.lr-statusrow` (inside `.lr-transport`, full width; EPISODE-PAGE
  players only - listing-card players omit it, like the transcript): the
  current chapter (`.lr-chlabel`) on the left, the follow toggle
  (`button.lr-tbtn.lr-follow`, crosshair icon + "Read Along",
  `is-on` + `aria-pressed` mirror the state) on the right. Follow is a
  REAL toggle, never a trap: only the two toggles and the floating chip
  change it; seeking never changes it silently.
- `.lr-mini`: fixed bottom mini-player
  (`button.lr-tbtn.lr-mini-btn` - the mini button pairs both classes,
  `.lr-mini-title`, `.lr-mini-time`, a DRAGGABLE `.lr-mini-track` >
  `.lr-mini-fill`, `.lr-tbtn.lr-mini-speed` (cycles 1x-2x),
  `.lr-tbtn.lr-mini-follow` (the SAME crosshair icon, so the two
  controls correlate at a glance; labeled "Read Along" for AT)). The
  mini button's initial label is "Play" (nothing has played yet).. NO Close button: visibility is
  automatic - it shows whenever the main player is scrolled away and the
  episode is started, hides when you scroll back, and retires when the
  episode ends. It PERSISTS while paused (Play/Pause label follows
  state).

Do not invent new visual components. If a page needs more, use plain
semantic HTML styled from the token vocabulary.

## Player module contract (`listening-player.js`)

- ADOPTS the first player's native `<audio>` element as the page's one
  media graph; strips `src` from other players' native elements (index
  cards) so they never prefetch. A page may carry several players; the
  FIRST root owns the chapter buttons, the transcript, and the
  mini-player - page-scoped wiring runs exactly once against it.
- Peaks come from, in order: an inline
  `<script type="application/json" data-lr-peaks>` inside the root
  (`{ duration, data: [amplitudes] }`); a `data-peaks` ATTRIBUTE on the
  root (the same JSON as an attribute value - the reliable embed for
  server-rendered pages: attribute decoding is spec-exact, no template
  escaper surprises); or `data-peaks-src` (a URL fetched lazily).
  Without peaks the wavebox degrades to a plain scrubber - the page must
  not depend on peaks existing.
- Seeks wait for a real seekable range and never restart an in-flight
  download. Never replace the module's seek path with a bare
  `audio.currentTime = t`.
- Resume position persists in localStorage per audio URL (5s cadence).
- Media Session: metadata from `data-title`/`data-show`; play, pause,
  seekbackward (-15), seekforward (+30), seekto handlers.
- Keyboard: space or K toggles play; J/L jump -10/+10s (skipped while
  typing); the waveform is `role=slider`: left/right arrows nudge 5s,
  Home/End jump to the ends.
- Transcript Read Along: ON = the page follows the voice everywhere
  (recentering like GPS); OFF = the transcript never scrolls itself.
  The switch is the floating chip, the transport toggle, or the mini
  icon; scrolling the page never changes the mode.

## Data conventions (recommended shape for producers)

- Chapters: Podcasting 2.0 chapters JSON (`{"chapters":[{"startTime":s,
  "title":"..."}]}`) - the module reads chapter STARTS from the rendered
  `.lr-chbtn[data-start]` buttons, not from JSON; render buttons from the
  producer data at build time.
- Transcript paragraphs carry seconds in `data-start`; producers should
  interpolate per-segment times within chapter bounds when only
  chapter-level timing exists (chars-weighted).
- Waveform peaks: precomputed amplitude buckets (~1600 for a 15-minute
  episode); never decode full audio client-side to draw a waveform.

## Gates (run against your page, not the parent)

- **Headless check**: zero console errors at ~1280px and ~390px widths.
- **No-JS render**: the page renders completely with JavaScript disabled
  (native audio, full transcript, chapter list visible; wavebox hidden).
- **Contrast AA, both schemes**: body/muted/accent text on their grounds,
  text on accent, and the waveform states (idle, played) at 3:1 against
  the page ground.
- **One-shot**: an agent given only this pack and the stylesheet builds
  identity-faithful pages with no improvisation.

## Tuning surface

Derived from `midnight-bulletin` v1. Per the factory derive contract:

| Retune (allowed) | Inherit (never redesign) |
|------------------|--------------------------|
| accent color (`--accent`, `--accent-ink`, `--accent-soft`) | component structure and class grammar |
| neutral tint / hue family (the hue-70-80 warm family) | spacing and type-scale ratios |
| fonts (via the documented upgrade path) | lane contracts (`@layer`, `light-dark()`, no-required-JS with sanctioned modules only) |
| radius | the prompt-pack's decision logic and do/don'ts |
| density | the listening interaction contract (seek rules, keyboard map, follow behavior) |
| scheme lead (dark-first is canonical; flipping the lead is a retune) | |
| `--lr-wave-idle` / `--lr-wave-played` values (keep both >= 3:1 vs the ground) | |
| artifact-lane extras: prune components within the chrome grammar; listening components are the floor inventory | |

Provenance: derived from midnight-bulletin v1, 2026-10-22. The dark scheme
values are verbatim from the parent; the listening components are the
extension this identity exists to carry.
