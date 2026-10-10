# ivory-desk - Agent Prompt-Pack

One-shot record: PASS 2026-10-12 - a fresh agent built a product changelog
page from only this pack and `foundation.css`; identity-faithful, premium,
no design improvisation.

You are building with the **ivory-desk** design identity: the calm light AI
console for self-contained HTML artifacts - assistant workspaces, research
answer documents, briefs, comparison pages, landing pages for AI products.
Warm oat-ivory paper, a serif that speaks and a grotesk that works, IBM Plex
Mono for everything the machine produced, one clay accent, and the whole
model machinery - composer, stream, reasoning, tool cards, citations, meters
- laid out flat on the desk like documents, never chat bubbles. The design
decisions are already made. Follow this pack exactly; do not improvise
visual design.

The identity is one stylesheet, `foundation.css`. It carries the tokens, base
typography, components, and print rules. You write content and page-specific
layout only.

## Using the identity (both modes work)

- **Single-file artifact (default)**: paste all of `foundation.css` into one
  `<style>` block in the page `<head>`. The deliverable stays fully
  self-contained. Do not edit the pasted CSS; override from a second
  unlayered block if a page truly needs it.
- **Linked file**: `<link rel="stylesheet" href="foundation.css">` works
  identically. Keep the file unmodified next to the page.
- Page CSS stays **unlayered**. The foundation is wrapped in
  `@layer foundation`, so anything you write outside a layer wins without
  `!important`. Never add `!important`; never add to the foundation layer.
- **No JavaScript is required.** Disclosures are native `<details>`; the
  composer is honest static markup. A real product wires behavior on top;
  the artifact must render completely with zero script.

## Identity contract

- **Documents, not bubbles.** Messages are flat, full-width blocks with tint
  differentiation: the user turn takes the one-step tint (`--surface-2`),
  assistant turns sit plain on the paper, and cards (tool calls, run
  summaries, approvals, code) are white `--surface` with 1px `--line`
  frames. Never chat bubbles, never floating avatars, never a fake typing
  animation - the blinking caret (`.iv-caret`) is the one live signal.
- **Serif is a role.** Newsreader (or Source Serif 4) speaks exactly one
  voice: the empty-state headline, assistant voice lines (`.iv-lede`),
  answer headings, blockquotes, and appendix headings - never below 20px,
  never interactive chrome. Inter is the work face for everything
  interactive: body copy 16px/1.6 at a 65-72ch measure (`--measure`). IBM
  Plex Mono reports for the machine: tool names, model IDs, token counts,
  citation markers, timestamps, shortcut hints, at 12-13px.
- **One clay accent, two steps.** `--accent` (`#C65A33`) is graphic only:
  the caret, meter fills, blockquote rules, the brand moment.
  `--accent-ink` (`#A8431F`) is accent as text or fill: links, active
  chips, citation superscripts, the send button, primary buttons. Both
  pass AA on every ground. Clay is attention, not decoration.
- **Status hues have jobs.** Moss `--ok` done, ochre `--run`
  running/waiting/needs-you, brick `--bad` failed/destructive, slate blue
  `--info` informational. Every status is glyph + label + color, never
  color alone (`.iv-status`, `.iv-step`). The hues never decorate.
- **Light is the only theme.** Warm paper is the identity; `color-scheme`
  is pinned light on `:root`. There are no `light-dark()` pairs, no
  `data-theme` attribute, no toggle, no dark variant in v1.
- **Soft-radius posture.** Cards and turns 14px (`--radius-lg`), chips and
  controls 10px (`--radius`), pills 999px (`--pill`) for the composer,
  chips, and status pills. Nothing square.
- **Flat.** No shadows, no gradients, no glass, no glows. Elevation is a
  hairline; the one soft ring in the identity is the composer focus ring,
  and it is a focus ring, not a glow.
- **The machine is labeled.** Every assistant reply carries a model badge
  (`.iv-model`); every factual claim carries citation superscripts
  (`.iv-cite`) that resolve to a numbered sources row (`.iv-sources`), or
  says plainly that it has none. Token counts and costs are mono and
  tabular.
