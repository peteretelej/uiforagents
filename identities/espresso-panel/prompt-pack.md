# espresso-panel - Agent Prompt-Pack

You are building with the **espresso-panel** design identity: an amber
instrument panel for self-contained HTML artifacts - ticker and price
watchers, market feeds, machine-room walls, readout dashboards,
retro-instrument one-pagers. The design decisions are already made. Follow
this pack exactly; do not improvise visual design.

The identity is one stylesheet, `foundation.css`. It carries the tokens,
base typography, components, print rules, and both themes. You write content
and page-specific layout only.

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
- No JavaScript is required. The only sanctioned JS is an optional theme
  toggle (below); the page must render completely without it.

## Identity contract

- **All-mono, everywhere.** The system mono (`--mono`) is the only voice:
  UI, labels, prose, numerals. Tabular figures (`font-variant-numeric:
  tabular-nums`) on every value, delta, and measurement. Kickers and panel
  headers are 9.5-10px tracked uppercase (`.ep-k`, `.ep-ph`); values are
  21px, the lead readout 27px. Never introduce a second family, never load
  webfonts.
- **One hue. Amber phosphor on warm black.** Every color sits on one amber
  hue over a warm-black ground family. There is no second hue anywhere and
  no neutral gray: hierarchy is INTENSITY, not color. The text ladder is
  accent (values, emphasis) > ink (body) > muted (captions, labels) > faint
  (ornaments only: the `//` header prefix, bracket flourishes - never
  informative text).
- **Severity is brightness, not color.** The bracket grammar is the state
  system: `[ OK ]` outline rung (`.ep-state.ok`), `[WARN]` mid fill
  (`.ep-state.warn`), `[FAIL]` accent fill (`.ep-state.fail`) - the
  loudest the medium gets. The brackets are part of the copy and uppercase
  only. In the derived light scheme the direction flips (severity darkens);
  the semantics do not. `--ok`/`--warn`/`--danger` are ladder rungs by
  default, not separate hues.
- **Deltas ride the ladder.** `.ep-d.up` (accent) = favorable, `.ep-d.down`
  (ink) = unfavorable, default muted = neutral, and every delta names its
  comparison ("vs open", "vs 30d"). Sparks follow the verdict: bright
  favorable, dim unfavorable.
- **Dual theme is built in**: every token is a `light-dark()` pair and
  `:root` pins the identity's lead scheme, dark. A toggle flips
  `html.style.colorScheme`. Keep the scheme property on `html`/`:root`; do
  not create `data-theme` blocks, duplicate token lists, or theme by
  setting the scheme on wrappers.
- **Crisp instruments.** Hairline `--line-soft` inner rules and `--line`
  borders; radius ladder is 2px/1px - everything reads square. No shadows:
  elevation is a hairline, never a blur. The readout wall (`.ep-readout`)
  shows its 1px grid gaps in `--line`.
- **Motion is live-signal, minimal**: the cursor blink (`.ep-cursor`) says
  the feed is live, the tape marquee (`.ep-tape`) is the ticker, the
  scanning bar (`.ep-scan`) is loading. All three honor
  `prefers-reduced-motion` and print automatically.
- **Honest data**: every reading carries its window ("p95 · 24h", "last 12h"),
  freshness stamps (`.ep-stamp`), and terse system lines for absence
  (`no quotes in window`). If a number is shown, it has a kicker and a
  window. Never fake a series.

## Component inventory (use these classes; do not restyle or substitute)

- `.ep-top`: chrome band on `--surface-2`. `.ep-brand` (accent wordmark),
  bracket env chip (`[PROD]` as plain text), `.ep-right` (clock/context,
  not uppercased). Band text is ink; the band carries no controls.
- `.ep-wrap`: 1180px container. `.ep-cols` (1.7fr/1fr), `.ep-cols.flip`,
  `.ep-stack`, `.ep-grid2`.
- `.ep-readout` > `.ep-cell`: the readout strip wall - five cells per row,
  lead cell's `.ep-v` larger. Each cell: `.ep-k` kicker, `.ep-v` accent
  value, `.ep-d` delta. `.ep-cell.ep-sel` marks the selected instrument
  (wash + rule; its kicker reads ink).
- `.ep-panel`: hairline panel. Header `.ep-ph` (tracked caps with the `//`
  prefix; `small` carries the right-aligned window/unit), `.ep-take` is the
  one-line reading under a header, `.ep-chart` the svg slot.
