import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// The four data states every surface owes (empty, loading, error, no
// results), composed once in this identity's voice so agents copy the
// pattern instead of improvising it. Static demo content; adapt per project.
export function StatesGallery() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card className="py-8">
        <CardContent className="px-8 text-center">
          <h3 className="font-display text-[15px] font-semibold">No services registered</h3>
          <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">
            Register a service and it appears here with live status.
          </p>
          <Button size="sm" className="mt-4">
            Register service
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="px-5 py-5">
          <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Fetching fleet
          </p>
          <div className="mt-4 space-y-2.5">
            <div className="h-2.5 w-full animate-pulse rounded bg-secondary motion-reduce:animate-none" />
            <div className="h-2.5 w-4/5 animate-pulse rounded bg-secondary motion-reduce:animate-none" />
            <div className="h-2.5 w-3/5 animate-pulse rounded bg-secondary motion-reduce:animate-none" />
          </div>
          <p className="mt-3 font-mono text-[11.5px] text-muted-foreground">3 rows buffered &middot; polling</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="px-5 py-5">
          <h3 className="font-display text-[14px] font-semibold">Sync failed</h3>
          <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">
            Metrics are stale, not lost. The last good read is shown.
          </p>
          <p className="mt-2 font-mono text-[11.5px] text-muted-foreground">upstream_timeout (504) &middot; 3 attempts</p>
          <Button size="sm" variant="outline" className="mt-4">
            Retry
          </Button>
        </CardContent>
      </Card>
      <Card className="py-8">
        <CardContent className="px-8 text-center">
          <h3 className="font-display text-[14px] font-semibold">0 services match</h3>
          <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">
            No fleet entries match <span className="font-mono">prod-eu</span>. Widen the filter.
          </p>
          <Button size="sm" variant="ghost" className="mt-4">
            Clear filters
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
