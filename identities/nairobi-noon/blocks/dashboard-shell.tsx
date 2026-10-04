import type { ReactNode } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export function DashboardShell({
  title,
  nav,
  actions,
  stats,
  children,
}: {
  title: string
  nav: { label: string; active?: boolean; count?: number }[]
  actions?: ReactNode
  stats: { value: string; label: string }[]
  children: ReactNode
}) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-card/85 backdrop-blur-md">
        <div className="mx-auto flex h-[60px] max-w-[1120px] items-center gap-6 px-6">
          <span className="font-display text-[19px] font-extrabold tracking-[-0.02em]">
            {title}
          </span>
          <nav className="ml-auto flex items-center gap-6">
            {nav.map((n) => (
              <a
                key={n.label}
                href="#"
                className={`text-sm font-medium transition-colors ${
                  n.active ? "font-semibold text-foreground" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {n.label}
                {n.count ? ` (${n.count})` : ""}
              </a>
            ))}
          </nav>
          {actions && <div className="flex items-center gap-3">{actions}</div>}
        </div>
      </header>

      <main className="mx-auto max-w-[1120px] px-6 py-10">
        <div className="mb-8 grid grid-cols-2 gap-3.5 lg:grid-cols-4">
          {stats.map((s) => (
            <Card key={s.label} className="rounded-xl px-5 py-4">
              <b className="font-display text-[26px] font-bold tracking-[-0.02em] tabular-nums">{s.value}</b>
              <span className="mt-0.5 block text-[11.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                {s.label}
              </span>
            </Card>
          ))}
        </div>
        {children}
      </main>
    </div>
  )
}

export function StatBadge({ label, tone = "muted" }: { label: string; tone?: "muted" | "ok" | "warn" | "danger" }) {
  const tones = {
    muted: "bg-secondary text-secondary-foreground",
    ok: "bg-ok-soft text-ok-foreground",
    warn: "bg-warn-soft text-warn-foreground",
    danger: "bg-destructive/10 text-destructive",
  }
  return <Badge className={`rounded-md px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${tones[tone]}`}>{label}</Badge>
}
