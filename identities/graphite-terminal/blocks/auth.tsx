import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AuthCard({
  title = "Operator sign-in",
  description = "Authenticate to access the console.",
  primaryCta = "Sign in",
}: {
  title?: string
  description?: string
  primaryCta?: string
}) {
  return (
    <Card className="w-full max-w-sm shadow-[var(--shadow-identity)]">
      <CardHeader>
        <CardTitle className="font-display text-[17px] font-bold tracking-[-0.01em]">
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email or handle</Label>
            <Input id="email" type="text" placeholder="ops@station.dev" autoCapitalize="none" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <Button type="submit" className="mt-2 h-10 rounded-sm font-semibold">
            {primaryCta}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
