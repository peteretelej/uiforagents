import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const stats = [
  { value: "15+", label: "vetted technicians" },
  { value: "2,100+", label: "jobs completed" },
  { value: "<30 min", label: "match target" },
  { value: "85%", label: "goes to the fundi" },
]

export function Hero({
  eyebrow,
  title,
  accent,
  description,
  primaryCta,
  secondaryCta,
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
    <section className="grid grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-[1.04fr_0.96fr] lg:py-24">
      <div>
        <p className="text-[11.5px] font-extrabold uppercase tracking-[0.16em] text-primary">
          {eyebrow}
        </p>
        <h1 className="mt-3.5 font-display text-[clamp(36px,5vw,52px)] font-extrabold leading-[1.05] tracking-[-0.035em]">
          {title} {accent && <em className="not-italic text-primary">{accent}</em>}
        </h1>
        <p className="mt-4.5 max-w-[46ch] text-[17px] leading-relaxed text-muted-foreground">
          {description}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button size="lg" className="h-[50px] rounded-xl px-7 text-[15px]">
            {primaryCta} <ArrowRight className="ml-1 size-4" />
          </Button>
          {secondaryCta && (
            <Button size="lg" variant="outline" className="h-[50px] rounded-xl px-7 text-[15px]">
              {secondaryCta}
            </Button>
          )}
        </div>
        <dl className="mt-9 flex flex-wrap gap-8 border-t border-border pt-5">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-[22px] font-bold tracking-[-0.02em] tabular-nums">
                {s.value}
              </dd>
              <dd className="text-[12.5px] text-muted-foreground">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div
        aria-hidden
        className="relative flex min-h-[400px] items-center justify-center overflow-hidden rounded-[20px] bg-gradient-to-br from-primary via-oklch(46%_0.19_262) to-oklch(33%_0.1_264) shadow-[var(--shadow-calm)]"
      >
        {/* Identity signature: white 6-8% circles over the azure gradient. */}
        <div className="absolute -right-20 -top-24 size-72 rounded-full bg-white/[0.08]" />
        <div className="absolute -bottom-24 -left-16 size-56 rounded-full bg-white/[0.06]" />
      </div>
    </section>
  )
}
