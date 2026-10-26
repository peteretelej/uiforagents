# sticker-press - Agent Prompt-Pack

You are building with the **sticker-press** design identity: playful
sticker-shop brutalism. Cream paper, black ink borders, zero-blur hard
shadows, signal yellow that always shouts in black. The design decisions are
already made - follow this pack exactly and ship product. Do not improvise
visual design.

## Identity contract

- **Fonts**: Archivo Black for display headlines (ALL CAPS, never below
  2rem, -0.02em tracking, weight 400 - the face ships one weight, never
  synthesize bold); Space Grotesk for body, sub-display headings, and UI;
  Space Mono for every label, price, number, badge, and date, uppercase
  with 0.06-0.08em tracking. Never introduce another font.
- **Accessibility is law, not taste**: body text passes 4.5:1 (ink on paper
  is 19:1; muted `#5A5A5A` is 6.8:1). Non-text boundaries pass 3:1 - which
  is why **accent yellow never touches the page without its 2px ink
  border**: the border is the boundary, not the fill. Text on the accent is
  BLACK, never accent-on-white, never white-on-accent. Danger red
  (`#E63946`) carries a BLACK label (5.0:1; white fails).
- **Focus**: a 3px solid black outline with `outline-offset: 3px` - never
  color-only, never a soft halo, and hard shadows must never hide it.
- **Carry both attributes** on the identity root element:
  `data-theme="sticker-press"` (theme tokens key on it) AND
  `data-identity="sticker-press"` (overrides key on it). With only one, half
  the system stays dormant.
- **Color**: paper `#FFFDF5`, white surfaces, black ink. Signal yellow
  `#FFD23F` is the accent (hero fills, primary buttons, the marquee band,
  the loud pricing tier). Sticker helpers are rationed: coral `#FF6B6B`,
  sky `#74B9FF`, green `#88D498` - ONE helper per section, max. Sky doubles
  as the in-progress status tone; green as success. Red `#E63946` reports
  destructive states only.
- **Borders**: 2px solid black on every interactive or raised element.
  1px is never a substitute; 3px is never needed.
- **Shadows: the zero-blur ladder** (shadow color = the border token, one
  direction - bottom-right - per page): 2px `2px 2px 0` chips/badges/pills,
  4px `4px 4px 0` default for buttons/cards/inputs, 8px `8px 8px 0` ONE
  hero/overlay moment per page. Never blur, never soft shadows, never a
  second direction.
- **Radius 0 everywhere.** No rounded variants, no pills with rounded ends,
  no tolerance - square corners are the point.
- **Motion: press-into-shadow.** Interactive elements rest at 4px shadow;
  hover sinks `translate(2px, 2px)` to the 2px shadow; active sinks
  `translate(4px, 4px)` with no shadow. Mechanical timing (100ms linear) -
  nothing floats, nothing glows, nothing bounces. Respect
  `prefers-reduced-motion` (the marquee freezes).
- **Density is airy**: 24-32px padding inside every bordered box; sections
  breathe; the boldness must stay readable.

## Layout rules

- Max content width 1120px (prose 720px). One primary action per view.
- Sections alternate paper `--background` and muted fill `--secondary`
  bands, separated by 2px ink rules - the structure reads as stacked
  bordered bands.
- Section headers: mono uppercase eyebrow (11-12px, bold, tracked) → h2 in
  Archivo caps (2-2.75rem) → one-sentence support in Space Grotesk.
- Heroes: left copy / right retro window card (`WindowFrame`: black
  titlebar, three square dots, mono URL) with the starburst seal
  overlapping a corner and ONE sticker chip on an edge. The canonical
  button pair under the copy: yellow-filled primary + white-outline
  secondary, both hard-shadowed.
- Cards: white, 2px ink border, 4px shadow. One loud-filled accent card per
  grid, max (the lead tile may go yellow).
- Pricing: exactly 3 tiers, middle tier ACCENT-FILLED (black text, hero
  shadow, "Most popular" tag on a white chip). Billing toggle defaults to
  ANNUAL. Trust microcopy under every tier CTA.
