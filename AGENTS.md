# AGENTS.md - building with uiforagents identities

uiforagents is a catalogue of **design identities**: complete, opinionated
design systems on shadcn/ui (Tailwind v4, Base UI primitives). Each identity
under `identities/<slug>/` ships a theme, component overrides, blocks, and an
agent prompt-pack. The repo root package.json is a private workspace root -
nothing here publishes to npm.

## Building an app with an identity

1. Read `identities/<slug>/prompt-pack.md` FIRST - it is the binding design
   contract. Follow it exactly; do not improvise visual design.
2. Import `theme/theme.css` (theme + overrides) after the Tailwind import.
3. Start from `blocks/*.tsx` and adapt content. Never restyle identity
   components per project - brand happens via tokens (accent, logo), not
   structure.
4. Identity root element carries `data-identity="<slug>"` so overrides apply.
5. Fonts via @fontsource (Plus Jakarta Sans + Inter for ocean-calm); in
   single-file outputs, inline woff2 base64 per the prompt-pack.

## Adding or changing an identity

- Identities are curated, not community-directed. Propose changes in issues.
- New identity: copy an existing identity directory, retune, name it
  vibe-derived and brand-neutral, then validate with the one-shot test:
  a fresh agent gets only the prompt-pack + theme + overrides and builds a
  page type with no pre-made block. PASS = identity-faithful, premium, no
  design improvisation. Record the result in the identity's entry.
- Regenerate registry payloads after any change:
  `node tooling/build-registry.mjs <slug>`
- Pin tested versions in identity.json (`stack.tested`) and state them in
  release notes.

## Conventions

- License: Apache-2.0; keep the NOTICE file intact in distributions.
- Identity names are vibe-derived and brand-neutral. Never name identities
  after people, clients, or internal systems.
- Example app content is generic (no real brands or client data).
