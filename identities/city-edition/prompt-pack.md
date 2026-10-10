# city-edition - Agent Prompt-Pack

One-shot record: PASS 2026-10-12 - a fresh agent built a corrections &
standards page for a fictional daily from only this pack and
`foundation.css`; identity-faithful, premium, no design improvisation.

You are building with the **city-edition** design identity: the dense
morning daily for self-contained HTML artifacts - front pages, section
fronts, article pages, digests, press and announcement pages, publication
one-pagers. Flat newsprint, ink serif headlines, a kicker-deck-byline
stack on every story card, hairline rules with heavy masthead rules, a
rationed press-red signal, and agate mono for datelines and indexes. A
real newspaper front page, not a feed. The design decisions are already
made. Follow this pack exactly; do not improvise visual design.

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
- No JavaScript is required. The page renders completely without any
  script; forms post nowhere and states are shown, not simulated.

## Identity contract

- **Light is the only theme.** Flat newsprint `#F8F7F3` is the identity -
  cool and flat, never warm cream. There are no `light-dark()` pairs, no
  `data-theme` attribute, and no toggle. Print re-inks to white via the
  print block.
- **The label stack is the law.** Every story card carries the full stack:
  `.ce-kicker`, a serif headline, `.ce-deck`, and a `.ce-byline` row with
  byline and dateline. A card missing a layer is not a card of this paper.
  Headlines are always serif, always flush left, and never red.
- **Rules do all the work.** Hairlines (`1px solid var(--line)`) separate
  columns, rows, and table bodies. Heavy rules (`3px solid var(--rule-strong)`)
  mark the masthead, section bands, the lead, and box-outs (pull quotes
  take the heavy rule top and bottom). Boxed cards are ruled surfaces on
  `--surface`, never elevated: no shadows, no gradients, `0px` radius
  everywhere.
- **Press red is rationed.** `--accent` `#C0271D` appears only as
  breaking/live flags (`.ce-flag`), the active nav or filter label, text
  links, and the one subscribe action. At most **one** red element per
  story card - a flag or a link, never both, never decoration, never a
  headline. Everything else is ink, muted, and paper.
- **Type roles are fixed.** Newsreader (`--font-serif`) sets display and
  body: base 16.5px/1.55, article body 17px/1.6 at `--measure` (66ch),
  banner headlines at clamp scale with tight leading. Archivo Narrow
  (`--font-label`) sets every label: uppercase, letter-spacing 0.08em,
  12-13px. IBM Plex Mono (`--font-mono`) sets datelines, byline rows,
  captions, folio lines, and agate tables at 11-12px. Never introduce
  another family, never set labels in serif or headlines in sans.
- **Density is the defining posture.** Column gaps are `--gap` (24px;
  tighten to 20px, never wider). The front page is a 12-column grid - lead
  spans 8 with a 4-column rail, section bands run 4 or 3 open columns with
  hairline dividers, boxed cards are for secondary grids and section
  rails. The lead zone is the one place that breathes; everywhere else
  stays dense.
- **Motion is near-static.** 160ms fades, the nav underline slide, and one
  slow skeleton pulse on the wire. No parallax, no scroll reveals, no
  marquees. Everything honors `prefers-reduced-motion`; nothing
  load-bearing ever moves.

## Token table

