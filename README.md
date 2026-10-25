# uiforagents

**Design identities for agent-built apps.**

uiforagents is a design system factory: complete, opinionated design systems -
*identities* - that let an AI (or human) ship a premium UI without making a
single design decision. Two lanes: **React** (shadcn/ui, Tailwind v4, Base UI -
theme tokens, component overrides, composed blocks, fonts, motion, agent
prompt-pack) and **vanilla HTML/CSS** (self-contained single-file pages with a
copy-in pure-CSS foundation - see [the artifact lane](#the-artifact-lane)). Use
an identity as-is, or derive your own from the nearest one when nothing fits -
see [DERIVE.md](DERIVE.md).

## Quick start

Install the skill once; `-g` installs it globally so every project sees it:

```bash
npx skills add peteretelej/uiforagents -g
```

Then ask your agent for suggestings on designs to use

```
/uiforagents help pick a few good designs for my website and demo them to me

/uiforagents use Nairobi Noon for this app

/uiforagents derive a design variant from Reading Room for my blog that best fits my site's color scheme

/uiforagents give my podcast site a nice UX
```

The skill discovers the catalogue, picks identities, fetches the right files,
and follows the lane contracts - no instructions to relay. It works with GitHub
Copilot, OpenCode, Claude Code, Codex, Cursor, and any other agent that
supports skills.

**No agent?** Everything is one command away. The npm package is the whole
factory:

```sh
npx uiforagents list                       # catalogue: slug, lane, scheme, tags
npx uiforagents show night-ops             # the prompt-pack, on stdout
npx uiforagents show night-ops --file foundation   # or theme, demo, registry
npx uiforagents init tally-board           # copy an artifact identity into your project
npx uiforagents derive                     # the derive contract (DERIVE.md)
```

Into a shadcn app (Tailwind v4 + React 18+), install an identity by URL:

```bash
npx shadcn add https://uiforagents.com/r/ocean-calm.json
```

Then: import the shipped theme file in your global CSS after the Tailwind
import, carry `data-identity="<slug>"` on your root html element, install the
identity's fonts (`@fontsource` packages, weights listed in its prompt-pack),
and attach that prompt-pack to every agent building UI - the pack is the
binding design contract, and attaching it is the integration.

## The catalogue

Live demos and docs: **uiforagents.com**. One line per identity here; the site
carries the full cards, demos, and prompt-packs.

React lane (shadcn/ui):

| Identity | Vibe |
|---|---|
| **ocean-calm** | Calm light fintech. Deep azure on cool white, Plus Jakarta Sans display, generous whitespace. |
| **nairobi-noon** | Warm Kenyan daylight. Sand and terracotta, relaxed and inviting. |
| **graphite-terminal** | Dense dark tool view. For audits, consoles, and power surfaces. |
| **cobalt-quorum** | Corporate-clean light SaaS landing. Ink-navy on mist white, one cobalt accent, trust as structure: tabular metrics, security band, selling pricing. |
| **sticker-press** | Playful sticker-shop brutalism. Cream paper, black ink borders, hard shadows, signal-yellow accent, radius 0. |
| **portico-row** | Cool-white institutional gravitas for law, finance, and consultancy. Navy as structure, serif display, hairline rules, mandatory compliance footer. |
| **frost-field** | Calm light glass for wellness. Frosted panels over a pastel aurora field, pill controls, airy one-idea-per-card density. |

Artifact lane (single-file HTML/CSS):

| Identity | Vibe |
|---|---|
| **reading-room** | Warm editorial reader. Paper light, Charter-led serif, ink text, one green accent, built-in dark theme. |
| **midnight-bulletin** | Dark-first briefing bulletin. Near-black warm ground, serif display over sans body, mono labels, one amber accent. |
| **night-ops** | Dark ops console. Cool near-black ground, azure instrument accent, LED status grammar, hairline panels. |
| **paper-ledger** | Light print-precision analytics. Cool paper ground, ink-blue accent, accounting double rules, tabular mono figures, a real print stylesheet. |
| **tally-board** | Warm personal tracker. Cream + terracotta, rounded bento cards, bold rounded numerals, progress grammar, ok/warn-only pills. |
| **listening-room** | Dark-first listening surface. Warm near-black ground, amber accent, serif display, mono labels; waveform player with chapter ticks, chapter grid, synced transcript, mini-player. |
| **espresso-panel** | Amber instrument panel. Warm-black ground, one phosphor hue, all-mono type, readout walls, bracket states, ticker tape. |
| **weissraum** | Light minimal Swiss portfolio. Paper-white canvas, poster-scale Archivo display, hairline indexes, one red accent used only when it has a job, 0px radius. |
| **ivory-desk** | Calm light AI console. Oat-ivory paper, Newsreader serif voice moments, IBM Plex Mono output, flat full-width turns, one clay accent. |
| **dither-lab** | Dark 1-bit pixel workshop. Blue-black canvas, rotational four-color bit-palette, dithered fills, stepped motion, retro-computing craft. |
| **city-edition** | Light editorial print daily. The dense morning newspaper: newsprint ground, ink serif headlines, uppercase kickers, mono datelines, rationed press red. |

## The artifact lane

The second lane serves **self-contained HTML artifacts**: articles, briefings,
reports, dashboards, any page an agent ships as one file. An artifact identity
is a copy-in pure-CSS system - no build step, no registry, no required
JavaScript.

```
identities/<artifact-identity>/
├── foundation.css    # the entire system: tokens, base, components, print
├── prompt-pack.md    # the agent contract - design decisions, encoded
└── demo.html         # verbose self-documenting demo, styled by foundation.css alone
```

Usage: `npx uiforagents init <slug>` copies the pair into your project;
otherwise take the files from here - paste `foundation.css` into a `<style>`
block (or link it), attach `prompt-pack.md` to the agent, and build. Every
token is a `light-dark()` pair; themes resolve through `color-scheme` on
`html`. The React-lane tooling (`tooling/build-registry.mjs`, `identity.json`,
registry payloads) does not apply to this lane.

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

## For humans

Identities are opinionated by design: curated, not community-directed. Use them
unchanged; brand them with your logo and accent via the documented token
overrides.

## Maintainers

Build an identity's theme + overrides + blocks into a shadcn registry payload:

```bash
node tooling/build-registry.mjs ocean-calm   # emits identities/ocean-calm/registry/
```

The generated payload is what the website serves at `/r/<slug>.json`, which is
where the install one-liner above points. Identity governance (naming, vibe
tags, one-shot tests, README row shape, release semver) is defined in
[AGENTS.md](AGENTS.md).

Working from a checkout or without the hosted registry, the copy path still
works: copy `identities/<slug>/registry/<slug>.json` into your app and run
`npx shadcn add ./<slug>.json`.

## License

Apache-2.0. Underlying stacks keep their own licenses (shadcn/ui MIT,
Tailwind MIT, Base UI MIT).
