# uiforagents

**Design identities for agent-built apps.**

uiforagents is a catalogue of complete, opinionated design systems - *identities* -
built on shadcn/ui, Tailwind v4, and Base UI. Each identity bundles theme tokens,
component treatment overrides, composed blocks, fonts, motion defaults, and an
agent prompt-pack, so an AI (or human) can ship a premium UI without making a
single design decision.

```bash
npx shadcn add @uiforagents/ocean-calm
```

Then hand your agent the identity's prompt-pack. That's the whole integration.

## The catalogue

| Identity | Vibe | Status |
|---|---|---|
| **ocean-calm** | Calm light fintech. Deep azure on cool white, Plus Jakarta Sans display, generous whitespace. | ✅ v1.0 |
| **nairobi-noon** | Warm Kenyan daylight. Sand and terracotta, relaxed and inviting. | 🔜 queued |

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
