import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

/* Long-form pages (announcements, docs essays, customer stories) ride the
   marketing type scale with the full data grammar: loading renders skeleton
   prose, error renders a retry card, and an empty body never ships blank. */
export function Article({
  eyebrow = "Engineering",
  title = "How we cut median deploy time to 12 minutes",
  meta = "6 Oct 2026 · 8 min read",
  status = "ready",
  children,
}: {
  eyebrow?: string
  title?: string
  meta?: string
  status?: "ready" | "loading" | "error" | "empty"
  children?: ReactNode
}) {
  return (
    <article className="mx-auto max-w-[720px] px-6 py-16">
      <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-primary">{eyebrow}</p>
      <h1 className="mt-3 font-display text-[clamp(30px,4vw,40px)] font-bold leading-[1.12] tracking-[-0.025em]">
        {title}
      </h1>
      <p className="mt-3 text-[13.5px] text-muted-foreground">{meta}</p>
      <div className="mt-8 flex flex-col gap-6 text-[16px] leading-[1.6] [&_blockquote]:border-l-4 [&_blockquote]:border-primary/40 [&_blockquote]:pl-4 [&_blockquote]:italic [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-[24px] [&_h2]:font-bold [&_h2]:tracking-[-0.02em] [&_li]:mt-2 [&_ul]:ml-5 [&_ul]:list-disc">
        {status === "loading" && (
          <div aria-label="Loading article">
            {["w-full", "w-11/12", "w-full", "w-4/5", "w-full", "w-3/5"].map((w, i) => (
              <div
                key={i}
                className={`mb-3 h-4 ${w} animate-pulse rounded bg-muted motion-reduce:animate-none`}
              />
            ))}
          </div>
        )}
        {status === "error" && (
          <Card className="py-10">
            <CardContent className="px-10 text-center">
              <h2 className="font-display text-[16px] font-bold">This article failed to load</h2>
              <p className="mt-2 text-[13.5px] text-muted-foreground">
                The piece is safe on our side. Nothing you did caused this.
              </p>
              <Button size="sm" variant="outline" className="mt-4">
                Retry
              </Button>
            </CardContent>
          </Card>
        )}
        {status === "empty" && (
          <Card className="py-10">
            <CardContent className="px-10 text-center">
              <h2 className="font-display text-[16px] font-bold">Nothing published yet</h2>
              <p className="mt-2 text-[13.5px] text-muted-foreground">
                Posts appear here the moment they go out.
              </p>
            </CardContent>
          </Card>
        )}
        {status === "ready" && children}
      </div>
    </article>
  )
}

export function Callout({ tone = "info", children }: { tone?: "info" | "warn"; children: ReactNode }) {
  return (
    <Card className={`border-none py-0 ${tone === "warn" ? "bg-warn-soft" : "bg-secondary"}`}>
      <CardContent className={`p-4 text-[13.5px] leading-relaxed ${tone === "warn" ? "text-warn-foreground" : "text-foreground/90"}`}>
        {children}
      </CardContent>
    </Card>
  )
}

/* Trust figures can travel inside prose: the KPI card keeps the tabular
   numeral grammar from the metrics strip. */
export function Kpi({ value, label }: { value: string; label: string }) {
  return (
    <Card className="py-4">
      <CardContent className="px-5">
        <b className="font-display text-[28px] font-bold leading-none tracking-[-0.02em] tabular-nums">{value}</b>
        <span className="mt-1.5 block text-[12px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          {label}
        </span>
      </CardContent>
    </Card>
  )
}
