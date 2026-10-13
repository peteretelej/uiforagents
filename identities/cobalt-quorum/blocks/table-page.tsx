import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BrowserFrame } from "./hero"

/* The product-console table page: this identity's table surface seats inside
   the browser-chrome frame (the same signature motif as the hero), with the
   full data grammar - loading skeletons, error with retry, and the empty
   state composed in the identity's voice. */

type DeployRow = {
  service: string
  env: string
  status: string
  tone: "ok" | "warn" | "danger" | "muted"
  duration: string
  owner: string
}

const deploys: DeployRow[] = [
  { service: "api-gateway", env: "production", status: "Live", tone: "ok", duration: "11m 42s", owner: "amara" },
  { service: "billing-worker", env: "production", status: "Live", tone: "ok", duration: "9m 05s", owner: "daniel" },
  { service: "search-index", env: "staging", status: "Canary 25%", tone: "warn", duration: "6m 31s", owner: "priya" },
  { service: "webhooks", env: "production", status: "Rolled back", tone: "danger", duration: "14m 12s", owner: "sam" },
]

export function StatPill({ label, tone = "muted" }: { label: string; tone?: "ok" | "warn" | "danger" | "muted" }) {
  // Soft fills are the opt-in status voice; the identity hairline capsule
  // comes from the overrides layer and stays on every pill.
  const tones = {
    muted: "text-muted-foreground",
    ok: "bg-ok-soft text-ok-foreground",
    warn: "bg-warn-soft text-warn-foreground",
    danger: "bg-destructive/10 text-destructive",
  }
  return (
    <Badge className={`px-2.5 py-0.5 text-[10.5px] ${tones[tone]}`}>
      {label}
    </Badge>
  )
}

const consoleMetrics = [
  { value: "312", label: "releases this week" },
  { value: "97.9%", label: "success rate" },
  { value: "12 min", label: "median pipeline" },
  { value: "2", label: "open incidents" },
]

export function TablePage({
  product = "Balnibarbi",
  env = "production",
  heading = "Deployments",
  metrics = consoleMetrics,
  columns = ["Service", "Environment", "Status", "Duration", "Owner"],
  rows = deploys,
  status = "ready",
}: {
  product?: string
  env?: string
  heading?: string
  metrics?: { value: string; label: string }[]
  columns?: string[]
  rows?: DeployRow[]
  status?: "ready" | "loading" | "error" | "empty"
} = {}) {
  return (
    <div className="min-h-screen bg-secondary/40 px-6 py-10">
      <div className="mx-auto max-w-[1040px]">
        <BrowserFrame url={`app.${product.toLowerCase()}.com/${heading.toLowerCase()}`}>
          <div className="flex items-center justify-between gap-4 pb-5">
            <span className="font-display text-[16px] font-bold tracking-[-0.015em]">{product}</span>
            <div className="flex items-center gap-3">
              <Badge className="px-2.5 py-0.5 text-[10.5px]">{env}</Badge>
              <Button size="sm" className="h-8 rounded-md px-3 text-[12.5px]">
                New deploy
              </Button>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-3 border-b border-border pb-5 sm:grid-cols-4">
            {metrics.map((m) => (
              <div key={m.label}>
                <dd className="font-display text-[22px] font-bold leading-none tracking-[-0.02em] tabular-nums">
                  {m.value}
                </dd>
                <dt className="mt-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                  {m.label}
                </dt>
              </div>
            ))}
          </dl>
          <h2 className="pb-3 pt-5 font-display text-[18px] font-bold tracking-[-0.015em]">{heading}</h2>
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full min-w-[560px] text-[13px]">
              <thead className="bg-muted/60">
                <tr>
                  {columns.map((h, i) => (
                    <th
                      key={h}
                      className={`px-3.5 py-2.5 text-[11px] font-bold uppercase tracking-[0.08em] ${
                        i === columns.length - 1 ? "text-right" : "text-left"
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {status === "loading" &&
                  Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i} aria-label="Loading deployments">
                      <td colSpan={columns.length} className="px-3.5 py-3.5">
                        <div
                          className={`h-3.5 animate-pulse rounded bg-muted motion-reduce:animate-none ${
                            i % 2 === 0 ? "w-2/3" : "w-1/2"
                          }`}
                        />
                      </td>
                    </tr>
                  ))}
                {status === "error" && (
                  <tr>
                    <td colSpan={columns.length} className="px-3.5 py-10">
                      <div className="mx-auto max-w-sm text-center">
                        <h3 className="font-display text-[15px] font-bold">Couldn&rsquo;t load deployments</h3>
                        <p className="mt-2 text-[13px] text-muted-foreground">
                          The list is stale, not lost. The last verified release is still live.
                        </p>
                        <Button size="sm" variant="outline" className="mt-4">
                          Retry
                        </Button>
                      </div>
                    </td>
                  </tr>
                )}
                {status === "empty" && (
                  <tr>
                    <td colSpan={columns.length} className="px-3.5 py-10">
                      <div className="mx-auto max-w-sm text-center">
                        <h3 className="font-display text-[15px] font-bold">No deployments yet</h3>
                        <p className="mt-2 text-[13px] text-muted-foreground">
                          Connect a repository and your first pipeline lands here with live status.
                        </p>
                        <Button size="sm" className="mt-4">
                          Connect repository
                        </Button>
                      </div>
                    </td>
                  </tr>
                )}
                {status === "ready" && rows.length === 0 && (
                  <tr>
                    <td colSpan={columns.length} className="px-3.5 py-10">
                      <div className="mx-auto max-w-sm text-center">
                        <h3 className="font-display text-[15px] font-bold">Nothing deployed to {env}</h3>
                        <p className="mt-2 text-[13px] text-muted-foreground">
                          Promote a build from staging to see it listed here.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
                {status === "ready" &&
                  rows.map((d) => (
                    <tr key={d.service} className="transition-colors hover:bg-secondary/60">
                      <td className="px-3.5 py-3 font-medium">{d.service}</td>
                      <td className="px-3.5 py-3 text-muted-foreground">{d.env}</td>
                      <td className="px-3.5 py-3">
                        <StatPill label={d.status} tone={d.tone} />
                      </td>
                      <td className="px-3.5 py-3 tabular-nums text-muted-foreground">{d.duration}</td>
                      <td className="px-3.5 py-3 text-right font-mono text-[12px] text-muted-foreground">{d.owner}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </BrowserFrame>
      </div>
    </div>
  )
}
