---
name: uiforagents
description: Pick and apply a uiforagents design identity - complete, opinionated design systems for agent-built apps (React/shadcn) and single-file artifacts (pure CSS). Use when building or restyling any UI, app, article, report, or page where the user wants a premium designed look, mentions uiforagents or design identities, or has no existing design system to follow.
---

# uiforagents

Design identities are complete opinionated design systems. You do not invent
visual design when one applies - you pick an identity and follow it exactly.

This skill is stable instructions only. The catalogue itself is live data;
never assume an identity exists or its files' contents without fetching.

## 1. Discover

Fetch both:

- `https://uiforagents.com/llms.txt` - the catalogue index: every identity
  with its title, description, and file URLs.
- `https://uiforagents.com/identity-metadata.json` - structured records:
  `slug`, `title`, `description`, `lane` (`react` or `artifact`), `vibe`
  tags, `leadScheme`, `accent`.

If fetches fail, tell the human to open `https://uiforagents.com` and pass
you the chosen identity's slug and prompt-pack contents.

## 2. Select

Match the user's intent (domain, mood, medium) against title, description,
and vibe tags. Shortlist the best 2-3 and present them with one line each;
let the human choose unless they named an identity or clearly described one
already. `lane` decides which usage section below applies.

## 3. Use - artifact lane (`lane: artifact`)

For self-contained single-file pages: articles, briefings, reports.

1. Fetch `https://uiforagents.com/foundations/<slug>.css` - one pure-CSS
   file that is the entire system (tokens, base, components, print, both
   themes via `light-dark()`; `color-scheme` on `:root` sets the theme).
2. Embed it in the page head: paste the whole file into one `<style>`
   block, or `<link rel="stylesheet">` it. No build step, no npm.
3. Fetch `https://uiforagents.com/prompt-packs/<slug>.md` and follow it
   exactly - it is the binding design contract.

Build the page as one standalone HTML document. Never restyle the
foundation's components; add page-specific CSS unlayered if needed (the
foundation is wrapped in `@layer foundation`, so unlayered rules win).

## 4. Use - react lane (`lane: react`)

For apps on React + Tailwind v4 + shadcn/ui.

1. Install: `npx shadcn add https://uiforagents.com/r/<slug>.json`
   (or register the `@uiforagents` namespace once in components.json, then
   `npx shadcn add @uiforagents/<slug>`). The payload ships one combined
   theme file at `src/identities/<slug>/theme.css` (theme + overrides).
2. In your global stylesheet, import that theme file AFTER the Tailwind
   import.
3. Carry `data-identity="<slug>"` on your root html element (overrides key
   on it). For per-element identity scoping in one app, also set
   `data-theme="<slug>"` on the same wrapper.
4. Compose from the installed blocks and swap content. Fonts install as
   dependencies - import the weights the prompt-pack lists in your entry.
5. Fetch `https://uiforagents.com/prompt-packs/<slug>.md` and follow it
   exactly.

## Rules

- The prompt-pack is the contract. Follow it; never improvise visual design.
- Brand via tokens and content, never by restyling identity components.
- Adding or changing identities is governed by the kit repo's AGENTS.md;
  this skill only consumes published identities.
