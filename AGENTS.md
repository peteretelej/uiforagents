# AGENTS.md - building with uiforagents identities

uiforagents is a catalogue of **design identities**: complete, opinionated
design systems. The React lane ships shadcn/ui (Tailwind v4, Base UI
primitives) identities under `identities/<slug>/` with a theme, component
overrides, blocks, and an agent prompt-pack. The artifact lane ships pure-CSS
identities for self-contained HTML (see "Building a single-file artifact" below).
It operates as a **design system factory**: identities are starting points -
when no identity fits a project, agents derive a project-local system from the
nearest parent per [DERIVE.md](DERIVE.md) instead of improvising, and promotion
of recurring derived systems into the catalogue stays Peter-curated.
The repo root package.json is a private workspace root - nothing here publishes
to npm. `skills/uiforagents/SKILL.md` is the public agent entrypoint
(`npx skills add peteretelej/uiforagents -g`): it routes agents into these same
contracts and must stay lean - instructions only, catalogue data lives on the
website (llms.txt, identity-metadata.json), never inlined into the skill.

## Building an app with an identity

1. Read `identities/<slug>/prompt-pack.md` FIRST - it is the binding design
   contract. Follow it exactly; do not improvise visual design.
2. Import `theme/theme.css` AND `overrides/overrides.css` after the
   Tailwind import.
3. Start from `blocks/*.tsx` and adapt content. Never restyle identity
   components per project - brand happens via tokens (accent, logo), not
   structure.
4. Carry both `data-theme="<slug>"` and `data-identity="<slug>"` on the
   same identity root element: theme tokens key on `[data-theme]`
   (nairobi-noon ships no other scope), overrides key on
   `[data-identity]`. With only one attribute, half the system stays
   dormant.
5. Fonts via @fontsource (Plus Jakarta Sans + Inter for ocean-calm); in
   single-file outputs, inline woff2 base64 per the prompt-pack.

## Building a single-file artifact (pure-CSS lane)

The artifact lane serves self-contained HTML: articles, briefings, reports,
any page shipped as one file. It has no registry, no codegen, no npm
dependency, and no required JavaScript.

1. Read `identities/<slug>/prompt-pack.md` FIRST - it is the binding design
   contract. Follow it exactly; do not improvise visual design.
2. Paste `foundation.css` into a `<style>` block (single-file deliverables)
   or link it as a file. Both modes are first-class; never edit the CSS
   itself. Page CSS stays unlayered so it overrides the `@layer foundation`
   file without `!important`.
3. Brand via tokens (accent), never by restyling component classes.
4. No `identity.json`, no `registry/`, no `theme/`, no `blocks/`, and never
   run `tooling/build-registry.mjs` on an artifact identity.

## Artifact-lane governance

- Curated, not community-directed. Propose changes in issues.
- A new artifact identity is minted only when a use case recurs or produces a
  signature look worth naming. One-off pages style themselves with an
  existing identity's foundation.
- Any change to an artifact identity updates its prompt-pack AND its demo,
  and re-runs the one-shot test: a fresh agent gets only the prompt-pack +
  `foundation.css` and builds a page type with no pre-made block. PASS =
  identity-faithful, premium, no design improvisation.
- The CSS file is canonical and hand-curated. If drift ever matters, add a
  checker, never a generator.
- The catalogue presents artifact identities as themselves: an identity's
  page on the website IS its `demo.html` (published as-is, with a floating
  catalogue bar overlaid around it). Never restyle, wrap, or re-template an
  artifact demo to fit site chrome; demos must keep working as standalone
  documents first.

## Adding or changing an identity

- Identities are curated, not community-directed. Propose changes in issues.
- New identity: copy an existing identity directory, retune, name it
  vibe-derived and brand-neutral, then validate with the one-shot test:
  a fresh agent gets only the prompt-pack + theme + overrides and builds a
  page type with no pre-made block. PASS = identity-faithful, premium, no
  design improvisation. Record the result in the identity's entry.
- Regenerate registry payloads after any change:
  `node tooling/build-registry.mjs <slug>`
- Releases are version-bump-and-push: set `package.json` version, push main,
  and trusted publishing publishes npm automatically (`release.yml`; a `v*`
  tag additionally creates the GitHub release). Semver for the catalogue:
  new identity = minor; prompt-pack/demo/metadata fixes = patch; renamed or
  removed tokens, classes, identities, or CLI behavior = major (derived
  systems fork at derive time, but consumers re-reading `node_modules` see
  every change).
- Vibe tags are a controlled search vocabulary, not flavor words. Every tag
  must be a word a buyer would type or a quality visible at a glance: a look
  (`dark`, `light`, `editorial`, `terminal`, `print`), a feel (`calm`, `warm`,
  `trust`, `technical`, `retro`), density (`data-dense`), or a use case
  (`product`, `dashboard`, `ops`, `ledger`, `tracker`, `briefing`,
  `long-form`, `monitoring`). Lead use cases with the common word
  (`dashboard`) and keep the specialty alongside it (`dashboard`, `ops`) -
  precise jargon alone hides an identity from the exact search it should win.
  Reuse existing tags before coining new ones; up to five per identity; never
  proper nouns or novelty words. The tags feed the site's filter chips and
  tile search.
- Pin tested versions in identity.json (`stack.tested`) and state them in
  release notes.
- The public catalogue site discovers identities by reading this repo's
  `identities/` directory from a sibling checkout at build time, so an
  identity change is never done until the website reflects it: new
  identities appear automatically, but keep the README catalogue tables and
  the site from disagreeing - update the tables here, keep identity.json
  (title, description, vibe tags) accurate, since those feed the site's
  cards and filters. After changing tokens, tags, or names, rebuild the
  site against this checkout and check the catalogue before considering the
  change landed.

## Conventions

- License: Apache-2.0; keep the NOTICE file intact in distributions.
- Identity names are vibe-derived and brand-neutral. Never name identities
  after people, clients, or internal systems.
- Sample content is generic everywhere (block defaults, site showcases):
  no real brands or client data.
