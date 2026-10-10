# cobalt-quorum - Agent Prompt-Pack

You are building with the **cobalt-quorum** design identity: corporate-clean
light SaaS landing. White canvas, ink-navy headings, one cobalt accent, and
trust treated as structure. The design decisions are already made - follow this
pack exactly and ship product. Do not improvise visual design.

## Identity contract

- **Fonts**: Instrument Sans for every heading and display number; Inter for
  body and UI. Never introduce another font. Headings: -0.02em to -0.03em
  tracking, weight 700. Body: 16px, line-height 1.6.
- **Color**: cobalt `oklch(50.4% 0.221 264.9)` is for ACTION and pointing
  (primary buttons, links, active nav, the recommended pricing tier frame) -
  never decoration, never more than one accent moment per viewport. Headings
  and body text are ink navy `oklch(24.1% 0.061 258.7)` - never neutral black.
  Sky blue exists only inside charts/illustration. Green is reserved for
  metrics and checkmarks; red only reports destructive states.
- **Accent text**: cobalt text on white uses the darkened step
  `oklch(43% 0.195 265.2)` (`--accent-text`) for small sizes.
- **Neutrals are navy-tinted** (hue 258-267). White canvas `#FFFFFF`;
  sections alternate white / mist `oklch(97.8% 0.005 258.3)` in strict order.
- **Radius**: 11px base (`--radius: 0.6875rem`); the ladder derives sm 7px,
  md 9px, lg 11px, xl 15px. Pills (999px) only for badges and the billing
  toggle. One radius per element.
- **Numbers are tabular** (`tabular-nums`) wherever a metric or price appears.
  Metrics strips read large-figure-over-small-label.
- **Motion**: 150-250ms ease-out (`cubic-bezier(0.22, 0.61, 0.36, 1)`).
  Cards lift 3px on hover; buttons lift 1px. Nothing bounces. Respect
  `prefers-reduced-motion`.
- **Focus**: cobalt halo in two steps (`0 0 0 3px` background, `0 0 0 5px`
  cobalt/50), never a hard 1px outline flip.
- **Shadows**: one soft diffuse pair (`0 1px 2px` + `0 8px 24px` at low
  alpha) - see `--shadow-identity`. Never hard black shadows, never glows.
- **Trust apparatus is structure**: every primary CTA carries a trust
  microcopy line under it ("Free for 14 days · No credit card required");
  badges are OUTLINE PILLS capped at 3-4 per placement; the security band
  sits between features and pricing; metrics are quantified and plausible.

## Layout rules

- Max content width 1120px (prose 720-760px). Centered, one primary action
  per view. Generous hero air, dense pricing/metrics moments.
- Sections alternate white and mist (`bg-secondary/60`) in order; the page's
  ONLY dark surface is the CTA band (or one enterprise pivot): ink navy
  `oklch(20.8% 0.04 265.8)` field, white headline, cobalt button lifted for
  dark ground (`--band-accent`), muted text in `--band-muted`. Never two
  dark bands on one page.
- Section headers: eyebrow (12px, 700, 0.12em, uppercase, cobalt) → h2
  (28-40px display) → one-sentence support, centered unless the section is
  editorial.
- Heroes: left copy / right framed product shot. The product shot ALWAYS sits
  inside the browser-chrome frame (`BrowserFrame`): three dots, URL pill,
  soft shadow. Never a bare image, never a gradient plate.
- Pricing: exactly 3 tiers, middle tier recommended (2px cobalt frame +
  "Most popular" tag, slightly elevated), billing toggle defaulting ANNUAL,
  check lists with green checks, trust microcopy under every tier CTA.
- Forms: labels above inputs, trust microcopy under the submit button.

## Component choices (do not substitute)

- Billing period → segmented pill toggle (Annual active by default), never a
  dropdown.
- FAQ → accordion, one item open at a time, plus/minus indicator, first item
  open by default.
- Badges → outline pills (hairline border, uppercase, slate) for trust and
  compliance; soft-tinted pills only for data states (ok/warn/danger).
- Trust badges → text wordmarks only, grayscale slate, never colored logos.
- Page-level empty states → title + one-line body + primary action, never
  blank space.
- Navigation → sticky top header with the CTA always present; no sidebars.

## Copy voice

- Plain, confident, quantified. Short sentences that survive an auditor.
  Buttons are verbs: "Start deploying", "Book a demo", never "Submit".
- Claims carry numbers: "12 min median pipeline", not "blazing fast".
- Metrics stay plausible-generic; trust notes are concrete: "SOC 2 report
  available under NDA", not "we take security seriously".
- Dates: "6 Oct 2026" or "2 min ago".

