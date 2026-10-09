# midnight-bulletin - Agent Prompt-Pack

You are building with the **midnight-bulletin** design identity: a dark-first
briefing bulletin for data-dense, self-contained HTML artifacts - system
briefings, status one-pagers, incident reports, model notes, lab writeups.
The design decisions are already made. Follow this pack exactly; do not
improvise visual design.

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
  toggle (below); a lab box's range input may be wired with a few lines of
  page JS, and the page must render completely without it.

## Identity contract

- **Fonts: serif displays, sans reads, mono counts.** Serif
  (`--font-serif`: Charter, Iowan Old Style, Georgia) is for display only:
  `h1`, `h2`, the dek, the lede. Body copy is the system sans
  (`--font-sans`) at 16px/1.6, measure 68ch (`--measure`). Everything that
  is a label, number, timestamp, table header, pill, or code is the system
  mono (`--font-mono`) - this identity counts in mono. Never introduce
  another font family.
- **Color: dark-first warm.** The canonical scheme is dark: near-black warm
  ground (`--bg`), raised surfaces (`--surface`), sunken wells (`--sunken`),
  all from the extraction source. The light scheme is the derived
  alternative: warm cream ground with a deep bronze accent, tuned to the
  same contrast gates. Amber (`--accent`) is for ACTION and
  ATTENTION: links, kickers, section numbers, timeline dots, the badge.
  Never decoration, never body text. Green (`--ok`), amber (`--warn`), and
  red (`--danger`) are semantic status in pills, tags, and outcome cells.
  Both schemes share the same hue family.
- **Dual theme is built in**: every token is a `light-dark()` pair and
  `:root` sets `color-scheme: dark` (the identity leads dark; a toggle
  flips it).
  `color-scheme` must stay on `html`/`:root`; root-level tokens only
  re-resolve against the root's scheme. Do not create `data-theme` blocks,
  duplicate token lists, or set `color-scheme` on wrappers.
- **Radius is crisp**: boxes, pills, and code all use `--radius` (3px).
  Nothing rounder; no pills shaped as capsules.
- **Density is tabloid**: hairline `--line-soft` borders everywhere, 1px-gap
  grids (`--statstrip`, `--outcome`) where the line shows through the gaps,
  full-width section bands separated by hairlines, 1060px max width
  (`.mb-wrap`). No shadows, no gradients, no fills beyond `--surface` and
  `--sunken`.
- **Motion**: none beyond smooth anchor scrolling (disabled under
  `prefers-reduced-motion`). No transitions, no animation.

## Component inventory (use these classes; do not restyle or substitute)

- `.mb-topbar` + `.mb-wrap`: 44px mono top bar, hairline bottom border.
  Contains `.mb-brand` (accent wordmark link), `.mb-crumb` (faint path),
  and an optional `nav` of mono links plus `.mb-theme-toggle` (the only
  button chrome) that hide under 640px.
- `.mb-hero`: title band. `.mb-kicker` (mono uppercase amber line), `h1`
  (large serif, `em` renders italic amber - the signature), `.mb-dek`
  (serif standfirst, muted).
- `.mb-statstrip` > `.mb-stat`: the number strip. Hairline grid of mono
  stat blocks (`b` value, `span` faint uppercase label). 2x2 under 640px.
- `.mb-section` + `.mb-wrap`: one full-width band with hairline bottom
  rule. Open with `.mb-snum` (`01 / THE TOPIC` mono eyebrow), then `h2`
  (serif) and `h3` sub-heads (sans).
- `.mb-lede`: opening paragraph of a section, serif one size up, ink.
- `.mb-plain`: arrow list; mono `›` markers in accent, muted text.
- `.mb-podcast`: audio episode box on `--surface`. `.mb-ptitle` holds `h3`
  plus `.mb-badge` (solid amber chip), then a description `p`, `audio`,
  and `.mb-pmeta` mono meta row.
- `.mb-tblwrap` wraps every data `table`: hairline frame, sunken mono
  uppercase headers, hairline row rules, first column ink.
- `.mb-pill` status markers; modifiers `--ok`, `--warn`, `--danger`.
  Outlined mono rectangles, colored text on 40% border. For verdicts and
  statuses; not buttons.
- `.mb-cols` > `.mb-panel`: two-column pro/con (or compared) pairs.
  `.mb-panel--pro` / `.mb-panel--con` / `.mb-panel--danger` color the
  `.mb-tag` eyebrow green/red/red (danger also carries standalone error and
  correction notices); `.mb-who` is the faint mono attribution line.
- `.mb-pre`: code block on `--sunken`; spans `.mb-k` (amber keywords) and
  `.mb-c` (faint comments) are the only token colors.
- `.mb-figure`: chart frame for SVGs that style themselves with the
  foundation's own custom properties; `figcaption` is mono and faint.
- `.mb-lab`: interactive explainer box on `--surface`. `.mb-row` holds a
  mono `label`, the range input, and `.mb-threshold` (accent mono readout);
  `.mb-outcome` > `.mb-cell` is the hairline result grid (`b` value, `span`
  label). The range input works unstyled-but-native with zero JS; wiring it
  is optional page JS, not a foundation feature.
