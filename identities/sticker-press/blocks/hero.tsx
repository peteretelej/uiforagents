import type { ReactNode } from "react"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

/* The retro window card is an identity signature: every hero and feature row
   seats its visual inside this titlebar-chunked window, never a bare image. */
export function WindowFrame({
  title = "ballyhoo.app/launch-day",
  children,
}: {
  title?: string
  children: ReactNode
}) {
  return (
    <figure className="border-2 border-border bg-card shadow-[var(--shadow-hero)]">
      <div className="flex items-center gap-2 border-b-2 border-border bg-foreground px-4 py-2.5">
        <span className="size-3 border-2 border-background" aria-hidden />
        <span className="size-3 border-2 border-background" aria-hidden />
        <span className="size-3 border-2 border-background" aria-hidden />
        <span className="ml-2 font-mono text-[12px] uppercase tracking-[0.06em] text-background">{title}</span>
      </div>
      <div className="bg-card p-5 sm:p-6">{children}</div>
    </figure>
  )
}

const STAR_BURST =
  "polygon(50% 0%, 59% 13%, 74% 6%, 77% 22%, 93% 21%, 90% 37%, 100% 46%, 90% 57%, 96% 72%, 80% 74%, 79% 91%, 64% 86%, 54% 100%, 42% 89%, 28% 97%, 25% 81%, 9% 81%, 13% 66%, 0% 58%, 11% 47%, 3% 33%, 19% 31%, 20% 14%, 36% 19%)"

/* Starburst "NEW" seal: the attention sticker. Two layered clip-path stars
   fake the ink border (clip-path clips borders). Seal text is a Space Mono
   label - Archivo never appears below 2rem. */
export function StarburstSeal({
  label = "NEW",
  tone = "var(--primary)",
  className = "",
}: {
  label?: string
  tone?: string
  className?: string
}) {
  return (
    <div
      aria-hidden
      className={`relative size-24 ${className}`}
      style={{ clipPath: STAR_BURST, background: "var(--border)" }}
    >
      <div
        className="absolute inset-[3px] grid place-items-center"
        style={{ clipPath: STAR_BURST, background: tone }}
      >
        <span className="font-mono text-[12px] font-bold uppercase tracking-[0.08em] text-primary-foreground">
          {label}
        </span>
      </div>
    </div>
  )
}

/* Launch console mock - the default window content. Static, generic; adapt
   per project. Status pills ride the soft tones (ok green / warn sky). */
