# frost-field - Agent Prompt-Pack

You are building with the **frost-field** design identity: calm light glass
for wellness products. Frosted white panels and floating chrome drift over a
fixed pastel aurora field - lavender, sky, mint, peach. The design decisions
are already made - follow this pack exactly and ship product. Do not improvise
visual design.

## Identity contract

- **The field**: every page sits on the fixed aurora gradient (`--field`,
  applied to the body, `background-attachment: fixed`). It is the identity's
  only glow - never add glows, neons, or gradient ornaments of your own. An
  optional `.field-drift` class sways it slowly; it is flavor and
  `prefers-reduced-motion` stills it.
- **Fill discipline is law** (Liquid Glass regular-glass recipe):
  `--glass-fill` (0.55) for regular glass panels, `--glass-fill-strong`
  (0.72) MANDATORY under any body text, `--glass-fill-chrome` (0.35) only
  for hero panels, docks, and floating chrome. Body text that would sit on
  chrome fill sits on a strong-fill plate instead (see the hero block's
  text plate). Display-size ink may sit directly on chrome fill.
  Use the override classes: `.glass`, `.glass-strong`, `.glass-chrome`
  (they carry blur, the `-webkit-` prefix, border, rim, and shadow).
- **Ink and muted**: ink `#1c1c28`, muted `#5c5c6e`. Never pure black.
- **Accent**: one muted violet, tuned for contrast (`#6a5ae0`, 5.1:1 on
  white), is for ACTION - primary buttons, links, focus, selected states,
  progress fills. Never on large fills, never as decoration. The pastel
  data-viz four (`--viz-violet/sky/mint/rose`) are thin strokes and small
  fills (rings, streak dots, chart lines) - never large fills, never text.
- **Radius**: controls 14px, cards/surfaces 20px, pills (999px) for buttons,
  badges, chips, and dock items. One radius per element.
- **Density is airy**: 20-24px panel padding, 16px base text, one idea per
  card. KPI tiles and tracker cards are the data ceiling - no tables, no
  ledgers, no dense grids. Long histories render as airy dated log rows
  (list semantics).
- **Fonts**: Manrope for every heading, display numeral, and wordmark;
  Inter for body and UI. Never a third family. Display tracking -0.01em to
  -0.02em.
- **Motion**: 160-220ms, ease-out (`cubic-bezier(0.22, 0.61, 0.36, 1)`).
  Cards lift 2px, buttons lift 1px, nothing bounces, nothing blurs while
  moving. Respect `prefers-reduced-motion` (the theme already does).
- **Focus**: soft two-step halo (lavender wash, then action violet), never
  a hard 1px outline flip. The override ships it.
- **Shadows**: one soft ambient shadow (`--glass-shadow`) plus the top rim
  highlight (`--glass-rim`) on every glass surface. No other shadows.

## Layout rules

- Max content width 1120px (marketing 880px, prose 760px). One primary
  action per view.
- Panels float: the dashboard header is a rounded 20px glass bar, not a
  full-bleed strip. Let the field breathe between sections (64-96px).
- Section headers: eyebrow (11.5px, 700, 0.16em uppercase, violet) over a
  Manrope h2, one short support line in muted.
- Dashboards: 4 KPI tiles (28-32px numerals, uppercase 11.5px labels), then
  tracker cards (mood check-in, streak grid), then program cards.
- Forms: labels above inputs, generous 12px+ gaps, one column; the card is
  strong-fill glass.
- Never paint section backgrounds over the field - transparency is the
  material. Alternate rhythm with spacing and card grouping, not bands.

## Narrow screens

- Verify every build at 390x844 (and 360px) before delivering; the page
  must not scroll horizontally as a document, and nothing important is
  out of reach.
- The dashboard header switches under `sm:` from the floating glass
  bar's inline nav to a scrollable strong-fill pill dock
  (`dashboard-shell` ships both; do not re-improve them per project).
  That pill dock is the sanctioned contained scroll dock for a flat
  app-shell nav; a long-form section nav uses a zero-JS `<details>`
  disclosure. Headers wrap or stack, never widen the document; deleting
  navigation is not a mobile strategy.
- Wide artifacts pan instead of shrinking: a chart line drawing, a code
  block, any fixed-width element rides in an `overflow-x-auto` wrapper
  with a `min-w-[640px]` floor. Tables are banned here (the log grammar
  is the data surface); if one is ever unavoidable, it obeys the same
  pan rule - sticky first column on an opaque fill behind a hairline
  edge, with a visible scroll cue.
- On coarse pointers (`@media (pointer: coarse)`) controls hold a 44px
  hit target (`min-h-[44px]` on buttons, padded nav links).
- Light-only by contract, so no scheme toggle exists; when a dark
  variant and its toggle land, they ship icon-only (moon/sun glyph,
  never a text label) and reachable at every width.

## Component choices (do not substitute)

- Mood/scale input → five pill faces, selected pill in action violet.
- Habit/streak → dot grids with mint fills and a violet ring for today.
- Progress → thin (6px) violet tracks with tabular `6/10` counters.
- Mutually exclusive options → pill chips, never dropdowns.
- Page-level empty states → title + one-line body + primary action on a
  glass card, never blank space.
- Feedback → Toast, bottom-center, one at a time.
- Overlays (popover / dialog / sheet): popovers read over content on the
  strong fill (the theme's popover token); dialog and sheet wear the glass
  chrome - light border, rim highlight, soft shadow - and float over the
  field like the hero panel. Body text inside overlays never sits below
  the strong fill.
- Navigation → floating glass header bar; pill docks for tab bars.
- Lists of record → the activity-log grammar (dated rows, kind pill,
  duration, hairline dividers). Never a `<table>`.

## States grammar (required in every surface)

Every block handles the data states in this identity's voice (`states.tsx`
composes the gallery): empty (title, one line, primary action), loading
(muted skeleton pills/bars sized to the real layout, `animate-pulse` +
`motion-reduce:animate-none`, accessible label), error (calm title, one
line stating nothing was lost, mono failure code where real, outline Retry),
and no results (state the filter, offer clear). Loading copy stays calm and
specific: "Fetching today's sessions", never "Loading...".

