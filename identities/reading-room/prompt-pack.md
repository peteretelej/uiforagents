# reading-room - Agent Prompt-Pack

You are building with the **reading-room** design identity: a warm editorial
reader for long-form, self-contained HTML artifacts - articles, briefings,
catch-up guides, reports, changelogs. The design decisions are already made.
Follow this pack exactly; do not improvise visual design.

The identity is one stylesheet, `foundation.css`. It carries the tokens, base
typography, components, print rules, and both themes. You write content and
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
- No JavaScript is required. The only sanctioned JS is an optional theme
  toggle (below). The page must render completely without it.

## Identity contract

- **Fonts**: Charter-led serif for everything read at length
  (`--font-serif`: Charter, Bitstream Charter, Sitka Text, Cambria, Georgia).
  System sans (`--font-sans`) for chrome only: kickers, meta rows, TOC, table
  headers, chips, callout labels. System mono (`--font-mono`) for code. Body:
  18px/1.7 (17px under 900px), measure 70ch (`--measure`). Never introduce
  another font family.
- **Color**: green `--accent` is for ACTION: links, active TOC entry, section
  eyebrows. Never decoration, never large fills. Amber (`--warn`) and red
  (`--danger`) are semantic status in callouts and chips only. Text is
  `--ink` on `--bg`; secondary is `--muted`; tertiary is `--faint`. The
  neutrals are warm-tinted, never pure grey.
- **Dual theme is built in**: every token is a `light-dark()` pair and
  `:root` sets `color-scheme: light` (the identity leads light; a toggle
  flips it).
  `color-scheme` must stay on `html`/`:root`; root-level tokens only
  re-resolve against the root's scheme. Do not create `data-theme` blocks,
  duplicate token lists, or set `color-scheme` on wrappers.
- **Radius**: boxes use `--radius` (8px); pills (chips) use 99px; inline code
  4px. One radius per element.
- **Density is editorial**: generous section spacing (3.5rem), 1.4rem rhythm
  around callouts/cards, hairline `--line` borders instead of shadows. There
  are no shadows and no gradients in this identity.
- **Motion**: none beyond smooth anchor scrolling (disabled under
  `prefers-reduced-motion`). No transitions, no animation.

## Component inventory (use these classes; do not restyle or substitute)

- `.rr-masthead` + `.rr-masthead-inner`: top bar on `--surface`, hairline
  bottom border. Contains `.rr-kicker` (small uppercase sans label) and
  optionally `.rr-theme-toggle`.
- `.rr-hero`: title block under the masthead. `h1` (large serif, balanced),
  `.rr-dek` (one-sentence standfirst, muted), `.rr-meta-row` (faint sans
  facts separated by gap).
- `.rr-shell`: 220px sidebar + content grid, 1080px max. Children: `.rr-toc`
  and `.rr-main`. Under 900px the grid collapses and `.rr-toc` hides.
- `.rr-toc`: sticky table of contents; `.rr-toc-label`, then an `<ol>` of
  anchor links; `.active` marks the current section. `.rr-toc-mobile` is a
  `<details>` fallback that appears under 900px. Ship both.
- `.rr-section`: one article section. `h2` gets a hairline top rule; an
  optional `.rr-secnum` span renders the numbered eyebrow (e.g.
  `<span class="rr-secnum">Section 1</span>`). `h3` for sub-heads.
- `.rr-lede`: opening paragraph of a section, one size up, muted.
- `.rr-callout` with `.rr-callout-label`; modifiers `--warn`, `--danger`.
  Left border + tinted fill; label is small uppercase sans. Never nest
  callouts or put chips in labels.
- `.rr-table-wrap` wraps every data `table`: horizontal scroll, uppercase
  faint headers, hairline row borders, `--wash` hover.
- `.rr-chip` pill badges; modifiers `--accent`, `--ok`, `--warn`, `--muted`,
  `--danger`. For verdicts and statuses, one or two per row.
- `.rr-card`: bordered surface for a compared item: `h3`, `.rr-card-sub`,
  a `dl` attribute grid (`dt` faint uppercase sans, `dd` body), optional
  `.rr-card-links` row.
- `.rr-readlist`: further-reading list. `h3` groups, borderless `<ul>` with
  hairline dividers, `.rr-src` source line per entry. `.rr-pill-note` for
  small sans asides.
- `.rr-colophon` + `.rr-colophon-inner`: footer band on `--surface` with a
  hairline top border; small faint sans colophon text.
- Utilities: `.rr-sans`, `.rr-measure`.

## Structure of a reading artifact

1. `.rr-masthead` (kicker, optional toggle).
2. `.rr-hero` (title, dek, meta row).
3. `.rr-shell` containing `.rr-toc` + `.rr-toc-mobile`, and `.rr-main` with
   `.rr-section` blocks numbered via `.rr-secnum`.
4. Callouts, tables, chips, cards used where the content needs them; sparse.
5. `.rr-colophon` (what this is, when it was set, in what type).

## Optional webfont upgrade

The system stacks are canonical and required in the base file: the page must
be correct with zero webfonts (Charter ships on macOS and Windows; Linux
falls back to its best serif). If the surface allows external requests and
the client wants a closer Charter match, add ONE link before the style block
loading a free Charter-alike such as Source Serif 4 (Google Fonts) and put it
first in `--font-serif`. Never base64-inline fonts, never load more than one
family, never let the page depend on the font arriving.

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

Print rules ship in the file: chrome (TOC, toggle) drops out, the shell
collapses to one column, print forces the light scheme via `color-scheme` so
body prints light at 11.5pt, and cards and callouts avoid page breaks. Do not
add print overrides. `prefers-reduced-motion`
disables smooth scrolling; the identity has no other motion.

## Do not

- Do not add fonts, shadows, gradients, borders thicker than 2px, or new
  colors. If a color is missing, the answer is a token from the reference
  table in `demo.html`, not a hex code.
- Do not restyle foundation classes per project. Branding happens via tokens
  (accent), never by editing component rules.
- Do not add `!important`, new `@layer`s, or `data-theme` attribute logic.
- Do not use the accent as body text color, and never set body copy in
  `--warn`/`--danger`; they are label and chip colors.
- Do not center prose. Reading content is left-aligned; the masthead/hero
  rhythm is left-aligned too.
- Do not build app UI (dashboards, forms, toolbars) with this identity; it is
  a reading identity. Interactive controls beyond links and the theme toggle
  are out of inventory.
