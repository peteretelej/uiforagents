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

Every catalogue identity's prompt-pack carries a `## Tuning surface`
section - the per-identity instance of this table. Read it first: it names
exactly which tokens retune and what inherits for that parent.

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

In both lanes the parent's `## Tuning surface` section is the retuning
checklist: what it lists retunes, everything it declares inherited stays.

## Gates before you ship a derived system

Run every gate against the derived system, not the parent:

- **Contrast AA, both schemes**: body text and key pairs clear 4.5:1
  (boundaries 3:1) in both schemes.
- **Headless check**: zero console errors at ~1280px and ~390px widths.
- **No-JS render** (artifact lane): the page renders completely with
  JavaScript disabled.
- **Print, when claimed**: run the print check only if the derived system
  claims print support.
- **One-shot**: an agent given only your retuned pack and stylesheet builds
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

This is the factory contract v1. Every catalogue identity's prompt-pack
carries its `## Tuning surface` section; this file and that section are the
contract for a derivation.
