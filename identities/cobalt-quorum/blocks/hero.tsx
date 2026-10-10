import type { ReactNode } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

/* The framed product shot is an identity signature: every hero and feature row
   seats its visual inside this browser-chrome frame, never a bare image. */
export function BrowserFrame({
  url = "app.runstack.com/deployments",
  children,
}: {
  url?: string
  children: ReactNode
}) {
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-identity)]">
      <div className="flex items-center gap-1.5 border-b border-border bg-secondary px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        <span className="ml-3 rounded-md bg-background px-2.5 py-1 text-[11.5px] text-muted-foreground">
          {url}
        </span>
      </div>
      <div className="bg-background p-5 sm:p-6">{children}</div>
    </figure>
  )
}

/* Static, generic console mock - the default product shot. Adapt per project. */
function ProductShot() {
  const deploys = [
    { service: "api-gateway", env: "production", tone: "Live", pill: "bg-ok-soft text-ok-foreground", time: "2 min ago" },
    { service: "billing-worker", env: "production", tone: "Live", pill: "bg-ok-soft text-ok-foreground", time: "18 min ago" },
    { service: "search-index", env: "staging", tone: "Canary 25%", pill: "bg-warn-soft text-warn-foreground", time: "just now" },
  ] as const
  return (
    <div aria-hidden className="text-[12px]">
      <div className="grid grid-cols-3 gap-3 pb-4">
        {["99.99%", "12 min", "312"].map((v, i) => (
          <div key={v} className="rounded-lg border border-border bg-secondary/60 px-3 py-2.5">
            <div className="font-display text-[17px] font-bold tracking-[-0.02em] tabular-nums">{v}</div>
            <div className="text-[10.5px] uppercase tracking-[0.08em] text-muted-foreground">
              {["uptime", "median deploy", "releases / wk"][i]}
            </div>
          </div>
        ))}
      </div>
      <div className="divide-y divide-border rounded-lg border border-border">
        {deploys.map((d) => (
          <div key={d.service} className="flex items-center gap-3 px-3 py-2.5">
            <span className="min-w-0 flex-1 truncate font-medium text-foreground">{d.service}</span>
            <span className="rounded-full border border-border px-2 py-0.5 text-[10.5px] uppercase tracking-[0.06em] text-muted-foreground">
              {d.env}
            </span>
            <span className={`rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${d.pill}`}>{d.tone}</span>
            <span className="hidden w-16 text-right text-muted-foreground tabular-nums sm:block">{d.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const defaultStats = [
  { value: "99.99%", label: "uptime SLA" },
  { value: "4,200+", label: "teams deploy weekly" },
  { value: "12 min", label: "median pipeline" },
  { value: "38%", label: "fewer rollbacks" },
]

/* Trust figures read as a strip with tabular numerals; loading renders
   skeletons so async data never pops the layout. */
export function MetricsStrip({
  stats = defaultStats,
  loading = false,
}: {
  stats?: { value: string; label: string }[]
  loading?: boolean
}) {
  return (
    <dl className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-border pt-8 sm:grid-cols-4">
      {loading
        ? Array.from({ length: 4 }).map((_, i) => (
            <div key={i} aria-label="Loading metrics">
              <div className="h-9 w-20 animate-pulse rounded-md bg-muted motion-reduce:animate-none" />
              <div className="mt-2 h-3.5 w-24 animate-pulse rounded bg-muted motion-reduce:animate-none" />
            </div>
          ))
        : stats.map((s) => (
            <div key={s.label}>
              <dd className="font-display text-[28px] font-bold leading-none tracking-[-0.02em] tabular-nums">
                {s.value}
              </dd>
              <dt className="mt-1.5 text-[13px] text-muted-foreground">{s.label}</dt>
            </div>
          ))}
    </dl>
  )
}

const defaultLogos = ["Northwind", "Datumworks", "Halcyon", "Brightline", "Osprey Systems", "Fielder"]

export function LogoCloud({
  logos = defaultLogos,
  loading = false,
}: {
  logos?: string[]
  loading?: boolean
}) {
  return (
    <section aria-label="Customer logos" className="px-6 py-12">
      <p className="text-center text-[11.5px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
        Trusted by engineering teams at
      </p>
      {loading ? (
        <div className="mt-6 flex flex-wrap justify-center gap-x-12 gap-y-4" aria-label="Loading logos">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-5 w-24 animate-pulse rounded bg-muted motion-reduce:animate-none" />
          ))}
        </div>
      ) : logos.length === 0 ? (
        <p className="mt-6 text-center text-[13.5px] text-muted-foreground">
          Customer logos appear here once you add them.
        </p>
      ) : (
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {logos.map((name) => (
            <li
              key={name}
              className="font-display text-[17px] font-semibold tracking-[-0.01em] text-muted-foreground/80"
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export function Hero({
  eyebrow = "Deploy platform",
  title = "The fastest path from commit to production",
  accent,
  description = "Runstack turns every merge into a verified, observable release - pipelines, environments, and approvals in one place your whole team can read.",
  primaryCta = "Start deploying",
  secondaryCta = "Book a demo",
  trustNote = "Free for 14 days · No credit card required",
  statsLoading = false,
  shot,
}: {
  eyebrow?: string
  title?: string
  accent?: string
  description?: string
  primaryCta?: string
  secondaryCta?: string
  trustNote?: string
  statsLoading?: boolean
  shot?: ReactNode
}) {
  return (
    <section className="grid grid-cols-1 items-center gap-12 px-6 pb-16 pt-12 lg:grid-cols-[1.02fr_0.98fr] lg:pb-24 lg:pt-20">
      <div>
        <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-primary">{eyebrow}</p>
        <h1 className="mt-4 font-display text-[clamp(40px,5.5vw,68px)] font-bold leading-[1.04] tracking-[-0.03em]">
          {title} {accent && <em className="not-italic text-primary">{accent}</em>}
        </h1>
        <p className="mt-5 max-w-[50ch] text-[17px] leading-relaxed text-muted-foreground">{description}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button size="lg" className="h-[50px] rounded-lg px-6 text-[15px]">
            {primaryCta} <ArrowRight className="ml-1 size-4" />
          </Button>
          {secondaryCta && (
            <Button size="lg" variant="outline" className="h-[50px] rounded-lg px-6 text-[15px]">
              {secondaryCta}
            </Button>
          )}
        </div>
        <p className="mt-3 text-[13px] text-muted-foreground">{trustNote}</p>
        <div className="mt-10 max-w-[520px]">
          <MetricsStrip loading={statsLoading} />
        </div>
      </div>
      <div className="relative">{shot ?? <BrowserFrame url="app.runstack.com/deployments"><ProductShot /></BrowserFrame>}</div>
    </section>
  )
}
