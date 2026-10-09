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
          <h3 className="font-display text-[16px]">No bookings yet</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
            When a customer books a clean, it shows up here with live status.
          </p>
          <Button size="sm" className="mt-4">
            Book a clean
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="px-6 py-6">
          <p className="text-[11.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            Fetching bookings
          </p>
          <div className="mt-4 space-y-3">
            <div className="h-3 w-full animate-pulse rounded bg-secondary motion-reduce:animate-none" />
            <div className="h-3 w-4/5 animate-pulse rounded bg-secondary motion-reduce:animate-none" />
            <div className="h-3 w-3/5 animate-pulse rounded bg-secondary motion-reduce:animate-none" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="px-6 py-6">
          <h3 className="font-display text-[15px]">Booking sync failed</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
            We couldn&rsquo;t reach the server. Your booking is safe.
          </p>
          <p className="mt-2 font-mono text-[12px] text-muted-foreground">upstream_timeout &middot; 3 attempts</p>
          <Button size="sm" variant="outline" className="mt-4">
            Try again
          </Button>
        </CardContent>
      </Card>
      <Card className="py-10">
        <CardContent className="px-10 text-center">
          <h3 className="font-display text-[15px]">No bookings match</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
            Try another week, or clear a filter.
          </p>
          <Button size="sm" variant="ghost" className="mt-4">
            Clear filters
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
