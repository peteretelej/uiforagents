"use client"

import { useState, type ReactNode } from "react"
import { Check, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

/* This identity's shell frames a MARKETING page: sticky ink-ruled nav with
   the CTA always present, children as the section stack, and the oversized
   ALL-CAPS wordmark footer. Solid fills only - the identity bans blur, so
   the header never goes translucent. */
export function LandingShell({
  brand = "Ballyhoo",
  nav = [
    { label: "Features" },
    { label: "Pricing", active: true },
    { label: "Changelog" },
    { label: "Press kit" },
  ],
  cta = "Start your launch",
  footer,
  children,
}: {
  brand?: string
  nav?: { label: string; active?: boolean }[]
  cta?: string
  footer?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b-2 border-border bg-background">
        <div className="mx-auto flex h-16 max-w-[1120px] items-center gap-8 px-6">
          <span className="font-display text-[2rem] leading-none">{brand}</span>
          <nav className="ml-auto hidden items-center gap-7 md:flex">
            {nav.map((n) => (
              <a
                key={n.label}
                href="#"
                className={`font-mono text-[12px] font-bold uppercase tracking-[0.06em] ${
                  n.active
                    ? "-rotate-2 bg-primary px-1.5 py-0.5 text-primary-foreground shadow-[var(--shadow-chip)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex shrink-0 items-center gap-3 md:ml-0">
            <a
              href="#"
              className="hidden font-mono text-[12px] font-bold uppercase tracking-[0.06em] text-muted-foreground hover:text-foreground sm:block"
            >
              Sign in
            </a>
            <Button className="h-10 px-4 text-[13px]">{cta}</Button>
          </div>
        </div>
      </header>

      <main>{children}</main>

      {footer ?? <DefaultFooter brand={brand} />}
    </div>
  )
}

const defaultFooter = {
  columns: [
    { heading: "Product", links: ["Announcements", "Countdowns", "Changelog", "Press kit"] },
    { heading: "Makers", links: ["Showcase", "Templates", "Community", "Affiliates"] },
    { heading: "Company", links: ["About", "Blog", "Contact"] },
    { heading: "Legal", links: ["Privacy", "Terms"] },
  ],
}

/* Oversized ALL-CAPS wordmark footer: the brand shouted at poster scale above
   the link columns. The wordmark is decorative; the h2 carries the meaning. */
function DefaultFooter({ brand }: { brand: string }) {
  return (
    <footer className="border-t-2 border-border bg-secondary">
      <div className="mx-auto max-w-[1120px] px-6 pt-14">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          {defaultFooter.columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="mono-label text-[11px] font-bold text-muted-foreground">{col.heading}</h2>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[14px] font-medium text-foreground/80 hover:text-foreground hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <p className="mt-6 text-[13px] text-muted-foreground">
          Ballyhoo is a fictional product demo. Everything on this page is sample content.
        </p>
      </div>
      <p
        aria-hidden
        className="select-none overflow-hidden px-2 pt-6 text-center font-display text-[clamp(3rem,12vw,9rem)] leading-[0.9]"
      >
        {brand}
      </p>
      <div className="border-t-2 border-border">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-3 px-6 py-5">
          <span className="mono-label text-[11px] text-muted-foreground">
            © {new Date().getFullYear()} {brand} - ship it loud
          </span>
          <div className="flex gap-2">
            {["Made with paper and ink", "No trackers"].map((b) => (
              <Badge key={b} variant="outline" className="bg-card px-2.5 py-1 text-[10.5px]">
                {b}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export function SectionHeader({
  eyebrow,
  title,
  support,
  center = true,
}: {
  eyebrow: string
  title: string
  support?: string
  center?: boolean
}) {
  return (
    <div className={center ? "mx-auto max-w-[640px] text-center" : "max-w-[640px]"}>
      <p className="mono-label text-[12px] font-bold">{eyebrow}</p>
      <h2 className="mt-3 font-display text-[clamp(2rem,3.5vw,2.75rem)]">{title}</h2>
      {support && <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">{support}</p>}
    </div>
  )
}

/* Feature sticker-card grid: bordered white cards; the lead tile is the one
   loud-filled accent card per grid, exactly one sticker helper per section. */
export function StickerFeatures({
  eyebrow = "The kit",
  title = "Everything a launch needs, nothing it doesn't",
  features,
}: {
  eyebrow?: string
  title?: string
  features?: { title: string; body: string; glyph?: string }[]
}) {
  const tiles =
    features ??
    [
      {
        title: "Announcement pages",
        body: "A loud, screenshot-ready page for your release, live in minutes. Pick a template, paste your copy, press publish.",
        glyph: "01",
      },
      {
        title: "Countdown blocks",
        body: "A mechanical countdown that ticks in Space Mono and flips your page to LIVE the moment zero hits.",
        glyph: "02",
      },
      {
        title: "Changelog posts",
        body: "Ship notes your users actually read: date-stamped, grouped, and yelling only about what changed.",
        glyph: "03",
      },
      {
        title: "Press kit in a box",
        body: "Logo sheet, founder bios, and boilerplate copy, packed as one downloadable kit on day one.",
        glyph: "04",
      },
      {
        title: "Signup capture",
        body: "A waitlist form with the trust line already written, wired to your mailing tool of choice.",
        glyph: "05",
      },
    ]
  return (
    <section className="bg-secondary px-6 py-20">
      <div className="mx-auto max-w-[1120px]">
        <SectionHeader eyebrow={eyebrow} title={title} />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <a href="#" className="hover-lift sm:col-span-2">
            <Card className="h-full border-border bg-primary text-primary-foreground shadow-[var(--shadow-hero)]">
              <CardContent className="grid h-full grid-cols-1 items-center gap-6 p-7 sm:grid-cols-[1.2fr_1fr]">
                <div>
                  <span className="mono-label text-[11px]">{tiles[0].glyph}</span>
                  <h3 className="mt-2 font-display text-[clamp(2rem,3vw,2.5rem)] leading-[1.05]">
                    {tiles[0].title}
                  </h3>
                  <p className="mt-3 max-w-[44ch] text-[14.5px] leading-relaxed">{tiles[0].body}</p>
                </div>
                <div aria-hidden className="hidden justify-self-center font-display text-[clamp(4rem,8vw,7rem)] leading-none sm:block">
                  {"01"}
                </div>
              </CardContent>
            </Card>
          </a>
          {tiles.slice(1).map((f) => (
            <a key={f.title} href="#" className="hover-lift">
              <Card className="h-full border-border bg-card">
                <CardContent className="flex h-full flex-col p-7">
                  <span className="mono-label text-[11px] text-muted-foreground">{f.glyph}</span>
                  <h3 className="mt-2 text-[19px] font-bold tracking-[-0.01em]">{f.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{f.body}</p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* Marquee divider: yellow band, Archivo caps at the 2rem floor, linear loop
   (keyframes ship in overrides.css). Decorative; hidden from readers. */
export function MarqueeDivider({
  items = ["Launch week", "V1.0 is out", "Ship it loud", "No polish, all punch"],
}: {
  items?: string[]
}) {
  const row = items.map((i) => i.toUpperCase()).join("  ✶  ") + "  ✶  "
  return (
    <div aria-hidden className="overflow-hidden border-y-2 border-border bg-primary py-3">
      <div className="sticker-marquee flex w-max whitespace-nowrap">
        <span className="font-display text-[2rem] leading-none text-primary-foreground">{row}</span>
        <span className="font-display text-[2rem] leading-none text-primary-foreground">{row}</span>
      </div>
    </div>
  )
}

type Quote = { quote: string; name: string; product: string }

const defaultQuotes: Quote[] = [
  {
    quote: "Our launch page got screenshot onto three newsletters the first morning. The sticker energy is the point.",
    name: "Rosa M.",
    product: "Papercup",
  },
  {
    quote: "I wrote the changelog in one sitting and it looked like it took a designer a week. It did not.",
    name: "Ken A.",
    product: "Motofold",
  },
  {
    quote: "The countdown hit zero, the page flipped to LIVE, and our waitlist doubled by lunch.",
    name: "Priya S.",
    product: "Sundial Club",
  },
]

/* Testimonial wall with the full data grammar: loading skeletons, an error
   card with retry, and an explicit empty state. */
export function TestimonialWall({
  eyebrow = "Launch notes",
  title = "Makers who shipped loud",
  quotes = defaultQuotes,
  status = "ready",
  onRetry,
}: {
  eyebrow?: string
  title?: string
  quotes?: Quote[]
  status?: "ready" | "loading" | "error" | "empty"
  onRetry?: () => void
}) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-[1120px]">
        <SectionHeader eyebrow={eyebrow} title={title} />
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {status === "loading" &&
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="bg-card">
                <CardContent className="p-7" aria-label="Loading launch stories">
                  <div className="h-4 w-full animate-pulse bg-muted motion-reduce:animate-none" />
                  <div className="mt-2 h-4 w-4/5 animate-pulse bg-muted motion-reduce:animate-none" />
                  <div className="mt-2 h-4 w-3/5 animate-pulse bg-muted motion-reduce:animate-none" />
                  <div className="mt-6 h-4 w-32 animate-pulse bg-muted motion-reduce:animate-none" />
                </CardContent>
              </Card>
            ))}
          {status === "error" && (
            <Card className="py-10 md:col-span-3">
              <CardContent className="px-10 text-center">
                <h3 className="text-[18px] font-bold">COULDN&rsquo;T LOAD THE LAUNCH NOTES</h3>
                <p className="mt-2 text-[14px] text-muted-foreground">
                  The stories are safe on our side. Nothing you did caused this.
                </p>
                <Button size="sm" variant="outline" className="mt-4 bg-card" onClick={onRetry}>
                  Retry
                </Button>
              </CardContent>
            </Card>
          )}
          {status === "empty" && (
            <Card className="py-10 md:col-span-3">
              <CardContent className="px-10 text-center">
                <h3 className="text-[18px] font-bold">NO LAUNCH NOTES YET</h3>
                <p className="mt-2 text-[14px] text-muted-foreground">
                  Notes appear here as makers publish their launches.
                </p>
              </CardContent>
            </Card>
          )}
          {status === "ready" &&
            quotes.map((q) => (
              <a key={q.name} href="#" className="hover-lift">
                <Card className="h-full bg-card">
                  <CardContent className="flex h-full flex-col p-7">
                    <blockquote className="text-[14.5px] font-medium leading-relaxed">
                      &ldquo;{q.quote}&rdquo;
                    </blockquote>
                    <p className="mono-label mt-5 text-[11px]">
                      {q.name} / {q.product}
                    </p>
                  </CardContent>
                </Card>
              </a>
            ))}
        </div>
      </div>
    </section>
  )
}

type Tier = {
  name: string
  description: string
  priceAnnual: string
  priceMonthly: string
  unit?: string
  features: string[]
  cta: string
  trustNote: string
  recommended?: boolean
}

const defaultTiers: Tier[] = [
  {
    name: "Sticker",
    description: "For one launch, done right.",
    priceAnnual: "$0",
    priceMonthly: "$0",
    features: ["1 live page", "ballyhoo.app subdomain", "3 changelog posts", "Community templates"],
    cta: "Start free",
    trustNote: "No credit card required",
  },
  {
    name: "Press",
    description: "For makers shipping all year.",
    priceAnnual: "$9",
    priceMonthly: "$12",
    unit: "per month",
    features: [
      "Unlimited pages",
      "Custom domain",
      "Countdown blocks",
      "Press kit downloads",
      "Remove the made-with badge",
    ],
    cta: "Start 14-day trial",
    trustNote: "No credit card · Cancel anytime",
    recommended: true,
  },
  {
    name: "Studio",
    description: "For agencies launching in bulk.",
    priceAnnual: "$29",
    priceMonthly: "$36",
    unit: "per month",
    features: ["5 maker seats", "Shared template library", "Client hand-off links", "Priority support"],
    cta: "Book a call",
    trustNote: "Invoicing available",
  },
]

/* Pricing is always 3 tiers, the middle one ACCENT-FILLED (loud-filled card)
   and lifted on the hero shadow rung; the toggle defaults to ANNUAL. Black
   text on the yellow fill, always. Trust microcopy sits under every CTA. */
export function Pricing({
  eyebrow = "Pricing",
  title = "Cheap enough to call it a sticker budget",
  support = "Every plan includes the full template shelf and unlimited drafts.",
  tiers = defaultTiers,
}: {
  eyebrow?: string
  title?: string
  support?: string
  tiers?: Tier[]
}) {
  const [annual, setAnnual] = useState(true)
  return (
    <section id="pricing" className="bg-secondary px-6 py-20">
      <div className="mx-auto max-w-[1120px]">
        <SectionHeader eyebrow={eyebrow} title={title} support={support} />
        <div className="mt-8 flex justify-center">
          <div
            className="flex items-center border-2 border-border bg-card p-1 shadow-[var(--shadow-chip)]"
            role="group"
            aria-label="Billing period"
          >
            {(["Annual", "Monthly"] as const).map((label) => {
              const active = label === "Annual" ? annual : !annual
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setAnnual(label === "Annual")}
                  aria-pressed={active}
                  className={`px-4 py-1.5 font-mono text-[12px] font-bold uppercase tracking-[0.06em] ${
                    active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              )
            })}
            <span className="ml-2 mr-1 hidden border-2 border-border bg-[var(--sticker-green)] px-2 py-0.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.06em] text-primary-foreground sm:block">
              Save 25%
            </span>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
          {tiers.map((t) => (
            <a key={t.name} href="#" className={`hover-lift flex ${t.recommended ? "lg:-my-3" : ""}`}>
              <Card
                className={`flex h-full w-full flex-col border-border ${
                  t.recommended ? "bg-primary text-primary-foreground shadow-[var(--shadow-hero)]" : "bg-card"
                }`}
              >
                <CardContent className="flex h-full flex-col p-7">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className={`text-[20px] font-bold tracking-[-0.01em] ${t.recommended ? "font-display text-[2rem] leading-none" : ""}`}>
                      {t.name}
                    </h3>
                    {t.recommended && (
                      <span className="-rotate-2 bg-card px-2.5 py-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.06em] shadow-[var(--shadow-chip)]">
                        Most popular
                      </span>
                    )}
                  </div>
                  <p className={`mt-1.5 text-[13.5px] ${t.recommended ? "text-foreground/90" : "text-muted-foreground"}`}>
                    {t.description}
                  </p>
                  <p className="mt-5 font-mono text-[38px] font-bold leading-none tabular-nums">
                    {annual ? t.priceAnnual : t.priceMonthly}
                    {t.unit && (
                      <span className="ml-1.5 align-baseline font-sans text-[13px] font-normal tracking-normal text-muted-foreground">
                        {t.unit}
                      </span>
                    )}
                  </p>
                  <ul className="mt-6 flex-1 space-y-2.5">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed">
                        <Check className="mt-0.5 size-4 shrink-0" strokeWidth={3} aria-hidden />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={t.recommended ? "outline" : "default"}
                    className={`mt-7 h-11 w-full text-[14px] ${t.recommended ? "bg-card" : ""}`}
                  >
                    {t.cta}
                  </Button>
                  <p className={`mono-label mt-2.5 text-center text-[10.5px] ${t.recommended ? "text-foreground/90" : "text-muted-foreground"}`}>
                    {t.trustNote}
                  </p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* FAQ accordion: plus-glyph rows; the glyph rotates to an X when open. */
export function Faq({
  eyebrow = "FAQ",
  title = "Questions makers ask first",
  items,
}: {
  eyebrow?: string
  title?: string
  items?: { q: string; a: string }[]
}) {
  const faqs =
    items ??
    [
      {
        q: "Do I need to know anything about design?",
        a: "No. The pages are loud by construction: ink borders, hard shadows, signal yellow. You bring copy and a product name; the system brings the punch.",
      },
      {
        q: "Can I use my own domain?",
        a: "On the Press plan and up, yes - point it at your launch page and we handle the certificate. The free plan ships on yourname.ballyhoo.app.",
      },
      {
        q: "What happens after launch day?",
        a: "Your page becomes a changelog. Keep posting ship notes, or archive it and start a fresh page for the next release - both are one click.",
      },
      {
        q: "Does the countdown really flip the page?",
        a: "Yes. At zero, the page swaps the countdown for your LIVE banner and opens the signup capture. No rebuild, no deploy, no babysitting.",
      },
      {
        q: "Can I export everything?",
        a: "Press plans export the full press kit and your page content as markdown. Your copy is never locked in.",
      },
    ]
  const [open, setOpen] = useState(0)
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-[760px]">
        <SectionHeader eyebrow={eyebrow} title={title} />
        <div className="mt-10 space-y-4">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q} className="border-2 border-border bg-card shadow-[var(--shadow-identity)]">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-[15px] font-bold">{f.q}</span>
                  <Plus
                    className={`size-5 shrink-0 transition-transform duration-100 ${isOpen ? "rotate-45" : ""}`}
                    strokeWidth={3}
                    aria-hidden
                  />
                </button>
                {isOpen && <p className="px-5 pb-5 text-[14px] leading-relaxed text-muted-foreground">{f.a}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* CTA banner: the loud-filled send-off - accent yellow, ink border, hero
   shadow, and the canonical button pair one last time. */
export function CtaBanner({
  title = "Your next release deserves a crowd",
  description = "Spin up a launch page before your coffee goes cold.",
  cta = "Start your launch",
  secondaryCta = "Read the changelog",
  trustNote = "Free while in beta · No credit card",
}: {
  title?: string
  description?: string
  cta?: string
  secondaryCta?: string
  trustNote?: string
}) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-[1120px] border-2 border-border bg-primary px-8 py-16 text-center shadow-[var(--shadow-hero)]">
        <h2 className="mx-auto max-w-[560px] font-display text-[clamp(2rem,3.5vw,2.75rem)] text-primary-foreground">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-[480px] text-[16px] leading-relaxed text-foreground/90">{description}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" variant="outline" className="h-[52px] bg-card px-7 text-[15px]">
            {cta}
          </Button>
          {secondaryCta && (
            <Button
              size="lg"
              variant="outline"
              className="h-[52px] border-primary-foreground bg-primary px-7 text-[15px] text-primary-foreground hover:bg-primary"
            >
              {secondaryCta}
            </Button>
          )}
        </div>
        <p className="mono-label mt-4 text-[11px] text-foreground/90">{trustNote}</p>
      </div>
    </section>
  )
}
