import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DashboardShell, StatBadge } from "./dashboard-shell"

type Stat = { value: string; label: string }
type NavItem = { label: string; active?: boolean; count?: number }
type JobRow = {
  code: string
  trade: string
  customer: string
  status: string
  tone: "muted" | "ok" | "warn" | "danger"
  price: string
}

const jobs: JobRow[] = [
  { code: "TS-4U31", trade: "Plumbing", customer: "Wanjiku M.", status: "En route", tone: "muted", price: "KSh 2,310" },
  { code: "TS-9KQ2", trade: "Electrical", customer: "Otieno M.", status: "Working", tone: "warn", price: "KSh 3,400" },
  { code: "TS-B2X7", trade: "HVAC", customer: "Njeri F.", status: "Awaiting payment", tone: "warn", price: "KSh 5,200" },
  { code: "TS-Q8M1", trade: "ICT", customer: "Kamau P.", status: "Paid", tone: "ok", price: "KSh 1,850" },
]

export function TablePage({
  title = "Jobs",
  nav = [
    { label: "Overview" },
    { label: "Jobs", active: true },
    { label: "Technicians" },
    { label: "Ledger" },
  ],
  stats = [
    { value: "4", label: "Open jobs" },
    { value: "1", label: "Unassigned" },
    { value: "9/15", label: "Free now" },
    { value: "KSh 12,760", label: "Collected" },
  ],
  heading = "Open jobs",
  columns = ["Code", "Trade", "Customer", "Status", "Price"],
  rows = jobs,
}: {
  title?: string
  nav?: NavItem[]
  stats?: Stat[]
  heading?: string
  columns?: string[]
  rows?: JobRow[]
} = {}) {
  return (
    <DashboardShell title={title} nav={nav} stats={stats}>
      <h2 className="mb-4 font-display text-[21px]">{heading}</h2>
      <div className="overflow-x-auto rounded-[12px] border border-border bg-card">
        <table className="w-full min-w-[560px] text-[13px]">
          <thead className="bg-secondary/60">
            <tr>
              {columns.map((h, i) => (
                <th
                  key={h}
                  className={`px-3 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground ${
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
                <td colSpan={columns.length} className="px-3 py-10">
                  <div className="mx-auto max-w-sm text-center">
                    <h3 className="font-display text-[16px]">Nothing here yet</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                      When a request comes in it lands here with live status.
                    </p>
                    <Button size="sm" className="mt-4">
                      New request
                    </Button>
                  </div>
                </td>
              </tr>
            ) : (
              rows.map((j) => (
                <tr key={j.code} className="transition-colors hover:bg-accent/40">
                  <td className="px-3 py-3 font-mono text-[12.5px]">{j.code}</td>
                  <td className="px-3 py-3">{j.trade}</td>
                  <td className="px-3 py-3">{j.customer}</td>
                  <td className="px-3 py-3">
                    <StatBadge label={j.status} tone={j.tone} />
                  </td>
                  <td className="px-3 py-3 text-right font-semibold tabular-nums">{j.price}</td>
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
    <Card className="mx-auto max-w-md py-10">
      <CardContent className="px-10 text-center">
        <h3 className="font-display text-[16px]">Nothing here yet</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
          When a request comes in it lands here with live status.
        </p>
        <Button size="sm" className="mt-4">
          New request
        </Button>
      </CardContent>
    </Card>
  )
}
