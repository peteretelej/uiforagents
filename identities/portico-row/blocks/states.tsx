import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// The four data states every surface owes (empty, loading, error, no
// results), composed once in this identity's voice so agents copy the
// pattern instead of improvising it. Static demo content; adapt per project.
export function StatesGallery() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card className="py-12">
        <CardContent className="px-10 text-center">
          <h3 className="text-[19px]">No matters to show</h3>
          <p className="mx-auto mt-2 max-w-[42ch] text-[16px] leading-relaxed text-muted-foreground">
            Matters appear here once your portal access is provisioned.
          </p>
          <Button size="sm" className="mt-5 h-11 px-5">
            Request access
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="px-7 py-7">
          <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Retrieving matters
          </p>
          <div className="mt-5 space-y-3.5">
            <div className="h-4 w-full animate-pulse bg-muted motion-reduce:animate-none" />
            <div className="h-4 w-4/5 animate-pulse bg-muted motion-reduce:animate-none" />
            <div className="h-4 w-3/5 animate-pulse bg-muted motion-reduce:animate-none" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="px-7 py-7">
          <h3 className="text-[17px]">Couldn&rsquo;t load matters</h3>
          <p className="mt-2 text-[16px] leading-relaxed text-muted-foreground">
            The list is stale, not lost. Your documents are unchanged.
          </p>
          <p className="mt-3 font-mono text-[13px] text-muted-foreground">docket_timeout &middot; 3 attempts</p>
          <Button size="sm" variant="outline" className="mt-5 h-11 px-5">
            Try again
          </Button>
        </CardContent>
      </Card>
      <Card className="py-12">
        <CardContent className="px-10 text-center">
          <h3 className="text-[17px]">No matters match the filter</h3>
          <p className="mx-auto mt-2 max-w-[42ch] text-[16px] leading-relaxed text-muted-foreground">
            Widen the date range, or clear the practice filter.
          </p>
          <Button size="sm" variant="ghost" className="mt-5 h-11 px-5">
            Clear filter
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
