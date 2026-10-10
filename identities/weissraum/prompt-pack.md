# weissraum - Agent Prompt-Pack

One-shot record: PASS 2026-10-12 - a fresh agent built an event/workshop
index from only this pack and `foundation.css`; identity-faithful, premium,
no design improvisation.

You are building with the **weissraum** design identity: the canonical light
Swiss portfolio system for self-contained HTML artifacts - studio
portfolios, case studies, about pages, one-page briefs. Paper-white canvas,
near-black grotesk display at poster scale, hairline structure, uppercase
mono micro-labels, and one Swiss-red accent that only appears when it has a
job. The design decisions are already made. Follow this pack exactly; do not
improvise visual design.

The identity is one stylesheet, `foundation.css`. It carries the tokens,
base typography, components, and print rules. You write content and
page-specific layout only.

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
- No JavaScript is required. The only sanctioned scripts are the optional
  theme toggle and the optional scroll reveal (both below); the page must
  render completely without either.

## Identity contract

- **The four laws hold everywhere.** Flush left: everything aligns left,
  ragged right; nothing is ever centered or justified. Flat: no shadows, no
  gradients, no gloss; separation comes from hairlines, whitespace, and
  alignment. Hairline-ruled: `1px solid var(--line)` is the only surface
  treatment; rules are full-width. One accent: red appears only where it has
  a job - links, active nav, and at most one highlighted figure per view.
- **Typography is the design.** Display: Archivo (or Inter Tight), weight
  600-700, tight tracking (-0.02em), at the poster steps 44/64/96px
  (`--text-display` clamps 44 to 96). Body: Inter, 17px (`--text-body`),
  measure 60-70ch (`--measure`). Micro-labels: IBM Plex Mono, 12px
  (`--text-micro`), uppercase, letter-spacing 0.08em. Three faces, no more;
  the stacks degrade to the Helvetica/Arial class with zero webfonts.
- **Hierarchy is size, not color.** Display is at least 3x body. If a page
  reads quiet, the answer is bigger type and more whitespace, never a new
  color. Never set body copy in muted or accent; muted is for secondary
  text and captions, faint only for index numbers and the quietest
  micro-type.
