"use client"

import { useState, type ReactNode } from "react"
import { ArrowRight, Loader2, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

/* This shell frames an institutional marketing page: a navy header band with
   the serif wordmark, children as the section stack, and the compliance
   footer as the credibility sink. The footer is mandatory on every page. */
export function LandingShell({
  brand = "Jarndyce & Jarndyce",
  nav = [
    { label: "Practices" },
    { label: "People" },
    { label: "Insights" },
    { label: "Careers" },
    { label: "Contact" },
  ],
  cta = "Request a consultation",
  footer,
  children,
}: {
  brand?: string
  nav?: { label: string; href?: string; active?: boolean }[]
  cta?: string
  footer?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 bg-[var(--navy)]">
        <div className="mx-auto flex h-[72px] max-w-[1120px] items-center gap-8 px-6">
          <a href="#" className="font-display text-[22px] tracking-[-0.01em] text-white">
            {brand}
          </a>
          <nav className="ml-auto hidden items-center gap-7 md:flex" aria-label="Primary">
            {nav.map((n) => (
              <a
                key={n.label}
                href={n.href ?? "#"}
                aria-current={n.active ? "page" : undefined}
                className={`text-[15px] transition-colors ${
                  n.active
                    ? "font-semibold text-white underline underline-offset-8"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="ml-auto shrink-0 md:ml-0">
            <Button
              variant="outline"
              className="h-11 border-white/40 bg-transparent px-4 text-[14px] text-white hover:border-white hover:bg-white/10 hover:text-white"
            >
              {cta}
            </Button>
          </div>
        </div>
      </header>

      <main>{children}</main>

      {footer ?? <ComplianceFooter brand={brand} />}
    </div>
  )
}

/* The compliance footer is the identity's credibility sink and is mandatory
   on every page: entity, registrations, offices, disclosure links, and the
   advertising notice. Furniture stays in the deep navy band. */
export function ComplianceFooter({
  brand = "Jarndyce & Jarndyce",
  entity = "A professional limited liability partnership. Counsel for founder-led and family-owned companies.",
  offices = "Offices in Chicago, Milwaukee, and Indianapolis.",
  registrations = "Registered to practice before the courts of the jurisdictions in which our offices sit.",
  links = [
    { label: "Privacy" },
    { label: "Terms of use" },
    { label: "Disclosures" },
    { label: "Accessibility" },
  ],
  notice = "Attorney advertising. Prior results do not guarantee a similar outcome. Nothing on this site is legal advice, and reading it does not create an attorney-client relationship.",
}: {
  brand?: string
  entity?: string
  offices?: string
  registrations?: string
  links?: { label: string; href?: string }[]
  notice?: string
}) {
  return (
    <footer className="bg-[var(--navy-deep)] text-[var(--band-foreground)]">
      <div className="mx-auto max-w-[1120px] px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="font-display text-[22px] tracking-[-0.01em]">{brand}</span>
            <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-[var(--band-muted)]">
              {entity}
            </p>
            <p className="mt-6 flex items-start gap-2 text-[15px] text-[var(--band-muted)]">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
              {offices}
            </p>
          </div>
          <nav aria-label="Disclosures">
            <h3 className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-[var(--band-muted)]">
              Disclosures
            </h3>
            <ul className="mt-4 space-y-2.5">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href ?? "#"}
                    className="text-[15px] text-white/85 underline underline-offset-4 hover:text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-12 border-t border-white/40 pt-6">
          <p className="max-w-[86ch] text-[13.5px] leading-relaxed text-[var(--band-muted)]">
            {notice}
          </p>
          <p className="mt-3 text-[13.5px] text-[var(--band-muted)]">
            © {new Date().getFullYear()} {brand}. {registrations}
          </p>
        </div>
      </div>
    </footer>
  )
}

export function SectionHeader({
  eyebrow,
  title,
  support,
}: {
  eyebrow: string
  title: string
  support?: string
}) {
  return (
    <div className="max-w-[680px]">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-[clamp(26px,3vw,36px)]">{title}</h2>
      {support && (
        <p className="mt-4 text-[19px] leading-[1.65] text-muted-foreground">{support}</p>
      )}
    </div>
  )
}

/* The credential bar: quantified, generic credentials on the sunk band.
   No real associations or regulators - phrases and figures only. */
export function CredentialBar({
  eyebrow = "The firm in brief",
  items = [
    { figure: "38", label: "years advising private companies" },
    { figure: "9", label: "practice groups, all partner-led" },
    { figure: "12", label: "jurisdictions of admission" },
    { figure: "24h", label: "response to new inquiries" },
  ],
  loading = false,
}: {
  eyebrow?: string
  items?: { figure: string; label: string }[]
  loading?: boolean
}) {
  return (
    <section aria-label="Firm credentials" className="border-y border-border bg-secondary px-6 py-14">
      <div className="mx-auto max-w-[1120px]">
        <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {eyebrow}
        </p>
        {!loading && items.length === 0 ? (
          <p className="mt-6 text-[17px] text-muted-foreground">
            Credentials load with the firm profile.
          </p>
        ) : (
          <dl className="mt-8 grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} aria-label="Loading credentials">
                    <div className="h-7 w-16 animate-pulse bg-muted motion-reduce:animate-none" />
                    <div className="mt-2.5 h-3.5 w-28 animate-pulse bg-muted motion-reduce:animate-none" />
                  </div>
                ))
              : items.map((c) => (
                  <div key={c.label}>
                    <dd className="text-[24px] font-semibold leading-none tabular-nums text-[var(--navy)]">
                      {c.figure}
                    </dd>
                    <dt className="mt-2 max-w-[22ch] text-[14px] leading-snug text-muted-foreground">
                      {c.label}
                    </dt>
                  </div>
                ))}
          </dl>
        )}
      </div>
    </section>
  )
}

/* Practices grid: 3-6 plain-language cards, numbered in the substance
   style. Cards are square with engraved hairlines and deepen the hairline
   on hover; they never fill with navy. */
export function PracticesGrid({
  eyebrow = "Practices",
  title = "Counsel where it counts",
  support,
  practices,
  status = "ready",
  onRetry,
}: {
  eyebrow?: string
  title?: string
  support?: string
  practices?: { title: string; body: string }[]
  status?: "ready" | "loading" | "error" | "empty"
  onRetry?: () => void
}) {
  const items =
    practices ??
    [
      {
        title: "Mergers & acquisitions",
        body: "Buy-side and sell-side counsel for private companies, with diligence and closing managed by a partner.",
      },
      {
        title: "Business formation & governance",
        body: "Entity choices, founder agreements, and the governance that keeps growing companies out of trouble.",
      },
      {
        title: "Commercial contracts",
        body: "Customer, vendor, and licensing agreements drafted to be read once and relied on for years.",
      },
      {
        title: "Employment & workplace",
        body: "Handbooks, separations, and disputes handled with discretion for employers of 5 to 500.",
      },
      {
        title: "Real estate & leasing",
        body: "Acquisitions, financing, and lease portfolios for owner-operators and landlords.",
      },
      {
        title: "Succession & estates",
        body: "Ownership transitions and estate plans that keep family businesses in the family.",
      },
    ]
  return (
    <section className="px-6 py-24 lg:py-28">
      <div className="mx-auto max-w-[1120px]">
        <SectionHeader eyebrow={eyebrow} title={title} support={support} />
        {status === "loading" && (
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Loading practices">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="py-0">
                <CardContent className="p-7">
                  <div className="h-4 w-8 animate-pulse bg-muted motion-reduce:animate-none" />
                  <div className="mt-4 h-4 w-3/4 animate-pulse bg-muted motion-reduce:animate-none" />
                  <div className="mt-3 h-3.5 w-full animate-pulse bg-muted motion-reduce:animate-none" />
                  <div className="mt-2 h-3.5 w-4/5 animate-pulse bg-muted motion-reduce:animate-none" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        {status === "error" && (
          <Card className="mt-12 py-12">
            <CardContent className="px-10 text-center">
              <h3 className="text-[19px]">Couldn&rsquo;t load practices</h3>
              <p className="mx-auto mt-2 max-w-[46ch] text-[16px] leading-relaxed text-muted-foreground">
                The list is stale, not lost. Nothing you did caused this.
              </p>
              <Button size="sm" variant="outline" className="mt-5 h-11 px-5" onClick={onRetry}>
                Retry
              </Button>
            </CardContent>
          </Card>
        )}
        {status === "empty" && (
          <Card className="mt-12 py-12">
            <CardContent className="px-10 text-center">
              <h3 className="text-[19px]">No practices published yet</h3>
              <p className="mx-auto mt-2 max-w-[46ch] text-[16px] leading-relaxed text-muted-foreground">
                Practice groups appear here as the firm profile is completed.
              </p>
            </CardContent>
          </Card>
        )}
        {status === "ready" && items.length === 0 && (
          <Card className="mt-12 py-12">
            <CardContent className="px-10 text-center">
              <h3 className="text-[19px]">No practices published yet</h3>
              <p className="mx-auto mt-2 max-w-[46ch] text-[16px] leading-relaxed text-muted-foreground">
                Practice groups appear here as the firm profile is completed.
              </p>
            </CardContent>
          </Card>
        )}
        {status === "ready" && items.length > 0 && (
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p, i) => (
              <a key={p.title} href="#" className="hover-lift group block">
                <Card className="h-full py-0">
                  <CardContent className="flex h-full flex-col p-7">
                    <span className="font-display text-[15px] tabular-nums text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 text-[20px] leading-snug">{p.title}</h3>
                    <p className="mt-2.5 flex-1 text-[16px] leading-[1.55] text-muted-foreground">
                      {p.body}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-primary group-hover:text-[var(--navy)]">
                      Learn more
                      <ArrowRight className="size-4" aria-hidden />
                    </span>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

type Person = {
  name: string
  role: string
  credentials: string[]
  phone?: string
  email?: string
  photo?: ReactNode
}

const defaultPeople: Person[] = [
  {
    name: "Eleanor Jarndyce",
    role: "Founding partner, transactions",
    credentials: ["J.D., 1989", "Admitted in Illinois and Wisconsin", "Counsel on 200+ closed transactions"],
    phone: "(312) 555-0142",
    email: "e.jarndyce@jarndyce.example",
  },
  {
    name: "Daniel Tulkinghorn",
    role: "Partner, commercial litigation",
    credentials: ["J.D., 1994", "Admitted in Illinois", "First-chair trial experience in 9 states"],
    phone: "(312) 555-0178",
    email: "d.tulkinghorn@jarndyce.example",
  },
  {
    name: "Ruth Okonkwo",
    role: "Partner, employment",
    credentials: ["J.D., 2003", "LL.M., labor & employment", "Counsels employers in 14 states"],
    phone: "(414) 555-0163",
    email: "r.okonkwo@jarndyce.example",
  },
]

/* People cards: the bio is a first-class block. Portrait is a serif monogram
   plate by default (no photography dependency); pass `photo` to seat a real
   portrait. Credential lines are 2-4 and generic; contact targets are 44px. */
export function PeopleGrid({
  eyebrow = "People",
  title = "Partners lead every engagement",
  support,
  people = defaultPeople,
  status = "ready",
  onRetry,
}: {
  eyebrow?: string
  title?: string
  support?: string
  people?: Person[]
  status?: "ready" | "loading" | "error" | "empty"
  onRetry?: () => void
}) {
  const initials = (name: string) =>
    name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
  return (
    <section className="bg-secondary px-6 py-24 lg:py-28">
      <div className="mx-auto max-w-[1120px]">
        <SectionHeader eyebrow={eyebrow} title={title} support={support} />
        {status === "loading" && (
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Loading people">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="py-0">
                <div className="aspect-[4/3] w-full animate-pulse bg-muted motion-reduce:animate-none" />
                <CardContent className="p-7">
                  <div className="h-4 w-2/3 animate-pulse bg-muted motion-reduce:animate-none" />
                  <div className="mt-3 h-3.5 w-1/2 animate-pulse bg-muted motion-reduce:animate-none" />
                  <div className="mt-6 h-3.5 w-full animate-pulse bg-muted motion-reduce:animate-none" />
                  <div className="mt-2 h-3.5 w-3/4 animate-pulse bg-muted motion-reduce:animate-none" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        {status === "error" && (
          <Card className="mt-12 py-12">
            <CardContent className="px-10 text-center">
              <h3 className="text-[19px]">Couldn&rsquo;t load the team</h3>
              <p className="mx-auto mt-2 max-w-[46ch] text-[16px] leading-relaxed text-muted-foreground">
                Profiles are stale, not lost. Nothing you did caused this.
              </p>
              <Button size="sm" variant="outline" className="mt-5 h-11 px-5" onClick={onRetry}>
                Retry
              </Button>
            </CardContent>
          </Card>
        )}
        {status === "empty" && (
          <Card className="mt-12 py-12">
            <CardContent className="px-10 text-center">
              <h3 className="text-[19px]">No profiles published yet</h3>
              <p className="mx-auto mt-2 max-w-[46ch] text-[16px] leading-relaxed text-muted-foreground">
                Attorney profiles appear here as they are approved for publication.
              </p>
            </CardContent>
          </Card>
        )}
        {status === "ready" && people.length === 0 && (
          <Card className="mt-12 py-12">
            <CardContent className="px-10 text-center">
              <h3 className="text-[19px]">No profiles published yet</h3>
              <p className="mx-auto mt-2 max-w-[46ch] text-[16px] leading-relaxed text-muted-foreground">
                Attorney profiles appear here as they are approved for publication.
              </p>
            </CardContent>
          </Card>
        )}
        {status === "ready" &&
          people.map((p) => (
            <Card key={p.name} className="mt-4 grid grid-cols-1 py-0 sm:grid-cols-[200px_1fr]">
              <div className="aspect-[4/3] bg-[var(--wash)] sm:aspect-auto sm:h-full">
                {p.photo ?? (
                  <div
                    aria-hidden
                    className="flex h-full min-h-[160px] items-center justify-center font-display text-[44px] text-[var(--navy)]"
                  >
                    {initials(p.name)}
                  </div>
                )}
              </div>
              <CardContent className="p-7">
                <h3 className="text-[20px] leading-snug">{p.name}</h3>
                <p className="mt-1 text-[15px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  {p.role}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {p.credentials.map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-[15px] leading-snug text-muted-foreground">
                      <span aria-hidden className="mt-[0.55em] size-1 shrink-0 rounded-full bg-muted-foreground" />
                      {c}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                  {p.phone && (
                    <a
                      href={`tel:${p.phone.replace(/[^+\d]/g, "")}`}
                      className="inline-flex min-h-[44px] items-center gap-2 text-[15px] font-semibold text-primary underline underline-offset-4 hover:text-[var(--navy)]"
                    >
                      <Phone className="size-4" aria-hidden />
                      {p.phone}
                    </a>
                  )}
                  {p.email && (
                    <a
                      href={`mailto:${p.email}`}
                      className="inline-flex min-h-[44px] items-center gap-2 text-[15px] font-semibold text-primary underline underline-offset-4 hover:text-[var(--navy)]"
                    >
                      <Mail className="size-4" aria-hidden />
                      Email
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </section>
  )
}

/* Contact / intake: the form never stands alone - phone and offices sit
   beside it, and the compliance microcopy is part of the contract. */
export function ContactBlock({
  eyebrow = "Contact",
  title = "Start the conversation",
  support = "Tell us what is happening. A partner reads every inquiry and responds within one business day.",
  phone = "(312) 555-0100",
  offices = ["Chicago - 200 Sample Street, Suite 900", "Milwaukee - 75 Harbor Court, Suite 400"],
  note = "Submitting this form does not create an attorney-client relationship.",
  status: statusProp = "idle",
}: {
  eyebrow?: string
  title?: string
  support?: string
  phone?: string
  offices?: string[]
  note?: string
  status?: "idle" | "submitting" | "error"
}) {
  const [status, setStatus] = useState(statusProp)
  const submitting = status === "submitting"
  return (
    <section id="contact" className="px-6 py-24 lg:py-28">
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeader eyebrow={eyebrow} title={title} support={support} />
          <a
            href={`tel:${phone.replace(/[^+\d]/g, "")}`}
            className="mt-8 inline-flex min-h-[44px] items-center gap-3 font-display text-[28px] tabular-nums text-primary underline underline-offset-4 hover:text-[var(--navy)]"
          >
            <Phone className="size-5" aria-hidden />
            {phone}
          </a>
          <ul className="mt-8 space-y-3">
            {offices.map((o) => (
              <li key={o} className="flex items-start gap-2.5 text-[16px] leading-snug text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
                {o}
              </li>
            ))}
          </ul>
        </div>
        <Card className="py-0">
          <CardContent className="p-8">
            <form
              className="flex flex-col gap-5"
              onSubmit={(e) => {
                e.preventDefault()
                setStatus("submitting")
              }}
            >
              <div className="grid gap-2">
                <Label htmlFor="intake-name" className="text-[15px]">
                  Name
                </Label>
                <Input id="intake-name" name="name" autoComplete="name" className="h-12 text-[16px]" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="intake-email" className="text-[15px]">
                  Email
                </Label>
                <Input
                  id="intake-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="h-12 text-[16px]"
                  aria-invalid={status === "error"}
                  aria-describedby={status === "error" ? "intake-error" : undefined}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="intake-message" className="text-[15px]">
                  What brings you here?
                </Label>
                <textarea
                  id="intake-message"
                  name="message"
                  rows={5}
                  className="min-h-[44px] w-full rounded-[2px] border border-input bg-transparent px-3 py-2.5 text-[16px] placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
                  required
                />
              </div>
              {status === "error" && (
                <p id="intake-error" role="alert" className="text-[15px] font-medium text-destructive">
                  That email could not be accepted. Check it, or call the number listed here.
                </p>
              )}
              <Button type="submit" className="h-12 text-[16px]" disabled={submitting}>
                {submitting && <Loader2 className="mr-1.5 size-4 animate-spin motion-reduce:animate-none" aria-hidden />}
                {submitting ? "Sending…" : "Request a consultation"}
              </Button>
              <p className="text-[14px] leading-relaxed text-muted-foreground">{note}</p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
