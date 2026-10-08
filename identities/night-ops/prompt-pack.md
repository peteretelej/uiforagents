# night-ops - Agent Prompt-Pack

You are building with the **night-ops** design identity: a dark ops console
for operational, data-dense, self-contained HTML artifacts - service
dashboards, incident views, log and cost consoles, CI/deploy boards, NOC
walls. The design decisions are already made. Follow this pack exactly; do
not improvise visual design.

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
  toggle (below); interactive controls (filtering, sorting, the command
  palette) may be wired with a few lines of page JS, and the page must
  render completely without it.

## Identity contract

- **Fonts: sans UI, mono counts.** The system sans (`--sans`) carries all UI
  text at 13px/1.5. Everything that is a numeral, timestamp, label, table
  header, chip, keycap, or code path is the system mono (`--mono`) with
  tabular figures - this identity counts in mono. Panel titles are 10px
  tracked uppercase mono (`.no-ph h3`, `.no-k`). Never introduce another
  font family, never load webfonts.
- **Color: cool dark, azure instrument, state-only color.** The canonical
  scheme is dark: cool near-black ground (`--bg` hue 255-260), raised
  surfaces (`--surface`, `--surface-2`), sunken wells (`--sunken`). Azure
  (`--accent`) is the instrument accent: live series, sparklines, active
  controls, the primary action, and metric end-labels. It never decorates
  and never marks state. Green (`--ok`), amber (`--warn`), and red
  (`--danger`) appear ONLY where they encode real state - LEDs, status
  chips, semantic deltas, threshold fills, error washes. A rising number is
  not green; fewer errors is.
- **Deltas are semantic, not directional.** `.no-pos` / `.no-neg` /
  `.no-neu` encode good/bad/neutral, never the arrow direction. `▲` on an
  error rate is red. Every delta names its comparison window ("vs tue").
- **Dual theme is built in**: every token is a `light-dark()` pair and
  `:root` pins the identity's lead scheme, dark.
  A toggle flips `html.style.colorScheme`. Keep the scheme property on
  `html`/`:root`; do not create `data-theme` blocks, duplicate token lists,
  or theme by setting the scheme on wrappers.
- **Density is console-grade**: hairline `--line-soft` inner rules and
  `--line` panel borders, 4/8 spacing rhythm, 1px-gap grids
  (`.no-kpis`) where the rule shows through. Radius ladder is 3/4/6px
  (`--r-sm`, `--radius`, `--r-lg`); pills/chips are the only 99px shapes.
  Elevation is a hairline everywhere; `--pop` shadow belongs to floating
  layers only (tooltip, modal, toast, palette).
- **Motion is functional and minimal**: the firing-alert pulse and loading
  shimmer are the only animations, plus short hover/focus transitions.
  Everything honors `prefers-reduced-motion` and print automatically.
- **Honest data**: partial intervals, freshness stamps (`.no-stamp`:
  "updated 12s ago"), "no data" uptime bars (`.no-up i.nd`), and event
  annotations on charts are part of the grammar. Use them.

## Component inventory (use these classes; do not restyle or substitute)

- `.no-top`: top bar on `--sunken`. Contains `.no-brand` (mono wordmark,
  `<i>` renders the accent slash), `.no-env` chip (environment/context),
  and `.no-right` with `.no-sync` (LED + freshness), `.no-clock`.
- `.no-wrap`: 1240px container. `.no-cols` (1.7fr/1fr main+side grid),
  `.no-cols.flip`, `.no-stack`.
- `.no-panel`: hairline panel. Header `.no-ph` holds `h3` (tracked
  uppercase mono) plus `.no-meta` (right-aligned mono context) or a
  `.no-tools` slot (chips/buttons in the header row). `.no-take` is the
  one-line reading under a header.
- `.no-filters`: the filter/time-range row. `.no-iwrap` + `.no-input` (text
  input; pair with a `.no-kbd` keycap such as `/`), `.no-sel` (styled
  select), `.no-chip` (filter chips; `.on` active, removable via `.x`,
  `.add` dashed "+ filter"), `.no-seg` (segmented 1H/24H/7D/30D time range),
  `.no-stamp` (LED + freshness). `.no-sp` is the flex spacer.
- `.no-kpis` > `.no-kpi`: the KPI strip. `.no-kpi.hero` leads with a large
  accent value. Each card: `.no-k` kicker, `.no-v` mono value, `.no-d`
  delta (`.no-pos`/`.no-neg`/`.no-neu`, always names its comparison),
  optional `.no-spark` sparkline (see charts below).
- `.no-rows` > `.no-hrow`: health rows. `.no-led` (`.ok`/`.warn`/`.fail`/
  `.neu`) + `.no-n` name + `.no-m` mono metric; `.no-rows-foot` carries the
  rollup count line.
