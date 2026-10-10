import type { ReactNode } from "react"
import { Flame, RotateCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

/* The wellness dashboard: floating glass chrome over the field, KPI tiles
   with large numerals, a mood check-in, a streak grid, and program cards.
   One idea per card, 20px+ padding, no dense data anywhere. */

export function DashboardShell({
  title,
  nav,
  actions,
  stats,
  status = "ready",
  onRetry,
  children,
}: {
  title: string
  nav: { label: string; active?: boolean }[]
  actions?: ReactNode
  stats: { value: string; label: string }[]
  status?: "ready" | "loading" | "error"
  onRetry?: () => void
  children: ReactNode
}) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-4 z-40 mx-auto max-w-[1120px] px-4 sm:px-6">
        <div className="glass-strong flex h-[60px] items-center gap-4 rounded-[20px] px-5">
          <span className="min-w-0 truncate font-display text-[19px] font-bold tracking-[-0.01em]">
            {title}
          </span>
          <nav className="ml-auto flex shrink-0 items-center gap-4 sm:gap-6">
            {nav.map((n) => (
              <a
                key={n.label}
                href="#"
                className={`text-sm transition-colors ${
                  n.active ? "font-semibold text-foreground" : "font-medium text-muted-foreground hover:text-primary"
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>
          {actions && <div className="flex shrink-0 items-center gap-3">{actions}</div>}
        </div>
      </header>

      <main className="mx-auto max-w-[1120px] px-6 py-10">
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {status === "loading" &&
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="py-5">
                <CardContent className="px-5" aria-label="Loading today's stats">
                  <div className="h-8 w-16 animate-pulse rounded-lg bg-muted motion-reduce:animate-none" />
                  <div className="mt-2 h-3 w-20 animate-pulse rounded bg-muted motion-reduce:animate-none" />
                </CardContent>
              </Card>
            ))}
          {status === "error" && (
            <Card className="col-span-2 py-8 lg:col-span-4">
              <CardContent className="px-6 text-center">
                <h3 className="font-display text-[16px] font-bold">Today&rsquo;s stats didn&rsquo;t load</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                  Your history is safe. Nothing was lost.
                </p>
                <Button size="sm" variant="outline" className="mt-4" onClick={onRetry}>
                  <RotateCw className="mr-1.5 size-3.5" /> Try again
                </Button>
              </CardContent>
            </Card>
          )}
          {status === "ready" &&
            stats.map((s) => (
              <Card key={s.label} className="py-5">
                <CardContent className="px-5">
                  <b className="font-display text-[32px] font-bold leading-none tracking-[-0.02em] tabular-nums">
                    {s.value}
                  </b>
                  <span className="mt-2 block text-[11.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    {s.label}
                  </span>
                </CardContent>
              </Card>
            ))}
        </div>
        {children}
      </main>
    </div>
  )
}

/* Status pill for sessions and check-ins; soft fills only, pills only. */
export function StatBadge({ label, tone = "muted" }: { label: string; tone?: "muted" | "ok" | "warn" | "danger" }) {
  const tones = {
    muted: "bg-secondary text-secondary-foreground",
    ok: "bg-ok-soft text-ok-foreground",
    warn: "bg-warn-soft text-warn-foreground",
    danger: "bg-destructive/10 text-destructive",
  }
  return <Badge className={`px-2.5 py-0.5 text-[11px] ${tones[tone]}`}>{label}</Badge>
}

const moods = [
  { value: 1, label: "Rough", face: "•︵•" },
  { value: 2, label: "Low", face: "•_•" },
  { value: 3, label: "Okay", face: "•‿•" },
  { value: 4, label: "Good", face: "ᵔ‿ᵔ" },
  { value: 5, label: "Great", face: "ᵔᴥᵔ" },
]

/* The daily mood check-in: five faces, one tap. The selected face gets the
   action violet; everything else stays glass. */
export function MoodCheckin({
  value = 4,
  onSelect,
  status = "ready",
  onRetry,
}: {
  value?: number
  onSelect?: (value: number) => void
  status?: "ready" | "loading" | "error"
  onRetry?: () => void
} = {}) {
  return (
    <Card>
      <CardHeader className="px-6 pt-6">
        <CardTitle className="font-display text-[17px] font-bold tracking-[-0.01em]">How are you feeling?</CardTitle>
        <CardDescription className="text-[13px]">One tap. You can change it later.</CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        {status === "loading" && (
          <div className="flex gap-2" aria-label="Loading today's check-in">
            {moods.map((m) => (
              <div key={m.value} className="h-10 flex-1 animate-pulse rounded-full bg-muted motion-reduce:animate-none" />
            ))}
          </div>
        )}
        {status === "error" && (
          <div className="text-center">
            <p className="text-[13px] text-muted-foreground">Couldn&rsquo;t reach today&rsquo;s check-in. Nothing was lost.</p>
            <Button size="sm" variant="outline" className="mt-3" onClick={onRetry}>
              <RotateCw className="mr-1.5 size-3.5" /> Try again
            </Button>
          </div>
        )}
        {status === "ready" && (
          <div className="flex flex-wrap gap-2" role="group" aria-label="Mood check-in">
            {moods.map((m) => (
              <button
                key={m.value}
                type="button"
                onClick={() => onSelect?.(m.value)}
                aria-pressed={value === m.value}
                className={`h-10 flex-1 rounded-full px-4 text-[13px] font-semibold transition-all ${
                  value === m.value
                    ? "bg-primary text-primary-foreground shadow-[0_4px_14px_rgba(106,90,224,0.35)]"
                    : "glass hover:-translate-y-px"
                }`}
              >
                <span className="mr-1.5 opacity-80">{m.face}</span>
                {m.label}
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

/* The streak grid: the last two weeks as soft dots. Done days fill mint,
   today gets the violet ring, missed days stay quiet glass. */
export function StreakGrid({
  days = [
    { label: "Sep 29", done: true },
    { label: "Sep 30", done: true },
    { label: "Oct 1", done: true },
    { label: "Oct 2", done: false },
    { label: "Oct 3", done: true },
    { label: "Oct 4", done: true },
    { label: "Oct 5", done: true },
    { label: "Oct 6", done: true },
    { label: "Oct 7", done: false },
    { label: "Oct 8", done: true },
    { label: "Oct 9", done: true },
    { label: "Oct 10", done: true },
    { label: "Oct 11", done: true },
    { label: "Oct 12", done: false, today: true },
  ],
  streakLabel = "9-day streak",
  status = "ready",
  onRetry,
}: {
  days?: { label: string; done?: boolean; today?: boolean }[]
  streakLabel?: string
  status?: "ready" | "loading" | "error"
  onRetry?: () => void
} = {}) {
  return (
    <Card>
      <CardHeader className="px-6 pt-6">
        <CardTitle className="flex items-center gap-2 font-display text-[17px] font-bold tracking-[-0.01em]">
          <Flame className="size-4 text-viz-violet" aria-hidden />
          {streakLabel}
        </CardTitle>
        <CardDescription className="text-[13px]">Last 14 days</CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        {status === "loading" && (
          <div className="grid grid-cols-7 gap-2" aria-label="Loading streak">
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} className="aspect-square animate-pulse rounded-full bg-muted motion-reduce:animate-none" />
            ))}
          </div>
        )}
        {status === "error" && (
          <div className="text-center">
            <p className="text-[13px] text-muted-foreground">Couldn&rsquo;t load your streak. It&rsquo;s counted and safe.</p>
            <Button size="sm" variant="outline" className="mt-3" onClick={onRetry}>
              <RotateCw className="mr-1.5 size-3.5" /> Try again
            </Button>
          </div>
        )}
        {status === "ready" &&
          (days.length === 0 ? (
            <div className="py-4 text-center">
              <h3 className="font-display text-[15px] font-bold">No check-ins yet</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                Log today&rsquo;s mood and your streak starts now.
              </p>
            </div>
          ) : (
            <ol className="grid grid-cols-7 gap-2">
              {days.map((d) => (
                <li key={d.label} className="flex flex-col items-center gap-1.5">
                  <span
                    aria-label={`${d.label}${d.done ? ", done" : d.today ? ", today" : ", missed"}`}
                    className={`size-8 rounded-full transition-colors ${
                      d.today
                        ? "border-2 border-primary bg-white/60"
                        : d.done
                          ? "bg-viz-mint"
                          : "glass"
                    }`}
                  />
                  <span className="text-[10px] text-muted-foreground tabular-nums">{d.label.replace(/^Oct /, "")}</span>
                </li>
              ))}
            </ol>
          ))}
      </CardContent>
    </Card>
  )
}

type Program = {
  name: string
  coach: string
  sessionsDone: number
  sessionsTotal: number
  next: string
}

const programs: Program[] = [
  { name: "Sleep Reset", coach: "Maren O.", sessionsDone: 6, sessionsTotal: 10, next: "Tonight, 9:30 PM" },
  { name: "Morning Calm", coach: "Ito T.", sessionsDone: 4, sessionsTotal: 8, next: "Tomorrow, 7:00 AM" },
  { name: "Breathwork Basics", coach: "Adeyemi K.", sessionsDone: 2, sessionsTotal: 6, next: "Thu, 6:15 PM" },
]

/* Program cards: one program per card, thin violet progress, next session
   up front. The full data grammar - empty, loading, error - is required. */
export function ProgramCards({
  heading = "Your programs",
  items = programs,
  status = "ready",
  onRetry,
}: {
  heading?: string
  items?: Program[]
  status?: "ready" | "loading" | "error" | "empty"
  onRetry?: () => void
} = {}) {
  return (
    <section>
      <h2 className="mb-4 font-display text-[22px] font-bold tracking-[-0.01em]">{heading}</h2>
      {status === "loading" && (
        <div className="grid gap-4 md:grid-cols-3" aria-label="Loading programs">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="space-y-3 px-6 py-6">
                <div className="h-4 w-2/3 animate-pulse rounded bg-muted motion-reduce:animate-none" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-muted motion-reduce:animate-none" />
                <div className="h-1.5 w-full animate-pulse rounded-full bg-muted motion-reduce:animate-none" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {status === "error" && (
        <Card className="py-10">
          <CardContent className="px-8 text-center">
            <h3 className="font-display text-[16px] font-bold">Programs didn&rsquo;t load</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              Your progress is saved. Nothing was lost.
            </p>
            <Button size="sm" variant="outline" className="mt-4" onClick={onRetry}>
              <RotateCw className="mr-1.5 size-3.5" /> Try again
            </Button>
          </CardContent>
        </Card>
      )}
      {status === "empty" && (
        <Card className="py-10">
          <CardContent className="px-8 text-center">
            <h3 className="font-display text-[16px] font-bold">No programs yet</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              Pick a program and it will track itself here.
            </p>
            <Button size="sm" className="mt-4">
              Browse programs
            </Button>
          </CardContent>
        </Card>
      )}
      {status === "ready" && (
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((p) => (
            <a key={p.name} href="#" className="hover-lift block">
              <Card className="h-full">
                <CardContent className="px-6 py-6">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-display text-[16px] font-bold tracking-[-0.01em]">{p.name}</h3>
                    <span className="shrink-0 text-[12px] text-muted-foreground tabular-nums">
                      {p.sessionsDone}/{p.sessionsTotal}
                    </span>
                  </div>
                  <p className="mt-1 text-[12.5px] text-muted-foreground">with {p.coach}</p>
                  <div
                    role="progressbar"
                    aria-valuenow={p.sessionsDone}
                    aria-valuemin={0}
                    aria-valuemax={p.sessionsTotal}
                    aria-label={`${p.name} progress`}
                    className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/50"
                  >
                    <div
                      className="h-full rounded-full bg-primary/80"
                      style={{ width: `${Math.round((p.sessionsDone / p.sessionsTotal) * 100)}%` }}
                    />
                  </div>
                  <p className="mt-3 text-[12.5px] font-medium text-foreground/80">Next: {p.next}</p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      )}
    </section>
  )
}
