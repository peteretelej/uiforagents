import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// The four data states every surface owes (empty, loading, error, no
// results), composed once in this identity's voice so agents copy the
// pattern instead of improvising it. Static demo content; adapt per project.
export function StatesGallery({ product = "Pumblechook Press" }: { product?: string }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <Card className="py-10 bg-card">
        <CardContent className="px-10 text-center">
          <h3 className="font-display text-[2rem] leading-none">NO LAUNCHES YET</h3>
          <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
            Start your first launch and it lands here with live status.
          </p>
          <Button size="sm" className="mt-4">
            Start a launch
          </Button>
        </CardContent>
      </Card>
      <Card className="bg-card">
        <CardContent className="px-6 py-6">
          <p className="mono-label text-[11px] font-bold text-muted-foreground">Fetching launches</p>
          <div className="mt-4 space-y-3">
            <div className="h-3.5 w-full animate-pulse bg-muted motion-reduce:animate-none" />
            <div className="h-3.5 w-4/5 animate-pulse bg-muted motion-reduce:animate-none" />
            <div className="h-3.5 w-3/5 animate-pulse bg-muted motion-reduce:animate-none" />
          </div>
        </CardContent>
      </Card>
      <Card className="bg-card">
        <CardContent className="px-6 py-6">
          <h3 className="text-[16px] font-bold">SYNC FAILED</h3>
          <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
            Your launches are stale, not lost. The live page is still up.
          </p>
          <p className="mt-2 font-mono text-[12px] text-muted-foreground">upstream_timeout &middot; 3 attempts</p>
          <Button size="sm" variant="outline" className="mt-4 bg-card">
            Try again
          </Button>
        </CardContent>
      </Card>
      <Card className="py-10 bg-card">
        <CardContent className="px-10 text-center">
          <h3 className="font-display text-[2rem] leading-none">NO MATCHES</h3>
          <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
            No {product} launches match your filters. Try widening the date range.
          </p>
          <Button size="sm" variant="ghost" className="mt-4 bg-card">
            Clear filters
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
