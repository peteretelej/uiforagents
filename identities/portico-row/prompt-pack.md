# portico-row - Agent Prompt-Pack

You are building with the **portico-row** design identity: cool-white
institutional gravitas for firms whose only product is credibility - law,
finance, consultancy. Deep navy structure, serif display authority, engraved
hairlines, and a substance system of real numbers and named people. The design
decisions are already made - follow this pack exactly and ship product. Do not
improvise visual design.

## Identity contract

- **Fonts**: Source Serif 4 for display headings and pull quotes only; Source
  Sans 3 for everything else, including all component headings. Never a third
  family. Serif never appears below display sizes - a serif card title or body
  line is a violation. Display tracking -0.01em.
- **Body floor**: 19px is the law. No body text, paragraph, or list ships
  below 19px. Secondary lines, captions, and table data sit at 16px; tracked
  micro-labels (eyebrows, headers) may go smaller. On wide desktop the same
  19px floor holds - do not trade it away for density.
- **Color structure**: brand navy `#173359` is STRUCTURE - header bands, rules,
  the wordmark, footer furniture. Navy never decorates or fills content
  panels, never tints a card background, never becomes a text highlight.
  Action navy `#2C608A` is for ACTION: primary buttons, links, focus. Ink
  `#202B38` and slate `#565C65` carry all reading text. Wash `#D9E8F6` tints
  badges, plates, and fills - never under body text (short labels and display
  figures only). Navy-deep `#1F303E` is the footer band and the only dark
  surface.
- **Hairlines replace shadows**: every boundary is a 1px engraved hairline
  (`--border`, 4.6:1 on white). No box-shadow at any elevation, no glows, no
  lift transforms. The one flavor line is brass `#8C6D3F`: eyebrow rules and
  pull-quote rules only, never structural.
- **Radius**: 0-2px, the whole ladder. Cards are square (0); controls take 2px.
  Pills are banned except status dots.
- **Numbers are the identity**: every page carries at least one concrete
  number in the substance style - tabular figures over tracked small-caps
  labels (substance strip), or numbered rows with figure + date. Claims without
  numbers are copywick; leave them out.
- **Motion**: 200-400ms fades and 8px rises, ease-out. No parallax, no
  scroll-jacking, no bounce, no lift-on-hover (hairlines deepen instead).
  Respect `prefers-reduced-motion`.
- **Focus**: a 2px action-navy outline, offset 2px, always visible. Never
  removed, never color-only, never a fading halo.
- **One primary CTA per page**: exactly one filled primary button per view
  ("Request a consultation" class). Everything else is outline buttons, text
  links, or quiet links.

## Layout rules

- Max content width 1120px; prose 760px; heroes narrow (880px, left-aligned
  single column). One idea per band.
- Sections breathe at 72-120px vertical padding (`py-24` to `py-28` at the
  large end). Never compress the air; whitespace is the gravitas.
- Band rhythm: cool paper `--background` page, white cards, sunk band
  `--secondary` for alternating full-bleed sections, navy header band on top,
  navy-deep compliance footer at the bottom. Never a second dark band.
- Section headers: eyebrow (12.5px tracked small-caps, navy) over a serif
  display h2 (26-36px), left-aligned. Support line 19px slate.
- The header band: navy, serif wordmark in white, plain nav links, one quiet
  outline CTA. The hero below is narrow: eyebrow, serif display claim, 19px
  support, single primary CTA, substance strip under a hairline.
- Forms: labels above inputs, 2px-corner inputs with the engraved hairline,
  compliance microcopy under the submit button.

## Component choices (do not substitute)

- Practices / services: 3-6 plain-language cards, numbered 01-06 in the
  substance style, hairline borders, deepen-to-navy hover.
- People: attorney cards with portrait (serif monogram plate by default; pass
  a photo to seat one), name, role, 2-4 credential lines, direct phone/email
  at 44px targets. Bios are first-class, never a modal.
- Substance feeds (deals, results, news): numbered rows with figure + date,
  hairline rules, tabular figures, compliance-qualified footnote beneath.
- Badges: tracked small-caps chips, hairline boundary; wash fill with navy
  text when filled. Soft status fills (ok/warn) are opt-in.
- Long quotes: serif italic pull quote with the brass hairline.
- Overlays (dialog / sheet): the chrome wears the navy header band - white
  title, muted companion line, hairline base; content stays square-cornered
  with no shadow. Reservations, confirmations, and document previews live in
  these; the page behind them keeps its own single primary CTA.
- Page-level empty states: title + one-line body + primary action, never
  blank space.
- Navigation: top header band only, never sidebars.

## States grammar (required in every surface)

Every block handles the data states in this identity's voice (`states.tsx`
composes the gallery): empty (title, one line, primary action), loading
(muted skeleton bars sized to the real layout, `animate-pulse` +
`motion-reduce:animate-none`, accessible label), error (reassuring title,
one line stating nothing was lost, failure code in mono where real, outline
Retry), and no results (state the filter, offer clear). Loading text sits
calm and specific: "Retrieving matters", never "Loading...".

## Compliance footer (mandatory on every page)

