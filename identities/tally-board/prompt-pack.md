# tally-board - Agent Prompt-Pack

You are building with the **tally-board** design identity: a warm-light
personal tracking identity for self-contained HTML artifacts - habit boards,
budgets, training weeks, streak pages, weekly reviews, family or chama
trackers. The design decisions are already made. Follow this pack exactly; do
not improvise visual design.

The identity is one stylesheet, `foundation.css`. It carries the tokens, base
typography, components, the print section, and both themes. You write content
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
- Token baseline: values are `light-dark()` pairs, which need Chrome 123+,
  Firefox 120+, or Safari 17.5+. No fallback ships; that is accepted for
  this lane.

## Identity contract

- **Fonts: sans prose, rounded numerals.** The system sans (`--sans`) sets
  every word: headings, labels, copy, pills, table text. Numerals that carry
  data (`.tb-v`, `.tb-mini`, ring centers, `.tb-tbl .num`, `.tb-rank .v`) are
  the rounded display stack (`--display`: ui-rounded / SF Pro Rounded with a
  sans fallback) at weight 800 with tabular figures - bold, friendly, never
  mono. Never introduce another font family, never load webfonts.
- **Color: cream, terracotta, and two warm states.** Cream ground (`--bg`),
  warm-white cards (`--surface`), softening neutrals (`--muted`, `--faint`),
  sunken wells (`--sunken`). The terracotta pair works as a split: `--accent`
  (0.60) FILLS things - track fills, ring arcs, bars, area washes - and never
  carries text; `--accent-deep` (0.50) is the text-safe accent for quiet
  buttons, links, deltas, the date pill, and the primary button fill.
  `--accent-ink` is the text that sits on deep fills. Green (`--ok`) and amber
  (`--warn`) appear only where they encode state. There is **no danger color
  and no severity grammar anywhere**: a miss is a warn with a next step, never
  an alarm. That is the identity's gate - do not reintroduce red.
- **The progress grammar is the raw material.** Every goal, budget, or streak
  on the board reads through the same three parts:
  - `.tb-track` is the period's whole capacity (always 100%).
  - `.tb-fill` is the actual to date; width is the fraction used/done. It may
    take `.ok` (done) or `.warn` (behind / over) to color the verdict.
  - `.tb-target` is the pacing tick: where you meant to be by today. Position
    it with `--target` (a percentage of the track). Fill short of the tick
    reads behind at a glance; past the tick reads ahead. A goal with no pacing
    story ships no tick.
  - `.tb-mini-track` is the same grammar inline in tables and rows.
- **Rings are pacing gauges.** `.tb-ring` takes `--p` (fraction done, 0-1)
  and `--ring` (the verdict color: `var(--accent)` on pace, `var(--ok)` done,
  `var(--warn)` behind). The center holds the percentage and the count. Ring
  color is a verdict, not decoration: pick it from the pacing story.
- **Heat cells are effort density.** `.tb-heat` is a column-per-week grid
  (`.h1`-`.h4` mix accent into the well at 25/45/70/100%; a bare `<i>` is the
  empty well). Caption every heat with `.tb-heat-cap` and include the
  `.tb-heat-key` ladder so the scale is readable.
- **Two-state pills only.** `.tb-pill.ok` and `.tb-pill.warn` are the whole
  state vocabulary, with warm words ("on track", "slow down", "lagging",
  "done - renews nov 1"). A `button.tb-pill.ok` is the gentle action pill
  (setup CTAs, retry). No failure tokens, no severity ladders, no log-style
  content - this is a personal board, not ops.
- **Encouragement is grammar, not garnish.** `.tb-take` is the one-line
  reading under each card head; `.tb-cheer` is the page-level line under the
  topbar; `.tb-record` flags a record once, not everywhere. Copy names real
  next steps ("thursday?", "$16 left with nine days to go") and stays kind
  about misses - the flu week still landed 19.
- **Deltas name their comparison.** `.tb-d.up` is good (ok), `.down` is
  caution (warn), `.flat` is muted; every delta carries its basis in words
  ("best since june", "of $810 budgets"). Direction alone is never the story.
- **Dual theme is built in**: every token is a `light-dark()` pair and
  `:root` pins the identity's lead scheme, light. The light values are
  canonical; the dark values are a warm-dark derivative. A toggle flips
  `html.style.colorScheme`. Keep the scheme property on `html`/`:root`; do
  not create `data-theme` blocks, duplicate token lists, or theme by setting
  the scheme on wrappers.
- **Soft is the body, hairlines are the joints.** Cards are 14px-rounded with
  the identity's one soft shadow; controls are `--r-md` (12px); pills, tracks,
  and the period switcher are 99px; heat cells are 3.5px-rounded squares.
  Hairlines (`--line`, `--line-soft`) separate rows inside cards. Nothing is
  sharper than `--r-sm`, nothing rounder than 99px.
- **Motion is one pulse.** The loading state (`.tb-v.pulse`) breathes on the
  value; that and short hover/focus transitions are all. Everything honors
  `prefers-reduced-motion` and print automatically.
