"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

/* The trial form: trust microcopy under the CTA is part of the contract.
   status covers the full submit grammar - idle, submitting (disabled button,
   spinner), and error (inline destructive line, invalid input flagged). */
export function AuthCard({
  title = "Create your workspace",
  description = "Start shipping verified releases in minutes.",
  primaryCta = "Create workspace",
  trustNote = "Free 14-day trial · No credit card required",
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
    <Card className="mx-auto w-full max-w-sm shadow-[var(--shadow-identity)]">
      <CardHeader>
        <CardTitle className="font-display text-[20px] font-bold tracking-[-0.02em]">{title}</CardTitle>
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
            <Label htmlFor="work-email">Work email</Label>
            <Input
              id="work-email"
              type="email"
              placeholder="you@company.com"
              autoCapitalize="none"
              aria-invalid={status === "error"}
              aria-describedby={status === "error" ? "auth-error" : undefined}
            />
          </div>
          <div className="grid gap-2.5">
            <Label htmlFor="workspace">Workspace name</Label>
            <Input id="workspace" type="text" placeholder="blefuscu-platform" autoCapitalize="none" />
          </div>
          {status === "error" && (
            <p id="auth-error" role="alert" className="text-[13px] font-medium text-destructive">
              That email is already connected to a workspace. Sign in instead.
            </p>
          )}
          <Button type="submit" className="mt-1 h-11 rounded-lg" disabled={submitting}>
            {submitting && <Loader2 className="mr-1.5 size-4 animate-spin motion-reduce:animate-none" aria-hidden />}
            {submitting ? "Creating workspace…" : primaryCta}
          </Button>
          <p className="text-center text-[12.5px] leading-relaxed text-muted-foreground">{trustNote}</p>
        </form>
      </CardContent>
    </Card>
  )
}