function LaunchShot() {
  const tasks = [
    { task: "Press page", status: "Live", pill: "bg-ok-soft text-ok-foreground" },
    { task: "Email blast", status: "Scheduled 09:00", pill: "bg-warn-soft text-warn-foreground" },
    { task: "Changelog post", status: "Draft", pill: "bg-secondary text-foreground" },
  ] as const
  return (
    <div aria-hidden className="text-[13px]">
      <div className="flex items-center justify-between border-b-2 border-border pb-3">
        <span className="font-display text-[2rem] leading-none">10:24</span>
        <span className="mono-label text-[11px] text-muted-foreground">until launch</span>
      </div>
      <ul className="divide-y-2 divide-border">
        {tasks.map((t) => (
          <li key={t.task} className="flex items-center justify-between gap-3 py-2.5">
            <span className="font-bold">{t.task}</span>
            <span className={`border-2 border-border px-2 py-0.5 font-mono text-[10.5px] font-bold uppercase ${t.pill}`}>
              {t.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const defaultStats = [
  { value: "12,408", label: "makers on the list" },
  { value: "48h", label: "median to first launch" },
  { value: "1-click", label: "page publish" },
  { value: "9", label: "press templates" },
]

/* Launch figures read in Space Mono; loading renders skeletons so async data
   never pops the layout. */
export function MetricsStrip({
  stats = defaultStats,
  loading = false,
}: {
  stats?: { value: string; label: string }[]
  loading?: boolean
}) {
  return (
    <dl className="grid grid-cols-2 gap-x-8 gap-y-6 border-t-2 border-border pt-8 sm:grid-cols-4">
      {loading
        ? Array.from({ length: 4 }).map((_, i) => (
            <div key={i} aria-label="Loading launch stats">
              <div className="h-8 w-24 animate-pulse bg-muted motion-reduce:animate-none" />
              <div className="mt-2 h-3.5 w-28 animate-pulse bg-muted motion-reduce:animate-none" />
            </div>
          ))
        : stats.map((s) => (
            <div key={s.label}>
              <dd className="font-mono text-[24px] font-bold leading-none tabular-nums">{s.value}</dd>
              <dt className="mono-label mt-1.5 text-[11px] text-muted-foreground">{s.label}</dt>
            </div>
          ))}
    </dl>
  )
}

const defaultLogos = ["Papercup", "Motofold", "Kettleworks", "Sundial Club", "Brickfield", "Loop & Sons"]

export function LogoCloud({
  logos = defaultLogos,
  loading = false,
}: {
  logos?: string[]
  loading?: boolean
}) {
  return (
    <section aria-label="Makers launching with us" className="px-6 py-12">
      <p className="mono-label text-center text-[11px] text-muted-foreground">
        Launch weeks in progress at
      </p>
      {loading ? (
        <div className="mt-6 flex flex-wrap justify-center gap-4" aria-label="Loading makers">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-9 w-28 animate-pulse bg-muted motion-reduce:animate-none" />
          ))}
        </div>
      ) : logos.length === 0 ? (
        <p className="mt-6 text-center text-[14px] text-muted-foreground">
          Maker chips appear here once launches are scheduled.
        </p>
      ) : (
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-4">
          {logos.map((name) => (
            <li
              key={name}
              className="border-2 border-border bg-card px-4 py-2 font-mono text-[12px] font-bold uppercase tracking-[0.06em] shadow-[var(--shadow-chip)]"
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

/* The playful hero: ALL-CAPS Archivo display, the canonical button pair
   (yellow-filled + white-outline, both hard-shadowed), the starburst seal
   overlapping the window, and exactly one sticker-helper moment (coral). */
export function Hero({
  eyebrow = "Ballyhoo 1.0 is out",
  title = "Make launch day the loudest day",
  description = "Ballyhoo turns your release into a page people screenshot: announcements, countdowns, and a changelog your first users actually read.",
  primaryCta = "Start your launch",
  secondaryCta = "See a live page",
  trustNote = "Free while in beta · No credit card",
  sticker = "V1.0",
  statsLoading = false,
  shot,
}: {
  eyebrow?: string
  title?: string
  description?: string
  primaryCta?: string
  secondaryCta?: string
  trustNote?: string
  sticker?: string
  statsLoading?: boolean
  shot?: ReactNode
}) {
  return (
    <section className="grid grid-cols-1 items-center gap-12 px-6 pb-16 pt-12 lg:grid-cols-[1.02fr_0.98fr] lg:pb-24 lg:pt-16">
      <div>
        <p className="mono-label text-[12px] font-bold">{eyebrow}</p>
        <h1 className="mt-4 font-display text-[clamp(2.75rem,6vw,4.5rem)]">{title}</h1>
        <p className="mt-5 max-w-[50ch] text-[17px] leading-relaxed text-muted-foreground">{description}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button size="lg" className="h-[52px] px-7 text-[15px]">
            {primaryCta} <ArrowRight className="ml-1.5 size-4" />
          </Button>
          {secondaryCta && (
            <Button size="lg" variant="outline" className="h-[52px] bg-card px-7 text-[15px]">
              {secondaryCta}
            </Button>
          )}
        </div>
        <p className="mono-label mt-4 text-[11px] text-muted-foreground">{trustNote}</p>
        <div className="mt-10 max-w-[560px]">
          <MetricsStrip loading={statsLoading} />
        </div>
      </div>
      <div className="relative">
        <StarburstSeal className="absolute -top-8 -right-4 z-10 rotate-6 sm:-right-6" />
        {sticker && (
          <Badge className="absolute -bottom-3 -left-3 z-10 -rotate-3 bg-[var(--sticker-coral)] px-3 py-1 text-[11px] text-primary-foreground">
            {sticker}
          </Badge>
        )}
        {shot ?? (
          <WindowFrame>
            <LaunchShot />
          </WindowFrame>
        )}
      </div>
    </section>
  )
}
