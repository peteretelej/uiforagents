# dither-lab - Agent Prompt-Pack

One-shot record: PASS 2026-10-12 - a fresh agent built a tutorial index
with a step-by-step guide from only this pack and `foundation.css`;
identity-faithful, premium, no design improvisation.

One-shot re-run 2026-10-26: PASS - a fresh agent built a getting-started
documentation page from only this pack and `foundation.css`; identity-
faithful, premium, no design improvisation; headless check clean (zero
console errors, no document overflow at 1280/390/360).

One-shot re-run 2026-10-31: PASS - a fresh agent built a jam/event page
from only this pack and `foundation.css`; identity-faithful, premium, no
design improvisation; headless check clean (zero console errors, no
document overflow at 1280/390/360).

You are building with the **dither-lab** design identity: the 1-bit
workshop for self-contained HTML artifacts - creative-tool pages, dev-tool
landings, release-notes zines, jam and event pages. A blue-black canvas, a
four-color rotational bit-palette, bitmap display type, dithered checker
fills, and stepped motion - retro-computing craft with none of the web3
neon. The design decisions are already made. Follow this pack exactly; do
not improvise visual design.

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
- No JavaScript is required. The page renders completely without any script.

## Identity contract

- **Blue-black canvas, four bits, one per section.** The ground is
  blue-black `#101318` - never neutral near-black. The bit-palette is
  amber `#FFB454` (primary), cyan `#62D6E8`, magenta `#E878B8`, green
  `#85D98A`, used **rotationally**: assign one bit-color per section,
  decided top-down (the demo runs amber → cyan → green → magenta → amber),
  with a `.bit-amber` / `.bit-cyan` / `.bit-magenta` / `.bit-green`
  modifier. Never mix two bit-colors inside one component; the four-color
  underline bar (`.dl-bitbar`) is the only sanctioned blend. Never collapse
  to a single-hue monochrome - that is a different identity.
- **Bitmap type discipline.** Press Start 2P (`--font-bit`) is for
  wordmarks, badges, and glyph tiles only, set at **8px multiples only**
  (16, 24, 32; the specimen breaks at arbitrary sizes) with a **16px
  floor** for legibility, stepping at breakpoints - never fluid-clamped.
  It is never body text. Pixelify Sans (`--font-display`) carries headings.
  Space Grotesk (`--font-body`) carries prose and UI at 16px/1.65, measure
  64ch. VT323 (`--font-crt`) is the readout voice, large sizes only (20px
  console lines, 44-56px stat numerals) - never body text.
- **Dither is a pattern, not an algorithm.** Fills are CSS checker
  overlays via `repeating-conic-gradient` at 2px cells, 4-6% alpha of the
  section's bit-color (`.dl-dither` on a section, built into `.dl-hero`
  and `.dl-empty` and `.dl-glyph`). CSS approximates a dither; it does not
  compute one. Full Bayer/Floyd-Steinberg dithering is canvas work and
  stays out of scope.
- **Scanlines: hero only.** The 1px-line overlay at 3% alpha ships on
  `.dl-hero::after`. Nowhere else. No CRT curvature, no flicker.
- **Depth is pattern and border, never blur.** Radius is 0 everywhere (a
  law, not a token to retune). Borders are 2px solid `--line`. Shadows are
  banned except the one glow: `0 0 12px` in the section's bit-color on
  that section's primary element (the fill button, the console cursor).
  One glow per section, never on text. Cards may double-frame like old-OS
  windows (`.dl-console`: outer 2px + inner 1px offset 3px).
- **Motion is stepped.** Looping motion runs on `steps()` timing:
  `steps(4)` marquee, `steps(1)` blink cursor, `steps(8)` load bar. Hover
  and active states jump (a 2px translate with no transition), they never
  ease. Everything honors `prefers-reduced-motion`.
- **Density is medium-dense, software-shaped.** This is a showcase
  identity for build/creative surfaces, not an ops console: no dense
  filter/sort tables, no health-dot rows. Sections breathe at 44-72px.
- **Dark is the only theme.** The blue-black canvas is the identity; there
  are no `light-dark()` pairs, no `data-theme` attribute, and no toggle.
  Print re-inks to paper values via the print block.
- **Magenta is the error hue.** The one fixed semantic assignment:
  `.dl-err` always speaks magenta regardless of the section bit. It never
  decorates. Empty and loading states use the section's own bit-color.

## Token table

