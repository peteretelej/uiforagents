# uiforagents

**Design identities for agent-built apps.**

uiforagents is a catalogue of complete, opinionated design systems - *identities* -
so an AI (or human) can ship a premium UI without making a single design decision.
It is a **design system factory**: use an identity as-is, or derive your own from
the nearest one when nothing fits - see [DERIVE.md](DERIVE.md). The React lane is
built on shadcn/ui, Tailwind v4, and Base UI: theme tokens, component treatment
overrides, composed blocks, fonts, motion defaults, and an agent prompt-pack. The
artifact lane serves self-contained HTML artifacts with a copy-in pure-CSS
foundation (see [the artifact lane](#the-artifact-lane)).

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
| **nairobi-noon** | Warm Kenyan daylight. Sand and terracotta, relaxed and inviting. | ✅ v0.1 |
| **graphite-terminal** | Dense dark tool view. For audits, consoles, and power surfaces. | ✅ v0.1 |

Live demos and docs: **uiforagents.com** (catalogue with an identity switcher over
one shared demo app).

**Agents**: install the skill once - `npx skills add peteretelej/uiforagents -g` -
then just ask ("use Nairobi Noon for this app"). The `-g` installs it globally so
every project sees it; without the flag the CLI targets the current directory
(and nesting happens if run from inside a skills folder). The skill discovers the
catalogue, picks identities, and follows the lane contracts; `skills/uiforagents/SKILL.md`
in this repo is the whole entrypoint.

## The artifact lane

The second lane serves **self-contained HTML artifacts**: articles, briefings,
reports, any page an agent ships as one file. An artifact identity is a copy-in
pure-CSS system - no build step, no registry, no npm, no required JavaScript.

| Identity | Vibe | Status |
|---|---|---|
| **reading-room** | Warm editorial reader. Paper light, Charter-led serif, ink text, one green accent, built-in dark theme. | ✅ v1.0 |
| **midnight-bulletin** | Dark-first briefing bulletin. Near-black warm ground, serif display over sans body, mono labels, one amber accent. | ✅ v1.0 |

```
identities/<artifact-identity>/
├── foundation.css    # the entire system: tokens, base, components, print
├── prompt-pack.md    # the agent contract - design decisions, encoded
└── demo.html         # verbose self-documenting demo, styled by foundation.css alone
```

Usage: paste `foundation.css` into a `<style>` block (or link it), attach
`prompt-pack.md` to the agent, and build. Every token is a `light-dark()` pair;
themes resolve through `color-scheme` on `html`. The React-lane tooling
(`tooling/build-registry.mjs`, `identity.json`, registry payloads) does not
apply to this lane.

## What's inside a React-lane identity

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