- **Motion is flavor, calm and textual**: caret pulse, 150-250ms fades and
  hovers, smooth disclosure expansion. Everything honors
  `prefers-reduced-motion` and dies in print.

## Component inventory (use these classes; do not restyle or substitute)

- `.iv-shell`: the workspace grid - rail + main. `.iv-main` is the right
  column; it collapses to one column under 960px.
- `.iv-rail`: the conversation rail. `.iv-rail-head` holds `.iv-new` (the
  clay New research button) and `.iv-search`. `.iv-group` marks time
  labels (Today, This week); `.iv-thread` rows carry a `.t` title and a
  mono `.when` timestamp, `.on` marks the open thread.
- `.iv-top` + `.iv-brand` + `.iv-doctitle` + `.iv-top-actions`: the slim
  header - serif wordmark, muted thread title, right-side actions. The
  brand wordmark is the one sanctioned serif moment in chrome.
- `.iv-stream`: the centered column (`--stream`, 752px) every turn lives
  in. Nothing escapes it except the rail, top bar, and footer.
- `.iv-hero` + `.iv-hero-sub`: the empty-state hero - serif headline,
  one muted sentence, the composer, and suggestion chips. It doubles as
  the empty-thread state; a thread page never shows it mid-scroll.
- `.iv-turn` (+ `.user`): one message. `.iv-who` is the head row: `.role`,
  optional `.iv-model` badge, mono `.when`, and `.iv-actions` on the right.
  `.iv-turn.user` is the tinted full-width block.
- `.iv-actions` + `.iv-act`: per-message actions (copy, retry, share,
  branch) in mono micro - hidden until the turn is hovered, always visible
  under 720px.
- `.iv-answer`: the answer document - prose at 16px/1.6, `.iv-lede` serif
  voice line, `h3` serif headings, `blockquote` with the clay rule,
  `.iv-tablewrap` + `table` for data. Never restyle; every answer is this
  document.
- `.iv-code` + `.iv-code-head` + `.iv-copy`: the code block - filename in
  mono micro, copy button, plain mono body on white.
- `.iv-cite`: the citation superscript (`[1]`, mono, clay) linking to the
  sources row. `.iv-sources` + `.iv-src`: the numbered receipt chips.
- `.iv-reason` + `.iv-reason-body`: the reasoning disclosure - a native
  `<details>`, closed by default, summary carries the honest one-line
  summary ("Planned the run: 4 steps"), never "Working on it".
- `.iv-tool` + `.iv-tool-head` + `.iv-tool-out`: the tool call card - mono
  tool `.name`, truncated `.args`, `.took` duration, a `.iv-status` pill,
  and the expandable output `<pre>` in order, always in that order.
- `.iv-run` + `.iv-plan` + `.iv-step` + `.iv-counts` + `.iv-count`: the
  agent run summary - plan checklist with status glyphs (`.pending` hollow,
  `.run` pulsing dot, `.done` check, `.fail` cross), tool call cards, and
  the mono result-count row.
- `.iv-approval` + `.iv-approval-note`: the approval card - ochre-dot
  kicker, action description, the draft or payload in the tinted note, and
  allow/once/deny buttons. Nothing is "sent" visually; the card waits.
- `.iv-error`: the error turn - brick kicker naming the failure
  (`paywall.fetch failed`), one muted sentence, retry onward. Failures
  stay in the thread; they never auto-dismiss.
- `.iv-skel`: loading lines on `--line-soft`, static by contract - set
  each width inline. The caret, not a shimmer, says live.
- `.iv-status` (`.ok` `.run` `.bad` `.info` `.pending`): the status pill -
  glyph + label + color in one mono chip.
- `.iv-chips` + `.iv-chip` (`.on`): suggestion and scope chips - pill,
  hairline, hover to clay, `.on` takes the tint.
- `.iv-compose` + `.iv-composer` + `.iv-composer-row` + `.iv-input` +
  `.iv-attach` + `.iv-send`: the pill composer - the one full-round
  element, white on the paper; `+` attach, the transparent textarea, the
  clay circular send (`↑`; it swaps to a stop square only while
  streaming). Focus-within draws the identity's one soft ring.