- **One accent, job only.** `--accent` (#D92B1C light) is for graphics and
  large elements; `--accent-ink` (#B3221A light) is accent as text and is
  contrast-safe. Accent moments per view: links, active nav, and at most one
  highlighted figure (`.wr-highlight`). Red is never decoration, never a
  status system, never body text.
- **Radius is 0px everywhere.** It is a law, not a token to retune. No
  pills, no rounded inputs, no soft cards.
- **Density is bimodal.** Whitespace dominates hero, statement, and studio
  zones; index tables and fact strips are deliberately dense. Do not blur
  the two: a sparse index or a cramped hero both break the identity.
- **Arrows are glyphs.** `→` for onward links and index rows, `↗` for
  outbound links only. Text glyphs, never an icon font, never inline SVG
  icons. Index numbers (`01`–`06`) ride nav, sections, rows, and figures in
  mono.
- **Motion is flavor, 150-250ms ease-out**: underlines draw in, arrows
  nudge 4px on hover, sections rise 8px on reveal. Never load-bearing;
  everything honors `prefers-reduced-motion`.
- **Dual theme is built in**: every token is a `light-dark()` pair and
  `:root` pins the identity's lead scheme, light (paper white is
  canonical; near-black is the derived alternative). A toggle flips
  `html.style.colorScheme`. Keep the scheme property on `html`/`:root`; do
  not create `data-theme` blocks, duplicate token lists, or set the scheme
  on wrappers.
- **The grid is present even when invisible.** Layouts sit on the 12-column
  grid (`.wr-grid`); asymmetry is the norm (7/5, 8/4, 5/7 spans). The grid
  collapses to one column under 640px.

## Component inventory (use these classes; do not restyle or substitute)

- `.wr-top` + `.wr-top-inner`: top bar with hairline bottom border.
  `.wr-brand` (wordmark, optional `sup` register mark), `.wr-nav` (mono
  links with `.wr-no` index numbers; `.on` marks the active page in accent;
  hover draws the underline), `.wr-toggle` (theme toggle, the only button
  chrome in the bar).
- `.wr-hero` + `.wr-display`: the statement hero. A `.wr-kicker` line above,
  1-5 word display line, then `.wr-hero-meta` (mono facts: location, focus,
  availability). `.wr-hero-meta span` renders the mono fact.
- `.wr-kicker`: the uppercase mono micro-label, the identity's wayfinding
  voice. `.wr-no` is the faint mono index number used inside kickers, nav,
  rows, and captions.
- `.wr-sec` + `.wr-sec-head`: one section with a hairline top rule; the
  head is a kicker row (section kicker left, aside right). `h2` inside takes
  `--text-head`.
- `.wr-wrap`: the 1280px canvas. `.wr-grid` is the 12-column grid with
  `--gutter` gaps; `.wr-span-3` through `.wr-span-12` set column spans.
  Under 640px every child collapses to full width.
- `.wr-index` + `.wr-row`: the work index. One anchor per row: `.wr-no`
  number, `.wr-title` (display 600), `.wr-cat` and `.wr-year` (mono caps),
  `.wr-arrow` at the end. Hover inverts the row to ink-on-paper swap
  (`--ink` fill, `--bg` text).
- `.wr-plate`: the image slot drawn typographically - hairline-framed,
  fixed aspect (4/3; `.wr-plate--wide` 16/9, `.wr-plate--tall` 3/4), flat
  `--surface` fill,
  an oversized display glyph or numeral (`b`), optional `.wr-plate-tag`
  (top-left mono caption) and `.wr-plate-grid` (exposed column rules).
  Wrap in `figure` with `.wr-figcap` (mono caption row: name, note, year).
- `.wr-facts`: the ruled facts table (dl). One hairline `--ink` rule on
  top, `--line-soft` rows; `dt` mono caps, `dd` small text. For client,
  scope, format, and studio facts.
- `.wr-split`: the about split - `.wr-claim` (oversized statement, title
  size) left, `.wr-body` (measured paragraphs) right; `.wr-facts` runs
  full-width beneath.
- `.wr-pull`: the statement line that carries an argument (head size,
  display face). Set it wide on the grid with a `.wr-sub` aside beside it.
- `.wr-btn`: thin-bordered rectangle, mono caps, hover inversion.
  `.wr-btn--accent` is the one accent-bordered action per page (use only
  where the action itself is the job). `[disabled]` goes faint.
  `.wr-btnrow` lays buttons out.
- `.wr-empty`: the empty well - hairline-framed surface, kicker, one muted
  sentence, one arrow link onward.
- `.wr-skel` + `.wr-skel-row`: loading placeholder rows shaped like index
  rows; bars sit on `--line-soft`. Static by contract - no shimmer - set
  each bar's width inline.
- `.wr-error`: the error line - surface cell, accent-ink kicker naming the
  failure, one muted sentence, a retry link.
- `.wr-tablewrap` + `.wr-table`: the data table (token sheets, spec
  lists). Mono faint headers over an ink rule; hairline rows. This is the
  sanctioned dense moment on documentation pages.
- `.wr-contact` + `.wr-mail`: the contact footer. Kicker, oversized line,
  display-size mailto link, then `.wr-sub` (the quiet sentence under a
  statement). `.wr-colophon` is the micro-type row under the hairline
  (© year, location, coordinates, type credits).
- `.wr-appendix`: documentation sections BELOW the footer (identity
  spec, token tables, do/don't, states). Client pages built from this
  identity do not ship an appendix; the demo carries it.
- Utilities: `.wr-measure` (body measure), `.wr-highlight` (the one
  accent figure), `.wr-arrow`, `.wr-sub`, `.wr-reveal` (scroll reveal,
  gated - see below), `.wr-noprint`.

## Building plates and figures (zero JS, no assets required)

The plate is the identity's image slot. When real photography exists, frame
it inside `.wr-plate` geometry: `object-fit: cover`, the same fixed aspect
ratios, hairline border, mono `.wr-figcap` below. When no assets exist,
draw the plate typographically: one oversized glyph, numeral, or word in
`b`; optionally `.wr-plate-grid` to expose the column rules. Never
substitute gradients, stock clip-art, or emoji. Every figure gets a
`.wr-figcap` in the form name / note / year.

## Structure of a studio portfolio

1. `.wr-top` (brand, numbered nav, toggle).
2. `.wr-hero` (kicker, statement line, mono facts row).
3. Work index (`.wr-sec` > `.wr-index`), possibly a `.wr-btnrow` onward.
4. One case study: facts left, measured argument right, full-width plate
   beneath (asymmetric `.wr-grid` spans).
5. Optional plate grid (asymmetric 7/5, 5/7).
6. Studio split (`.wr-split` + `.wr-facts`).
7. Contact footer (`.wr-contact` + `.wr-colophon`).
8. Nothing after the colophon on client pages; the demo's appendix lives
   below it only because the demo documents the identity.

Compose the classes above; new page regions are sections, not bespoke boxes.

## Page-type recipes

- **Portfolio index (home)**: top bar → statement hero → work index →
  plate grid → contact footer + colophon.
- **Case study**: top bar → case header (kicker + title + facts) → measured
  body → full-width plate(s) → pull statement → next-project row → contact
  footer.
- **Studio / about**: top bar → split (claim + body) → facts table →
  contact footer.
- **One-page brief**: top bar → title block + facts (client, date, scope)
  → numbered sections (`.wr-sec-head` kickers) → decision list → contact
  footer.

## States grammar

- **Empty**: `.wr-empty` well - name the void in a kicker, one true muted
  sentence, one arrow link onward. Never leave a void blank.
- **Loading**: `.wr-skel-row`s shaped like the rows they replace. Static;
  they hold the measure without animating.
- **Error**: `.wr-error` - accent-ink kicker names the failure, one
  sentence, one retry link. Red here is a job, not decoration; one error
  moment per view.
- **Hover**: index rows invert (ink fill, paper text); nav links draw
  their underline; arrows nudge 4px; buttons invert to ink fill.
- **Focus**: 2px accent-ink outline on every interactive element
  (ships in the file).
- **Disabled**: faint border and text, no hover response.

## Tuning surface

Retuning happens in the `:root` token block only; everything below
inherits. Values only - never token names.

- **Accent**: the sanctioned alternative is the IKB-family ultramarine
  `#20359C` (text `#1B2B80`) swapped across `--accent`/`--accent-ink` and
  their dark slots - keep each value contrast-safe on its ground. Red and
  ultramarine are the only two accents this identity owns; anything else is
  a different identity.
- **Neutrals**: the paper/ink family is neutral-cold. Re-tint only together
  (`--bg`, `--surface`, `--ink`, `--muted`, `--faint`, `--line`,
  `--line-soft`) keeping the luminance steps and AA contrast. Never warm
  them: warm paper belongs to reading-room territory, not here.
- **Fonts**: the stacks are canonical. The upgrade path is loading the
  @fontsource families below - never other families, never more than the
  three.
- **Scale**: retune the display clamps' endpoints together (44/64/96 is the
  posture; the 3x display-to-body ratio is the gate).
- **Density**: whitespace and gutters may tighten for data-heavy pages, but
  index rows stay dense and heroes stay empty. That bimodal rhythm is the
  identity.
- **Scheme lead**: the file pins light (the canonical side). To lead dark,
  swap the pin on `:root` and make the dark column canonical - keep both
  value sets, keep `light-dark()` slot 1 = light, and leave the print
  block's light pin alone (paper prints light).
- **What inherits unchanged**: the four laws, the `.wr-` class grammar, the
  component inventory, the states grammar, and the pack's do-nots. A
  retune never adds component classes.
- **Lane mechanics**: forking this identity into a derived one means
  renaming the `.wr-` prefix (pick a new two-letter namespace and rename
  every class consistently, pack included), pruning inventory you don't
  need (drop a component's rules and its pack line together), and adding
  new components only by the pack's conventions: namespaced, inside the
  `@layer foundation` block, documented. Record provenance in a header
  comment at the top of `foundation.css`.

## Fonts (webfonts via @fontsource)

The stacks ship as fallbacks first: the page must be correct with zero
webfonts (Helvetica/Arial class everywhere). When the delivery surface
allows dependencies, load the canonical faces from @fontsource and put them
first in their stacks (they already are):

- `@fontsource/archivo` (500/600/700) - display
- `@fontsource/inter` (400/500) - body
- `@fontsource/ibm-plex-mono` (400/500) - micro-labels

In React or bundled projects import the packages. In single-file outputs,
inline the needed weights as base64 woff2 `@font-face` blocks in the
`<style>` section; keep each subset small (latin only) and never inline
more than the three families. Never let the page depend on a font
arriving: fallbacks must hold the layout.

## Theme toggle and scroll reveal (the only sanctioned JS)

```js
var root = document.documentElement;
btn.addEventListener('click', function () {
  root.style.colorScheme = root.style.colorScheme === 'dark' ? 'light' : 'dark';
});
```

Flip `color-scheme` on `html` only. No class swapping, no stylesheet swap,
no localStorage requirement (persistence is allowed but optional). The page
must fully render with this script removed.

The optional scroll reveal needs a two-line bootstrap: add `js` to the html
class, then toggle `.in` on `.wr-reveal` elements with an
IntersectionObserver. The CSS only hides `.wr-reveal` under `html.js`, so a
no-JS page renders complete. Both enhancements die under reduced motion
and print.

## Print and reduced motion

Print rules ship in the file: the scheme pins light (paper prints light),
the toggle drops out (`.wr-noprint`), rows, plates, and fact rows never
split across pages, and reveal states force visible. Do not add print
overrides. `prefers-reduced-motion` kills transitions, arrow nudges, and
the reveal; the skeleton is already static.

## Do not

- Do not center or justify anything, ever. Flush left is the identity's
  spine.
- Do not add shadows, gradients, rounded corners, borders thicker than 2px,
  or new colors. If a color is missing, the answer is a token from the
  reference table in `demo.html`, not a hex code.
- Do not use red as decoration, as body text, or more than once per view.
  If every kicker is red, nothing is.
- Do not add a fourth typeface, icon fonts, emoji as icons, or arrows
  rendered as SVG. Type and glyphs only.
- Do not shrink the display scale. If the hero could be set as body text,
  the page has failed; enforce the 3x jumps.
- Do not fill whitespace with cards. Empty space is the luxury signal; the
  dense moments are indexes and fact tables, not bento grids.
- Do not build app UI (dashboards, ops tables, toolbars, data-dense admin)
  with this identity; it is a portfolio and document system.
- Do not use warm paper tones. Neutral-cold is the contract; warm off-white
  is a different identity.
- Do not restyle foundation classes per project. Branding happens via
  tokens (accent, wordmark), never by editing component rules.
- Do not add `!important`, new `@layer`s, or `data-theme` attribute logic.