Every page - landing, article, profile, portal, table - ends in the deep-navy
compliance footer. Its furniture: the serif wordmark and entity line, offices,
registrations sentence, disclosure links (privacy, terms, disclosures,
accessibility), the advertising-notice-class line ("Prior results do not
guarantee a similar outcome" class), and the copyright line. Never shrink it,
lighten it, or split it into columns of marketing links. It is the credibility
sink and the identity's signature.

## Accessibility law (institutional posture)

Stated as law, not preference: 19px body floor; all hairlines clear 3:1
non-text contrast; focus states always visible; interactive targets 44px or
taller; reduced-motion fallback in the theme. Contrast is tokenized
(`--band-muted` 6.4:1 on the band, action navy 6.7:1 on white) - never
improvise a color that skips a token.

## Copy voice

- Plain, precise, unadorned confidence. Short sentences that survive an
  auditor. No exclamation marks, no superlatives, no "solutions".
- Buttons are verbs: "Request a consultation", "Sign in securely", never
  "Submit" or "Learn how".
- Credentials are generic and verifiable-class: "J.D., 1994", "Admitted in
  Illinois", "Counsel on 200+ closed transactions". Never real bar
  associations, regulators, ranking bodies, courts, or client names.
- Figures stay plausible and specific: "$214M", "140 matters", "38 years".
- Dates: "12 March 2026" or "Mar 2026" in feeds.

## Do not

- Do not fill or decorate a content panel with navy, and do not put wash
  tints under body text.
- Do not add shadows, gradients, glassmorphism, rounded pills, or any radius
  above 2px.
- Do not set body text below 19px, or use the serif below display sizes
  (pull quotes excepted).
- Do not introduce a third type family, weights above 700, or letterspaced
  body text.
- Do not add a second dark band, a second primary CTA, or parallax motion.
- Do not name real firms, regulators, bar associations, ranking bodies, or
  clients; sample credentials stay generic.
- Do not ship a page without a concrete number in the substance style or
  without the compliance footer.

## Fonts in self-contained output

When the deliverable is a single HTML file, inline the fonts: base64 woff2
@font-face for Source Serif 4 600/700 and Source Sans 3 400/600 (latin
subsets, ~30KB each). For app installs, use `@fontsource/source-serif-4` +
`@fontsource/source-sans-3`. Never fall back to a generic system serif as
the display face.

## Page-type recipes

- **Firm home page** (canonical sequence): navy header band → narrow hero
  (eyebrow, serif claim, single CTA, substance strip) → credential bar on the
  sunk band → practices grid (numbered cards) → people section (attorney
  cards) → insight teaser or pull quote → contact/intake block with phone and
  offices → compliance footer.
- **Practice-area detail page**: narrow header moment (eyebrow, serif title,
  19px positioning line) → "How we help" numbered list or rows → substance
  band (3-4 matters of record in this practice, figure + date, compliance
  footnote) → attorneys who lead this practice (2-3 people cards) → related
  insights list → contact block → compliance footer.
- **Long-form insight**: the `article.tsx` grammar - eyebrow, serif headline,
  meta line with date, 19px/1.65 prose, pull quote with the brass rule, KPI
  cards for figures, hairline-ruled meta close.
- **Client portal sign-in**: centered `auth.tsx` card on paper, authorized-use
  microcopy, full submitting/error grammar.
- **Deals & results**: `table-page.tsx` grammar - numbered substance rows with
  figure + date, compliance footnote, full states.

## Tuning surface

Retuning happens in the theme's token block (`theme/theme.css`) - values
only, token names never change. Everything else in the identity inherits.

- **Brand navy**: swap `--navy` and keep it structural; retune `--navy-deep`
  (the band) in step, and keep `--band-muted` passing on the new band. Navy
  never migrates into content panels to "add brand".
- **Action color**: swap `--primary` (action navy), then retune `--ring`,
  link hover steps, and `--band-accent` (keep it passing on the band).
  `--primary-foreground` is the text on the action fill - keep it above 4.5:1.
- **Neutrals**: the cool family sits on the gray-cool register. Re-tint
  `--background`, `--foreground`, `--muted-foreground`, `--border`, and
  `--input` together; keep the luminance steps and the 3:1 hairline law.
- **Serif**: Source Serif 4 display over Source Sans 3 body is the contract.
  A variant may swap the serif for another text-class gravitas face; body
  stays a quiet sans and the floor rules follow.
- **Radius**: `--radius` (0.125rem = 2px) is the ceiling; the ladder is
  pinned 0/1/2/2px. Retune within 0-2px only.
- **Floor**: 19px is the accessibility floor. A denser variant is not a
  floor cut; it is a spacing retune.
- **Scheme lead**: the theme pins `color-scheme: light` and ships one scheme.
  A dark variant is a whole-block retune, not a token flip.
- **What inherits untouched**: the blocks' component structure, the layout
  rules and section-header grammar, the states grammar, the compliance
  footer furniture, the pack's decision logic (component choices, copy
  voice, the do-nots), and the lane contracts (shadcn token names, overrides
  discipline, `prefers-reduced-motion`). Adapt block content, never block
  styles.
- **Lane mechanics**: a derivation forks `identities/portico-row/` into your
  project: retune `theme/theme.css`, keep `overrides/` and `blocks/` as they
  are, and update `identity.json` (name, accent, and a `derivedFrom` note).