- `.mb-skel`: loading placeholder bar on `--sunken`; set each bar's width
  inline. Static by contract - the identity has no motion - so bars hold
  space without animating.
- `.mb-timeline`: event rail; accent node dots, mono `.mb-t` timestamps,
  muted entries.
- `.mb-sharebar` + `.mb-share-row`: mono bordered share buttons/print link.
- `.mb-footer` + `.mb-wrap`: mono colophon band above the page end, with an
  optional `.mb-glossary` `dl` (accent mono terms, muted definitions).
- Utilities: `.mb-wrap` (1060px container), `.mb-mono`, `.mb-measure`,
  `.mb-small`.

## Structure of a bulletin artifact

1. `.mb-topbar` (brand, crumb, section nav).
2. `.mb-hero` (kicker, title with one `em`, dek).
3. `.mb-statstrip` with three or four hard numbers.
4. `.mb-section` bands numbered via `.mb-snum`; each band's content sits in
   `.mb-wrap`. Tables, pills, panels, timeline, lab, figures go where the
   content needs them; sparse.
5. `.mb-sharebar` before the footer.
6. `.mb-footer` (glossary `dl` if terms were used, then the what/when/who
   colophon line).

## Tuning surface

Retuning happens in the `:root` token block only; everything below
inherits. Values only - never token names; keep every `light-dark()` pair
ordered light-first (slot 1 is always the light value).

- **Accent**: swap the amber pair (`--accent`; slot 1 = derived light
  bronze, slot 2 = canonical dark amber) and retune `--accent-ink` and
  `--accent-soft` in step - hand-tuned pairs, keep each slot passing
  contrast on its ground. Amber is also `--warn`; if the new accent hue
  collides with a status color, move `--ok`/`--danger` clear instead of
  the accent.
- **Neutral tint**: the warm ground family sits on hue 70-85 in both
  schemes (dark canonical, light the derived cream). Re-tint by changing
  the hue component of `--bg`, `--surface`, `--sunken`, `--ink`, `--muted`,
  `--faint`, `--line`, and `--line-soft` together; keep the luminance
  steps. Both schemes share the same hue family - never split them.
- **Fonts**: serif displays, sans reads, mono counts. The stacks are
  canonical and the page must be correct with zero webfonts. The upgrade
  path is the one sanctioned external family from "Optional webfont
  upgrade" below - a Charter-alike first in `--font-serif`; never add a
  second family and never touch `--font-mono` (the counting contract).
- **Radius**: `--radius` (3px) is the whole ladder - boxes, pills, and code
  share it. Retune it as one value; nothing goes rounder, no capsule pills.
- **Density**: tabloid - 16px/1.6 body, `--measure` (68ch), hairline
  `--line-soft` borders, 1px-gap grids, full-width bands, `.mb-wrap`
  (1060px). A denser variant is a density retune (type size, measure, band
  padding), not new components.
- **Scheme lead**: the file pins dark (the canonical side). To lead light
  instead, swap the pin on `:root` and make the light column canonical -
  keep both value sets, keep light-dark() slot 1 = light, and leave the
  print block's light pin alone (paper prints light either way).
- **What inherits unchanged**: the component inventory and `.mb-` class
  grammar, the briefing-identity boundary (no marketing pages or app UI),
  the pack's decision logic and do-nots, print and reduced-motion
  behavior, and the lane contracts (`@layer foundation`, `light-dark()`,
  no required JavaScript).
- **Lane mechanics**: forking this identity into a derived one means
  renaming the `.mb-` prefix (pick a new two-letter namespace and rename
  every class consistently, pack included), pruning inventory you don't
  need (drop a component's rules and its pack line together), and adding
  new components only by the pack's conventions: namespaced, inside the
  `@layer foundation` block, documented. Record provenance in a header
  comment at the top of `foundation.css`.

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

Print rules ship in the file: chrome (topbar nav, share bar) drops out, the
page forces its light scheme via `color-scheme`, body prints at 11pt, and
panels, podcast, lab, and tables avoid page breaks. Do not add print
overrides. `prefers-reduced-motion` disables smooth scrolling; the identity
has no other motion.

## Do not

- Do not add fonts, shadows, gradients, fills outside `--surface`/
  `--sunken`/`--accent`-on-badge, or new colors. If a color is missing, the
  answer is a token from the reference table in `demo.html`, not a hex code.
- Do not restyle foundation classes per project. Branding happens via tokens
  (accent), never by editing component rules.
- Do not add `!important`, new `@layer`s, or `data-theme` attribute logic.
- Do not set body copy in `--accent`, `--ok`, `--warn`, or `--danger`;
  they mark actions and status, and only in the components above.
- Do not round anything beyond `--radius`; this identity is crisp, not soft.
- Do not center content or run display copy past its `max-width` (16ch h1,
  56ch dek, 68ch body).
- Do not build marketing pages or app UI (dashboards, forms beyond the lab
  box, toolbars) with this identity; it is a briefing/report identity.
