# ocean-calm - Agent Prompt-Pack

You are building with the **ocean-calm** design identity: calm light fintech.
Deep azure on cool white. The design decisions are already made - follow this
pack exactly and ship product. Do not improvise visual design.

## Identity contract

- **Fonts**: Plus Jakarta Sans for every heading and display number; Inter for
  body and UI. Never introduce another font. Headings: -0.02em to -0.035em
  tracking. Body: 16px, line-height 1.6.
- **Color**: azure `oklch(52% 0.2 258)` is for ACTION (primary buttons, links,
  focus, selected states) - never decoration, never large fills except the
  CTA band and status hero. Semantic colors only for meaning: green = success,
  amber = warning/pending, red = destructive.
- **Neutrals are cool-tinted** (hue 240-255). Never pure black or pure white.
- **Radius**: controls 8px, surfaces/cards 12px, pills only for badges/avatars.
  One radius per element; do not mix 4px and 16px in one view.
- **Density is relaxed**: 16px base font, 44-56px interactive rows, 8px spacing
  grid, 24-48px between sections. Whitespace is structured, not empty.
- **Numbers are tabular** (`tabular-nums`) everywhere money or metrics appear,
  formatted `KSh 2,500` unless the product is not Kenyan.
- **Motion**: 180-260ms, ease-out (`cubic-bezier(0.22, 0.61, 0.36, 1)`). Cards
  lift 2-3px on hover; buttons lift 1px. Nothing bounces. Respect
  `prefers-reduced-motion`.
- **Focus**: soft azure halo (`0 0 0 3px accent-soft, 0 0 0 5px accent/55`),
  never a hard 1px outline flip.
- **Shadows**: quiet and layered (see theme `--shadow-calm`). Never hard black
  shadows, never glows on non-interactive elements.

## Layout rules

- Max content width 1120px (marketing 760px for prose). Centered, one primary
  action per view.
- Sections alternate `--background` and `--muted` bands; never full dark
  sections. Section headers: eyebrow (11.5px, 800, 0.16em, uppercase, azure) →
  h2 → one-sentence support.
- Landing heroes: left copy / right visual, 5vw headline, one primary + one
  secondary CTA, stat strip with top border.
- Dashboards: stat cards (uppercase 11px labels, 26px display numbers), dense
  tables in rounded 14px bordered wraps, tabs for views.
- Forms: labels above inputs, 12px gaps in pairs, segmented controls for
  2-4 mutually exclusive options, toggles for single switches.

## Component choices (do not substitute)

- Mutually exclusive options → Segmented Control, never dropdowns.
- Single on/off → Toggle. 2-5 static filters → Chips.
- Page-level empty states → the identity dead-state pattern (title + one-line
  body + primary action), never blank space.
- Feedback → Toast, bottom-center, one at a time.
- Navigation → top header, never sidebars on marketing; sidebars only in
  dashboard shells.

## Copy voice

- Plain, warm, confident. Short sentences. Kenyan English is welcome where the
  audience is Kenyan; keep product labels in English.
- Buttons are verbs: "Request a technician", not "Submit". Empty states tell
  the user what to do next.
- Money: `KSh 2,500` (comma thousands, no decimals). Dates: `12 Oct` or
  "3 min ago".

## Do not

- Do not add gradients except the two sanctioned ones (hero art, CTA band -
  azure → deep azure, white 6-8% circles).
- Do not center every block; left-align content sections, center only heroes
  and empty states.
- Do not use purple, teal-on-dark, glassmorphism, or bounce easing.
- Do not invent new spacing values outside the 8px grid.
- Do not add fonts, weights above 800, or letter-spacing below -0.035em.

## Fonts in self-contained output

When the deliverable is a single HTML file, inline the fonts: base64 woff2
@font-face for Plus Jakarta Sans 700/800 and Inter 400/500/600 (latin subsets,
~30KB each). For app installs, use `@fontsource/plus-jakarta-sans` +
`@fontsource/inter`. Never fall back to system sans as the display face.

## Tuning surface

Retuning happens in the theme's token block (`theme/theme.css`) - values
only, token names never change. Everything else in the identity inherits.

- **Accent**: swap the azure `--primary` (`oklch(52% 0.2 258)`), then
  retune what hangs off it in step: `--ring` (the focus halo), `--accent`/
  `--accent-foreground` (hover and selected washes), `--secondary` (the
  tinted band), `--identity-gradient-to` (hero/CTA gradient), and the azure
  cast inside `--shadow-identity`. `--primary-foreground` is the text that
  sits ON the accent - keep it passing contrast. `--ok`, `--warn`, and
  `--destructive` are semantic and only move if the new accent collides
  with one of them.
- **Neutral tint**: the cool family sits on hue 240-255. Re-tint by changing
  the hue component of `--background`, `--foreground`, `--card`, `--muted`,
  `--border`, and `--input` together; keep the luminance steps. Never pure
  black or pure white.
- **Fonts**: Plus Jakarta Sans on display, Inter on body is the contract.
  The upgrade path is documented above ("Fonts in self-contained output"
  for single-file deliverables, `@fontsource` for app installs). A variant
  may swap the display face for another geometric sans - body stays Inter,
  and the negative tracking rules follow the new face.
- **Radius**: `--radius` (0.625rem) is the base the whole ladder derives
  from (`--radius-sm` through `--radius-xl` are calculated off it). Retune
  the base; the ladder follows. Pills stay capsules and only for
  badges/avatars.
- **Density**: 16px base, 44-56px interactive rows, the 8px spacing grid.
  A denser variant is a density retune (base size, row heights, section
  gaps) - never a component redesign.
- **Scheme lead**: the theme pins `color-scheme: light` and ships one
  scheme. Leading dark instead is a whole-block retune: re-derive every
  value against a dark cool ground (azure goes lighter, neutrals keep the
  hue) and pin `color-scheme: dark`.
- **What inherits untouched**: the blocks' component structure, the layout
  rules and section-header grammar, the pack's decision logic (component
  choices, copy voice, the do-nots), and the lane contracts (shadcn token
  names, overrides discipline, `prefers-reduced-motion`). Adapt block
  content, never block styles.
- **Lane mechanics**: a derivation forks `identities/ocean-calm/` into your
  project: retune `theme/theme.css`, keep `overrides/` and `blocks/` as
  they are, and update `identity.json` (name, accent, and a `derivedFrom`
  note).