- `.iv-composer-foot` + `.iv-modelchip` + `.iv-meter` + `.iv-count` +
  `.iv-hint`: the composer footer - model chip (`▾`), the thin context
  meter (`i` fill at `style="--w: 38%"`; `.warn` ochre past 70%, `.full`
  brick past 90%), the mono token fraction, the shortcut hint.
- `.iv-models` + `.iv-models-head` + `.iv-opt`: the model picker - an open
  panel above the composer (`.on` row takes the tint and the clay check).
  In artifacts it renders in flow, a static open-menu snapshot; in
  products, wire the toggle and float it over the stream with unlayered
  CSS.
- `.iv-usage`: the usage strip - hairline-top band with a context meter
  and mono token/cost/duration counters.
- `.iv-btn` (`.iv-btn--accent`, `.iv-btn--danger`, `[disabled]`) +
  `.iv-btnrow`: buttons - soft 10px radius, hairline; clay fill is
  reserved for the primary action.
- `.iv-footer` + `.iv-footrow`: the small mono footer row.
- `.iv-appendix`: documentation sections BELOW the footer (identity spec,
  token tables, do/don't, states). Client pages built from this identity
  do not ship an appendix; the demo carries it.
- `.iv-grid2`: the two-column grid for appendix lists; collapses under
  720px.
- `.iv-k`: the mono microlabel (uppercase, tracked). `.iv-none`: the
  zero-results line. Utilities: `.iv-measure` (answer measure), `.iv-mut`
  (muted text).

## Structure of a console workspace

1. `.iv-shell` opening the rail: `.iv-rail` (new button, search, grouped
   threads).
2. `.iv-top` (brand, thread title, share/export).
3. `.iv-stream`: turns in order - user tinted blocks between plain
   assistant answer documents; run summaries, tool cards, reasoning, and
   sources ride inside their answer; errors and approvals stay where they
   happened.
4. `.iv-usage` strip, then `.iv-compose` with the pill composer docked at
   the end (never floating over content).
5. `.iv-footer` +, on the demo only, `.iv-appendix` below it.

Compose the classes above; new page regions are turns and cards, not
bespoke boxes.

## Page-type recipes

- **AI console workspace (the demo's page type)**: rail + top bar → thread
  of turns (run summary, answer documents, sources, error, approval) →
  usage strip → composer.
- **Product landing**: top bar (wordmark + nav as `.iv-thread` rows or
  buttons) → `.iv-hero` (serif headline, sub, composer mock, suggestion
  chips) → feature sections as `.iv-answer` documents with `h3` headings
  and `.iv-chip` scopes → proof as `.iv-run`/`.iv-tool` cards →
  `.iv-btnrow` CTA → `.iv-footer`. The composer is the hero object on an
  ivory-desk landing; no gradients behind it.
- **Research answer document**: top bar → one `.iv-answer` (lede, sections,
  tables, code, blockquote) with `.iv-cite` superscripts resolving to
  `.iv-sources`, model badge and actions at the end → footer. No rail, no
  composer.
- **Model-comparison brief**: top bar → `.iv-hero` headline → one
  `.iv-tablewrap` comparison table (models as rows, mono first column) →
  `.iv-run`-style per-model cards with `.iv-status` verdicts →
  recommendation `.iv-lede` → footer.

## States grammar

- **Empty**: the `.iv-hero` IS the empty thread - serif headline, one true
  sentence, the composer, 3-4 chips. Never a blank column. For search:
  `.iv-none` names the void and offers one action.
- **Loading**: `.iv-skel` lines shaped like the paragraph they replace,
  static; then the first tokens arrive under the pulsing `.iv-caret`.
  Streaming turns carry `aria-live="polite"` and a `.iv-status run`
  "Streaming" pill; Stop replaces Send only while generating.
- **Error**: `.iv-error` in place - the failure named in a brick kicker,
  one sentence, retry and skip links. Failed tool calls also keep their
  `.iv-status bad` pill in the run card; failures never auto-dismiss.
- **Waiting on you**: the approval card - ochre dot, description, draft,
  allow/once/deny.
- **Hover**: chips and source receipts take the clay border; actions and
  copy buttons surface on turn hover (always visible under 720px); buttons
  move hairline to ink.
- **Focus**: 2px clay outline on every interactive element; the composer
  draws the one soft ring via focus-within.
- **Disabled**: faint text on the line border, no hover response.

## Tuning surface

Retuning happens in the `:root` token block only; everything below
inherits. Values only - never token names.

- **Accent**: clay in two steps is the identity. A retune swaps BOTH steps
  together (`--accent`, `--accent-ink`, and `--accent-soft`), keeping each
  value AA on its ground; the graphic step stays warmer/lighter than the
  text step. Anything beyond one accent pair is a different identity.
- **Status hues**: keep the four jobs (done/running/failed/info) and the
  earth-tone register; retune values only if contrast demands it, and
  never let a status hue near the clay.
- **Paper temperature**: the oat family is warm. Re-tint `--bg`,
  `--surface`, `--surface-2`, `--ink`, `--muted`, `--faint`, `--line`,
  `--line-soft` together, keeping the luminance steps and AA contrast.
  Cool paper is a different identity.
- **Fonts**: the three faces and their roles are the contract (serif
  voice / sans work / mono machine). The upgrade path is loading the
  @fontsource families below - never other families, never a fourth face.
- **Density**: the stream is airy (generous turn spacing); density lives
  only inside tool cards, tables, and the sources row. A denser console is
  a type-size retune, not new components.
- **Radius**: retune `--radius-lg`/`--radius` together within soft-medium
  (10-14px); the composer stays the pill.
- **What inherits unchanged**: the turn grammar, the status grammar, the
  component inventory, the states grammar, light-only theming, and the
  pack's do-nots. A retune never adds component classes.
- **Lane mechanics**: forking this identity into a derived one means
  renaming the `.iv-` prefix (pick a new two-letter namespace and rename
  every class and the `iv-` keyframes consistently, pack included),
  pruning inventory you don't need (drop a component's rules and its pack
  line together), and adding new components only by the pack's
  conventions: namespaced, inside the `@layer foundation` block,
  documented. Record provenance in a header comment at the top of
  `foundation.css`.

## Fonts (webfonts via @fontsource)

The stacks ship as fallbacks first: the page must be correct with zero
webfonts (Georgia-class serif, Helvetica-class sans, system mono). When the
delivery surface allows dependencies, load the canonical faces from
@fontsource and put them first in their stacks (they already are):

- `@fontsource/newsreader` (400/500, plus italic 400 for blockquotes) - voice
- `@fontsource/inter` (400/500/600) - body and chrome
- `@fontsource/ibm-plex-mono` (400/500) - machine output

In React or bundled projects import the packages. In single-file outputs,
inline the needed weights as base64 woff2 `@font-face` blocks in the
`<style>` section; keep each subset small (latin only) and never inline
more than the three families. Never let the page depend on a font
arriving: fallbacks must hold the layout.

## Print and reduced motion

Print rules ship in the file: rail, composer, actions, picker, and appendix
drop out; the stream becomes a single-column document; user turns print
framed instead of tinted; cards never split across pages.
`prefers-reduced-motion` stops the caret, the run-dot pulse, and every
transition; skeletons and disclosures are already static or native. Do not
add print overrides.

## Do not

- Do not build chat bubbles, avatars, or a fake typing animation. Flat
  full-width turns are the identity's spine.
- Do not add glass, canvas gradients, glows, or shadows. The composer focus
  ring is the only soft ring.
- Do not add a dark theme, a second accent, or decorative status color. If
  something needs attention, it gets clay; if it has a status, it gets a
  glyph + label + hue.
- Do not set the serif below 20px, center the stream, or use the serif for
  buttons and chrome.
- Do not show an unlabeled machine: every reply gets its model badge, every
  factual claim gets citations or says it has none, every number gets mono
  and a unit.
- Do not fake data: no meters without a width, no durations without a tool,
  no sources without a number. Vague "Working on it" labels are banned -
  summaries name what is happening.
- Do not build dense ops walls (sort/filter/pagination tables, health-dot
  grids) - that is ops-console territory; this is a working desk.
- Do not restyle foundation classes per project. Branding happens via
  tokens (accent, wordmark), never by editing component rules.
- Do not add `!important`, new `@layer`s, or `data-theme` attribute logic.