| Token | Value | Role |
|---|---|---|
| `--bg` | `#101318` | Blue-black canvas |
| `--surface` | `#161B24` | Cards, bars, badges, footer |
| `--raised` | `#1C2230` | Console body, glyph wells |
| `--line` | `#2A3140` | The 2px border |
| `--line-soft` | `#202733` | Inner frame, quiet rules |
| `--text` | `#E8ECF2` | Body text |
| `--muted` | `#939CAC` | Secondary text, labels |
| `--faint` | `#5C6678` | Ornaments and disabled controls only, never informative text |
| `--bit-a` | `#FFB454` | Amber bit - primary; leads every page |
| `--bit-c` | `#62D6E8` | Cyan bit |
| `--bit-m` | `#E878B8` | Magenta bit; the error hue |
| `--bit-g` | `#85D98A` | Green bit |
| `--bit` | `var(--bit-a)` | The active section color; retargeted by `.bit-*` |
| `--radius` | `0px` | Law |
| `--font-bit` | Press Start 2P | Wordmarks, badges, glyphs |
| `--font-display` | Pixelify Sans | Headings |
| `--font-body` | Space Grotesk | Prose, UI |
| `--font-crt` | VT323 | Readouts, large sizes only |

Every bit-color clears 6:1 on `--bg`; `--text` and `--muted` clear AA on
every ground. If a color feels missing, the answer is a token from this
table, never a new hex.

## Component inventory (use these classes; do not restyle or substitute)

- `.dl-wrap`: the 1160px container. `.dl-cols2` is the two-column helper
  (collapses under 900px).
- `.bit-amber` / `.bit-cyan` / `.bit-magenta` / `.bit-green`: set the
  section's bit-color. One per section, on the section element.
- `.dl-top` + `.dl-top-inner`: the top bar on `--surface`. `.dl-brand` is
  the Press Start 2P wordmark (`b` picks up amber), `.dl-nav` the links
  (`.on` marks the current page in the bit-color), plus `.dl-badge` chips.
- `.dl-badge`: the bitmap chip - Press Start 2P at 16px, 2px border.
  `.on` takes the bit-color border and text. Use sparingly: version tags,
  formats, env marks.
- `.dl-hero`: the pixel hero - amber by default, dithered, with the
  scanline overlay. Contains `.dl-badge.on`, `.dl-wordmark` (Press Start
  2P, 32px, steps to 24px under 640px; `b` takes the bit-color),
  `.dl-bitbar` (the four-color underline bar: four `i` segments, 8px
  tall), `.dl-lede`, and `.dl-cta` with `.dl-btn` buttons and a
  `.dl-cta-note`.
- `.dl-section`: one content section; `.dl-dither` adds the checker
  backdrop in the section's bit-color. Kicker `.dl-kicker` (bit-colored
  caps with a `▚` prefix), `.dl-h2`, `.dl-sub` (measured muted lede).
- `.dl-btn`: the button - 2px border, stepped hover (jumps 2px). `.fill`
  is the primary: bit-colored fill with the section's one glow.
  `[disabled]` goes faint. `[class~="dl-btn"]` elements may be `a` or
  `button`.
- `.dl-marquee` + `.dl-marquee-track`: the stepped marquee divider - Press
  Start 2P at 16px, `steps(4)` per loop. Duplicate the track once with
  `aria-hidden="true"` for the seamless loop; mark the whole marquee
  `aria-hidden` when it is decoration.
- `.dl-sprites` + `.dl-sprite`: the sprite-grid feature block - 2px-bordered
  cells, **one bit-color per cell** (the one place the rotation shows
  inside a single block; the brief names it). Each cell: a `.dl-glyph`
  (one Press Start 2P ASCII glyph at 32px in the cell's bit-color, on a
  dithered well; pick from the bitmap-safe ASCII set: `+ % # @ * x 0 1`),
  an `h3`, and a muted `p`.
- `.dl-empty`: the empty well - dashed 2px border, dithered fill, a
  kicker naming the void, one true sentence, one link onward. Never leave
  a void blank.
- `.dl-console`: the console card with the old-OS double frame. Children:
  `.dl-titlebar` (caps title + a `.dl-badge`), `.dl-log` (VT323 20px;
  one `.dl-line` per output line; `.p` is the bit-colored prompt glyph,
  `.dim` the muted echo), `.dl-cursor` (the blinking bit-color block with
  the glow), `.dl-err` (the magenta error line: `.x` glyph, sentence,
  retry link).
- `.dl-patch` + `.dl-patchrow`: patch-notes rows - date, `.dl-badge`
  version, change list. `li::marker` picks up the bit-color; rows divide
  on 2px rules.
