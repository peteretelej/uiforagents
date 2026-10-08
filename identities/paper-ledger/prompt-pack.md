# paper-ledger - Agent Prompt-Pack

You are building with the **paper-ledger** design identity: a light
print-precision analytics identity for self-contained HTML artifacts that
carry numbers people have to trust - quarterly statements, cost reports,
audits, invoices, board packs, analytics snapshots. The design decisions are
already made. Follow this pack exactly; do not improvise visual design.

The identity is one stylesheet, `foundation.css`. It carries the tokens,
base typography, components, the print stylesheet, and both themes. You write
content and page-specific layout only.

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

- **Fonts: sans statement, mono figures.** The system sans (`--sans`) sets
  prose, headings, and button labels at 14px/1.55. Everything that is a
  numeral, table head, label, delta, badge, date, footnote, or source line is
  the system mono (`--mono`) with lining tabular figures -
  `font-variant-numeric: lining-nums tabular-nums` is already enforced on
  `.pl-v`, `.pl-d`, `.pl-tbl td`, `.pl-var`, and `.pl-pager`. Figures are
  never proportional and tabular figures never leak into prose. Never
  introduce another font family, never load webfonts, never use a serif.
- **Color: ink on paper, one ink-blue accent, color only as state.** Cool
  paper ground (`--bg`), white surfaces (`--surface`), near-black ink
  (`--ink`), softening to `--muted`/`--faint`. The deep ink-blue
  `--accent` is reserved for the document's rubric voice: the brand
  separator, footnote markers, favorable/positive figures, sparklines and
  end-labels, quiet actions, and the focus ring. It never decorates and
  never fills panels. Green (`--ok`), amber (`--warn`), and red (`--danger`)
  appear ONLY where they encode state - badges, dots, variance. There are no
  shadows and no gradients anywhere; elevation is a rule.
- **The rule hierarchy is arithmetic notation, not decoration.** A hairline
  (`--line`) separates rows; a strong rule (`--line-strong`) bounds blocks,
  column groups, and statement sections; the single accounting rule
  (`--rule-sub`) under a subtotal means "the figures above sum to the figure
  below"; the double rule means "proved final - nothing prints below it".
  Accounting rules run under the figure columns only (`.pl-sub td.num`,
  `.pl-total td.num`), never across the label column: a rule under numbers
  is arithmetic, a rule across the row is a divider. Remove every rule that
  carries no meaning.
- **Accounting conventions are part of the grammar.** Negatives print in
  parentheses; zeros print as a dash; the currency symbol appears on the
  first figure of a column and on totals only; units and rounding are stated
  once in the heading or period line ("usd, whole dollars"); line items
  indent one level under their group (`.indent`); subtotals outdent back to
  group level (`.pl-sub`); figures must foot, or the notes carry a rounding
  note. Column order and precision never change mid-document.
- **Variance reads favorable/unfavorable, not direction.** `.pl-var.up` /
  `.pl-d.up` mean good (green), `.down` means bad (red), `.flat` is muted -
  churn falling is `.up`. Every delta names its comparison basis
  ("vs q2", "vs jun 30"). A strictly direction-only variant is a sanctioned
  retune (see Tuning surface), not a per-project choice.
- **Dual theme is built in**: every token is a `light-dark()` pair and
  `:root` pins the identity's lead scheme, light. The light values are
  canonical; the dark values are the derived alternative. A toggle flips
  `html.style.colorScheme`. Keep the scheme property on `html`/`:root`; do
  not create `data-theme` blocks, duplicate token lists, or theme by setting
  the scheme on wrappers.
- **Precision is calm.** Spacing is generous but rhythmic; the radius ladder
  is `--r-sm` (2px, badges and skeleton bars) and `--radius` (4px,
  controls and boxes); pills and chips are the only 99px shapes. Alignment
  does the work decoration would do: figures right-aligned under
  right-aligned heads (`.num` + `th.num`), labels left, heads aligned with
  their data.
- **Motion is nearly absent**: the loading-skeleton pulse is the only
  animation, plus short hover/focus transitions. Everything honors
  `prefers-reduced-motion` and print automatically.
- **Honest documents**: source lines (`.pl-src`), footnotes (`.pl-notes` +
  `.pl-fnref`), rounding notes, running heads and folios are part of the
  grammar - use them. State the dataset provenance; figures are synthetic.

## Component inventory (use these classes; do not restyle or substitute)

- `.pl-wrap`: 1160px page container. `.pl-cols`: two comparison columns with
  a vertical hairline between; `.pl-sec` scaffolds a section.
- `.pl-masthead`: the brand bar, closed by the 3px double rule. Contains
  `.pl-brand` (`<span>` renders the accent separator), `.pl-stmt` (tracked
  mono qualifier such as "unaudited"), `.pl-date` (right-aligned mono).
- `.pl-statement`: the three-part statement heading - `.pl-entity`,
  `.pl-title`, `.pl-period` (period + currency + rounding in tracked mono
  uppercase).
