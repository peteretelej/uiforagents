import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AuthCard({
  title = "Welcome back",
  description = "Enter your credentials to continue.",
  primaryCta = "Sign in",
}: {
  title?: string
  description?: string
  primaryCta?: string
}) {
  return (
    <Card className="w-full max-w-sm shadow-[var(--shadow-identity)]">
      <CardHeader>
        <CardTitle className="font-display text-[20px] font-bold tracking-[-0.02em]">
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4">
          <div className="grid gap-3">
            <Label htmlFor="email">Email or phone</Label>
            <Input id="email" type="text" placeholder="you@example.com" autoCapitalize="none" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <Button type="submit" className="mt-2 h-11 rounded-md">
            {primaryCta}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
