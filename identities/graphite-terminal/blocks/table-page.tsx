import { Card } from "@/components/ui/card"
import { DashboardShell, StatBadge } from "./dashboard-shell"

const services = [
  { id: "svc-01", service: "api-gateway", owner: "aowino", status: "Healthy", tone: "ok", p99: "38ms" },
  { id: "svc-02", service: "auth-core", owner: "mkitui", status: "Degraded", tone: "warn", p99: "210ms" },
  { id: "svc-03", service: "ledger-db", owner: "aowino", status: "Healthy", tone: "ok", p99: "12ms" },
  { id: "svc-04", service: "ingest-fanout", owner: "wanjiku", status: "Failing", tone: "danger", p99: "n/a" },
]

export function TablePage() {
  return (
    <DashboardShell
      title="Fleet"
      nav={[
        { label: "Overview" },
        { label: "Services", active: true },
        { label: "Deploys" },
        { label: "Incidents" },
      ]}
      stats={[
        { value: "4", label: "Services" },
        { value: "1", label: "Degraded" },
        { value: "99.98%", label: "Uptime 30d" },
        { value: "42ms", label: "p99" },
      ]}
    >
      <h2 className="mb-3.5 font-display text-[16px] font-bold tracking-[-0.01em]">Services</h2>
      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full text-[13px]">
          <thead className="bg-secondary/50">
            <tr>
              {["ID", "Service", "Owner", "Status", "p99"].map((h) => (
                <th key={h} className="px-3 py-2 text-left text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id} className="transition-colors hover:bg-accent/30">
                <td className="px-3 py-2 font-mono text-[12px]">{s.id}</td>
                <td>{s.service}</td>
                <td>{s.owner}</td>
                <td><StatBadge label={s.status} tone={s.tone as "muted" | "ok" | "warn" | "danger"} /></td>
                <td className="font-mono tabular-nums">{s.p99}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  )
}

export function ReportEmpty() {
  return (
    <Card className="mx-auto max-w-md p-8 text-center">
      <h3 className="font-display text-[15px] font-bold">Nothing here yet</h3>
      <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
        When a service registers it shows up here with live status.
      </p>
    </Card>
  )
}
