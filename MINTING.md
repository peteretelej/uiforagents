# MINTING - identity minting conventions

Durable conventions for minting catalogue identities: what an identity
ships, how its demo behaves, and which gates stop minting. This file is
subordinate to [AGENTS.md](AGENTS.md): on any divergence, AGENTS.md
wins. Read AGENTS.md for governance (lane rules, naming and collision
rules, curation model, release process); this file references it and
does not duplicate it.

## Per-lane file contracts

A minted identity ships exactly its lane's files:

**Artifact lane** (`identities/<slug>/`):

- `foundation.css` - canonical, hand-curated tokens + components
- `demo.html` - the genre-native demo page (see Demo rules); published
  as-is as the identity's catalogue page
- `prompt-pack.md` - the binding design contract for agents

No `identity.json`, no `registry/`, no `theme/`, no `blocks/`; never run
`tooling/build-registry.mjs` on an artifact identity (AGENTS.md,
"Building a single-file artifact" and "Artifact-lane governance").

**shadcn lane** (`identities/<slug>/`):

- `theme/theme.css` - tokens
- `overrides/overrides.css` - component overrides
- `blocks/*.tsx` - composed section blocks
- `registry/` - generated payload; rebuild after any change with
  `node tooling/build-registry.mjs <slug>` (AGENTS.md, "Adding or
  changing an identity")
- `identity.json` - title, description, vibe tags, tested stack pins
- `prompt-pack.md` - the binding design contract for agents

## Demo rules

- **Native page type.** The demo is the identity's genre-native page: a
  landing identity demos as a landing page, a portfolio identity as a
  portfolio, a restaurant identity as a menu. A dashboard or token-sheet
  demo undersells a page-native identity.
- **Fictional product.** The demo portrays a fictional product or
  business, never the identity itself (no self-referential marketing)
  and never real brands or client data (AGENTS.md, Conventions).
  Sibling identities demo different fictional verticals so the catalogue
  shows range.
- **Colophon pattern.** Page-native demos move spec annotations ("what
  makes it X", token table, do/don't, states gallery) to a colophon
  below the footer; interleaved annotations break the page's illusion
  mid-scroll. Dashboard-class identities keep interleaved annotations.
- **Hosted imagery.** Demos use curated open-license stock photography
  hosted in the catalogue's Cloudflare assets, referenced as hosted
  URLs, with provenance per image (see Image credits). This supersedes
  the historical zero-`<img>` observation in the themes research notes
  (`demo-design-notes.md`, Grounding section; direction names there map
  softbox -> `vitrine`, noir-atelier -> `maison-noir`). The CSS
  gradient-plate recipe remains the documented fallback for offline
  single-file deliverables only, never a substitute for hosted assets in
  catalogue demos. Image treatment (grids, aspect ratios, captions,
  grading) belongs to the identity; assets are content.
- **States are contract.** Responsiveness and interactive states
  (pricing toggle, FAQ open/closed, form focus/error, badges, nav
  states, empty/loading where the genre has them) are identity-contract
  requirements proven by the demo, not demo burdens.
- **Missing-component feedback.** A component the demo needs but the
  identity lacks becomes a new native component in that identity's
  component set, joining the shared block vocabulary where the need is
  common. Demo workarounds and one-off demo code are not acceptable;
  demos are the test harness for component coverage.

## Example-brand pool

Demo copy names fictional things: companies, products, publications,
places. Those names come from the pool below, not from improvisation.
Invented-on-the-spot names keep landing on real businesses (Studio
Zwölf was a real Berlin design studio; Bitwell is a real wearable
company). The pool is drawn from public-domain literature and classic
fiction, and every entry was web-cleared for exact-name collisions
when it entered, so reusing pool names across identities is the point,
not a bug - the same practice keeps Hollywood prop brands (Heisler
beer, Morley cigarettes) legally unownable after decades of reuse.

Rules:

- **Hero brands draw from the pool.** Every named company, product,
  publication, or place in demo copy and block content uses a pool
  name, composed with ordinary sector words when helpful (`Merdle &
  Co`, `Luggnagg Freight`, `The Spouter-Inn`). Sector suffixes are
  free; the distinctive element is not.
- **People names are ordinary names.** Humans in tables, testimonials,
  and team blocks stay believable ordinary names (shadcn/Tailwind
  practice); they are not brands and need no pool entry.
- **Film and TV brands are out.** Acme, Dunder Mifflin, Vandelay,
  Initech, Oceanic Airlines and friends carry studio trademarks;
  they are reference culture, not pool entries.
- **Extending the pool takes one check.** New entries need one
  exact-name web search (`"<Name>" company OR studio OR brand`) with
  the verdict and date recorded beside the entry. Re-check an entry
  only if it becomes famous enough to spawn imitators (the Soylent
  problem: a fiction name turned real company).

Pool (checked 2026-10-13):

| Name | Source | Fit |
|---|---|---|
| Seldwyla | Keller, Die Leute von Seldwyla | studios, Swiss/German flavor (in use: weissraum) |
| Merdle & Co | Dickens, Little Dorrit | bank, fintech, finance |
| Jarndyce & Jarndyce | Dickens, Bleak House | law firms, legal |
| Tulkinghorn | Dickens, Bleak House | law, security |
| Dombey & Son | Dickens, Dombey and Son | shipping, logistics |
| Micawber | Dickens, David Copperfield | financial advice (CAUTION: defunct bookstore) |
| Pumblechook | Dickens, Great Expectations | shops, stationery, playful commerce |
| Boffin | Dickens, Our Mutual Friend | data, research (CAUTION: common UK slang) |
| Blefuscu | Swift, Gulliver's Travels | scrappy SaaS, startups |
| Balnibarbi | Swift, Gulliver's Travels | R&D, dev tools, workshops |
| Glubbdubdrib | Swift, Gulliver's Travels | AI, search, archives |
| Lindalino | Swift, Gulliver's Travels | media, publications, consultancy |
| Luggnagg | Swift, Gulliver's Travels | logistics, ops, infrastructure |
| Ogygia | Homer, Odyssey | wellness, retreats (CAUTION: small hotel/perfume uses) |
| Scheria | Homer, Odyssey | hospitality, hotels |
| Gillikin | Baum, Oz books | design studios (also a real NC surname) |
| Utensia | Baum, Oz books | kitchenware, restaurants |
| The Spouter-Inn | Melville, Moby-Dick | pubs, hotels |
| Try Pots | Melville, Moby-Dick | food, chowder houses |
| Capulet | Shakespeare, Romeo and Juliet | bistros, events |

Unverified candidates (run the check before first use): Iolcus,
Thrinacia, Quadling, Uppercross, Donwell, Meryton, Rosings, Hartfield.

Rejected on check (do not reuse): Pickwick (tea brand), Pequod
(pizza chain), Pecksniff (fragrances), Pemberley (merch-saturated),
Aiaia (audio brand), Heep (band), Jeroboam (perfumes), Randalls
(supermarket), Laputa (Spanish profanity), Bunbury (real city),
Winkie (real localities), Argos, Jotun, Barchester (real companies).

## Headless check

Every minted or changed identity, both lanes, passes the headless
check: zero console errors and no horizontal document overflow at
~1280px, ~390px, and ~360px widths. Run it on the identity's page (the
artifact demo, or the built page under validation) with:

```
node tooling/check-mobile.mjs identities/<slug>/demo.html
```

The checker ships with no kit dependency: playwright resolves from the
machine's global npm root. A page may pan inside a contained scroll
area; the document itself must not overflow.

## One-shot gate

Before an identity lands, it passes the one-shot test: a fresh agent
receives only the prompt-pack and tokens/foundation and builds a page
type with no pre-made block. PASS = identity-faithful, premium, no
design improvisation (AGENTS.md, "Artifact-lane governance"), and the
one-shot output passes the headless check (above), ~390px included. The
one-shot page type must differ from the demo's page type; the differing
page is what proves the system generalizes.

Record the result in both places before committing the identity:

- the README catalogue row, as `One-shot PASS <date>, <page type>` in
  the row's description
- the identity's entry (prompt-pack header note for artifact-lane
  identities; `identity.json` notes for shadcn-lane identities)

