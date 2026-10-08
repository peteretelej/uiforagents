# Deriving your own design system

uiforagents is a design system factory, not just a catalogue. Two first-class
moves:

1. **Use an identity as-is** - pick one from the catalogue and follow its
   prompt-pack exactly.
2. **Derive your own** - when no identity fits, build a new design system *from*
   the nearest one. Never improvise design from scratch; derive.

Derivation is **single-parent fork-and-retune**. You inherit everything
structural from one parent identity and retune only its tuning surface. The
result is a complete, coherent system that is yours - coherent because it
inherited a tested one.

## The rule

**Retune the surface. Inherit the structure. Never restyle components.**

| Retune (the tuning surface)            | Inherit (never redesign)                        |
| -------------------------------------- | ----------------------------------------------- |
| accent color                           | component structure (class grammar, overrides)  |
| neutral tint / hue family              | spacing scale and type-scale ratios             |
| fonts (via the documented upgrade path)| the prompt-pack's decision logic and do/don'ts  |
| radius                                 | lane contracts (`@layer`, `light-dark()`, no required JS) |
| density                                |                                                 |
| scheme lead (light-first vs dark-first)|                                                 |
| artifact lane only: component inventory (prune/extend within contract) and class prefix | |

## How to derive

Work in your own project - a derivation is a fork into your project, never an
edit to the canonical `identities/<slug>/` files in the uiforagents repo.

### React lane (shadcn/ui)

1. Copy the parent's `identities/<parent>/` directory into your project (or your
   own identities folder).
2. Retune the theme tokens in `theme/theme.css`. Change oklch **values only** -
   token names are the contract and never change.
3. Keep `overrides/` and `blocks/` as they are; adapt content, not styles.
4. Update `identity.json`: new name, new accent, and a `derivedFrom` note.
5. Name it: vibe-derived and brand-neutral (never lab-, person-, or
   client-derived), and record provenance - `derived from <parent-slug> vN,
   <date>` - in the README or a header comment.

### Artifact lane (pure CSS, self-contained HTML)

1. Copy the parent's `foundation.css` and `prompt-pack.md`.
2. Retune the token block (the `:root` custom properties). Values only - never
   token names; keep every `light-dark()` pair ordered light-first (slot 1 is
   always the light value).
3. Rename the component class prefix to your system's slug (`.mb-` becomes
   `.yours-`). Mechanical find-and-replace; do it everywhere, including the
   prompt-pack references.
4. Prune components you don't need. Add new ones only by the pack's conventions:
   namespaced, inside the `@layer foundation` block, documented in the pack.
   Page CSS stays unlayered and wins without `!important`.
5. Record provenance in a header comment at the top of `foundation.css`.

## Gates before you ship a derived system

- Contrast at AA on body text and key pairs, in **both** schemes.
- Renders clean: zero console errors at desktop and ~390px widths.
- Artifact lane: the page must render completely with JavaScript disabled; run
  the print check if you claim print support.
- One-shot check: an agent given only your retuned pack + stylesheet builds
  identity-faithful pages with no improvisation.

## Where derived systems live

In your project. Derived systems are **not** added to the catalogue
automatically - the catalogue stays curated, and that is deliberate.

## Promotion into the catalogue

A derived system that recurs across projects - or that produces a signature look
worth naming - can be proposed upstream: open an issue on
[peteretelej/uiforagents](https://github.com/peteretelej/uiforagents). If
accepted, it becomes a maintained identity with the full mint gates, a catalogue
page, and a site card. That is how the catalogue grows.

## Status

This is the factory contract v0. Per-identity tuning-surface notes are landing
in each identity's prompt-pack as identities ship them; until then, this file
and the parent's pack are the contract.
