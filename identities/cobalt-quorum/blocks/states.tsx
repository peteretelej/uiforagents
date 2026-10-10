import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// The four data states every surface owes (empty, loading, error, no
// results), composed once in this identity's voice so agents copy the
// pattern instead of improvising it. Static demo content; adapt per project.
export function StatesGallery() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card className="py-10">
        <CardContent className="px-10 text-center">
          <h3 className="font-display text-[16px] font-bold">No deployments yet</h3>
          <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
            Connect a repository and your first pipeline lands here with live status.
          </p>
          <Button size="sm" className="mt-4">
            Connect repository
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="px-6 py-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
            Fetching deployments
          </p>
          <div className="mt-4 space-y-3">
            <div className="h-3 w-full animate-pulse rounded bg-muted motion-reduce:animate-none" />
            <div className="h-3 w-4/5 animate-pulse rounded bg-muted motion-reduce:animate-none" />
            <div className="h-3 w-3/5 animate-pulse rounded bg-muted motion-reduce:animate-none" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="px-6 py-6">
          <h3 className="font-display text-[15px] font-bold">Sync failed</h3>
          <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
            Deployments are stale, not lost. The last verified release is still live.
          </p>
          <p className="mt-2 font-mono text-[12px] text-muted-foreground">upstream_timeout &middot; 3 attempts</p>
          <Button size="sm" variant="outline" className="mt-4">
            Try again
          </Button>
        </CardContent>
      </Card>
      <Card className="py-10">
        <CardContent className="px-10 text-center">
          <h3 className="font-display text-[15px] font-bold">No deploys match your filters</h3>
          <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
            Try widening the date range or clearing an environment.
          </p>
          <Button size="sm" variant="ghost" className="mt-4">
            Clear filters
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
