import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { BRANDING } from "@/configs/branding"
import { AppProviders } from "@/components/app-providers"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

// Geist Mono — the console's mono face for machine values (slugs, IPs, tokens),
// chart axis labels, and the uppercase nav group labels.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const DESCRIPTION =
  "Deploy an AI specialist onto a server that is yours. Pick a role, pick a runtime — OpenClaw or Hermes — and Atlas Agents provisions the box, installs the engine, and hands you a working agent at its own URL. Isolated instance, open runtimes, no lock-in. From $9/mo, or run it on hardware you already own."

export const metadata: Metadata = {
  // Resolves relative canonical/OG URLs against the deployed origin, and gives
  // the new domain a clean hand-off from the pre-rename one.
  metadataBase: new URL(BRANDING.siteUrl),
  title: {
    default: `${BRANDING.name} — AI agents on servers you own`,
    template: `%s | ${BRANDING.name}`,
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  icons: { icon: "/assets/favicon.png", apple: "/assets/favicon.png" },
  openGraph: {
    type: "website",
    siteName: BRANDING.name,
    title: `${BRANDING.name} — AI agents on servers you own`,
    description: DESCRIPTION,
    url: BRANDING.siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRANDING.name} — AI agents on servers you own`,
    description: DESCRIPTION,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // Dark-only: the `dark` class (and matching color-scheme) is hard-coded here
    // server-side instead of via next-themes. That renders the theme tokens from
    // SSR with zero flash and no injected anti-FOUC script — see AppProviders.
    <html
      lang="en"
      className={`dark ${inter.variable} ${geistMono.variable} h-full antialiased`}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <AppProviders>{children}</AppProviders>
        <Toaster />
      </body>
    </html>
  )
}
