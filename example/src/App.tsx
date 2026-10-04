import { useState } from "react"
import { Hero } from "@identity/blocks/hero"
import { DashboardShell, StatBadge } from "@identity/blocks/dashboard-shell"
import { Article, Callout, Kpi } from "@identity/blocks/article"

const IDENTITIES = [
  { slug: "ocean-calm", label: "ocean-calm" },
  { slug: "nairobi-noon", label: "nairobi-noon" },
  { slug: "graphite-terminal", label: "graphite-terminal" },
]

const jobs = [
  { code: "TS-4U31", trade: "Plumbing", customer: "Wanjiku M.", zone: "Kilimani", status: "En route", tone: "muted", price: "KSh 2,310" },
  { code: "TS-9KQ2", trade: "Electrical", customer: "Otieno M.", zone: "Westlands", status: "Working", tone: "warn", price: "KSh 3,400" },
  { code: "TS-B2X7", trade: "HVAC", customer: "Njeri F.", zone: "Upperhill", status: "Awaiting payment", tone: "warn", price: "KSh 5,200" },
  { code: "TS-Q8M1", trade: "ICT", customer: "Kamau P.", zone: "Karen", status: "Paid", tone: "ok", price: "KSh 1,850" },
]

export default function App({ identity }: { identity: string }) {
  const [view, setView] = useState<"landing" | "dashboard" | "article">("landing")

  const switchIdentity = (slug: string) => {
    localStorage.setItem("uifa-identity", slug)
    const url = new URL(location.href)
    url.searchParams.set("identity", slug)
    location.href = url.toString()
  }

  return (
    <div data-identity={identity} className="min-h-screen bg-background text-foreground">
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs shadow-[var(--shadow-identity)]">
        <span className="size-2 rounded-full bg-primary" />
        <span className="font-medium">identity:</span>
        <span className="font-display font-bold text-primary">{identity}</span>
        <span className="mx-1 text-muted-foreground">|</span>
        {(["landing", "dashboard", "article"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`rounded-full px-2.5 py-0.5 font-semibold transition-colors ${
              view === v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {v}
          </button>
        ))}
        <span className="mx-1 text-muted-foreground">|</span>
        {IDENTITIES.map((i) => (
          <button
            key={i.slug}
            onClick={() => switchIdentity(i.slug)}
            className={`rounded-full px-2.5 py-0.5 transition-colors ${
              identity === i.slug ? "font-bold text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {i.label}
          </button>
        ))}
      </div>

      {view === "landing" && (
        <>
          <div className="mx-auto max-w-[1120px]">
            <header className="flex h-[60px] items-center">
              <span className="flex items-center gap-2.5 font-display text-lg font-extrabold tracking-[-0.02em]">
                <span className="grid size-8 place-items-center rounded-lg bg-primary text-sm text-primary-foreground shadow-[0_2px_6px_oklch(52%_0.2_258/0.35)]">
                  T
                </span>
                acme
              </span>
              <nav className="ml-auto flex items-center gap-7">
                <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary">Product</a>
                <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary">Pricing</a>
                <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary">About</a>
                <button className="h-10 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-[0_2px_8px_oklch(52%_0.2_258/0.3)] transition-transform hover:-translate-y-px">
                  Get started
                </button>
              </nav>
            </header>
          </div>
          <div className="mx-auto max-w-[1120px]">
            <Hero
              eyebrow="Now serving Nairobi"
              title="Vetted fundis,"
              accent="on demand."
              description="Electrical, plumbing, HVAC, ICT and more. Describe the job, drop a pin, and a background-checked technician accepts in minutes. Track, chat, and pay by M-Pesa."
              primaryCta="Request a technician"
              secondaryCta="Become a fundi"
            />
          </div>
          <section className="bg-muted py-20">
            <div className="mx-auto max-w-[1120px] px-6">
              <p className="text-[11.5px] font-extrabold uppercase tracking-[0.16em] text-primary">The pattern</p>
              <h2 className="mt-2.5 font-display text-[26px] font-bold tracking-[-0.02em]">
                Every identity ships with blocks, not just colors
              </h2>
              <div className="mt-5 grid grid-cols-3 gap-3.5">
                <Kpi value="2,100+" label="jobs completed" />
                <Kpi value="<30 min" label="match target" />
                <Kpi value="4.9 ★" label="avg rating" />
              </div>
              <Callout>
                Blocks are composed sections - hero, auth, dashboard shell, table page, article - styled to the
                identity. They are the fastest path from idea to premium screen.
              </Callout>
            </div>
          </section>
        </>
      )}

      {view === "dashboard" && (
        <DashboardShell
          title="acme"
          nav={[{ label: "Overview" }, { label: "Jobs", active: true, count: 4 }, { label: "Technicians" }, { label: "Ledger" }]}
          stats={[
            { value: "4", label: "Open jobs" },
            { value: "1", label: "Unassigned" },
            { value: "9/15", label: "Free now" },
            { value: "KSh 12,760", label: "Collected" },
          ]}
        >
          <div className="overflow-x-auto rounded-[14px] border border-border bg-card">
            <table className="w-full text-[13.5px]">
              <thead className="bg-secondary/60">
                <tr>
                  {["Code", "Trade", "Customer", "Zone", "Status", "Price"].map((h) => (
                    <th key={h} className="px-3.5 py-2.5 text-left text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {jobs.map((j) => (
                  <tr key={j.code} className="transition-colors hover:bg-accent/40">
                    <td className="px-3.5 py-3 font-mono text-[12.5px]">{j.code}</td>
                    <td>{j.trade}</td>
                    <td>{j.customer}</td>
                    <td className="text-muted-foreground">{j.zone}</td>
                    <td><StatBadge label={j.status} tone={j.tone as "muted" | "ok" | "warn" | "danger"} /></td>
                    <td className="font-semibold tabular-nums">{j.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardShell>
      )}

      {view === "article" && (
        <Article
          eyebrow="Field report"
          title={`Prose under the ${identity} identity`}
          meta="uiforagents · 5 Oct 2026 · 2 min read"
        >
          <p>
            This article block is part of the identity: a 720px measure, 16px body at 1.7 line height,
            accent eyebrows, and display headings carrying the identity's personality. Content pages
            look finished without a single typography decision.
          </p>
          <h2>Numbers stay honest</h2>
          <p>
            Metrics use tabular figures so columns never jitter: 1,240 jobs, KSh 412,000 collected,
            15 technicians. The KPI cards below are part of the block set.
          </p>
          <div className="grid grid-cols-3 gap-3.5">
            <Kpi value="2,100+" label="jobs completed" />
            <Kpi value="4.9 ★" label="avg rating" />
            <Kpi value="96%" label="on-time arrival" />
          </div>
          <Callout tone="warn">
            Pending payments amber-warn quietly. Nothing shouts; the identity reserves loud for emergencies.
          </Callout>
        </Article>
      )}
    </div>
  )
}