- **Honest boards**: state the dataset provenance in a footer line; figures
  are synthetic; a chart without axes or a count without a period is fake
  data and does not ship.

## Component inventory (use these classes; do not restyle or substitute)

- `.tb-wrap`: 1120px page container. `.tb-sec` scaffolds a section.
  `.tb-bento` (1.55fr/1fr) and `.tb-cols` (1fr/1fr) are the card grids;
  `.tb-stack` stacks two cards; `.tb-gap` closes a row.
- `.tb-top`: brand bar - `.tb-brand` (`<span>` renders the accent dot),
  `.tb-right` holds `.tb-period` (week/month/year chips, `.on` active) and
  `.tb-date` (accent-wash period pill). `.tb-cheer` sits under the topbar.
- `.tb-stats` > `.tb-stat`: the headline row (up to 4). Each: `.k` kicker,
  `.tb-v` rounded value (`<small>` for units), `.tb-d` delta, and at most one
  `.tb-record` flag.
- `.tb-card`: the bento card. `h3` is the tracked uppercase head, `.tb-take`
  the reading, `.tb-record` the record flag.
- Progress: `.tb-track` > `.tb-fill` (`.ok`/`.warn`) + `.tb-target`
  (`--target`); `.tb-prog` > `.tb-prog-row` (label + count) pairs them;
  `.tb-mini-track` for tables and rows.
- Rings: `.tb-rings` > `figure.tb-ringwrap` > `.tb-ring` (`--p`, `--ring`) >
  `svg` (two `circle`s, r=52) + `.tb-ring-c` (b = %, span = count), with
  `figcaption` (b = name, span = the next step).
- Heat: `.tb-heat` (grid-auto-flow: column, 7 rows) of bare/`.h1`-`.h4` `<i>`s,
  `.tb-heat-cap` + `.tb-heat-key` ladder beneath.
- Charts: `.tb-chart` SVG + `.tb-figcap` caption (see vocabulary below).
- `.tb-tblwrap` + `.tb-tbl`: the friendly budget-vs-actual table. `th.num`/
  `td.num` right-aligned rounded figures, `td.what` holds the name and its
  `.tb-mini-track`, verdicts are `.tb-pill`s. Keep tables small; a tracker
  with an audit table has left the identity.
- `.tb-pill` (`.ok`/`.warn`; `button.tb-pill.ok` for gentle actions),
  `.tb-rank` toplist (`.bar` with `--w`, `.n`, `.v`), `.tb-rowlist` /
  `.tb-row` (`.dot.ok`/`.dot.warn`, `.n`, `.m`, pill).
- `.tb-ev` "Lately" timeline: `time` (day, uppercase) + `.t` text with `<b>`
  highlights.
- States: `.tb-empty` (bold lead-in + setup pill), `.tb-v.pulse` (loading),
  `.tb-retry` (gentle retry card).
- Controls: `.tb-btn` (`--primary` terracotta fill / `--ghost` hairline /
  `--quiet` accent text, disabled), `.tb-field` with `.tb-label` + `.tb-hint`,
  `.tb-input`, `.tb-select`.
- Component-sheet specimens: `.tb-swatches` token swatches, `.tb-darkproof` a
  strip with `color-scheme: dark` scoping that proves the second half of
  every token with zero JS.
- `.tb-mob`: the compact treatment for narrow containers (stats 2-up, bento
  stacks, tighter tables). The page itself also stacks via the 860px/560px
  rules.
- Utilities: `.tb-noprint` (hide chrome in print).

## Building charts (inline SVG, zero JS)

Charts are hand-authored inline SVG styled entirely from foundation custom
properties via presentation attributes (`stroke="var(--chart-series)"`).
`svg text` inherits the sans automatically; numerals inside charts may set
`font-family="var(--display)"`. The vocabulary:

- **Smooth hero (line/area)**: `<polyline fill="none"
  stroke="var(--chart-series)" stroke-width="2.5" stroke-linecap="round"
  stroke-linejoin="round">` over a closed `<path>` area at
  `fill="var(--chart-series)" opacity="0.08"`. End dot: `<circle r="4.5"
  fill="var(--chart-series)" stroke="var(--surface)" stroke-width="2">` with
  the end value in `fill="var(--accent-deep)" font-weight="700"` beside it.
- **Grid + baseline**: dashed horizontals `stroke="var(--chart-grid)"
  stroke-dasharray="2 5"`; the baseline is the only solid line,
  `stroke="var(--chart-axis)"`. Axis labels `<text text-anchor="end"
  font-size="10" fill="var(--chart-label)">`; units live in the card head or
  the take, not the chart.