| Token | Value | Role |
|---|---|---|
| `--bg` | `#F8F7F3` | Flat newsprint canvas |
| `--surface` | `#FFFFFF` | Boxed cards and modules, ruled never elevated |
| `--ink` | `#17150F` | Text and headlines |
| `--muted` | `#5D5A52` | Decks, captions, secondary text (6.4:1 on bg) |
| `--faint` | `#8A857A` | Folio lines and ornaments only, never informative |
| `--line` | `#DDD9CF` | The 1px hairline |
| `--line-soft` | `#E9E6DD` | Quiet inner rules, wire skeletons |
| `--rule-strong` | `#1A1A1A` | The 3px heavy rule: masthead, section breaks |
| `--accent` | `#C0271D` | Press red: flags, active nav, links (one per card) |
| `--accent-ink` | `#9C1F16` | Red pressed darker: hovers, small fills |
| `--accent-soft` | `#F6E4E1` | Quiet red wash: selection |
| `--radius` | `0px` | Law, not a knob |
| `--font-serif` | Newsreader | Display and body |
| `--font-label` | Archivo Narrow | Uppercase kickers and labels |
| `--font-mono` | IBM Plex Mono | Datelines, captions, agate |
| `--wrap` | `1240px` | Broadsheet container |
| `--gap` | `24px` | Column gap |
| `--measure` | `66ch` | Article measure |

`--muted` clears AA on both grounds; `--accent` clears AA on paper and
surface. If a color feels missing, the answer is a token from this table,
never a new hex.

## Layout grammar

- `.ce-wrap` is the container. Everything lives inside it; the masthead
  and footer run their own full-width bands.
- `.ce-front` is the 12-column front-page grid: `.ce-front-main` (span 8)
  holds the lead and the secondary boxed grid (`.ce-grid`, 3-up);
  `.ce-front-rail` (span 4) stacks rail modules (`.ce-railmod`), each
  opened by a heavy-ruled `.ce-modhead`. The grid collapses to one column
  under 1020px, rail last.
- `.ce-cols.c4` / `.ce-cols.c3` are the open column bands: columns
  separated by hairline left borders, first column clean. These are the
  front page's column zones; use them for briefs, never for boxed cards.
- `.ce-band` opens every section: a heavy rule, `.ce-band-head` with
  `.ce-band-title` and a mono `.ce-band-more` link, then content.
- The masthead stacks three layers: the mono `.ce-masthead-top` dateline
  row (date - edition and price - weather), the centered `.ce-nameplate`,
  and `.ce-nav` under a 3px rule. The current section carries `.on` (red);
  `.ce-nav-cta` is the one red fill in the chrome.

## Component inventory (use these classes; do not restyle or substitute)

- Label atoms: `.ce-kicker`, `.ce-deck`, `.ce-byline` (`strong` names the
  writer), `.ce-kicker-row` pairs a kicker with a `.ce-flag`. `.ce-mono`
  flips any run to mono.
- `.ce-story`: the story card in three headline sizes - `h2` (section
  lead, 1.8rem), `h3` (1.35rem), `h4` (1.08rem). Headline links draw an
  ink underline on hover. `.boxed` adds the hairline box on `--surface`
  and deepens the border on hover.
- `.ce-lead`: the banner story - heavy rule, clamp-scale headline, larger
  deck, byline row, optional `.ce-figure`.
- `.ce-flag`: the press-red signal chip (BREAKING, LIVE, WIRE DOWN). Mono
  caps on a red fill. One per card maximum.
- `.ce-band`, `.ce-band-head`, `.ce-band-title`, `.ce-band-more`: section
  grammar (above).
- `.ce-modhead`, `.ce-railmod`: rail module header (heavy rule, label
  caps, right-side mono note) and module wrapper.
- `.ce-mostread`: the numbered index - agate counters (`01`, `02`, ...)
  in mono, ink headline links, hairline row dividers.
- `.ce-newsletter`, `.ce-news-inner`, `.ce-news-name`, `.ce-news-line`,
  `.ce-news-form`, `.ce-news-fine`: the subscribe band on `--surface`
  under a heavy rule. `.ce-input` (mono, hairline box) and `.ce-btn` (red
  fill) are the only form controls.
- `.ce-filter`: category filter row for section fronts; `.on` marks the
  active category in red with a red underline.
- `.ce-arthead`: the article header stack - kicker, `h1` headline, deck,
  byline/dateline row between hairlines. Max width 54rem.
- `.ce-body`: the measured article body (17px/1.6, 66ch). `.ce-dropcap`
  on the opening paragraph sets the print drop cap.