- `.no-sg-grid` > `.no-sg`: status wall (NOC glance grid of LED + name +
  metric cells; worst state wins the rollup).
- `.no-twrap` + `.no-tbl`: dense table. `th.sort`/`.asc`/`.desc` sort
  grammar, `td.num` right-aligned mono figures, `td.svc` bold service
  names, `tfoot` totals band on `--sunken`. Tools row `.no-tbl-tools`
  (chips + `.no-cnt`), foot `.no-tbl-foot` + `.no-pag` pagination.
- Table states: `.no-empty` (+ `.no-eglyph`) - nothing exists yet, offer
  the creating action; `.no-nores` - filters too narrow, offer escape;
  `.no-sk-row` + `.no-skel` - loading skeletons replace rows, never chrome;
  `.no-errbox` - error with code + retry. `.no-state-grid` lays the four
  out.
- `.no-log` > `.no-lrow`: log stream. `time` gutter, `.no-lvl` level chip
  (`info`/`debug`/`warn`/`error`), `.no-src` source, `.no-msg` message;
  `.err` row takes the danger wash; `.no-log-foot` carries stream state.
- `.no-tl` > `.no-tlrow`: event timeline on a rail. `time` + `.no-node`
  (`.ok`/`.warn`/`.neu`) + `.no-tlbody` (`.no-t1` title, `.no-t2` mono
  meta).
- `.no-up` + `.no-up-cap`: 30-day uptime strip; per-day `i` bars
  (`.ok`/`.warn`/`.fail`/`.nd`), caption carries the % and worst days.
- `.no-meters` > `.no-mrow`: resource meters. `.no-meter i` fill width via
  `style="--w:84%"`, class `warn`/`fail` past threshold; `b` is the
  threshold tick; `.no-mrow-cap` the caption.
- `.no-bars` > `.no-brow`: top-N ranked bars. `.no-rk` rank, `.no-n` name,
  `.no-track > i` (width `--w`), `.no-val`. Bars scale to the max.
- `.no-alert`: alert row with `.no-sevrail` (`sev1`/`sev2`/`sev3`), main
  block (`.no-a-title`, `.no-a-meta` with lifecycle `.no-state`), and
  `.no-alert-side` (`.no-who` assignee monogram + actions). Firing alerts
  use `.no-state.fail.firing` (pulses; disabled under reduced motion).
- `.no-oc-row`: on-call roster row (`.no-who`, `.no-role`, `.no-nm`,
  `.no-till`).
- Controls: `.no-btn` (`pri`/`ghost`/`danger`/`sm`/`icon`, disabled),
  `.no-input` (`.bad` invalid), `.no-sel`, `.no-switch` + `.no-ctl`,
  `.no-chip`, `.no-kbd`, `.no-state` and `.no-tag` status markers, `.no-crumb`
  breadcrumbs, `.no-tabs` > `.no-tab` (+ `.no-cnt` badge), `.no-pag`.
- Floating layers (render statically in artifacts): `.no-tipwrap` +
  `.no-tip`, `.no-modal` (`-h`/`-b`/`-f`) over `.no-stage`, `.no-toasts` >
  `.no-toast` (`ok`/`warn`/`fail` icon `.no-ti`), `.no-cmdk` command
  palette (`.no-cmdk-in` prompt row, `.no-ci` items, `.on` selected).
- Utilities: `.no-mono`, `.no-dim`, `.no-mut`, `.no-acc`, `.no-pos`,
  `.no-neg`, `.no-neu`, `.no-k`, `.no-sp`, `.no-print` (hide chrome in
  print).

## Building charts and instruments (inline SVG, zero JS)

Charts are hand-authored inline SVG styled entirely from foundation custom
properties via presentation attributes (`stroke="var(--chart-series)"`).
`svg text` inherits mono automatically. The vocabulary:

- **Grid**: horizontal `<line>`s per level with
  `stroke="var(--chart-grid)"`; the baseline uses `var(--chart-axis)`.
- **Axis labels**: `<text text-anchor="end" font-size="10"
  fill="var(--chart-label)">` at the left margin; x labels along the
  baseline, end label `now` anchored end.
- **Series**: `<polyline fill="none" stroke="var(--chart-series)"
  stroke-width="1.8">`. Secondary/compare series: `var(--chart-series-dim)`
  at width 1.2, or the accent dashed (`stroke-dasharray="4 3"`). Legend
  chips: `.no-legend` with `.no-sw` (`.dash`, `.dim` variants).
- **Area fill**: close the path to the baseline with
  `fill="var(--chart-fill)"` under the primary line.
- **End label**: last-point `<circle r="3" fill="var(--chart-series)">` +
  accent mono text (the current value) anchored end above it.
