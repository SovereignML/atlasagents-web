import type { Metadata } from "next"

// The docs page itself is a client component (accordion state), and a client
// component cannot export `metadata` — so it lives on the route's layout.
export const metadata: Metadata = {
  title: "Docs",
  description:
    "How Atlas Agents works: the deploy wizard, the eight agent roles, OpenClaw and Hermes, managing a running agent, billing, security, and the API.",
  alternates: { canonical: "/docs" },
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return children
}
