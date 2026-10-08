import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const stats = [
  { value: "412", label: "deploys this week" },
  { value: "99.98%", label: "fleet uptime" },
  { value: "42ms", label: "p99 latency" },
  { value: "3", label: "open incidents" },
]

export function Hero({
  eyebrow,
  title,
  accent,
  description,
  primaryCta,
  secondaryCta,
  stats = [
    { value: "412", label: "deploys this week" },
    { value: "99.98%", label: "fleet uptime" },
    { value: "42ms", label: "p99 latency" },
    { value: "3", label: "open incidents" },
  ],
}: {
  eyebrow: string
  title: string
  accent?: string
  description: string
  primaryCta: string
  secondaryCta?: string
  stats?: { value: string; label: string }[]
}) {
  return (
    <section className="grid grid-cols-1 items-center gap-10 px-6 py-14 lg:grid-cols-[1.04fr_0.96fr] lg:py-20">
      <div>
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-display text-[clamp(32px,4.4vw,44px)] font-bold leading-[1.08] tracking-[-0.02em]">
          {title} {accent && <em className="not-italic text-primary">{accent}</em>}
        </h1>
        <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-muted-foreground">
          {description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button size="lg" className="h-[44px] rounded-sm px-6 text-[13.5px]">
            {primaryCta} <ArrowRight className="ml-1 size-4" />
          </Button>
          {secondaryCta && (
            <Button size="lg" variant="outline" className="h-[44px] rounded-sm px-6 text-[13.5px]">
              {secondaryCta}
            </Button>
          )}
        </div>
        <dl className="mt-8 flex flex-wrap gap-6 border-t border-border pt-4">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-mono text-[22px] font-bold tracking-[-0.01em] tabular-nums">
                {s.value}
              </dd>
              <dd className="text-[12px] text-muted-foreground">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div
        aria-hidden
        className="relative flex min-h-[360px] items-start justify-start overflow-hidden rounded-lg bg-[linear-gradient(150deg,var(--primary),var(--identity-gradient-to))] p-6 shadow-[var(--shadow-identity)]"
      >
        {/* Identity signature: a live prompt line on the lime end of the field
            (dark-on-lime, the pack's highest-contrast pair). */}
        <p className="font-mono text-[13px] text-primary-foreground">~/ops $ tail -f fleet.log ▌</p>
      </div>
    </section>
  )
}