- **Event annotation**: dashed vertical line
  `stroke="var(--chart-annotate)" stroke-dasharray="3 4" opacity="0.7"`
  plus a 9px label ("deploy v2.14.0 · 15:40"). One annotation explains a
  metric shift; more than two is noise.
- **Bar charts**: `<rect fill="var(--chart-series)">`, non-leader bars at
  `opacity="0.55"`, value label above the leader only, category labels
  below in `var(--chart-label)`.
- **Sparklines**: `<svg class="no-spark" width="132" height="30"
  viewBox="0 0 100 28">` with one `<polyline stroke-width="1.5">` -
  `stroke="var(--spark-pos)"` when the delta is good, `var(--spark-neg)`
  when bad. The spark color follows the delta, not the direction.
- Every chart carries `role="img"` and a sentence `aria-label` describing
  the trend, peak, and events.
- Chart custom properties follow the token rule: if a page needs a derived
  chart color, define it as a `color-mix()` over an existing token, never a
  new hex.

## Structure of an ops console artifact

1. `.no-top` (brand, env chip, sync LED, clock; theme toggle at the right).
2. `.no-filters` row (search with keycap, selects, region chips, `.no-seg`
   time range, freshness stamp).
3. `.no-kpis` strip (hero + 3-4 cards with deltas and sparklines).
4. Panels in `.no-cols` grids: charts and health rows/status wall on
   overview; meters, log stream, timeline, uptime on detail views; alert
   list + roster for incidents; totals table + top-N for cost.
5. Footer line: mono, faint - dataset provenance and provenance note.

Never restyle components for a section; compose the classes above. New page
regions are panels, not bespoke boxes.

## Tuning surface

Retuning happens in the `:root` token block only; everything below inherits.

- **Accent**: swap the azure pair (`--accent`; it is the light-dark() pair
  slot 1 = derived light, slot 2 = canonical dark). `--accent-soft`,
  `--chart-series`, `--chart-fill`, `--spark-pos`, and all active-control
  washes derive from it automatically. `--accent-ink` is the text that sits
  ON accent fills - keep it passing contrast against the new accent.
- **Neutral tint**: the whole ground family sits on one hue (255-260).
  Re-tint by changing the hue component of `--bg`, `--surface`,
  `--surface-2`, `--sunken`, `--line`, `--line-soft` together; keep
  luminance steps. `--ink`/`--muted`/`--faint` sit a step over on hue 260.
- **Fonts**: the base contract is system sans + system mono, and the file
  ships no webfonts. An upgrade path may prepend one self-hosted or
  system-present family to `--sans`/`--mono`; never load a webfont that the
  page depends on.
- **Radius**: `--radius` (4px) is the workhorse; `--r-sm` (3px) for chips,
  keycaps and small controls, `--r-lg` (6px) for floating layers. Retune
  the ladder together; nothing goes rounder than 6px.
- **Density**: base UI size is 13px on `body`. A wallboard/kiosk variant is
  a density retune (bump base size, keep the components); it needs no new
  components.
- **Scheme lead**: the file pins dark. To lead light instead, swap the pin
  on `:root` and make the light column canonical - keep both value sets,
  keep light-dark() slot 1 = light.
- **What inherits unchanged**: the component structure, the `.no-` class
  grammar, state semantics (state colors only ever encode state), the chart
  vocabulary, and the pack's logic. Do not add new component classes for a
  retune.
- **Lane mechanics**: forking this identity into a derived one means
  renaming the `.no-` prefix (pick a new two-letter namespace and rename
  every class and the `no-` keyframe names consistently) and keeping chart
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
its light values via the scheme flip (no hand-recoloring), `.no-print`
chrome drops out, panels and tables avoid page breaks, and motion dies.
`prefers-reduced-motion` disables the pulse, shimmer, and transitions. Do
not add print overrides.

## Do not

- Do not use green/amber/red as decoration, link color, or body text; they
  encode state only, in the components above. Accent marks live data,
  active controls, and the primary action - links and breadcrumbs stay
  muted/ink.
- Do not add fonts, gradients, or new colors. If a color is missing, the
  answer is a token from the reference table in `demo.html` or a
  `color-mix()` over one - never a hex code.
- Do not restyle foundation classes per project. Branding happens via the
  brand slot and tokens, never by editing component rules.
- Do not add `!important`, new `@layer`s, or `data-theme` attribute logic.
- Do not round past `--r-lg` or add shadows outside the floating layers.
- Do not center content or pad panels out of the 4/8 rhythm; density comes
  from hairlines and alignment, not from shrinking type.
- Do not fake data: no random-looking series without axes, no uptimes
  without the strip grammar, no alerts without lifecycle chips. If a number
  is shown, it has a kicker, a comparison where a delta exists, and a
  source window.