- Footer: link columns on the muted band, then the brand as an oversized
  ALL-CAPS Archivo wordmark (3rem+). The wordmark is decorative; keep an
  h2 somewhere carrying the real content.

## Narrow screens

- Narrow screens are the first layout, not the last: every grid starts
  `grid-cols-1` and only upgrades at `sm:`/`md:`/`lg:`; no header, bar,
  or row gets a fixed height (`min-h-*` so wrapped content can grow).
- Test the canonical landing at 390px (and 360px) before shipping:
  nothing wider than the viewport, every CTA reachable, no clipped
  words, no horizontal document scroll.
- The header bar grows instead of clipping: the brand may wrap to two
  lines (never below its 2rem floor, never truncated mid-word), and
  below 768px (`md`) the inline link row is replaced, never silently
  removed - a bordered disclosure button (mono uppercase "MENU") opens
  the links stacked full-width, each a 44px row. That disclosure is the
  sanctioned long-form nav pattern; a flat app-shell nav may instead
  pan as a contained scroll dock. Deleting navigation is not a mobile
  strategy.
- Tables on narrow screens: any table that needs more than ~340px keeps
  the `overflow-x-auto` bordered card and a `min-w-[640px]` floor
  (panning at readable size, never shrinking), pins its first column
  (opaque card fill, 2px-rule edge), and carries a one-line "SCROLL →"
  affordance. Charts, diagrams, and code obey the same 640px pan floor.
- Every interactive target is at least 44x44 CSS px on touch; coarse
  pointers (`@media (pointer: coarse)`) floor the small ones at 44px.
- The theme pins `color-scheme: light` and ships one scheme - no toggle
  today; when one lands it ships icon-only (moon/sun glyph, never a
  text label) and reachable at every width.

## Component choices (do not substitute)

- Badges/chips → bordered mono uppercase chips with the 2px shadow rung.
- Navigation → sticky top header with solid fill (never translucent, blur
  is banned), 2px ink bottom rule, CTA always present.
- FAQ → bordered rows with a plus glyph that rotates 45deg when open.
- Marquee divider → yellow band, Archivo caps at the 2rem floor, linear
  loop (`.sticker-marquee`), decorative (`aria-hidden`), one per page.
- Countdowns/timers/figures → Space Mono, tabular.
- Tables → 2px ink outer rule, 2px rules between rows, muted-fill header
  band, Space Mono uppercase headers, tabular figures; status pills are the
  soft-fill chips (ok/warn/danger), never raw colored text.
- Page-level empty states → title + one-line body + primary action, never
  blank space.
- Sidebars → never on marketing; console surfaces stay single-column
  inside the window frame.

## Copy voice

- Loud, cheerful, a little cheeky - but concrete. Short declarative
  sentences that survive being screenshot.
- Buttons are verbs: "Start your launch", not "Submit". Empty states tell
  the user what to do next.
- Headlines may shout; body copy never lies. Claims stay plausible-generic;
  sample content stays fictional (no real brands, no client data).
- Dates: "6 Oct 2026". Figures in Space Mono with thousands separators.

## States grammar (required in every surface)

Every block handles the four data states in this identity's voice
(`states.tsx` composes the gallery):

- **Empty**: Archivo caps title ("NO LAUNCHES YET") + one-line "what lands
  here" + primary action. Never blank space.
- **Loading**: square-cornered muted skeleton bars (`animate-pulse` +
  `motion-reduce:animate-none`) sized to the real layout, with an
  accessible "Loading …" label.
- **Error**: reassuring caps title, one line stating nothing was lost, the
  failure code in Space Mono where real, and an outline "Retry" button.
- **No results**: state the filter, offer "Clear filters" (ghost button on
  a white fill - the overrides border keeps it visible).

## Do not

- Do not use blur anywhere: no `backdrop-blur`, no blurred shadows, no
  glows, no gradients. Flat fills, ink borders, hard shadows only.
- Do not round anything: radius 0 is total. No pills, no rounded buttons.
- Do not put white text on the accent or the helpers; black text only.
- Do not put accent yellow on the page without its 2px ink border.
- Do not use two sticker helpers in one section; do not let the marquee,
  the seal, and a helper chip all land in the same section.
