import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

/* Launch notes and long-form pages ride the marketing type scale with the
   full data grammar: loading renders skeleton prose, error renders a retry
   card, and an empty body never ships blank. */
export function Article({
  eyebrow = "Changelog",
  title = "Pumblechook Press 1.0: the launch loud enough to ship",
  meta = "6 Oct 2026 · 4 min read",
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
      <p className="mono-label text-[12px] font-bold">{eyebrow}</p>
      <h1 className="mt-3 font-display text-[clamp(2.25rem,4vw,3rem)]">{title}</h1>
      <p className="mono-label mt-4 text-[11px] text-muted-foreground">{meta}</p>
      <div className="mt-8 flex flex-col gap-6 text-[16px] leading-[1.6] [&_blockquote]:border-l-4 [&_blockquote]:border-foreground [&_blockquote]:pl-4 [&_blockquote]:font-bold [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-[2rem] [&_h2]:leading-tight [&_li]:mt-2 [&_ul]:ml-5 [&_ul]:list-disc [&_a]:font-bold [&_a]:underline">
        {status === "loading" && (
          <div aria-label="Loading article">
            {["w-full", "w-11/12", "w-full", "w-4/5", "w-full", "w-3/5"].map((w, i) => (
              <div key={i} className={`mb-3 h-4 ${w} animate-pulse bg-muted motion-reduce:animate-none`} />
            ))}
          </div>
        )}
        {status === "error" && (
          <Card className="py-10 bg-card">
            <CardContent className="px-10 text-center">
              <h2 className="font-display text-[2rem]">THIS POST FAILED TO LOAD</h2>
              <p className="mt-3 text-[14px] text-muted-foreground">
                The piece is safe on our side. Nothing you did caused this.
              </p>
              <Button size="sm" variant="outline" className="mt-4 bg-card">
                Retry
              </Button>
            </CardContent>
          </Card>
        )}
        {status === "empty" && (
          <Card className="py-10 bg-card">
            <CardContent className="px-10 text-center">
              <h2 className="font-display text-[2rem]">NOTHING PUBLISHED YET</h2>
              <p className="mt-3 text-[14px] text-muted-foreground">
                Ship notes appear here the moment they go out.
              </p>
            </CardContent>
          </Card>
        )}
        {status === "ready" && children}
      </div>
    </article>
  )
}

/* Callouts: info rides the muted fill; sticker is the coral helper moment
   (one per section, black text on the helper, always). */
export function Callout({ tone = "info", children }: { tone?: "info" | "sticker"; children: ReactNode }) {
  return (
    <div
      className={`border-2 border-border p-4 text-[13.5px] font-medium leading-relaxed shadow-[var(--shadow-chip)] ${
        tone === "sticker" ? "bg-[var(--sticker-coral)] text-primary-foreground" : "bg-secondary text-foreground"
      }`}
    >
      {children}
    </div>
  )
}

/* Launch figures travel inside prose: the KPI card keeps the Space Mono
   tabular grammar from the metrics strip. */
export function Kpi({ value, label }: { value: string; label: string }) {
  return (
    <Card className="py-4 bg-card">
      <CardContent className="px-5">
        <b className="font-mono text-[26px] font-bold leading-none tabular-nums">{value}</b>
        <span className="mono-label mt-1.5 block text-[10.5px] text-muted-foreground">{label}</span>
      </CardContent>
    </Card>
  )
}
