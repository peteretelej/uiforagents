# uiforagents

**Design identities for agent-built apps.**

uiforagents is a catalogue of complete, opinionated design systems - *identities* -
built on shadcn/ui, Tailwind v4, and Base UI. Each identity bundles theme tokens,
component treatment overrides, composed blocks, fonts, motion defaults, and an
agent prompt-pack, so an AI (or human) can ship a premium UI without making a
single design decision.

**Build the theme + overrides + blocks into a shadcn registry payload:**

```bash
node tooling/build-registry.mjs ocean-calm   # emits identities/ocean-calm/registry/
```

Install into a shadcn app (Tailwind v4 + React 18+):

1. Add `@uiforagents/ocean-calm` to your `components.json` `registries`, or copy
   `identities/ocean-calm/registry/ocean-calm.json` and run
   `npx shadcn add ./ocean-calm.json`.
2. Import `theme/ocean-calm.css` (theme + overrides) in your global CSS, after
   the Tailwind import.
3. Attach `prompt-pack.md` to every agent building UI - this is the integration.
4. Fonts: `npm i @fontsource/plus-jakarta-sans @fontsource/inter` and import
   the weights in your entry file.

Registry hosting (making the one-liner work directly) is in progress; until it
lands, use the copy path above.

## The catalogue

| Identity | Vibe | Status |
|---|---|---|
| **ocean-calm** | Calm light fintech. Deep azure on cool white, Plus Jakarta Sans display, generous whitespace. | ✅ v1.0 |
| **nairobi-noon** | Warm Kenyan daylight. Sand and terracotta, relaxed and inviting. | 🔜 queued |
| **graphite-terminal** | Dense dark tool view. For audits, consoles, and power surfaces. | 🔜 queued |

Live demos and docs: **uiforagents.com** (catalogue with an identity switcher over
one shared demo app).

## What's inside an identity

```
identities/ocean-calm/
├── identity.json     # spec: meta, tokens, block list, tested versions
├── theme/            # shadcn CSS variables + Tailwind v4 @theme
├── overrides/        # opinionated treatments layered on shadcn components
├── blocks/           # composed sections: hero, auth, dashboard shell, table page, article
├── prompt-pack.md    # the agent contract - design decisions, encoded
└── registry/         # generated shadcn registry payload (registry:base)
```

## For agents

Each identity ships a `prompt-pack.md`. Point your agent at it (or paste it into
your `AGENTS.md`) and build. The pack settles typography, density, component
choices, spacing, motion, and do/don'ts - the agent stops improvising design and
starts shipping product.

## For humans

Identities are opinionated by design: curated, not community-directed. Use them
unchanged; brand them with your logo and accent via the documented token overrides.

## License

Apache-2.0. Underlying stacks keep their own licenses (shadcn/ui MIT,
Tailwind MIT, Base UI MIT).