- Do not set Archivo Black below 2rem, in mixed case, or with synthetic
  bold; do not use it for body copy or small labels.
- Do not lift elements OUT of their shadow on hover - this identity presses
  IN. No translateY(-n) hovers.
- Do not add fonts, letter-spacing above 0.1em on labels, or easing curves
  softer than linear.

## Fonts in self-contained output

When the deliverable is a single HTML file, inline the fonts: base64 woff2
@font-face for Archivo Black 400, Space Grotesk 400/500/700, and Space Mono
400/700 (latin subsets, ~30KB each). For app installs, use
`@fontsource/archivo-black` + `@fontsource/space-grotesk` +
`@fontsource/space-mono`. Never fall back to system sans as the display
face.

## Page-type recipes

- **Canonical launch landing** (in order): sticky nav → hero (mono eyebrow,
  ALL-CAPS headline, subcopy, canonical button pair + trust line, window
  card with starburst seal + one sticker chip) → maker chips (outline logo
  row) → metrics strip (4 Space Mono figures) → feature sticker-card grid
  (one loud-filled lead tile) → marquee divider → testimonial cards →
  pricing (3 tiers, accent-filled middle, annual-default toggle) → FAQ
  (plus-glyph rows) → CTA banner (yellow, hero shadow) → oversized wordmark
  footer.
- **Changelog / release notes**: article-scale column (720px), each entry a
  date-stamped block with a mono version tag, Archivo caps headline, and
  grouped lists (Added / Fixed / Changed) marked by bordered chips; callouts
  ride the muted fill (info) or the coral helper (one per entry, max). Keep
  the entry rhythm strict; nothing else changes the grammar.

## Tuning surface

Retuning happens in the theme's token block (`theme/theme.css`) - values
only, token names never change. Everything else in the identity inherits.

- **Accent**: swap the signal-yellow `--primary`, then retune what hangs off
  it in step: `--primary-foreground` STAYS BLACK (the law) or moves to a
  darker step that still passes 4.5:1 on the new fill; `--ring`; the
  marquee/CTA band fills in blocks. Every accent surface keeps its ink
  border.
- **Sticker helpers**: coral/sky/green are tokenized
  (`--sticker-coral/sky/green`); retune all three together or drop to two,
  never one, so the set still reads as a system. Keep the one-per-section
  ration.
- **Paper / neutrals**: the warm paper family can slide warmer or cooler -
  retune `--background`, `--secondary`/`--muted` (`--accent-soft` follows
  the muted fill), and `--muted-foreground` together; muted text must stay
  at or above 4.5:1 on paper. Ink stays `#000000` unless the whole identity
  is being re-inked.
- **Status tones**: ok/warn/danger keep the soft-fill + darkened-text
  pattern (`--ok-soft`/`--ok-foreground`, etc.); re-derive the text steps
  against the new fills, never use the raw helper colors as text.
- **Shadow ladder**: the rungs are `--shadow-chip`, `--shadow-identity`,
  and `--shadow-hero`. Retune sizes together (the ladder steps scale), keep
  zero blur and one direction; shadow color stays `var(--border)`.
- **Fonts**: Archivo Black display, Space Grotesk body, Space Mono labels is
  the contract. A variant may swap the display face for another heavy
  grotesque - the caps-only, 2rem-floor, -0.02em rules follow the new face;
  body stays Space Grotesk.
- **Radius**: pinned at 0. A rounded variant is a different identity, not a
  retune.
- **Scheme lead**: the theme pins `color-scheme: light` and ships one
  scheme. Sticker-press is deliberately light-only; a dark variant is a
  whole-block retune, not a token flip.
- **What inherits untouched**: the blocks' component structure, the layout
  rules and section-header grammar, the states grammar, the pack's decision
  logic (component choices, copy voice, the do-nots), and the lane contracts
  (shadcn token names, overrides discipline, `prefers-reduced-motion`).
  Adapt block content, never block styles.
- **Lane mechanics**: a derivation forks `identities/sticker-press/` into
  your project: retune `theme/theme.css`, keep `overrides/` and `blocks/`
  as they are, and update `identity.json` (name, accent, and a
  `derivedFrom` note).
