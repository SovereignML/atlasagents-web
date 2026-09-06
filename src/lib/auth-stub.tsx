"use client"

import type { ReactNode } from "react"

// The landing site has no auth backend — every visitor is anonymous. This shim
// stands in for `next-auth/react` so the shared marketing components (navbar,
// consent banner, chatwoot, analytics) compile and behave as "logged out"
// without pulling NextAuth (and a /api/auth endpoint) into the frontend repo.
// When the app moved to app.{BRANDING.domain}, sign-in lives there; the landing
// only links across to it.

// Mirrors the app's augmented next-auth Session (see its src/types/next-auth.d.ts)
// so the shared components type-check unchanged. At runtime the landing is always
// logged out, but the STATUS type stays the full union so `status === "authenticated"`
// comparisons remain valid (never true here).
export type StubSession = {
  user: {
    id: string
    role: string
    email?: string | null
    name?: string | null
    image?: string | null
  }
} | null

type SessionStatus = "authenticated" | "loading" | "unauthenticated"

export function useSession(): { data: StubSession; status: SessionStatus } {
  return { data: null, status: "unauthenticated" }
}

export function SessionProvider({
  children,
}: {
  children: ReactNode
  [key: string]: unknown
}) {
  return <>{children}</>
}
