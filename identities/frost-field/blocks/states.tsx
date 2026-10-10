import { RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// The four data states every surface owes (empty, loading, error, no
// results), composed once in this identity's glass voice so agents copy
// the pattern instead of improvising it. Static demo content; adapt per
// project. Calm and specific copy: "Fetching today's sessions", never
// "Loading...".
export function StatesGallery() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card className="py-12">
        <CardContent className="px-10 text-center">
          <h3 className="font-display text-[16px] font-bold">No check-ins yet</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
            When you log today&rsquo;s mood, your streak starts here.
          </p>
          <Button size="sm" className="mt-5">
            Log today&rsquo;s mood
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="px-6 py-6">
          <p className="text-[11.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            Fetching today&rsquo;s sessions
          </p>
          <div className="mt-5 space-y-3">
            <div className="h-3 w-full animate-pulse rounded-full bg-muted motion-reduce:animate-none" />
            <div className="h-3 w-4/5 animate-pulse rounded-full bg-muted motion-reduce:animate-none" />
            <div className="h-3 w-3/5 animate-pulse rounded-full bg-muted motion-reduce:animate-none" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="px-6 py-6">
          <h3 className="font-display text-[15px] font-bold">Sync paused</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
            We couldn&rsquo;t reach the server. Your history is safe.
          </p>
          <p className="mt-2 font-mono text-[12px] text-muted-foreground">upstream_timeout &middot; 3 attempts</p>
          <Button size="sm" variant="outline" className="mt-5">
            <RotateCw className="mr-1.5 size-3.5" /> Try again
          </Button>
        </CardContent>
      </Card>
      <Card className="py-12">
        <CardContent className="px-10 text-center">
          <h3 className="font-display text-[15px] font-bold">No sessions match your filters</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
            Try widening the dates or clearing &ldquo;Breathwork&rdquo;.
          </p>
          <Button size="sm" variant="ghost" className="mt-5">
            Clear filters
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
