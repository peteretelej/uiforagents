import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function Article({
  eyebrow,
  title,
  meta,
  children,
}: {
  eyebrow: string
  title: string
  meta: string
  children: ReactNode
}) {
  return (
    <article className="mx-auto max-w-[680px] px-6 py-12">
      <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
        {eyebrow}
      </span>
      <h1 className="mt-3 font-display text-[26px] font-bold leading-[1.2] tracking-[-0.02em]">
        {title}
      </h1>
      <p className="mt-3 font-mono text-[12px] text-muted-foreground">{meta}</p>
      <div className="mt-8 flex flex-col gap-4 text-[15px] leading-[1.55] [&_blockquote]:border-l-4 [&_blockquote]:border-primary/40 [&_blockquote]:pl-4 [&_blockquote]:italic [&_code]:font-mono [&_code]:text-[13px] [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-[19px] [&_h2]:font-bold [&_h2]:tracking-[-0.01em] [&_li]:mt-2 [&_ul]:ml-5 [&_ul]:list-disc">
        {children}
      </div>
    </article>
  )
}

export function Callout({ tone = "info", children }: { tone?: "info" | "warn"; children: ReactNode }) {
  return (
    <Card className={`border-none py-0 ${tone === "warn" ? "bg-warn-soft" : "bg-accent"}`}>
      <CardContent className={`p-4 text-[13px] leading-relaxed ${tone === "warn" ? "text-warn-foreground" : ""}`}>
        {children}
      </CardContent>
    </Card>
  )
}

export function Kpi({ value, label }: { value: string; label: string }) {
  return (
    <Card className="py-3">
      <CardContent className="px-4">
        <b className="font-mono text-[22px] font-bold tracking-[-0.01em] tabular-nums">{value}</b>
        <span className="mt-0.5 block text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          {label}
        </span>
      </CardContent>
    </Card>
  )
}
