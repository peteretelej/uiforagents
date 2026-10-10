"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

/* The client-portal sign-in: authorized-use microcopy is part of the
   contract, and status covers the full submit grammar - idle, submitting
   (disabled button, spinner), and error (inline destructive line, flagged
   input). */
export function AuthCard({
  title = "Client portal",
  description = "Matter files, invoices, and counsel messages in one place.",
  primaryCta = "Sign in securely",
  trustNote = "Authorized use only. Portal activity is logged and reviewed.",
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
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-[22px]">{title}</CardTitle>
        <CardDescription className="text-[16px]">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault()
            setStatus("submitting")
          }}
        >
          <div className="grid gap-2">
            <Label htmlFor="portal-email" className="text-[15px]">
              Email
            </Label>
            <Input
              id="portal-email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              autoCapitalize="none"
              className="h-12 text-[16px]"
              aria-invalid={status === "error"}
              aria-describedby={status === "error" ? "auth-error" : undefined}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="portal-password" className="text-[15px]">
              Password
            </Label>
            <Input
              id="portal-password"
              type="password"
              autoComplete="current-password"
              className="h-12 text-[16px]"
              required
            />
          </div>
          {status === "error" && (
            <p id="auth-error" role="alert" className="text-[15px] font-medium text-destructive">
              Those credentials were not recognized. Try again, or call your counsel for a reset.
            </p>
          )}
          <Button type="submit" className="mt-1 h-12 text-[16px]" disabled={submitting}>
            {submitting && <Loader2 className="mr-1.5 size-4 animate-spin motion-reduce:animate-none" aria-hidden />}
            {submitting ? "Signing in…" : primaryCta}
          </Button>
          <p className="text-center text-[14px] leading-relaxed text-muted-foreground">{trustNote}</p>
        </form>
      </CardContent>
    </Card>
  )
}