## Accessibility law (the glass floors)

Stated as law, not preference:

- The 0.72 strong fill sits under all body text - no exceptions.
- `prefers-reduced-transparency: reduce` swaps every glass fill to solid
  `#fbfbfd` (`--solid-surface`); geometry holds, nothing re-flows.
- `@supports not (backdrop-filter)` raises fills to near-opaque 0.95 white
  (the theme ships both fallbacks; do not re-implement them).
- `forced-colors: active` flattens glass to plain bordered surfaces (the
  override ships it).
- `backdrop-filter` always ships with its `-webkit-` prefix (use the
  override classes or Tailwind's backdrop utilities, which do both).
- Contrast is verified on the COMPOSITED result (fill over field), not the
  raw token. The tokenized pairs already pass: ink on any fill, muted 6.5:1
  on white, accent 5.1:1, status foregrounds 4.7:1+ on their soft washes.
  Never improvise a color that skips a token.

## Copy voice

- Warm, calm, unhurried. Short sentences. Wellness language without
  mysticism: "Wind-down body scan", not "Align your chakras".
- Buttons are verbs: "Start a session", "Log today's mood", never "Submit".
- Encouragement is factual: "9-day streak", "Your history is safe".
  No guilt for missed days.
- Durations and dates are tabular: "12 min", "Oct 12", "Tomorrow, 7:00 AM".

## Do not

- Do not put body text on the 0.35 chrome fill or the 0.55 regular fill.
- Do not add glows, neon accents, extra gradients, or a second accent hue.
- Do not use tables, ledgers, or data-dense grids anywhere.
- Do not paint opaque page sections over the field; the field is always
  visible between and behind panels.
- Do not introduce fonts, weights above 800, or letter-spacing below
  -0.02em. Do not use pure black or pure white as text.
- Do not animate blur, animate the field fast, or ship motion without a
  reduced-motion fallback.
- Do not restyle component structure per project - brand via tokens.

## Fonts in self-contained output

When the deliverable is a single HTML file, inline the fonts: base64 woff2
@font-face for Manrope 600/700/800 and Inter 400/500/600 (latin subsets,
~30KB each). For app installs, use `@fontsource/manrope` +
`@fontsource/inter`. Never fall back to system sans as the display face.

## Page-type recipes

- **Wellbeing board** (canonical dashboard): floating glass header → KPI
  tile row (large numerals) → mood check-in + streak grid pair → program
  cards → activity log (`activity-log.tsx` grammar, full states).
- **Program-detail page**: floating header → narrow hero moment (eyebrow,
  display title, one-line promise) → program facts on a glass card (pace,
  session length, coach) → session list as dated log rows → outcomes as 3-4
  KPI tiles → related programs as cards → one primary CTA.
- **Marketing landing**: the hero block (chrome panel, strong text plate,
  stat chips) → three benefit cards → a tracker-card teaser pair → CTA.
- **Sign-in**: centered `auth.tsx` card over the field, full
  submitting/error grammar.
- **Long-form practice note**: the `article.tsx` grammar - eyebrow,
  display headline, meta line, strong-fill reading plate, pull moments via
  Callout, KPI cards for figures.
- **History/log view**: the activity-log grammar with kind filter pills and
  the full states grammar.

## Tuning surface

Retuning happens in the theme's token block (`theme/theme.css`) - values
only, token names never change. Everything else in the identity inherits.

- **Field**: swap the four stops in `--field` (keep the 135deg multi-stop
  shape and light luminance); contrast floors assume a light field. The
  fallbacks key off the same tokens and follow automatically.
- **Glass fills**: move `--glass-fill*` together and keep the ladder
  (chrome < regular < strong). Never lower `--glass-fill-strong` below
  0.72; it is the body-text floor. If the field darkens, raise fills.
- **Blur**: `--glass-blur` is `blur(20px) saturate(150%)`; the saturate
  keeps pastels from muddying. Keep both halves.
- **Accent**: swap `--primary` (keep 4.5:1+ on white), then retune `--ring`
  and the violet box-shadow in the overrides in step. The viz four are
  decorative and only move if the new accent collides with them.
- **Fonts**: Manrope display over Inter body is the contract. A variant may
  swap the display face for another rounded-geometric sans; body stays
  Inter and the tracking rules follow the new face.
- **Radius**: `--radius` (0.875rem = 14px) is the base; the ladder derives
  cards at +6px. Pills stay pills.
- **Density**: airy is the contract. A denser variant tightens padding and
  gaps only - never reintroduces tables.
- **Scheme lead**: the theme pins `color-scheme: light` and ships one
  scheme. A dark variant is a whole-block retune against a night field,
  not a token flip.
- **What inherits untouched**: the blocks' component structure, the layout
  rules and section-header grammar, the states grammar, the accessibility
  floors, the pack's decision logic (component choices, copy voice, the
  do-nots), and the lane contracts (shadcn token names, overrides
  discipline, `prefers-reduced-motion`). Adapt block content, never block
  styles.
- **Lane mechanics**: a derivation forks `identities/frost-field/` into
  your project: retune `theme/theme.css`, keep `overrides/` and `blocks/`
  as they are, and update `identity.json` (name, accent, and a
  `derivedFrom` note).
