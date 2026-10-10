import { ArrowRight, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"

const stats = [
  { value: "12 min", label: "today" },
  { value: "9 days", label: "streak" },
  { value: "4.6/5", label: "mood avg" },
  { value: "3", label: "programs" },
]

/* The hero: one chrome-fill glass panel floating over the field. Display
   copy sits directly on the chrome; body copy gets a strong-fill text plate
   (the 0.72 fill is mandatory under body text). Stat chips are small
   strong-fill plates. */
export function Hero({
  eyebrow,
  title,
  accent,
  description,
  primaryCta,
  secondaryCta,
  stats: statItems = stats,
  statsStatus = "ready",
  onStatsRetry,
}: {
  eyebrow: string
  title: string
  accent?: string
  description: string
  primaryCta: string
  secondaryCta?: string
  stats?: { value: string; label: string }[]
  statsStatus?: "ready" | "loading" | "error"
  onStatsRetry?: () => void
}) {
  return (
    <section className="px-6 py-16 lg:py-24">
      <div className="glass-chrome mx-auto max-w-[880px] rounded-[24px] p-3 sm:p-4">
        <div className="rounded-[16px] px-8 py-12 text-center sm:px-12">
          <p className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-primary">{eyebrow}</p>
          <h1 className="mx-auto mt-3 max-w-[18ch] font-display text-[clamp(34px,4.6vw,52px)] font-bold leading-[1.06] tracking-[-0.02em]">
            {title} {accent && <em className="not-italic text-primary">{accent}</em>}
          </h1>
          <div className="glass-strong mx-auto mt-6 max-w-[52ch] rounded-[14px] px-6 py-4">
            <p className="text-[15.5px] leading-relaxed text-muted-foreground">{description}</p>
          </div>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button size="lg" className="h-[50px] px-7 text-[15px]">
              {primaryCta} <ArrowRight className="ml-1 size-4" />
            </Button>
            {secondaryCta && (
              <Button size="lg" variant="outline" className="h-[50px] px-7 text-[15px]">
                {secondaryCta}
              </Button>
            )}
          </div>
          {statsStatus === "loading" && (
            <div className="mt-9 flex flex-wrap justify-center gap-3" aria-label="Loading program stats">
              {statItems.map((s) => (
                <div key={s.label} className="glass-strong h-[68px] w-[120px] animate-pulse rounded-[14px] motion-reduce:animate-none" />
              ))}
            </div>
          )}
          {statsStatus === "error" && (
            <div className="mt-9 text-center">
              <p className="text-[13px] text-muted-foreground">Live numbers didn&rsquo;t load. The page works without them.</p>
              <Button size="sm" variant="outline" className="mt-3" onClick={onStatsRetry}>
                <RotateCw className="mr-1.5 size-3.5" /> Try again
              </Button>
            </div>
          )}
          {statsStatus === "ready" && statItems.length > 0 && (
            <dl className="mt-9 flex flex-wrap justify-center gap-3">
              {statItems.map((s) => (
                <div key={s.label} className="glass-strong rounded-[14px] px-5 py-3 text-left">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-[20px] font-bold leading-tight tracking-[-0.01em] tabular-nums">
                    {s.value}
                  </dd>
                  <dd className="text-[12px] text-muted-foreground">{s.label}</dd>
                </div>
              ))}
            </dl>
          )}
          {statsStatus === "ready" && statItems.length === 0 && (
            <p className="mt-9 text-[12.5px] text-muted-foreground">
              No live numbers yet. They appear as members check in.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
