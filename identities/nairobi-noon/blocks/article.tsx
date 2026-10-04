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
    <article className="mx-auto max-w-[720px] px-6 py-14">
      <span className="text-[11.5px] font-extrabold uppercase tracking-[0.16em] text-primary">
        {eyebrow}
      </span>
      <h1 className="mt-3 font-display text-[34px] font-extrabold leading-[1.12] tracking-[-0.03em]">
        {title}
      </h1>
      <p className="mt-3 text-[13.5px] text-muted-foreground">{meta}</p>
      <div className="mt-9 flex flex-col gap-5 text-[16px] leading-[1.7] [&_blockquote]:border-l-4 [&_blockquote]:border-primary/40 [&_blockquote]:pl-4 [&_blockquote]:italic [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-[22px] [&_h2]:font-bold [&_h2]:tracking-[-0.02em] [&_li]:mt-2 [&_ul]:ml-5 [&_ul]:list-disc">
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
          ? "rounded-[14px] border-none bg-warn-soft p-4 text-[13.5px] leading-relaxed text-warn-foreground"
          : "rounded-[14px] border-none bg-accent p-4 text-[13.5px] leading-relaxed"
      }
    >
      {children}
    </Card>
  )
}

export function Kpi({ value, label }: { value: string; label: string }) {
  return (
    <Card className="px-5 py-4">
      <b className="font-display text-[24px] font-bold tracking-[-0.02em] tabular-nums">{value}</b>
      <span className="mt-0.5 block text-[12.5px] text-muted-foreground">{label}</span>
    </Card>
  )
}
