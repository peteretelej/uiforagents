import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { WindowFrame } from "./hero"

/* The launch-console table page: this identity's table surface seats inside
   the retro window (the same signature motif as the hero), with the full
   data grammar - loading skeletons, error with retry, and the empty state
   composed in the identity's voice. */

type LaunchRow = {
  product: string
  maker: string
  status: string
  tone: "ok" | "warn" | "danger" | "muted"
  pageviews: string
  date: string
}

const launches: LaunchRow[] = [
  { product: "papercup", maker: "rosa", status: "Live", tone: "ok", pageviews: "18,204", date: "Oct 6" },
  { product: "motofold", maker: "ken", status: "Scheduled 09:00", tone: "warn", pageviews: "—", date: "Oct 8" },
  { product: "kettleworks", maker: "ada", status: "Live", tone: "ok", pageviews: "9,441", date: "Oct 3" },
  { product: "brickfield", maker: "sam", status: "Failed dns", tone: "danger", pageviews: "312", date: "Oct 1" },
]

export function StatPill({ label, tone = "muted" }: { label: string; tone?: "ok" | "warn" | "danger" | "muted" }) {
  // Soft fills are the status voice; the 2px ink border + chip shadow come
  // from the overrides layer and stay on every pill.
  const tones = {
    muted: "bg-secondary text-foreground",
    ok: "bg-ok-soft text-ok-foreground",
    warn: "bg-warn-soft text-warn-foreground",
    danger: "bg-[var(--danger-soft)] text-[var(--danger-text)]",
  }
  return (
    <Badge className={`px-2 py-0.5 text-[10.5px] ${tones[tone]}`}>{label}</Badge>
  )
}

const consoleMetrics = [
  { value: "27", label: "launches this week" },
  { value: "18,204", label: "best launch day" },
  { value: "09:00", label: "next countdown" },
  { value: "1", label: "dns flare-ups" },
]

export function TablePage({
  product = "Ballyhoo",
  heading = "Launches",
  metrics = consoleMetrics,
  columns = ["Product", "Maker", "Status", "Pageviews", "Date"],
  rows = launches,
  status = "ready",
}: {
  product?: string
  heading?: string
  metrics?: { value: string; label: string }[]
  columns?: string[]
  rows?: LaunchRow[]
  status?: "ready" | "loading" | "error" | "empty"
} = {}) {
  return (
    <div className="min-h-screen bg-secondary px-6 py-10">
      <div className="mx-auto max-w-[1040px]">
        <WindowFrame title={`${product.toLowerCase()}.app/${heading.toLowerCase()}`}>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5">
            <span className="font-display text-[2rem] leading-none">{product}</span>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-card px-2 py-0.5 text-[10.5px]">
                Console
              </Badge>
              <Button size="sm" className="h-9 px-3 text-[12.5px]">
                New launch
              </Button>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-3 border-y-2 border-border py-5 sm:grid-cols-4">
            {metrics.map((m) => (
              <div key={m.label}>
                <dd className="font-mono text-[22px] font-bold leading-none tabular-nums">{m.value}</dd>
                <dt className="mono-label mt-1 text-[10.5px] text-muted-foreground">{m.label}</dt>
              </div>
            ))}
          </dl>
          <h2 className="pb-3 pt-5 font-display text-[2rem] leading-none">{heading}</h2>
          <div className="overflow-x-auto border-2 border-border bg-card">
            <table className="w-full min-w-[560px] text-[13px]">
              <thead className="bg-secondary">
                <tr>
                  {columns.map((h, i) => (
                    <th
                      key={h}
                      className={`border-b-2 border-border px-3.5 py-2.5 ${
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
                    <tr key={i} aria-label="Loading launches">
                      <td colSpan={columns.length} className="px-3.5 py-3.5">
                        <div
                          className={`h-3.5 animate-pulse bg-muted motion-reduce:animate-none ${
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
                        <h3 className="font-display text-[2rem] leading-none">COULDN&rsquo;T LOAD LAUNCHES</h3>
                        <p className="mt-3 text-[13px] text-muted-foreground">
                          The list is stale, not lost. Live pages are still up.
                        </p>
                        <Button size="sm" variant="outline" className="mt-4 bg-card">
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
                        <h3 className="font-display text-[2rem] leading-none">NO LAUNCHES YET</h3>
                        <p className="mt-3 text-[13px] text-muted-foreground">
                          Start your first launch and it lands here with live status.
                        </p>
                        <Button size="sm" className="mt-4">
                          Start a launch
                        </Button>
                      </div>
                    </td>
                  </tr>
                )}
                {status === "ready" && rows.length === 0 && (
                  <tr>
                    <td colSpan={columns.length} className="px-3.5 py-10">
                      <div className="mx-auto max-w-sm text-center">
                        <h3 className="font-display text-[2rem] leading-none">NOTHING SCHEDULED</h3>
                        <p className="mt-3 text-[13px] text-muted-foreground">
                          Queue a launch to see it listed here.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
                {status === "ready" &&
                  rows.map((d) => (
                    <tr key={d.product} className="border-b-2 border-border last:border-b-0 transition-colors hover:bg-secondary/60">
                      <td className="px-3.5 py-3 font-bold">{d.product}</td>
                      <td className="px-3.5 py-3 font-mono text-[12px] text-muted-foreground">{d.maker}</td>
                      <td className="px-3.5 py-3">
                        <StatPill label={d.status} tone={d.tone} />
                      </td>
                      <td className="px-3.5 py-3 text-right font-mono text-[12px] tabular-nums text-muted-foreground">
                        {d.pageviews}
                      </td>
                      <td className="px-3.5 py-3 text-right font-mono text-[12px] text-muted-foreground">{d.date}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </WindowFrame>
      </div>
    </div>
  )
}
