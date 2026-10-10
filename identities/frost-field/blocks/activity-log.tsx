import { RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StatBadge } from "./dashboard-shell"

/* The activity log: the practice history as airy dated rows. List
   semantics, never a table - the brief's density cap bans ledgers. One
   row, one moment; 20px+ row padding; the full data grammar (loading,
   error, empty, no results) is required. */

type LogEntry = {
  date: string
  activity: string
  note: string
  kind: string
  tone: "muted" | "ok" | "warn"
  duration: string
}

const entries: LogEntry[] = [
  { date: "Oct 12", activity: "Sleep Reset, night 6", note: "Wind-down body scan", kind: "Sleep", tone: "muted", duration: "14 min" },
  { date: "Oct 11", activity: "Morning Calm, week 2", note: "Box breathing + intention", kind: "Breathwork", tone: "ok", duration: "12 min" },
  { date: "Oct 10", activity: "Evening walk", note: "Park loop, easy pace", kind: "Movement", tone: "ok", duration: "26 min" },
  { date: "Oct 9", activity: "Breathwork Basics, lesson 2", note: "Paused halfway", kind: "Breathwork", tone: "warn", duration: "5 min" },
  { date: "Oct 8", activity: "Sleep Reset, night 5", note: "Fell asleep before the end", kind: "Sleep", tone: "ok", duration: "18 min" },
]

export function ActivityLog({
  title = "Activity log",
  description = "Your practice, most recent first.",
  items = entries,
  status = "ready",
  onRetry,
}: {
  title?: string
  description?: string
  items?: LogEntry[]
  status?: "ready" | "loading" | "error" | "empty"
  onRetry?: () => void
} = {}) {
  return (
    <Card>
      <CardContent className="px-6 py-6 sm:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-[18px] font-bold tracking-[-0.01em]">{title}</h2>
          <p className="text-[12.5px] text-muted-foreground">{description}</p>
        </div>

        {status === "loading" && (
          <ol className="mt-5 space-y-4" aria-label="Loading activity">
            {Array.from({ length: 4 }).map((_, i) => (
              <li key={i} className="flex items-center gap-4">
                <div className="h-3 w-12 animate-pulse rounded-full bg-muted motion-reduce:animate-none" />
                <div className={`h-3.5 animate-pulse rounded-full bg-muted motion-reduce:animate-none ${i % 2 === 0 ? "w-1/2" : "w-1/3"}`} />
                <div className="ml-auto h-5 w-16 animate-pulse rounded-full bg-muted motion-reduce:animate-none" />
              </li>
            ))}
          </ol>
        )}

        {status === "error" && (
          <div className="py-10 text-center">
            <h3 className="font-display text-[15px] font-bold">The log didn&rsquo;t load</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              Your history is saved on the server. Nothing was lost.
            </p>
            <Button size="sm" variant="outline" className="mt-4" onClick={onRetry}>
              <RotateCw className="mr-1.5 size-3.5" /> Try again
            </Button>
          </div>
        )}

        {status === "empty" && (
          <div className="py-10 text-center">
            <h3 className="font-display text-[15px] font-bold">No activity yet</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              Finish a session and it lands here with its length and mood.
            </p>
            <Button size="sm" className="mt-4">
              Start a session
            </Button>
          </div>
        )}

        {status === "ready" && items.length === 0 && (
          <div className="py-10 text-center">
            <h3 className="font-display text-[15px] font-bold">No sessions match your filters</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              Try widening the dates or clearing a kind.
            </p>
            <Button size="sm" variant="ghost" className="mt-4">
              Clear filters
            </Button>
          </div>
        )}

        {status === "ready" && items.length > 0 && (
          <ol className="mt-5 divide-y divide-border/50">
            {items.map((e) => (
              <li key={`${e.date}-${e.activity}`} className="flex flex-wrap items-center gap-x-4 gap-y-1.5 py-4 first:pt-1 last:pb-0">
                <span className="w-12 shrink-0 text-[12.5px] text-muted-foreground tabular-nums">{e.date}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14.5px] font-medium">{e.activity}</span>
                  <span className="block truncate text-[12.5px] text-muted-foreground">{e.note}</span>
                </span>
                <StatBadge label={e.kind} tone={e.tone} />
                <span className="w-16 shrink-0 text-right text-[13px] font-semibold text-foreground/80 tabular-nums">
                  {e.duration}
                </span>
              </li>
            ))}
          </ol>
        )}
      </CardContent>
    </Card>
  )
}

/* The standalone empty card for log surfaces embedded in other views. */
export function LogEmpty() {
  return (
    <Card className="mx-auto max-w-md py-10">
      <CardContent className="px-10 text-center">
        <h3 className="font-display text-[16px] font-bold">No activity yet</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
          Finish a session and it lands here with its length and mood.
        </p>
        <Button size="sm" className="mt-4">
          Start a session
        </Button>
      </CardContent>
    </Card>
  )
}
