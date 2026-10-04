# nairobi-noon - Agent Prompt-Pack

You are building with the **nairobi-noon** design identity: warm Kenyan
daylight. Sand and terracotta, relaxed and inviting. The design decisions are
already made - follow this pack exactly and ship product. Do not improvise
visual design.

## Identity contract

- **Fonts**: Lilita One for every heading and display number (it has one
  weight; never fake-bold it, never letterspace it tight - its rounded
  personality is the point). Inter for body and UI. Never introduce another
  font. Body: 16px, line-height 1.6.
- **Color**: terracotta `oklch(52% 0.15 45)` is for ACTION (primary buttons,
  links, focus, selected states) - never decoration, never large fills except
  the CTA band and status hero. Semantic colors only for meaning: green =
  success, amber = warning/pending, red = destructive.
- **Neutrals are warm** (hue 60-80 sand). Never pure black or pure white.
  Backgrounds carry visible warmth: `oklch(96% 0.02 80)` page, near-white
  cards.
- **Radius**: controls 8px, surfaces/cards 12px, pills only for badges.
  Buttons sit at 10px. Do not mix sharp and very-round in one view.
- **Density is relaxed**: 16px base font, 44-56px interactive rows, 8px
  spacing grid, 24-48px between sections. The vibe is unhurried; do not cram.
- **Numbers are tabular** (`tabular-nums`) everywhere money or metrics appear,
  formatted `KSh 2,500` unless the product is not Kenyan.
- **Motion**: 200ms, ease-out. Cards lift 2-3px on hover; buttons lift 1px.
  Gentle. Respect `prefers-reduced-motion`.
- **Focus**: warm terracotta halo (`0 0 0 3px accent-soft, 0 0 0 5px
  accent/50`), never a hard 1px outline flip.
- **Shadows**: warm brown-tinted and soft. Never hard black, never glows.

## Layout rules

- Max content width 1120px (marketing 760px for prose). Centered, one primary
  action per view.
- Section headers: eyebrow (11.5px, 800, 0.16em, uppercase, terracotta) →
  heading → one-sentence support.
- Landing heroes: left copy / right warm-gradient visual, one primary + one
  secondary CTA, stat strip with top border.
- Dashboards: stat cards (uppercase 11px labels, big display numbers), tables
  in rounded 12px bordered wraps, tabs for views.
- Forms: labels above inputs, 12px gaps in pairs, segmented controls for 2-4
  mutually exclusive options, toggles for single switches.

## Component choices (do not substitute)

- Mutually exclusive options → Segmented Control, never dropdowns.
- Single on/off → Toggle. 2-5 static filters → Chips.
- Empty states → title + one-line body + primary action, never blank space.
- Feedback → Toast, bottom-center, one at a time.
- Navigation → top header on marketing; sidebars only in dashboard shells.

## Copy voice

- Plain, warm, mtaa-proud. Short sentences. Kenyan English and light Swahili
  are welcome where the audience is Kenyan; keep product labels in English.
- Buttons are verbs: "Book a clean", not "Submit". Empty states tell the user
  what to do next.
- Money: `KSh 2,500` (comma thousands, no decimals). Dates: `12 Oct` or
  "3 min ago".

## Do not

- Do not use cool blues, purples, or glassmorphism - this identity is warm
  daylight only.
- Do not center every block; left-align content sections, center only heroes
  and empty states.
- Do not letterspace Lilita One negative or add font weights (it has one).
- Do not invent new spacing values outside the 8px grid.
- Do not use hard black shadows or glows.

## Fonts in self-contained output

When the deliverable is a single HTML file, inline the fonts: base64 woff2
@font-face for Lilita One (400) and Inter 400/500/600 (latin subsets, ~30KB
each). For app installs, use `@fontsource/lilita-one` + `@fontsource/inter`.
Never fall back to system sans as the display face.
