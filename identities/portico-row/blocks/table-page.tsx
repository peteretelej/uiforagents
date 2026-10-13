import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ComplianceFooter } from "./landing-shell"

/* The substance feed: selected matters and deals as numbered rows with
   figure and date (the record the firm is judged by), the compliance
   footnote under the table, and the full data grammar - loading skeletons,
   error with retry, empty, and no-results. */

type MatterRow = {
  matter: string
  practice: string
  figure: string
  date: string
}

const matters: MatterRow[] = [
  { matter: "Sale of a regional logistics group", practice: "Mergers & acquisitions", figure: "$214M", date: "Mar 2026" },
  { matter: "Series C financing, medical-device company", practice: "Capital & governance", figure: "$86M", date: "Jan 2026" },
  { matter: "Commercial dispute, settled before filing", practice: "Litigation", figure: "$18M", date: "Nov 2025" },
  { matter: "Family-business succession and reorganization", practice: "Succession & estates", figure: "$140M enterprise", date: "Sep 2025" },
  { matter: "Headquarters lease portfolio renegotiation", practice: "Real estate", figure: "62,000 sq ft", date: "Jun 2025" },
]

export function StatPill({ label }: { label: string }) {
  return (
    <Badge className="px-2 py-0.5 text-[12px]">{label}</Badge>
  )
}

export function TablePage({
  brand = "Jarndyce & Jarndyce",
  eyebrow = "Selected matters",
  heading = "Deals & results",
  columns = ["No.", "Matter", "Practice", "Figure", "Date"],
  rows = matters,
  status = "ready",
  onRetry,
}: {
  brand?: string
  eyebrow?: string
  heading?: string
  columns?: string[]
  rows?: MatterRow[]
  status?: "ready" | "loading" | "error" | "empty"
  onRetry?: () => void
} = {}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="mx-auto w-full max-w-[1040px] flex-1 px-6 py-20 lg:py-24">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 text-[clamp(28px,3.4vw,40px)]">{heading}</h1>
        <p className="mt-4 max-w-[62ch] text-[19px] leading-[1.65] text-muted-foreground">
          {rows.length} recent matters of record, most recent first.
        </p>
        <div className="mt-10 overflow-x-auto border border-border bg-card">
          <table className="w-full min-w-[640px] text-[16px]">
            <thead>
              <tr>
                {columns.map((h, i) => (
                  <th
                    key={h}
                    className={`border-b border-border px-4 py-3 text-left ${
                      i >= columns.length - 2 ? "text-right" : ""
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {status === "loading" &&
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} aria-label="Loading matters">
                    <td colSpan={columns.length} className="px-4 py-4">
                      <div
                        className={`h-4 animate-pulse bg-muted motion-reduce:animate-none ${
                          i % 2 === 0 ? "w-2/3" : "w-1/2"
                        }`}
                      />
                    </td>
                  </tr>
                ))}
              {status === "error" && (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-12">
                    <div className="mx-auto max-w-md text-center">
                      <h2 className="text-[19px]">Couldn&rsquo;t load the record</h2>
                      <p className="mt-2 text-[16px] leading-relaxed text-muted-foreground">
                        The list is stale, not lost. Nothing you did caused this.
                      </p>
                      <Button size="sm" variant="outline" className="mt-5 h-11 px-5" onClick={onRetry}>
                        Retry
                      </Button>
                    </div>
                  </td>
                </tr>
              )}
              {status === "empty" && (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-12">
                    <div className="mx-auto max-w-md text-center">
                      <h2 className="text-[19px]">No matters published yet</h2>
                      <p className="mt-2 text-[16px] leading-relaxed text-muted-foreground">
                        Matters of record appear here as they close.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
              {status === "ready" &&
                rows.map((r, i) => (
                  <tr key={r.matter} className="border-b border-border last:border-b-0">
                    <td className="px-4 py-4 font-display tabular-nums text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </td>
                    <td className="px-4 py-4 font-medium">{r.matter}</td>
                    <td className="px-4 py-4">
                      <StatPill label={r.practice} />
                    </td>
                    <td className="px-4 py-4 text-right font-display tabular-nums">{r.figure}</td>
                    <td className="px-4 py-4 text-right text-muted-foreground tabular-nums">{r.date}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <Card className="mt-6 py-0">
          <CardContent className="px-5 py-4">
            <p className="max-w-[72ch] text-[14px] leading-relaxed text-muted-foreground">
              Figures are matters of record for a fictional sample firm. Prior results do not
              guarantee a similar outcome.
            </p>
          </CardContent>
        </Card>
      </main>
      <ComplianceFooter brand={brand} />
    </div>
  )
}
