import type { ReactNode } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

/* The substance strip is the identity's proof-of-work: tabular serif figures
   over tracked small-caps labels, read left to right under an engraved
   hairline. Every page carries at least one concrete number in this style. */
export function SubstanceStrip({
  stats = [
    { value: "38", label: "years in practice" },
    { value: "$1.9B", label: "transaction value advised" },
    { value: "140", label: "matters closed last year" },
    { value: "3", label: "offices" },
  ],
  loading = false,
}: {
  stats?: { value: string; label: string }[]
  loading?: boolean
}) {
  if (!loading && stats.length === 0) {
    return (
      <dl className="border-t border-border pt-8">
        <dt className="sr-only">Firm record</dt>
        <dd className="text-[17px] text-muted-foreground">
          Figures publish with the next annual statement.
        </dd>
      </dl>
    )
  }
  return (
    <dl className="grid grid-cols-2 gap-x-10 gap-y-8 border-t border-border pt-8 sm:grid-cols-4">
      {loading
        ? Array.from({ length: 4 }).map((_, i) => (
            <div key={i} aria-label="Loading figures">
              <div className="h-8 w-24 animate-pulse bg-muted motion-reduce:animate-none" />
              <div className="mt-2.5 h-3.5 w-20 animate-pulse bg-muted motion-reduce:animate-none" />
            </div>
          ))
        : stats.map((s) => (
            <div key={s.label}>
              <dd className="font-display text-[30px] leading-none tabular-nums">{s.value}</dd>
              <dt className="mt-2.5 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {s.label}
              </dt>
            </div>
          ))}
    </dl>
  )
}

/* The narrow positioning hero: who you serve, one concrete claim, and a
   single primary CTA (a quiet text link may follow; a second filled button
   never does). Loading keeps the substance strip from popping. */
export function Hero({
  eyebrow = "Business law, practiced since 1987",
  title = "Counsel for companies the region runs on",
  accent,
  description = "Marlow & Fenn advises founder-led and family-owned businesses on transactions, disputes, and the decisions in between. Every engagement is partner-led, from the first call to the signature.",
  primaryCta = "Request a consultation",
  quietLink = "Our practices",
  note = "No fee for the first conversation.",
  statsLoading = false,
  stats,
  children,
}: {
  eyebrow?: string
  title?: string
  accent?: string
  description?: string
  primaryCta?: string
  quietLink?: string
  note?: string
  statsLoading?: boolean
  stats?: { value: string; label: string }[]
  children?: ReactNode
}) {
  return (
    <section className="mx-auto w-full max-w-[880px] px-6 pb-24 pt-20 lg:pb-28 lg:pt-28">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-5 max-w-[22ch] text-[clamp(34px,4.6vw,54px)]">
        {title} {accent && <em className="not-italic text-primary">{accent}</em>}
      </h1>
      <p className="mt-6 max-w-[58ch] text-[19px] leading-[1.65] text-muted-foreground">
        {description}
      </p>
      <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
        <Button size="lg" className="h-12 px-7 text-[16px]">
          {primaryCta}
          <ArrowRight className="ml-1.5 size-4" aria-hidden />
        </Button>
        {quietLink && (
          <a
            href="#"
            className="text-[16px] font-semibold text-primary underline underline-offset-4 hover:text-[var(--navy)]"
          >
            {quietLink}
          </a>
        )}
      </div>
      {note && <p className="mt-4 text-[15px] text-muted-foreground">{note}</p>}
      <div className="mt-16">{children ?? <SubstanceStrip loading={statsLoading} stats={stats} />}</div>
    </section>
  )
}
