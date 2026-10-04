import type { ReactNode } from "react"
import { Card } from "@/components/ui/card"

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
      <h1 className="mt-3 font-display text-[28px] font-bold leading-[1.2] tracking-[-0.02em]">
        {title}
      </h1>
      <p className="mt-2.5 font-mono text-[12px] text-muted-foreground">{meta}</p>
      <div className="mt-8 flex flex-col gap-4.5 text-[15px] leading-[1.65] [&_blockquote]:border-l-4 [&_blockquote]:border-primary/40 [&_blockquote]:pl-4 [&_blockquote]:italic [&_code]:font-mono [&_code]:text-[13px] [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-[18px] [&_h2]:font-bold [&_h2]:tracking-[-0.01em] [&_li]:mt-1.5 [&_ul]:ml-5 [&_ul]:list-disc">
        {children}
      </div>
    </article>
  )
}

export function Callout({ tone = "info", children }: { tone?: "info" | "warn"; children: ReactNode }) {
  return (
    <Card
      className={
        tone === "warn"
          ? "rounded-lg border-none bg-warn-soft p-3.5 text-[13px] leading-relaxed text-warn-foreground"
          : "rounded-lg border-none bg-accent p-3.5 text-[13px] leading-relaxed"
      }
    >
      {children}
    </Card>
  )
}

export function Kpi({ value, label }: { value: string; label: string }) {
  return (
    <Card className="px-4 py-3">
      <b className="font-mono text-[20px] font-bold tracking-[-0.01em] tabular-nums">{value}</b>
      <span className="mt-0.5 block text-[11.5px] text-muted-foreground">{label}</span>
    </Card>
  )
}