- `.ep-rows` > `.ep-row`: readout rows (machine readings). `.n` name,
  `.m` mono metric right-aligned, `.ep-state` at the end. Bracket rows, not
  health-dot rows.
- `.ep-meters` > `.ep-mrow`: LED meters. `.ep-led` dot track with an `i`
  fill at `style="--w:78%"` (`.dim` for nominal links), `.n` name, `.m` %.
- `.ep-ev` > `.ep-evrow`: event feed. `time` gutter, `.t` text, optional
  `.ep-state`. `.fail` rows take the 8% fail wash and brighten their text;
  `.ep-evfoot` carries the rollup line.
- `.ep-ticker` > `.ep-live` + `.ep-tape`: the tape. Cells `span` with `b`
  symbol; `.dn` marks down quotes; duplicate the cell run once with
  `aria-hidden="true"` for the seamless loop. Reads statically from its
  start; motion dies under reduced-motion and print.
- `.ep-cursor` (blink), `.ep-scan` > `i` (scanning bar) + `.ep-wait`
  (loading panel), `.ep-empty` (terse system line + bracket action),
  `.ep-errline` (inverted `[FAIL]` flag line + `[ RETRY ]`).
- Controls: `.ep-btn` (bracket button; `.pri` accent text, `.fill` the one
  accent-filled action, `[disabled]`), `.ep-iwrap` + `.ep-input` (bracket
  input), `.ep-sel` (select), `.ep-chip` (`.on` active), `.ep-kbd`,
  `.ep-bar` (control strip inside a panel), `.ep-sp`, `.ep-stamp`.
- `.ep-sheet` > `.ep-spec`: component sheet cells.
- Utilities: `.ep-acc`, `.ep-mut`, `.ep-dim`, `.ep-k`, `.ep-sp`,
  `.ep-noprint` (hide chrome in print).

## Building charts and instruments (inline SVG + CSS, zero JS)

Charts are hand-authored inline SVG styled entirely from foundation custom
properties via presentation attributes (`stroke="var(--chart-series)"`).
`svg text` inherits mono automatically. The vocabulary:

- **Stepped series**: `<path>` with H/V segments only,
  `shape-rendering="crispEdges"`, `stroke="var(--chart-series)"`,
  width 1.6. Steps, never curves - the instrument reports, it does not
  draw.
- **Dot grid**: an SVG `<pattern>` of 1.4px squares on a 4px grid filled
  `var(--chart-grid)`, one `<rect>` per level; the baseline is a solid
  `var(--chart-axis)` line.
- **Axis labels**: `<text text-anchor="end" font-size="9"
  fill="var(--chart-label)">` at the left margin; time labels along the
  baseline.
- **End label**: a 7px square (`<rect>`) at the last point + accent mono
  text (the current value) anchored end - squares, not dots.
- **Annotation**: dashed vertical line
  (`stroke="var(--chart-annotate)" stroke-dasharray="2 4"`) + a 9px label
  ("halt · bight 13:42"). One annotation explains a move; more than two is
  noise.
- **Dot-matrix bars**: an SVG `<pattern>` of 3px squares on a 5px grid
  filled `var(--chart-series)`; the leader bar at full opacity, the rest at
  `opacity="0.55"` - dimmed, never re-hued. Value label above the leader
  only; category tags below in `var(--chart-label)`.
- **Sparks**: 96x24 stepped `<path>` `stroke-width="1.5"` -
  `var(--chart-series)` when the delta is favorable, `var(--chart-series-dim)`
  when not. Square end marker.
- **Dot-matrix calendar/strip**: 6px squares - bright `var(--accent)` up,
  `var(--matrix-dim)` down, gap = closed, with a muted one-line legend.
- **LED meters** (CSS, not SVG): `.ep-led i` paints the dot field from
  custom properties; set only `--w` (and `.dim`).
- Every chart carries `role="img"` and a sentence `aria-label` describing
  the trend and levels.
- Chart custom properties follow the token rule: if a page needs a derived
  instrument color, define it as a `color-mix()` over an existing token,
  never a new hex.

## Structure of an instrument artifact

1. `.ep-top` (brand, env bracket, clock; theme toggle at the right).
2. `.ep-readout` wall (one or two five-cell rows; the watched instrument
   takes `.ep-sel`).
3. Panels in `.ep-cols`: the stepped chart beside readings; dot-matrix
   volume and LED meters; event feed; the tape pinned as a band.
