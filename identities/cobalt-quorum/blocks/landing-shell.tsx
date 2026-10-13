"use client"

import { useState, type ReactNode } from "react"
import { Check, Minus, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BrowserFrame } from "./hero"

/* This identity's shell frames a MARKETING page: sticky nav with the CTA always
   present, children as the section stack, multi-column footer with the badge
   row. (The precedent's dashboard shell becomes landing-shell here on purpose.) */
export function LandingShell({
  brand = "Balnibarbi",
  nav = [
    { label: "Product" },
    { label: "Solutions" },
    { label: "Docs" },
    { label: "Pricing", active: true },
    { label: "Customers" },
  ],
  cta = "Start deploying",
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
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1120px] items-center gap-8 px-6">
          <span className="font-display text-[19px] font-bold tracking-[-0.02em]">{brand}</span>
          <nav className="ml-auto hidden items-center gap-7 md:flex">
            {nav.map((n) => (
              <a
                key={n.label}
                href="#"
                className={`text-[14px] transition-colors ${
                  n.active
                    ? "font-semibold text-primary"
                    : "font-medium text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex shrink-0 items-center gap-3 md:ml-0">
            <a href="#" className="hidden text-[14px] font-medium text-muted-foreground hover:text-foreground sm:block">
              Sign in
            </a>
            <Button className="h-10 rounded-lg px-4 text-[14px]">{cta}</Button>
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
    { heading: "Product", links: ["Pipelines", "Environments", "Approvals", "Observability"] },
    { heading: "Company", links: ["About", "Customers", "Careers", "Contact"] },
    { heading: "Resources", links: ["Docs", "Changelog", "Status", "Security"] },
    { heading: "Legal", links: ["Privacy", "Terms", "DPA"] },
  ],
  badges: ["SOC 2 ready", "GDPR compliant", "99.99% uptime SLA"],
}

function DefaultFooter({ brand }: { brand: string }) {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto max-w-[1120px] px-6 py-14">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-1">
            <span className="font-display text-[18px] font-bold tracking-[-0.02em]">{brand}</span>
            <p className="mt-3 max-w-[26ch] text-[13px] leading-relaxed text-muted-foreground">
              Verified deploys for teams that answer to customers.
            </p>
          </div>
          {defaultFooter.columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                {col.heading}
              </h3>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[13.5px] text-foreground/80 hover:text-primary">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-border pt-6">
          {defaultFooter.badges.map((b) => (
            <Badge key={b} className="px-2.5 py-1 text-[10.5px]">
              {b}
            </Badge>
          ))}
          <span className="ml-auto text-[12.5px] text-muted-foreground">
            © {new Date().getFullYear()} {brand}, Inc.
          </span>
        </div>
      </div>
    </footer>
  )
}

/* Bento feature grid: 2-3 columns, the lead tile spans and carries a framed
   product crop. Copy states the outcome; the frame shows it. */
export function BentoFeatures({
  eyebrow = "Platform",
  title = "Everything a release needs, nothing it doesn't",
  features,
}: {
  eyebrow?: string
  title?: string
  features?: { title: string; body: string; shot?: ReactNode }[]
}) {
  const tiles =
    features ??
    [
      {
        title: "Pipelines that explain themselves",
        body: "Every step is logged, versioned, and diffable. When a deploy fails, the reason is on the surface - not in a log file.",
      },
      {
        title: "Environments without drift",
        body: "Staging and production stay provisioned from the same source of truth.",
      },
      {
        title: "Approvals that ship",
        body: "Review gates with audit trails, wired to chat where your team already lives.",
      },
      {
        title: "Rollback in one click",
        body: "Revert to any verified release in under a minute, database included.",
      },
      {
        title: "Metrics on every merge",
        body: "Lead time, failure rate, and flaky-step trends, per team.",
      },
    ]
  return (
    <section className="bg-secondary/60 px-6 py-20">
      <div className="mx-auto max-w-[1120px]">
        <SectionHeader eyebrow={eyebrow} title={title} />
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <a href="#" className="hover-lift sm:col-span-2">
            <Card className="h-full py-0">
              <CardContent className="grid h-full grid-cols-1 items-center gap-6 p-7 sm:grid-cols-[1fr_1.1fr]">
                <div>
                  <h3 className="font-display text-[20px] font-bold tracking-[-0.02em]">{tiles[0].title}</h3>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted-foreground">{tiles[0].body}</p>
                </div>
                <div className="min-w-0">
                  {tiles[0].shot ?? (
                    <BrowserFrame url="balnibarbi.com/pipelines">
                      <div aria-hidden className="space-y-2 text-[11.5px]">
                        {[
                          ["build", "42s", "bg-ok-soft text-ok-foreground", "passed"],
                          ["test", "1m 18s", "bg-ok-soft text-ok-foreground", "passed"],
                          ["canary", "rolling", "bg-warn-soft text-warn-foreground", "25%"],
                        ].map(([step, time, pill, label]) => (
                          <div key={step} className="flex items-center gap-2.5 rounded-md border border-border px-3 py-2">
                            <span className="w-14 font-medium text-foreground">{step}</span>
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${pill}`}>{label}</span>
                            <span className="ml-auto text-muted-foreground tabular-nums">{time}</span>
                          </div>
                        ))}
                      </div>
                    </BrowserFrame>
                  )}
                </div>
              </CardContent>
            </Card>
          </a>
          {tiles.slice(1).map((f) => (
            <a key={f.title} href="#" className="hover-lift">
              <Card className="h-full py-0">
                <CardContent className="p-7">
                  <h3 className="font-display text-[17px] font-bold tracking-[-0.015em]">{f.title}</h3>
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
      <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-primary">{eyebrow}</p>
      <h2 className="mt-3 font-display text-[clamp(28px,3.5vw,40px)] font-bold leading-[1.1] tracking-[-0.025em]">
        {title}
      </h2>
      {support && <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">{support}</p>}
    </div>
  )
}

/* Security band: trust badges capped at 3-4 per placement (outline pills),
   each with a one-line claim. Sits between features and pricing. */
export function SecurityBand({
  eyebrow = "Security",
  title = "Built for the teams your auditors ask about",
  items,
}: {
  eyebrow?: string
  title?: string
  items?: { badge: string; claim: string }[]
}) {
  const claims =
    items ?? [
      { badge: "SOC 2 ready", claim: "Type II report available under NDA." },
      { badge: "GDPR compliant", claim: "EU data residency on every plan." },
      { badge: "ISO 27001", claim: "Certified ISMS across the platform." },
      { badge: "SSO / SCIM", claim: "SAML and provisioning on Enterprise." },
    ]
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-[1120px] rounded-xl border border-border bg-card px-8 py-10 shadow-[var(--shadow-identity)]">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-primary">{eyebrow}</p>
            <h2 className="mt-2 font-display text-[24px] font-bold leading-tight tracking-[-0.02em]">{title}</h2>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
            {claims.map((c) => (
              <div key={c.badge} className="flex items-start gap-3">
                <dt>
                  <Badge className="px-2.5 py-1 text-[10.5px]">{c.badge}</Badge>
                </dt>
                <dd className="pt-0.5 text-[13px] leading-relaxed text-muted-foreground">{c.claim}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

type Quote = { quote: string; name: string; role: string }

const defaultQuotes: Quote[] = [
  {
    quote: "We went from hour-long release windows to twelve minutes. The audit trail alone paid for it.",
    name: "Amara Osei",
    role: "VP Engineering, Blefuscu",
  },
  {
    quote: "Approvals used to live in threads. Now every gate has an owner and a record.",
    name: "Daniel Reyes",
    role: "Staff Platform Engineer, Capulet",
  },
  {
    quote: "Onboarding a new service used to take a week of YAML. It is an afternoon now.",
    name: "Priya Nair",
    role: "Head of Infrastructure, Luggnagg Freight",
  },
]

/* Testimonial wall with the full data grammar: loading skeletons, an error
   card with retry, and an explicit empty state. */
export function TestimonialWall({
  eyebrow = "Customers",
  title = "Teams ship more when deploys are boring",
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
    <section className="bg-secondary/60 px-6 py-20">
      <div className="mx-auto max-w-[1120px]">
        <SectionHeader eyebrow={eyebrow} title={title} />
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {status === "loading" &&
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="py-0">
                <CardContent className="p-7" aria-label="Loading customer stories">
                  <div className="h-4 w-full animate-pulse rounded bg-muted motion-reduce:animate-none" />
                  <div className="mt-2 h-4 w-4/5 animate-pulse rounded bg-muted motion-reduce:animate-none" />
                  <div className="mt-2 h-4 w-3/5 animate-pulse rounded bg-muted motion-reduce:animate-none" />
                  <div className="mt-6 h-4 w-32 animate-pulse rounded bg-muted motion-reduce:animate-none" />
                </CardContent>
              </Card>
            ))}
          {status === "error" && (
            <Card className="py-10 md:col-span-3">
              <CardContent className="px-10 text-center">
                <h3 className="font-display text-[16px] font-bold">Couldn&rsquo;t load customer stories</h3>
                <p className="mt-2 text-[13.5px] text-muted-foreground">
                  The stories are safe on our side. Nothing you did caused this.
                </p>
                <Button size="sm" variant="outline" className="mt-4" onClick={onRetry}>
                  Retry
                </Button>
              </CardContent>
            </Card>
          )}
          {status === "empty" && (
            <Card className="py-10 md:col-span-3">
              <CardContent className="px-10 text-center">
                <h3 className="font-display text-[16px] font-bold">No customer stories yet</h3>
                <p className="mt-2 text-[13.5px] text-muted-foreground">
                  Stories appear here as teams publish them.
                </p>
              </CardContent>
            </Card>
          )}
          {status === "ready" &&
            quotes.map((q) => (
              <a key={q.name} href="#" className="hover-lift">
                <Card className="h-full py-0">
                  <CardContent className="flex h-full flex-col p-7">
                    <blockquote className="text-[14.5px] leading-relaxed text-foreground">
                      &ldquo;{q.quote}&rdquo;
                    </blockquote>
                    <p className="mt-5 text-[13.5px] font-semibold">{q.name}</p>
                    <p className="text-[12.5px] text-muted-foreground">{q.role}</p>
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
    name: "Starter",
    description: "For side projects and first deploys.",
    priceAnnual: "$0",
    priceMonthly: "$0",
    features: ["3 services", "Shared runners", "7-day log retention", "Community support"],
    cta: "Start free",
    trustNote: "No credit card required",
  },
  {
    name: "Team",
    description: "For teams shipping every day.",
    priceAnnual: "$49",
    priceMonthly: "$59",
    unit: "per user / month",
    features: [
      "Unlimited services",
      "Preview environments",
      "Approval gates + audit trail",
      "90-day log retention",
      "Priority support",
    ],
    cta: "Start 14-day trial",
    trustNote: "No credit card required · Cancel anytime",
    recommended: true,
  },
  {
    name: "Enterprise",
    description: "For orgs with auditors and SLAs.",
    priceAnnual: "Custom",
    priceMonthly: "Custom",
    features: ["SSO / SCIM", "EU or US data residency", "99.99% uptime SLA", "Dedicated success engineer"],
    cta: "Book a demo",
    trustNote: "SOC 2 report available under NDA",
  },
]

/* Pricing is always 3 tiers, the middle one recommended and framed in cobalt,
   the toggle defaulting to ANNUAL. Trust microcopy sits under every CTA. */
export function Pricing({
  eyebrow = "Pricing",
  title = "Priced per seat, proven in production",
  support = "Every plan includes unlimited pipelines, rollback, and the audit trail.",
  tiers = defaultTiers,
}: {
  eyebrow?: string
  title?: string
  support?: string
  tiers?: Tier[]
}) {
  const [annual, setAnnual] = useState(true)
  return (
    <section id="pricing" className="px-6 py-20">
      <div className="mx-auto max-w-[1120px]">
        <SectionHeader eyebrow={eyebrow} title={title} support={support} />
        <div className="mt-8 flex justify-center">
          <div className="flex items-center rounded-full border border-border bg-card p-1" role="group" aria-label="Billing period">
            <button
              type="button"
              onClick={() => setAnnual(true)}
              aria-pressed={annual}
              className={`rounded-full px-4 py-1.5 text-[13.5px] font-semibold transition-colors ${
                annual ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Annual
            </button>
            <button
              type="button"
              onClick={() => setAnnual(false)}
              aria-pressed={!annual}
              className={`rounded-full px-4 py-1.5 text-[13.5px] font-semibold transition-colors ${
                !annual ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <span className="ml-2 mr-2 hidden rounded-full border border-border px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-muted-foreground sm:block">
              Save 20%
            </span>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3">
          {tiers.map((t) => (
            <a key={t.name} href="#" className={`hover-lift flex ${t.recommended ? "lg:-my-3" : ""}`}>
              <Card
                className="flex h-full w-full flex-col py-0"
                style={
                  t.recommended
                    ? { borderWidth: 2, borderColor: "var(--primary)" }
                    : undefined
                }
              >
                <CardContent className="flex h-full flex-col p-7">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-[18px] font-bold tracking-[-0.015em]">{t.name}</h3>
                    {t.recommended && (
                      <span className="rounded-full bg-primary px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.06em] text-primary-foreground">
                        Most popular
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-[13.5px] text-muted-foreground">{t.description}</p>
                  <p className="mt-5 font-display text-[40px] font-bold leading-none tracking-[-0.02em] tabular-nums">
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
                        <Check className="mt-0.5 size-4 shrink-0 text-ok-foreground" aria-hidden />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={t.recommended ? "default" : "outline"}
                    className="mt-7 h-11 w-full rounded-lg text-[14px]"
                  >
                    {t.cta}
                  </Button>
                  <p className="mt-2.5 text-center text-[12.5px] text-muted-foreground">{t.trustNote}</p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* FAQ accordion: first item open by default; one open at a time. */
export function Faq({
  eyebrow = "FAQ",
  title = "Questions engineering leads ask first",
  items,
}: {
  eyebrow?: string
  title?: string
  items?: { q: string; a: string }[]
}) {
  const faqs =
    items ?? [
      {
        q: "How long does migration take?",
        a: "Most teams connect a repo and run their first pipeline in under an hour. We import existing workflow definitions automatically and flag anything that needs a decision.",
      },
      {
        q: "Where does our code and data live?",
        a: "Pipelines run in isolated workers on our infrastructure; your source stays in your Git provider. Enterprise plans can pin processing to EU or US regions.",
      },
      {
        q: "What happens if a deploy fails?",
        a: "The pipeline stops at the failing step, posts the reason to your chat channel, and production keeps the last verified release. Rollback to any prior release is one click.",
      },
      {
        q: "Do you support monorepos?",
        a: "Yes. Affected-service detection builds and deploys only what a change touches, so a monorepo does not pay monorepo build times.",
      },
      {
        q: "Can we self-host?",
        a: "Enterprise plans can run workers in your own VPC while the control plane stays managed. Talk to us about fully air-gapped setups.",
      },
      {
        q: "How does billing work for contractors and bots?",
        a: "You are billed for human seats only. Machine users and deploy keys are free on every plan.",
      },
    ]
  const [open, setOpen] = useState(0)
  return (
    <section className="bg-secondary/60 px-6 py-20">
      <div className="mx-auto max-w-[760px]">
        <SectionHeader eyebrow={eyebrow} title={title} />
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q} className="rounded-lg border border-border bg-card">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-[15px] font-semibold">{f.q}</span>
                  {isOpen ? (
                    <Minus className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                  ) : (
                    <Plus className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                  )}
                </button>
                {isOpen && (
                  <p className="px-5 pb-5 text-[14px] leading-relaxed text-muted-foreground">{f.a}</p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* CTA band: the one dark contrast band on the page - ink-navy field, white
   headline, cobalt button lifted for the dark ground, trust microcopy. */
export function CtaBand({
  title = "Make every deploy a verified release",
  description = "Connect a repository and ship your first pipeline today.",
  cta = "Start deploying",
  secondaryCta = "Book a demo",
  trustNote = "Free for 14 days · No credit card required",
}: {
  title?: string
  description?: string
  cta?: string
  secondaryCta?: string
  trustNote?: string
}) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-[1120px] rounded-xl bg-[var(--band)] px-8 py-16 text-center">
        <h2 className="mx-auto max-w-[560px] font-display text-[clamp(28px,3.5vw,40px)] font-bold leading-[1.1] tracking-[-0.025em] text-[var(--band-foreground)]">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-[480px] text-[16px] leading-relaxed text-[var(--band-muted)]">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" className="h-[50px] rounded-lg bg-[var(--band-accent)] px-6 text-[15px] text-white hover:bg-[var(--band-accent)]/90">
            {cta}
          </Button>
          {secondaryCta && (
            <Button
              size="lg"
              variant="outline"
              className="h-[50px] rounded-lg border-[var(--band-muted)]/40 bg-transparent px-6 text-[15px] text-[var(--band-foreground)] hover:bg-white/10 hover:text-[var(--band-foreground)]"
            >
              {secondaryCta}
            </Button>
          )}
        </div>
        <p className="mt-3 text-[13px] text-[var(--band-muted)]">{trustNote}</p>
      </div>
    </section>
  )
}