## Tag vocabulary

Tags are a controlled search vocabulary (AGENTS.md, "Adding or changing
an identity" is canonical). Max five per identity; reuse existing words
before coining new ones; never proper nouns or novelty words; lead use
cases with the common word and keep the specialty alongside it
(`dashboard`, `ops`). Current controlled words:

- look: `dark`, `light`, `editorial`, `terminal`, `print`
- feel: `calm`, `warm`, `trust`, `technical`, `retro`
- density: `data-dense`
- use case: `product`, `dashboard`, `ops`, `ledger`, `tracker`,
  `briefing`, `long-form`, `monitoring`

## Image credits

An identity using hosted imagery commits an `image-credits.md` next to
its demo: one entry per image, recording provider, license, source URL,
and hosted URL. Committed files never contain secrets or tokens;
credentials live only in gitignored run notes. Worked example entry:

```markdown
# Image credits - vitrine

| Provider | License | Source URL | Hosted URL |
|---|---|---|---|
| Unsplash | Unsplash License | https://unsplash.com/photos/glasshouse-hall | https://assets.example.com/vitrine/hero.jpg |
```

## Escalation gates

Minting stops and reports to Peter (never improvised past):

- **Name collision.** The exact-name collision check required by
  AGENTS.md (Conventions) returns a match: an existing template/theme
  product under the name on the marketplaces in scope, case-insensitive,
  separator variants included. Do not mint under a colliding name; do
  not rename unilaterally.
- **Assets destination unusable.** Imagery-dependent identities are
  blocked while the hosted-assets destination is missing or unwritable;
  do not improvise an alternative host.
- **Direction-brief conflict.** A direction brief contradicts these
  conventions or AGENTS.md. AGENTS.md wins; report the conflict instead
  of silently resolving it.