- `.ce-pullquote`: the boxed quote - heavy rules top and bottom, italic
  serif, mono `cite`.
- `.ce-jumpline`: the right-aligned mono jump line ("Continued on page
  A8"). Flavor; at most one per article.
- `.ce-figure` (`.r32` or `.r169`), `.plate`, `.ce-caption`: the figure
  grammar - hairline frame on `--surface`, fixed-ratio inline SVG plate,
  mono caption with an ink lead-in. See "Figures" below.
- `.ce-empty`: the empty/error well - hairline box, agate sentence, mono
  action link. `.ce-wire` (`.wt` time gutter, `.wl` line stack) with
  `.ce-skel` bars is the loading wire row.
- `.ce-table`: the agate table - mono, hairline rows, heavy rule under a
  caps header. For indexes, listings, and token tables.
- `.ce-footer` + `.ce-footer-inner`: the mono folio line on `--surface`.
- `.ce-colophon` + `.ce-colophon-inner`, `.ce-cols-2`, `.ce-dodont`:
  colophon helpers (documentation below the footer).

## Figures

Photography is optional and this identity is text-first. When a visual
carries weight, build it as an **inline SVG plate** inside `.ce-figure`:
flat ink/muted/paper fills only, mono labels of 10-11px, no gradients,
no drop shadows, no photo filters. Pick `.r32` (3:2) or `.r169` (16:9)
and set the `viewBox` to match the ratio. Every plate gets a
`.ce-caption` with an ink lead-in and a source line, and an
`aria-label` that states the finding, not the contents ("Average
weekday boardings, Union highest"). Plates are diagrams, not
decorations: if a chart says nothing, cut it.

## Page-type recipes

- **Front page**: `.ce-masthead`, then `.ce-front` - main column with
  `.ce-lead` and a 3-up `.ce-grid` of `.boxed` cards, rail with
  `.ce-mostread`, a `.ce-wire` module, and one `.ce-empty` well. Follow
  with one or two `.ce-band` sections (`.ce-cols.c4` or `.c3` briefs) and
  the `.ce-newsletter` band. The masthead dateline row carries today's
  date and edition; the nameplate is the `h1`.
- **Section front**: a `.ce-band` whose head names the section, a
  `.ce-filter` row, then a `.ce-front` grid - main column leads with a
  `h2` `.ce-story` (optionally a `.ce-figure.r32`), rail holds two
  `.boxed` cards. Close with a `.ce-cols.c3` band or the newsletter.
- **Article page**: `.ce-arthead` (kicker, `h1`, deck, byline row), then
  `.ce-body` with a `.ce-dropcap` opening, one `.ce-pullquote` per
  thousand words, `.ce-jumpline` as flavor. Rails and captures aside, the
  measure is the page.
- **Special-section one-pager**: masthead with a themed `.ce-band-title`,
  a `.ce-lead` for the anchor essay, `.ce-cols.c3` for contributors or
  program items, an agate `.ce-table` for schedules or listings, and the
  newsletter band. No dashboard modules, ever.

## States grammar

States speak newspaper, not spinner:

- **Empty** (`.ce-empty`): a hairline well with one agate sentence naming
  the void and one mono action link ("Nothing saved yet... How clippings
  work"). Never lorem, never an icon alone.
- **Loading** (`.ce-wire` + `.ce-skel`): the wire row - a mono time
  gutter and skeleton bars that pulse once a second and change. The
  module head says "updating". Under reduced motion the bars hold, dim.
- **Error** (`.ce-empty` + `.ce-flag`): the well gains a WIRE DOWN flag,
  one honest agate line ("The feed stopped responding (504). Headlines
  above were set at 6:00 and stand."), and a retry link.
- **Interactive**: nav links slide a 2px red underline on hover (160ms);
  the current section stays red (`.on`). Headline links draw an ink
  underline left to right. Boxed cards deepen their hairline. Filters
  underline red when active. The subscribe button darkens one step.
- Focus is always visible: a 2px red outline offset 2px, and the input
  rings inside its border.

## Tuning surface

Retuning happens in the `:root` token block only; everything below
inherits. Values only - never token names.

- **Paper temperature**: the newsprint must stay cooler and flatter than
  a warm cream. Retune `--bg`, `--surface`, `--line`, `--line-soft` as a
  family, keeping the flat, low-chroma values; if it starts reading warm,
  you have left the identity.
- **Accent**: press red is a signal family. Swapping it means retuning
  `--accent`, `--accent-ink`, and `--accent-soft` together and re-checking
  AA on both grounds; the rationing law does not change.
- **Fonts**: the three roles are the contract; stacks degrade with zero
  webfonts. The upgrade path is exactly the @fontsource families below.
- **Density**: `--gap` may tighten to 20px and the base sizes stay;
  density beyond that is a different paper. The lead zone keeps its air.
- **What inherits unchanged**: the label stack law, the rule weights, the
  red rationing, the `.ce-` class grammar, the states grammar, and the
  pack's do-nots. A retune never adds component classes.
- **Lane mechanics**: forking this identity into a derived one means
  renaming the `.ce-` prefix (pick a new two-letter namespace and rename
  every class and the `ce-` keyframe name consistently), pruning
  inventory you don't need (drop a component's rules and its pack line
  together), and adding new components only by the pack's conventions:
  namespaced, inside the `@layer foundation` block, documented. Record
  provenance in a header comment at the top of `foundation.css`.

## Fonts (webfonts via @fontsource)

The stacks ship as fallbacks first: the page must be correct with zero
webfonts. When the delivery surface allows dependencies, load the
canonical faces from @fontsource and put them first in their stacks (they
already are):

- `@fontsource/newsreader` (400/500/600/700, plus italic for pull quotes)
  - display and body
- `@fontsource/archivo-narrow` (500/600/700) - kickers, labels, nav
- `@fontsource/ibm-plex-mono` (400/500/600) - datelines, captions, agate

In React or bundled projects import the packages. In single-file outputs,
inline the needed weights as base64 woff2 `@font-face` blocks in the
`<style>` section; keep each subset small (latin only) and never inline
more than the three families. Never let the page depend on a font
arriving: fallbacks must hold the layout.

## Print and reduced motion

Print rules ship in the file: the page re-inks to black on white, the
nav, newsletter, wire, and colophon drop out, links inherit ink, boxed
elements print with a plain grey rule, and quotes and band heads never
split across pages. Do not add print overrides.
`prefers-reduced-motion` kills transitions and the skeleton pulse. The
identity's motion is flavor only, never load-bearing.

## Do not

- Do not add shadows, gradients, rounded corners, or elevation of any
  kind - depth is a rule, never a blur.
- Do not add a second accent or colored fills on cards. Red has the four
  sanctioned jobs (flags, active labels, links, the subscribe action) and
  one appearance per card.
- Do not set headlines in anything but the serif, labels in anything but
  Archivo Narrow, agate in anything but the mono. Never center prose.
- Do not build dashboards, status walls, or ops tables - dense means
  stories per column, not metrics per panel. Instruments live in the
  console identities; this is a paper.
- Do not build a single-column reader - one story per measure with
  generous air is reading-room's identity, not this one. If a page has a
  masthead-sized title and no other story, it is an article page, and the
  label stack still applies.
- Do not drop a layer from the label stack (kicker, headline, deck,
  byline) or invent new layers (no straplines, no subdecks).
- Do not restyle foundation classes per project. Branding happens via the
  nameplate and tokens, never by editing component rules.
- Do not add `!important`, new `@layer`s, or `data-theme` attribute
  logic, and do not derive a dark scheme - the dark edition is a
  different paper.
- Do not fake the news: datelines carry real dates, the wire holds space
  and says so, and no plate invents numbers without a source line.