- `.pl-h`: block head (tracked uppercase `h3` + right-aligned mono
  `<small>` for period/units). `.pl-take`: the one reading under a head.
- `.pl-kpis` > `.pl-kpi`: the 5-up summary row with vertical hairlines.
  Each card: `.pl-k` kicker, `.pl-v` mono value (`<small>` for units),
  `.pl-d` delta (`.up`/`.down`/`.flat`, always names its comparison).
- `.pl-tblwrap` + `.pl-tbl`: the table. `th.num`/`td.num` right-aligned mono
  figures, `td.lbl` item labels, `td.mono` secondary mono, `td.dim` muted
  figures, `.neg` parenthesized negatives, `.pos` accent positives.
  `.pl-tbl--simple` closes with a double rule.
- Ledger rows (the signature): `.pl-grp` group label row (no figures, own
  space); `.pl-sub` subtotal - single accounting rule under its figures;
  `.pl-total` grand total - double rule under its figures; `.pl-open` /
  `.pl-close` opening/closing balance rows (italic opening; closing
  double-ruled). `.pl-tbl--ledger` sets the fixed 34px rows and the
  increase/decrease + running-balance column grammar.
- Table states: `th` sort glyph, `.pl-chips` removable filter chips
  (`.x` remove, dashed `+ add filter`), `.pl-pager` pagination with
  `entries x-y of n`, `.pl-empty` (dash glyph + clear action),
  `.pl-skrow` loading skeletons, `.pl-alert` error (`.t` title, `.m`
  message, `.ref` mono reference code, retry in `.pl-btnrow`).
- `.pl-tabs`: period selector. `.on` is the active quarter (accent
  underline), `.off` a disabled period; plain `span`s are selectable.
- `.pl-badge` outline chips (`.ok`/`.warn`/`.fail`/`.neutral`/`.accent`);
  `.pl-dot` state dots (`.ok`/`.warn`/`.fail`).
- `.pl-var`: inline variance (`up`/`down`/`flat`, `<small>` carries the
  comparison). `.pl-spark`: 96x24 sparkline column (`--dim` for
  favorable-decline series); see charts below.
- Charts: `.pl-figblock` (atomic in print) wrapping `.pl-h` + `.pl-take` +
  `figure.pl-fig` > `svg.pl-chart` + `figcaption.pl-figcap`.
- Footnotes: `.pl-fnref` superscript markers in cells; `.pl-notes` mono note
  zone under a strong rule; `.pl-src` tracked uppercase source line.
- Furniture: `.pl-runhead` (entity bold, section right), `.pl-folio`
  (provenance left, page right), `.pl-pagebox` a framed specimen of a page.
- Controls: `.pl-btn` (`--primary` ink fill / `--secondary` hairline /
  `--quiet` accent text, disabled), `.pl-field` with `.pl-label` + `.pl-hint`,
  `.pl-input` (`.pl-input--err` + `.pl-errmsg`), `.pl-select`.
- Component-sheet specimens: `.pl-rules` rule ladder, `.pl-swatches` token
  swatches, `.pl-tnum` proportional-vs-tabular proof, `.pl-darkproof` a
  strip with `color-scheme: dark` scoping that proves the second half of
  every token with zero JS.
- `.pl-mob`: the compact treatment for narrow containers (KPIs 2-up, tighter
  tables). The page itself also stacks via the 860px/560px rules.
- Utilities: `.pl-noprint` (hide chrome in print).

## Building charts and figures (inline SVG, zero JS)

Charts are hand-authored inline SVG styled entirely from foundation custom
properties via presentation attributes (`stroke="var(--chart-series)"`).
`svg text` inherits mono automatically. Charts must survive grayscale and
photocopying: lightness and pattern carry series identity, never hue. The
vocabulary:

- **Grid**: dashed horizontal `<line>`s per level with
  `stroke="var(--chart-grid)" stroke-dasharray="2 4"`; the baseline is the
  only solid rule, `stroke="var(--chart-axis)"` - matching table grammar.
- **Axis labels**: `<text text-anchor="end" font-size="10"
  fill="var(--chart-label)">` at the left margin; period labels under the
  baseline; units live in the block head (`small`), not the chart.
- **Series**: one hue at several ink weights. Leader series solid
  `var(--chart-series)`; secondary at `opacity="0.45"` (bars) or `0.55` /
  `0.25` (stack layers); a third series takes the 45-degree hatch -
  define `<pattern id="...-hatch" patternTransform="rotate(45)"><line
  stroke="var(--chart-series)" stroke-width="1.4"></line></pattern>` and
  fill with `url(#...-hatch)`.
- **Value labels**: above bars or stack totals in
  `fill="var(--chart-value)"`; the leader/last value prints in accent.
- **Line charts**: `<polyline fill="none" stroke="var(--chart-series)"
  stroke-width="1.8">`. Quarter closes are pinned with ring markers
  (`<circle fill="var(--surface)" stroke="var(--chart-series)"
  stroke-width="1.4">`); the final point is a solid dot with the end value
  printed in accent beside it.
