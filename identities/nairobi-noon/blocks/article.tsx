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
    <article className="mx-auto max-w-[760px] px-6 py-14">
      <span className="text-[11.5px] font-extrabold uppercase tracking-[0.16em] text-primary">
        {eyebrow}
      </span>
      <h1 className="mt-3 font-display text-[28px] leading-[1.12]">
        {title}
      </h1>
      <p className="mt-3 text-[13px] text-muted-foreground">{meta}</p>
      <div className="mt-8 flex flex-col gap-6 text-[16px] leading-[1.6] [&_blockquote]:border-l-4 [&_blockquote]:border-primary/40 [&_blockquote]:pl-4 [&_blockquote]:italic [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-[21px] [&_li]:mt-2 [&_ul]:ml-5 [&_ul]:list-disc">
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
    <Card className="py-4">
      <CardContent className="px-4">
        <b className="font-display text-[26px] tabular-nums">{value}</b>
        <span className="mt-0.5 block text-[11.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          {label}
        </span>
      </CardContent>
    </Card>
  )
}