- **Weekly bars (rings/bars/heat are the identity's chart set)**: `<rect
  rx="8" fill="var(--chart-series)">`, value labels above in
  `fill="var(--chart-value)"`. Bar color carries the weekly outcome: the
  current week is accent, a full week is `var(--ok)`, a missed week is
  `var(--warn)` - exactly the pill grammar in bar form. The target is a
  dashed `var(--accent-deep)` line (`stroke-dasharray="5 4"`) labeled at its
  right end.
- **Rings** are the CSS component above, not SVG paths - one `<svg
  viewBox="0 0 120 120">` with two `<circle cx="60" cy="60" r="52">`s
  (`.track` + `.arc`); the dashoffset math lives in the stylesheet from
  `--p`. Never hand-compute dash offsets per page.
- **Heat** is the CSS component above; a calendar-month variant is the same
  ladder at larger cells, never a new color scheme.
- Every chart carries `role="img"` and a sentence `aria-label` describing the
  trend and its story ("rising to a record 12.4 km on the eighth").
- Chart custom properties follow the token rule: if a page needs a derived
  chart color, define it as a `color-mix()` over an existing token, never a
  new hex.

## Structure of a tracker artifact

1. `.tb-top` (brand, period switcher, date pill; theme toggle at the right).
2. `.tb-cheer` - one honest, kind line about the period.
3. `.tb-stats` headline row (streak, loops, left-to-spend, the year goal).
4. Bento sections: overview (hero chart + budget card + streak heat), rings,
   weekly bars, budget-vs-actual table, progress lists (toplist + goal rows),
   "Lately".
5. Footer line: small, muted - dataset provenance and the synthetic-data note.

Never restyle components for a section; compose the classes above. New page
regions are cards in the bento, not bespoke boxes.

## Tuning surface

Retuning happens in the `:root` token block only; everything below inherits.

- **Accent**: swap the terracotta pair (`--accent`; slot 1 = canonical light,
  slot 2 = derived dark) and keep the split intact: `--accent` fills,
  `--accent-deep` (retune it to stay AA against `--bg`/`--surface`) carries
  text, `--accent-ink` is text on deep fills. `--accent-soft`, `.tb-rank .bar`,
  the heat ladder, and button haws derive via `color-mix()` automatically.
- **Neutral tint**: the whole ground family sits on one warm hue (60-85).
  Re-tint by changing the hue component of `--bg`, `--surface`, `--sunken`,
  `--line`, `--line-soft` together; keep the luminance steps. `--ink`/
  `--muted`/`--faint` sit a step over on hue 60-70. The derived dark is the
  same family at hue 70-80 - retune it in step, never separately.
- **Fonts**: the base contract is system sans + system rounded display, and
  the file ships no webfonts. An upgrade path may prepend one self-hosted or
  system-present family to `--sans`/`--display`; never load a webfont that
  the page depends on.
- **Radius**: `--radius` (14px, cards), `--r-md` (12px, controls), `--r-sm`
  (6px, small specimens) are the ladder. Retune together; pills and tracks
  stay 99px.
- **Density**: base board size is 15px on `body`; `.tb-mob` is the compact
  treatment. A denser daily-view variant is a density retune (base size,
  paddings), not new components.
- **Scheme lead**: the file pins light (the canonical side). To lead dark
  instead, swap the pin on `:root` and make the dark column canonical - keep
  both value sets, keep light-dark() slot 1 = light, and rely on the print
  block's root pin for paper.
- **Progress-grammar semantics are inherited structure**: what fill, target
  tick, ring `--p`/`--ring`, heat levels, and the ok/warn ladder MEAN does
  not change under a retune. A derived board may re-word pill copy, but the
  two-state warmth (no severity grammar, no danger color) is the identity's
  gate and survives every derivation.
- **What inherits unchanged**: the component structure, the `.tb-` class
  grammar, the pacing semantics above, the chart vocabulary, and the pack's
  logic. Do not add new component classes for a retune.
- **Lane mechanics**: forking this identity into a derived one means renaming
  the `.tb-` prefix (pick a new two-letter namespace and rename every class
  and the `tb-pulse` keyframe consistently) and keeping chart custom
  properties derived from tokens per the rule above.

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

Print ships in the file, modestly: the print block pins the light scheme at
`:root` (nothing is hand-recolored), drops card shadows in favor of hairline
borders, hides `.tb-noprint` chrome and the controls row, keeps cards, rows,
and table rows from tearing, and sets a folio via the `@page` margin box
(`counter(page) of counter(pages)`). `prefers-reduced-motion` kills the
value pulse and transitions. Do not add print overrides; a printed board is
the same page tacked to the fridge.

## Do not

- Do not add red, severity ladders, alarm rows, log streams, or audit-dense
  tables. Two warm states are the whole ladder; a miss gets a warn and a
  next step.
- Do not put `--accent` under text or `--accent-deep` under nothing - the
  fill/text split is the accent system.
- Do not add fonts, gradients, or new colors. If a color is missing, the
  answer is a token from the reference table in `demo.html` or a
  `color-mix()` over one - never a hex code.
- Do not restyle foundation classes per project. Branding happens via the
  brand slot and tokens, never by editing component rules.
- Do not add `!important`, new `@layer`s, or `data-theme` attribute logic.
- Do not fake data: no series without axes, no streaks without a period, no
  deltas without their comparison, no budget rows that do not add up.
- Do not set data numerals in the plain sans or mono - the rounded display
  stack is the voice of the board.
- Do not coach with shame. The copy celebrates streaks, forgives the flu
  week, and always names the next step.