## States grammar (required in every surface)

Every block handles the four data states in this identity's voice
(`states.tsx` composes the gallery):

- **Empty**: centered title ("No deployments yet") + one-line "what lands
  here" + primary action. Never blank space.
- **Loading**: muted skeleton bars (`animate-pulse` + `motion-reduce:animate-none`)
  sized to the real layout, with an accessible "Loading …" label.
- **Error**: reassuring title ("Couldn't load deployments" / "Sync failed"),
  one line stating nothing was lost, the failure code in mono where real,
  and an outline "Retry" button.
- **No results**: state the filter, offer "Clear filters" (ghost button).

## Do not

- Do not use Tailwind blue-500 `#3B82F6`, violet `#635BFF`, or sky `#0EA5E9`
  in navigation, buttons, or text - the accent is cobalt, period. Sky exists
  only inside charts/illustration.
- Do not introduce a second dark section, glassmorphism, or gradients as
  section fills.
- Do not exceed 4 badges per placement or let badge rows repeat section to
  section.
- Do not center content sections (heroes, headers, and states may center).
- Do not use neutral black `#111`-class text; headings and body are ink navy.
- Do not add fonts, weights above 700, or letter-spacing below -0.03em.
- Do not place a primary CTA without its trust microcopy line.

## Fonts in self-contained output

When the deliverable is a single HTML file, inline the fonts: base64 woff2
@font-face for Instrument Sans 600/700 and Inter 400/500/600 (latin subsets,
~30KB each). For app installs, use `@fontsource/instrument-sans` +
`@fontsource/inter`. Never fall back to system sans as the display face.

## Page-type recipes

- **Canonical landing sequence** (in order): sticky nav → hero (kicker,
  56-72px headline, subcopy, dual CTA + trust microcopy, framed product shot)
  → grayscale logo cloud → metrics strip (3-4 tabular figures) → bento
  feature grid with one framed crop → security band (badges + one-line
  claims) → testimonial wall → pricing (3 tiers, annual-default toggle) →
  FAQ accordion → CTA band on the dark field → multi-column footer with
  badge row.
- **Changelog / release notes**: article-scale column (720px), each entry a
  date-stamped block with an eyebrow version tag, display headline, and
  grouped lists (Added / Fixed / Changed) marked by outline pills; one
  metrics or CTA moment at the end on the dark band. Entries alternate
  white/mist; nothing else changes the grammar.
- **Long-form article**: the `article.tsx` grammar - eyebrow, display
  headline, meta line, 16px/1.6 prose, callouts as soft-tinted cards, KPI
  cards for figures.
- **Auth / trial form**: centered card on mist, fields stacked, submit with
  trust microcopy, full submitting/error grammar.

## Tuning surface

Retuning happens in the theme's token block (`theme/theme.css`) - values
only, token names never change. Everything else in the identity inherits.

- **Accent**: swap the cobalt `--primary`, then retune what hangs off it in
  step: `--ring` (the focus halo), `--accent-text` (small cobalt text),
  `--band-accent` (the lifted cobalt on the dark band - keep it passing 4.5:1
  with white text), the cobalt cast in button shadows, and `--ok` only if the
  new accent collides with green.
- **Ink / neutrals**: the navy family sits on hue 258-267. Re-tint
  `--foreground`, `--muted-foreground`, `--border`, and the band tokens
  together; keep the luminance steps. Headings are never neutral black.
- **Band**: the dark field is `--band` with explicit companions
  (`--band-foreground`, `--band-muted`, `--band-accent`) - dark-band text
  contrast is tokenized, never improvised.
- **Fonts**: Instrument Sans display, Inter body is the contract. A variant
  may swap the display face for another corporate grotesque - body stays
  Inter and the tracking rules follow the new face.
- **Radius**: `--radius` (0.6875rem = 11px) is the base; the ladder derives
  from it. Retune the base, the ladder follows. Pills stay capsules.
- **Scheme lead**: the theme pins `color-scheme: light` and ships one
  scheme. Cobalt-quorum is deliberately light-only; a dark variant is a
  whole-block retune, not a token flip.
- **What inherits untouched**: the blocks' component structure, the layout
  rules and section-header grammar, the states grammar, the pack's decision
  logic (component choices, copy voice, the do-nots), and the lane contracts
  (shadcn token names, overrides discipline, `prefers-reduced-motion`).
  Adapt block content, never block styles.
- **Lane mechanics**: a derivation forks `identities/cobalt-quorum/` into
  your project: retune `theme/theme.css`, keep `overrides/` and `blocks/` as
  they are, and update `identity.json` (name, accent, and a `derivedFrom`
  note).
