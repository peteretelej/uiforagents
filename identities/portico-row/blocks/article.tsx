import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

/* Insights and briefings ride the marketing type scale with the full data
   grammar: loading renders skeleton prose, error renders a retry card, and
   an empty body never ships blank. The meta line carries the substance
   pairing (figure + date). */
export function Article({
  eyebrow = "Insights",
  title = "What the new ownership-transparency rules mean for family companies",
  meta = "6 min read · Filed 12 March 2026",
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
    <article className="mx-auto max-w-[760px] px-6 py-20 lg:py-24">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-4 text-[clamp(30px,3.8vw,44px)]">{title}</h1>
      <p className="mt-4 border-b border-border pb-8 text-[15px] uppercase tracking-[0.1em] text-muted-foreground">
        {meta}
      </p>
      <div className="mt-8 flex flex-col gap-6 text-[19px] leading-[1.65] [&_blockquote]:my-2 [&_h2]:mt-10 [&_h2]:text-[24px] [&_li]:mt-2 [&_ol]:ml-5 [&_ol]:list-decimal [&_ul]:ml-5 [&_ul]:list-disc">
        {status === "loading" && (
          <div aria-label="Loading article">
            {["w-full", "w-11/12", "w-full", "w-4/5", "w-full", "w-3/5"].map((w, i) => (
              <div
                key={i}
                className={`mb-3 h-5 ${w} animate-pulse bg-muted motion-reduce:animate-none`}
              />
            ))}
          </div>
        )}
        {status === "error" && (
          <Card className="py-12">
            <CardContent className="px-10 text-center">
              <h2 className="text-[19px]">This briefing failed to load</h2>
              <p className="mt-2 text-[16px] leading-relaxed text-muted-foreground">
                The piece is safe on our side. Nothing you did caused this.
              </p>
              <Button size="sm" variant="outline" className="mt-5 h-11 px-5">
                Retry
              </Button>
            </CardContent>
          </Card>
        )}
        {status === "empty" && (
          <Card className="py-12">
            <CardContent className="px-10 text-center">
              <h2 className="text-[19px]">Nothing published yet</h2>
              <p className="mt-2 text-[16px] leading-relaxed text-muted-foreground">
                Briefings appear here the moment they are filed.
              </p>
            </CardContent>
          </Card>
        )}
        {status === "ready" && children}
      </div>
    </article>
  )
}

/* Pull quotes are one of the two serif moments below display size; the
   brass hairline is the brass token's only decorating surface. */
export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="pull-quote my-4 text-foreground">
      {children}
    </blockquote>
  )
}

/* Substance figures travel inside prose: the KPI card keeps the numbered
   figure-over-label grammar from the substance strip. */
export function Kpi({ value, label }: { value: string; label: string }) {
  return (
    <Card className="py-5">
      <CardContent className="px-6">
        <b className="font-display text-[30px] font-semibold leading-none tabular-nums">{value}</b>
        <span className="mt-2 block text-[12.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </span>
      </CardContent>
    </Card>
  )
}
