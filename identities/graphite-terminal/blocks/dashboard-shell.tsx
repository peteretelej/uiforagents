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
      <header className="sticky top-0 z-40 border-b border-border/80 bg-card/90 backdrop-blur-md">
        <div className="mx-auto flex h-[52px] max-w-[1120px] items-center gap-5 px-6">
          <span className="font-display text-[16px] font-bold tracking-[-0.01em]">
            {title}
          </span>
          <nav className="ml-auto flex items-center gap-5">
            {nav.map((n) => (
              <a
                key={n.label}
                href="#"
                className={`text-[13px] font-medium transition-colors ${
                  n.active ? "font-semibold text-foreground" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {n.label}
                {n.count ? ` (${n.count})` : ""}
              </a>
            ))}
          </nav>
          {actions && <div className="flex items-center gap-2.5">{actions}</div>}
        </div>
      </header>

      <main className="mx-auto max-w-[1120px] px-6 py-8">
        <div className="mb-6 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          {stats.map((s) => (
            <Card key={s.label} className="rounded-lg px-4 py-3">
              <b className="font-mono text-[22px] font-bold tracking-[-0.01em] tabular-nums">{s.value}</b>
              <span className="mt-0.5 block text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
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
  return <Badge className={`rounded-sm px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wide ${tones[tone]}`}>{label}</Badge>
}
