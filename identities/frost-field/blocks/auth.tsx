import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

/* The sign-in card: strong-fill glass (it is all body text), centered over
   the field. The full form grammar - idle, submitting, error - is part of
   the block, wired for assistive tech. */
export function AuthCard({
  title = "Welcome back",
  description = "Sign in to continue your practice.",
  primaryCta = "Sign in",
  status = "idle",
}: {
  title?: string
  description?: string
  primaryCta?: string
  status?: "idle" | "submitting" | "error"
} = {}) {
  return (
    <div className="glass-strong mx-auto w-full max-w-sm rounded-[20px] p-6 sm:p-8">
      <h1 className="font-display text-[20px] font-bold tracking-[-0.01em]">{title}</h1>
      <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{description}</p>
      <form className="mt-6 flex flex-col gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" autoCapitalize="none" aria-invalid={status === "error"} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" aria-invalid={status === "error"} aria-describedby={status === "error" ? "auth-error" : undefined} />
        </div>
        {status === "error" && (
          <p id="auth-error" role="alert" className="text-[13px] font-medium text-destructive">
            That email and password don&rsquo;t match. Try again.
          </p>
        )}
        <Button type="submit" className="mt-2 h-11" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin motion-reduce:animate-none" aria-hidden />
              Signing you in&hellip;
            </>
          ) : (
            primaryCta
          )}
        </Button>
      </form>
    </div>
  )
}