4. Footer line: mono, muted - dataset provenance note.

Never restyle components for a section; compose the classes above. New page
regions are panels, not bespoke boxes.

## Tuning surface

Retuning happens in the `:root` token block only; everything below inherits.

- **Phosphor (the hue)**: the whole identity rides ONE hue, so a retune is
  a re-phosphoring: change the hue component of the text family (`--accent`,
  `--ink`, `--muted`, `--faint`, `--ok`, `--warn`, `--danger`) and of the
  warm ground family (`--bg`, `--surface`, `--surface-2`, `--sunken`,
  `--line`, `--line-soft`, `--accent-ink`) TOGETHER - amber 72-90, green CRT
  ~145. Keep every luminance step and re-run contrast: text slots must
  clear AA on their grounds in both schemes. `--accent-soft`,
  `--chart-fill`, and `--matrix-dim` derive via `color-mix()` automatically.
- **Intensity ladder semantics are inherited structure**: accent > ink >
  muted > faint, severity = [ OK ] outline / [WARN] mid fill / [FAIL]
  accent fill, deltas bright-favorable. A derived instrument may not
  re-map severity to a second hue - the single-hue contract is the
  identity's gate and survives every derivation.
- **Fonts**: the base contract is one system mono, and the file ships no
  webfonts. An upgrade path may prepend one self-hosted or system-present
  mono family to `--mono`; never load a webfont that the page depends on,
  never add a proportional face.
- **Radius**: `--radius` (2px) and `--r-sm` (1px) are the ladder. The
  instrument reads square; nothing goes rounder than 2px and there are no
  pills.
- **Density**: base size is 12.5px on `body`. A wallboard/kiosk variant is
  a density retune (bump base size, keep the components); it needs no new
  components.
- **Scheme lead**: the file pins dark (the canonical side). To lead light
  instead, swap the pin on `:root` and make the light column canonical -
  keep both value sets, keep light-dark() slot 1 = light, and rely on the
  print block's root pin for paper.
- **What inherits unchanged**: the component structure, the `.ep-` class
  grammar, the ladder and bracket semantics above, the chart vocabulary,
  and the pack's logic. Do not add new component classes for a retune.
- **Lane mechanics**: forking this identity into a derived one means
  renaming the `.ep-` prefix (pick a new two-letter namespace and rename
  every class and the `ep-` keyframe names consistently) and keeping chart
  custom properties derived from tokens per the rule above.

## Theme toggle (the only sanctioned JS)

```js
var root = document.documentElement;
btn.addEventListener('click', function () {
  root.style.colorScheme = root.style.colorScheme === 'dark' ? 'light' : 'dark';
});
```

Flip `color-scheme` on `html` only. No class swapping, no stylesheet swap,
no localStorage requirement (persistence is allowed but optional). The page
must fully render with this script removed.

## Print and reduced motion

Print rules ship in the file: the print media query re-inks every token to
its light values via the scheme flip (no hand-recoloring), `.ep-noprint`
chrome drops out, the tape stops, the cursor dies, panels never split across
pages, and a plain page counter folio ships via the `@page` margin box.
`prefers-reduced-motion` kills the blink, tape, sweep, and transitions. Do
not add print overrides.

## Do not

- Do not introduce a second hue - not for states, not for charts, not for
  links. If something feels like it needs red or green, the answer is the
  brightness ladder and the bracket grammar.
- Do not use sans-serif anywhere or load webfonts; mono is the medium.
- Do not add dense ops tables (sort/filter/pagination machinery) or
  health-dot rows (LED dots) - readings are bracket rows and readout walls.
  Ops consoles live in night-ops; this is the instrument.
- Do not add rounded bento cards, soft pills, progress goals, or
  encouragement copy - tally-board owns those. No double rules -
  paper-ledger owns those.
- Do not put muted text on washes: washed surfaces (fail rows, selected
  cells, active chips) carry accent or ink text only, and the selected cell
  mixes its wash opaquely over `--surface`.
- Do not restyle foundation classes per project. Branding happens via the
  brand slot and tokens, never by editing component rules.
- Do not add `!important`, new `@layer`s, or `data-theme` attribute logic.
- Do not round past `--radius` or add shadows - the instrument is flat.
- Do not fake data: no series without a window, no values without a kicker,
  no deltas without a comparison, no events without timestamps.
