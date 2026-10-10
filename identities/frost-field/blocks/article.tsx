import type { ReactNode } from "react"
import { RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

/* Long-form reading on glass: the article column sits on a strong-fill
   glass plate (body text law), with the full data grammar so a CMS-driven
   article never ships blank. */
export function Article({
  eyebrow,
  title,
  meta,
  status = "ready",
  onRetry,
  children,
}: {
  eyebrow: string
  title: string
  meta: string
  status?: "ready" | "loading" | "error" | "empty"
  onRetry?: () => void
  children: ReactNode
}) {
  return (
    <article className="mx-auto max-w-[760px] px-6 py-14">
      <span className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-primary">{eyebrow}</span>
      <h1 className="mt-3 font-display text-[clamp(28px,3.4vw,36px)] font-bold leading-[1.12] tracking-[-0.02em]">
        {title}
      </h1>
      <p className="mt-3 text-[13px] text-muted-foreground">{meta}</p>
      <div className="glass-strong mt-8 rounded-[20px] px-7 py-8 sm:px-10">
        {status === "loading" && (
          <div aria-label="Loading article" className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`h-3.5 animate-pulse rounded-full bg-muted motion-reduce:animate-none ${
                  i % 3 === 2 ? "w-2/3" : "w-full"
                }`}
              />
            ))}
          </div>
        )}
        {status === "error" && (
          <div className="py-8 text-center">
            <h2 className="font-display text-[16px] font-bold">This story didn&rsquo;t load</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              The piece is saved on the server. Nothing was lost.
            </p>
            <Button size="sm" variant="outline" className="mt-4" onClick={onRetry}>
              <RotateCw className="mr-1.5 size-3.5" /> Try again
            </Button>
          </div>
        )}
        {status === "empty" && (
          <div className="py-8 text-center">
            <h2 className="font-display text-[16px] font-bold">Nothing published yet</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              New practice notes land here every week.
            </p>
          </div>
        )}
        {status === "ready" && (
          <div className="flex flex-col gap-6 text-[15.5px] leading-[1.65] [&_blockquote]:border-l-4 [&_blockquote]:border-viz-violet/60 [&_blockquote]:pl-4 [&_blockquote]:italic [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-[20px] [&_h2]:font-bold [&_h2]:tracking-[-0.01em] [&_li]:mt-2 [&_ul]:ml-5 [&_ul]:list-disc">
            {children}
          </div>
        )}
      </div>
    </article>
  )
}

export function Callout({ tone = "info", children }: { tone?: "info" | "warn"; children: ReactNode }) {
  return (
    <Card className={`py-0 ${tone === "warn" ? "bg-warn-soft" : "bg-secondary"}`}>
      <CardContent className={`p-5 text-[13.5px] leading-relaxed ${tone === "warn" ? "text-warn-foreground" : "text-secondary-foreground"}`}>
        {children}
      </CardContent>
    </Card>
  )
}

export function Kpi({ value, label }: { value: string; label: string }) {
  return (
    <Card className="py-5">
      <CardContent className="px-5">
        <b className="font-display text-[28px] font-bold leading-none tracking-[-0.02em] tabular-nums">{value}</b>
        <span className="mt-2 block text-[11.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          {label}
        </span>
      </CardContent>
    </Card>
  )
}
