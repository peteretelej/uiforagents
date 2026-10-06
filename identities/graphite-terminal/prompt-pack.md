# graphite-terminal - Agent Prompt-Pack

You are building with the **graphite-terminal** design identity: dark dense ops
tooling. Near-black graphite, electric lime action, mono data. The design
decisions are already made - follow this pack exactly and ship product. Do not
improvise visual design.

## Identity contract

- **Fonts**: JetBrains Mono for every heading, display number, id, metric,
  status chip, and code snippet; Inter for body prose and UI text. Never
  introduce another font. Headings: -0.01em to -0.02em tracking. Body: 15px,
  line-height 1.55.
- **Color**: lime `oklch(82% 0.12 118)` is for ACTION (primary buttons, links,
  focus, selected states) - never decoration, never large fills except the
  hero gradient panel. Semantic colors only for meaning: green = healthy,
  amber = degraded/pending, red = failing/destructive (destructive is the
  dark-theme red `oklch(52% 0.17 25)` paired with a near-white foreground,
  so white badge and button text pass contrast on it).
- **Surfaces are stepped graphite** (hue 255): page 14.5%, card 17.5%,
  popover 18.5%, muted 21.5%. Depth = a lighter step plus a hairline border,
  never a heavy shadow. Never pure black `#000`, never pure white text.
- **Contrast floor (measured)**: body text 15.6:1 on the page step; muted
  text 6.6-6.9:1; dark-on-lime action 11.5:1; destructive 6:1; borders
  clear 3:1 (3.7:1 on card). If you introduce a new color pair, it must clear
  4.5:1 for text and 3:1 for boundaries. Gray-on-gray below that is a bug.
- **Radius is tight**: controls 4px, surfaces/cards 8px, pills only for
  avatars. Nothing softer than 8px except pills; no rounded-2xl softness.
- **Density is tight**: 15px base, 36-40px interactive rows, 4px spacing
  grid, 16-32px between sections. Dense means efficient, not cramped: keep
  one clear gutter rhythm.
- **Numbers are mono and tabular** (`font-mono tabular-nums`) everywhere a
  metric, id, price, or latency appears - `99.98%`, `42ms`, `svc-01`. Units
  stay lowercase (`ms`, `mb`); thousands use commas.
- **Motion**: 120ms, `cubic-bezier(0, 0, 0.2, 1)`. Feedback is border/glow
  change, never lift or bounce. Respect `prefers-reduced-motion`.
- **Focus**: lime ring with a background gap (`0 0 0 1px` page color, `0 0 0
  3px` lime/50) - a lit terminal cursor, not a harsh outline.
- **Shadows**: flat. The only sanctioned shadow is the theme's
  `--shadow-identity` (1px black drop). Glows are reserved for the primary
  button hover.

## Layout rules

- Max content width 1120px (prose 680px). Centered, left-aligned content, one
  primary action per view.
- Sections alternate `--background` and `--muted` steps; never light
  sections. Section headers: eyebrow (11px mono, 700, 0.14em, uppercase,
  lime) → h2 → one-sentence support.
- Landing heroes: left copy / right visual. The visual is the one sanctioned
  gradient (150deg, lime → deep green `oklch(22% 0.06 155)`) with the
  identity signature: a mono prompt line (`~/ops $ ...`).
- Dashboards: stat cards (uppercase 10.5px labels, 22px mono numbers), dense
  hairline tables in 8px-bordered wraps, sticky 52px header with backdrop
  blur.
- Forms: labels above inputs, 8px gaps in pairs, segmented controls for 2-4
  mutually exclusive options, toggles for single switches.

## Component choices (do not substitute)

- Mutually exclusive options → Segmented Control, never dropdowns.
- Single on/off → Toggle. 2-5 static filters → Chips.
- Page-level empty states → the identity dead-state pattern (title + one-line
  body + primary action), never blank space.
- Feedback → Toast, bottom-center, one at a time.
- Navigation → top header for marketing and shells; sidebars only when a
  dashboard truly needs a second nav level.

## Copy voice

- Plain, precise, unexcited. Short sentences. Ops vocabulary is welcome
  (`deploy`, `incident`, `rollback`); keep product labels in English.
- Buttons are verbs: "Deploy now", not "Submit". Empty states tell the user
  what to do next.
- Statuses are single words in chips: Healthy, Degraded, Failing. Timestamps:
  `12 Oct 14:02` or "3 min ago".

## Do not

- Do not add gradients except the sanctioned hero panel; no glows except the
  primary hover and focus ring.
- Do not use lime as decoration, large fill, or background wash.
- Do not use light sections, pure black surfaces, glassmorphism, bounce
  easing, or transitions above 180ms.
- Do not invent spacing outside the 4px grid, or radii above 8px (pills
  excepted).
- Do not add fonts, weights above 700, or letter-spacing below -0.02em.
- Do not set body text below 4.5:1 contrast or boundaries below 3:1.

## Fonts in self-contained output

When the deliverable is a single HTML file, inline the fonts: base64 woff2
@font-face for JetBrains Mono 400/600/700 and Inter 400/500/600 (latin
subsets, ~30KB each). For app installs, use `@fontsource/jetbrains-mono` +
`@fontsource/inter`. The mono stack in the theme is a preload fallback only -
never ship system mono as the final display face.
