"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

/* The waitlist form: the trust line under the CTA is part of the contract.
   status covers the full submit grammar - idle, submitting (disabled button,
   spinner), and error (inline destructive line, invalid input flagged). */
export function AuthCard({
  title = "Join the launch list",
  description = "Be first through the door when Pumblechook Press 1.0 goes live.",
  primaryCta = "Save my spot",
  trustNote = "Free while in beta · No spam, one email on launch day",
  status: statusProp = "idle",
}: {
  title?: string
  description?: string
  primaryCta?: string
  trustNote?: string
  status?: "idle" | "submitting" | "error"
}) {
  const [status, setStatus] = useState(statusProp)
  const submitting = status === "submitting"
  return (
    <Card className="mx-auto w-full max-w-sm bg-card shadow-[var(--shadow-hero)]">
      <CardHeader>
        <CardTitle className="font-display text-[2rem] leading-none">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault()
            setStatus("submitting")
          }}
        >
          <div className="grid gap-2.5">
            <Label htmlFor="email" className="mono-label text-[11px] font-bold">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@makerspace.dev"
              autoCapitalize="none"
              aria-invalid={status === "error"}
              aria-describedby={status === "error" ? "auth-error" : undefined}
            />
          </div>
          <div className="grid gap-2.5">
            <Label htmlFor="product" className="mono-label text-[11px] font-bold">
              What are you launching?
            </Label>
            <Input id="product" type="text" placeholder="a tiny calendar app" autoCapitalize="none" />
          </div>
          {status === "error" && (
            <p id="auth-error" role="alert" className="text-[13px] font-bold text-destructive">
              That email is already on the list. You are already first through the door.
            </p>
          )}
          <Button type="submit" className="mt-1 h-11" disabled={submitting}>
            {submitting && <Loader2 className="mr-1.5 size-4 animate-spin motion-reduce:animate-none" aria-hidden />}
            {submitting ? "Saving your spot…" : primaryCta}
          </Button>
          <p className="mono-label text-center text-[10.5px] leading-relaxed text-muted-foreground">{trustNote}</p>
        </form>
      </CardContent>
    </Card>
  )
}