- `.dl-stats` + `.dl-stat`: the stat readout row - `.n` in VT323 (44-56px,
  tabular, bit-colored), `.l` label in caps. `.dl-stat.wait` is the
  loading readout: muted `.n` plus `.dl-load` (a bar that climbs in eight
  steps; set `--w` for the resting width).
- `.dl-footer` + `.dl-footer-grid` + `.dl-fine`: the footer band on
  `--surface` - brand, a small `.dl-bitbar`, link columns, fine print.
- `.dl-appendix`: documentation sections below the footer (colophon
  pattern). Client pages built from this identity do not ship an appendix;
  the demo carries it.
- `.dl-list`: the ruled annotation list (`▚` markers in the bit-color);
  `.dl-list.no` switches the marker to a magenta `×` for don't-lists.
- `.dl-tablewrap` + `.dl-table`: the token/spec table - caps faint
  headers, 2px head rule, hairline rows. `code` renders in VT323 on a
  raised chip.
- `.dl-statecell`: a bordered documentation cell for showing states
  side by side.
- Utilities: `.dl-noprint` (hide chrome in print).

## Layout grammar

One column of sections, top-down: top bar → hero → marquee → content
sections (one bit-color each, `.dl-dither` backdrops) → footer. Inside a
section: kicker, `h2`, muted sub, then the block (sprite grid, console,
patch rows, stats). Two-column moments use `.dl-cols2`. New page regions
are sections, not bespoke boxes.

## Narrow screens

The page never scrolls sideways as a document; the only horizontal
motion is inside a pan (`.dl-tablewrap`) or the marquee.

- Check the finished page at 390px and 360px: no clipped badges, no
  overflowing stat cells, nothing important out of reach.
- The top bar wraps by design (`.dl-top-inner` and `.dl-nav` are
  `flex-wrap: wrap`); keep them wrapping and never hide links to fit a
  phone. Nav stays reachable at every width: a flat app-shell nav pans
  as a contained scroll dock, a long-form section nav uses a zero-JS
  `<details>` disclosure, and deleting navigation is not a mobile
  strategy. A header never widens the document.
- Wide tables pan inside `.dl-tablewrap` with a `min-width: 640px`
  floor - they pan at readable size, columns never crush. While a wide
  table pans, its first column pins on `--surface` behind a hairline
  edge, and the pan carries a visible scroll cue. Charts, diagrams, and
  code obey the same 640px pan floor if a page ever adds them: pan
  inside an `overflow-x` container instead of shrinking below
  legibility.
- On coarse pointers (`@media (pointer: coarse)`) controls hold a 44px
  hit row: `.dl-nav a`, `.dl-err a`, and `.dl-footer a` included.
- Dark is the only theme and no toggle ships; when a variant with a
  scheme toggle lands, it ships icon-only (moon/sun glyph, never a text
  label) and reachable at every width.

## Structure of a creative-tool page

1. `.dl-top` (wordmark, nav, version badge).
2. `.dl-hero` (bit amber): badge, wordmark, `.dl-bitbar`, lede, CTA row.
3. `.dl-marquee` divider.
4. Feature sections in bit order (amber → cyan → green → magenta): sprite
   grid, console card, patch notes, stats - one block per section.
5. `.dl-footer`.
6. Colophon appendix only when the page documents the identity.

## Page-type recipes