- **Sparklines**: `svg.pl-spark` 96x24 with one polyline and an end dot;
  `.pl-spark--dim` for a series whose decline is the good outcome.
- Every chart carries `role="img"` and a sentence `aria-label` describing
  the trend and peak; `figcaption.pl-figcap` numbers it ("fig. 2 · ...").
- Chart custom properties follow the token rule: if a page needs a derived
  chart color, define it as a `color-mix()` over an existing token, never a
  new hex.

## Structure of a statement artifact

1. `.pl-masthead` (brand, qualifier, date; theme toggle at the right).
2. `.pl-statement` three-part heading: entity / statement title / period +
   currency + rounding. The double rule closes it.
3. `.pl-kpis` summary row with deltas that name their comparisons.
4. Sections in `.pl-sheet` blocks (one per print page candidate): each opens
   with `.pl-runhead` on continuation pages, a `.pl-h` + `.pl-take`, then
   ledger tables, comparison columns, or chart figures.
5. `.pl-notes` + `.pl-src` close every sheet: footnotes, source, page label.
6. Screen-only material (component sheet, states gallery, print spec) is
   marked `.pl-noprint` so the printout stays the statement.

Never restyle components for a section; compose the classes above. New page
regions are statement sections, not bespoke boxes.

## Tuning surface

Retuning happens in the `:root` token block only; everything below inherits.

- **Accent**: swap the ink-blue pair (`--accent`; slot 1 = canonical light,
  slot 2 = derived dark). `--accent-soft` washes, `--chart-series`, and the
  hatch derive from it automatically. `--accent-ink` is the text that sits
  ON accent fills - keep it passing contrast against the new accent.
- **Neutral tint**: the paper/ink family sits on one cool hue (250-260).
  Re-tint by changing the hue component of `--bg`, `--surface`, `--line`,
  `--line-strong` together; keep the luminance steps. `--ink`/`--muted`/
  `--faint` sit a step over on hue 260. Warm-paper variants (FT-style)
  move the whole family, never one token.
- **Fonts**: the base contract is system sans + system mono, and the file
  ships no webfonts. An upgrade path may prepend one self-hosted or
  system-present family to `--sans`/`--mono`; never load a webfont that the
  page depends on.
- **Radius**: `--r-sm` (2px) and `--radius` (4px) are the whole ladder.
  Retune together; nothing goes rounder than 4px except the 99px pills.
- **Density**: base statement size is 14px on `body`; `.pl-mob` is the
  compact treatment. A denser desk variant is a density retune (base size,
  paddings), not new components.
- **Scheme lead**: the file pins light (the canonical side). To lead dark
  instead, swap the pin on `:root` and make the dark column canonical -
  keep both value sets, keep light-dark() slot 1 = light, and rely on the
  print block's root pin for paper.
- **Variance semantics**: favorable/unfavorable is the shipped reading. A
  direction-only variant (`.up` always green) is a pack-level retune: swap
  the class semantics and document it - never per page.
- **What inherits unchanged**: the component structure, the `.pl-` class
  grammar, the rule hierarchy and its arithmetic meaning, the accounting
  conventions, the chart vocabulary, and the pack's logic. Do not add new
  component classes for a retune.
- **Lane mechanics**: forking this identity into a derived one means
  renaming the `.pl-` prefix (pick a new two-letter namespace and rename
  every class and the `pl-pulse` keyframe consistently), keeping the
  rule-pair tokens (`--rule-sub` and friends) derived from the same token
  rule, and keeping chart custom properties derived from tokens.

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

Print is the signature, and it ships in the file: the print block pins the
light scheme at `:root` (re-inking every token for paper - nothing is
hand-recolored), softens the line tokens one step, repeats real `thead`s on
continued pages, never tears a row (`tr { break-inside: avoid }`), binds
headings forward, drops `.pl-noprint` chrome, and sets the folio via the
`@page` margin box (`counter(page) of counter(pages)`; folios need Chromium
131+ and degrade harmlessly - the repeated heads carry the continued-page
context). `prefers-reduced-motion` kills the skeleton pulse and
transitions. Do not add print overrides; compose statement sections and let
the stylesheet paginate.

## Do not

- Do not add fonts, shadows, gradients, or new colors. If a color is
  missing, the answer is a token from the reference table in `demo.html` or
  a `color-mix()` over one - never a hex code.
- Do not restyle foundation classes per project. Branding happens via the
  brand slot and tokens, never by editing component rules.
- Do not add `!important`, new `@layer`s, or `data-theme` attribute logic.
- Do not use rules as decoration: no rule across a label column, no double
  rules anywhere but proved totals and statement boundaries.
- Do not set figures in proportional figures, center table content, or
  right-align labels. Alignment is the identity.
- Do not fake data: no series without axes, no figures without a source
  line, no totals that do not foot (carry a rounding note), no deltas
  without a comparison basis.
- Do not use green/amber/red as decoration or for links; they encode state
  only, in the components above. Accent marks rubric voice, favorable
  figures, and quiet actions - body text stays ink.
