import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DashboardShell, StatBadge } from "./dashboard-shell"

type Stat = { value: string; label: string }
type NavItem = { label: string; active?: boolean; count?: number }
type ServiceRow = {
  id: string
  service: string
  owner: string
  status: string
  tone: "muted" | "ok" | "warn" | "danger"
  p99: string
}

const services: ServiceRow[] = [
  { id: "svc-01", service: "api-gateway", owner: "aowino", status: "Healthy", tone: "ok", p99: "38ms" },
  { id: "svc-02", service: "auth-core", owner: "mkitui", status: "Degraded", tone: "warn", p99: "210ms" },
  { id: "svc-03", service: "ledger-db", owner: "aowino", status: "Healthy", tone: "ok", p99: "12ms" },
  { id: "svc-04", service: "ingest-fanout", owner: "wanjiku", status: "Failing", tone: "danger", p99: "n/a" },
]

export function TablePage({
  title = "Fleet",
  nav = [
    { label: "Overview" },
    { label: "Services", active: true },
    { label: "Deploys" },
    { label: "Incidents" },
  ],
  stats = [
    { value: "4", label: "Services" },
    { value: "1", label: "Degraded" },
    { value: "99.98%", label: "Uptime 30d" },
    { value: "42ms", label: "p99" },
  ],
  heading = "Services",
  columns = ["ID", "Service", "Owner", "Status", "p99"],
  rows = services,
}: {
  title?: string
  nav?: NavItem[]
  stats?: Stat[]
  heading?: string
  columns?: string[]
  rows?: ServiceRow[]
} = {}) {
  return (
    <DashboardShell title={title} nav={nav} stats={stats}>
      <h2 className="mb-3 font-display text-[19px] font-bold tracking-[-0.01em]">{heading}</h2>
      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full min-w-[560px] text-[13px]">
          <thead className="bg-secondary/50">
            <tr>
              {columns.map((h, i) => (
                <th
                  key={h}
                  className={`px-3 py-2 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted-foreground ${
                    i === columns.length - 1 ? "text-right" : "text-left"
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-3 py-8">
                  <div className="mx-auto max-w-sm text-center">
                    <h3 className="font-display text-[15px] font-semibold">Nothing here yet</h3>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">
                      When a service registers it shows up here with live status.
                    </p>
                    <Button size="sm" className="mt-4">
                      Register service
                    </Button>
                  </div>
                </td>
              </tr>
            ) : (
              rows.map((s) => (
                <tr key={s.id} className="transition-colors hover:bg-accent/30">
                  <td className="px-3 py-2 font-mono text-[12px]">{s.id}</td>
                  <td className="px-3 py-2">{s.service}</td>
                  <td className="px-3 py-2">{s.owner}</td>
                  <td className="px-3 py-2">
                    <StatBadge label={s.status} tone={s.tone} />
                  </td>
                  <td className="px-3 py-2 text-right font-mono tabular-nums">{s.p99}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  )
}

export function ReportEmpty() {
  return (
    <Card className="mx-auto max-w-md py-8">
      <CardContent className="px-8 text-center">
        <h3 className="font-display text-[15px] font-semibold">Nothing here yet</h3>
        <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">
          When a service registers it shows up here with live status.
        </p>
        <Button size="sm" className="mt-4">
          Register service
        </Button>
      </CardContent>
    </Card>
  )
}