- **Creative-tool page** (the demo's genre): top bar → pixel hero with
  wordmark and bitbar → marquee → sprite-grid features → console demo →
  patch notes → stat readouts → footer.
- **Dev-tool landing**: top bar → hero with install command in a
  `.dl-console` card instead of CTA buttons → marquee → sprite-grid
  features → stats → footer.
- **Release-notes zine**: top bar → compact hero (wordmark + one-line
  lede, no marquee) → `.dl-patch` rows as the page body, newest first →
  stats strip → footer.
- **Jam/event page**: top bar → hero with date/venue badge row → marquee →
  `.dl-patch` rows as the schedule (time, `.dl-badge` track, sessions) →
  console card as the FAQ/rules log → footer.

## States grammar

- **Empty**: `.dl-empty` names the void in a kicker, one true muted
  sentence, one link onward. The dithered fill marks the space as
  reserved, not broken.
- **Loading**: `.dl-stat.wait` + `.dl-load` - the number goes muted and
  the bar climbs in `steps(8)`. Under reduced motion the bar rests at its
  `--w` width.
- **Error**: `.dl-err` - magenta `✗`, one plain sentence naming what
  failed, one retry link. Magenta here is a job, not decoration. One error
  moment per view.
- **Hover**: buttons and sprite cells jump or pick up the bit-color border
  in a single step (no easing); nav links take a 2px underline.
- **Focus**: a 2px bit-color outline on every interactive element (ships
  in the file).
- **Disabled**: faint text and border, no hover response, `cursor:
  default`.

## Copy affordances

Copy-worthy output - an install command, a share link, a version tag -
ships a copy control in the workshop voice: a `.dl-btn` (never `.fill` -
the fill is the one primary action) labeled with a short sentence-case
verb phrase ("Copy the command"), placed on the row or block that renders
the value, in the section's own bit-color. Hover jumps one step like
every button; the label flips to "Copied" for a beat, then back - a
stepped state, never an eased fade. Wiring is a few sanctioned lines of
page JS over `navigator.clipboard`; the page renders completely without
it. Mark the control `.dl-noprint`. No new components, and bitmap type
stays out of controls - the label is plain body-face type like every
`.dl-btn`.

## Tuning surface

Retuning happens in the `:root` token block only; everything below
inherits. Values only - never token names.

- **Bit-palette**: the sanctioned retune is swapping a bit-color's hex
  across `--bit-*` (keep each at 6:1+ on `--bg`). Four bits, never a fifth;
  the rotation grammar is the identity and survives every derivation.
- **Ground family**: re-tint the blue-black family (`--bg`, `--surface`,
  `--raised`, `--line`, `--line-soft`) together, keeping the luminance
  steps and the blue cast. Never neutral near-black, never warm black -
  those are other identities.
- **Fonts**: the four faces and their roles are the contract. The stacks
  degrade with zero webfonts; the upgrade path is loading exactly the
  @fontsource families below - never other families.
- **Density**: section padding and grid gaps may tighten one step for
  data-heavy pages, but the hero stays large and the stat row stays
  44px+.
- **What inherits unchanged**: the rotation rule, the bitmap discipline,
  the pattern rules, the `.dl-` class grammar, the states grammar, and the
  pack's do-nots. A retune never adds component classes.
- **Lane mechanics**: forking this identity into a derived one means
  renaming the `.dl-` prefix (pick a new two-letter namespace and rename
  every class and the `dl-` keyframe names consistently), pruning
  inventory you don't need (drop a component's rules and its pack line
  together), and adding new components only by the pack's conventions:
  namespaced, inside the `@layer foundation` block, documented. Record
  provenance in a header comment at the top of `foundation.css`.

## Fonts (webfonts via @fontsource)

The stacks ship as fallbacks first: the page must be correct with zero
webfonts. When the delivery surface allows dependencies, load the
canonical faces from @fontsource and put them first in their stacks (they
already are):

- `@fontsource/press-start-2p` (400) - wordmarks, badges, glyphs
- `@fontsource/pixelify-sans` (400/500/700) - headings
- `@fontsource/space-grotesk` (400/500/600/700) - body, UI
- `@fontsource/vt323` (400) - readouts, console lines

In React or bundled projects import the packages. In single-file outputs,
inline the needed weights as base64 woff2 `@font-face` blocks in the
`<style>` section; keep each subset small (latin only) and never inline
more than the four families. Never let the page depend on a font arriving:
fallbacks must hold the layout.

## Print and reduced motion

Print rules ship in the file: the print block re-inks every token to
paper values (ink on white, darkened bit-colors), drops the patterns
(dither, scanlines, glow), stops the marquee, cursor, and load bar, hides
`.dl-noprint` chrome, and keeps cards and rows from splitting across
pages. Do not add print overrides. `prefers-reduced-motion` kills the
marquee, cursor blink, and load animation, and flattens the hover jumps;
the identity's motion is flavor only, never load-bearing.

## Do not

- Do not drift toward graphite-terminal: no single-hue monochrome, no
  neutral near-black, no ops density. The four-color rotation and the
  pattern rules are the firewall.
- Do not add a fifth color, a gradient, a rounded corner, a smooth ease,
  or a shadow beyond the sanctioned 12px glow.
- Do not set body text in Press Start 2P or VT323, and never use bitmap
  sizes off the 8px grid or below 16px.
- Do not mix two bit-colors in one component. One bit per section; the
  underline bar and the sprite-grid cells are the only multi-bit moments
  the brief names.
- No CRT curvature, fake boot screens, phosphor flicker, or web3 neon -
  the workshop is alive, not a museum piece.
- No dense ops tables, sort/filter machinery, or health-dot rows; this is
  a showcase identity, not a console.
- Do not restyle foundation classes per project. Branding happens via
  tokens (the wordmark's `b` color, bit assignment), never by editing
  component rules.
- Do not add `!important`, new `@layer`s, or `data-theme` attribute logic.
