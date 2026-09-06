import type { NextConfig } from "next"

import { BRANDING } from "./src/configs/branding"

const devOrigins = [
  BRANDING.domain,
  `www.${BRANDING.domain}`,
  ...BRANDING.legacyHosts.site,
  ...BRANDING.legacyHosts.app,
  ...(process.env.ALLOWED_DEV_ORIGINS?.split(",")
    .map((h) => h.trim())
    .filter(Boolean) ?? []),
]

// The platform app lives on its own host now — every auth/app link on the
// landing (login, register, dashboard, …) redirects here. Configurable via env.
const APP_URL = (
  process.env.NEXT_PUBLIC_APP_URL ?? "https://app.atlasagents.dev"
).replace(/\/$/, "")

/**
 * Permanent redirects from the pre-rename hosts onto the Atlas Agents domains,
 * so old marketing links and bookmarks keep working. Legacy *site* hosts land
 * on this site; legacy *app* hosts are forwarded to the dashboard rather than
 * 404ing here. Skips any host that is already this site's canonical host.
 */
function legacyHostRedirects(siteOrigin: string, canonicalHost: string) {
  const routes = [
    ...BRANDING.legacyHosts.site.map((host) => ({ host, origin: siteOrigin })),
    ...BRANDING.legacyHosts.app.map((host) => ({ host, origin: APP_URL })),
  ]
  return routes
    .filter(({ host }) => host.toLowerCase() !== canonicalHost)
    .map(({ host, origin }) => ({
      // `:path` captures the whole remaining path (`.*` spans slashes), so the
      // destination interpolates it as a single segment, not `:path*`.
      source: "/:path(.*)",
      has: [{ type: "host" as const, value: host }],
      destination: `${origin}/:path`,
      permanent: true,
    }))
}

// Cross-domain redirect for a landing path that actually belongs to the app.
const toApp = (source: string, appPath = source) => ({
  source,
  destination: `${APP_URL}${appPath}`,
  permanent: false,
})

function wwwToApexRedirect():
  | {
      source: string
      has: { type: "host"; value: string }[]
      destination: string
      permanent: boolean
    }
  | undefined {
  // The landing's OWN canonical host (atlasagents.dev), for www→apex.
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? BRANDING.siteUrl
  if (!raw) return undefined
  try {
    const u = new URL(raw.startsWith("http") ? raw : `https://${raw}`)
    const { hostname } = u
    if (
      hostname === "localhost" ||
      hostname.startsWith("127.") ||
      hostname.startsWith("www.")
    ) {
      return undefined
    }
    return {
      source: "/:path*",
      has: [{ type: "host", value: `www.${hostname}` }],
      destination: `${u.origin}/:path*`,
      permanent: true,
    }
  } catch {
    return undefined
  }
}

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  // PostHog proxy paths (/ingest/...) must not be trailing-slash redirected.
  skipTrailingSlashRedirect: true,
  ...(devOrigins.length > 0 ? { allowedDevOrigins: devOrigins } : {}),
  images: {
    remotePatterns: [
      // Ghost illustration used by the ghost-404-page component
      { protocol: "https", hostname: "xubohuah.github.io" },
    ],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }]
  },
  async redirects() {
    const apex = wwwToApexRedirect()
    const siteOrigin = (
      process.env.NEXT_PUBLIC_SITE_URL ?? BRANDING.siteUrl
    ).replace(/\/$/, "")
    let canonicalHost = ""
    try {
      canonicalHost = new URL(siteOrigin).hostname.toLowerCase()
    } catch {
      /* ignore malformed env */
    }
    return [
      // App surfaces the landing links to, but which live on the dashboard host.
      // Query strings (e.g. ?deploy=true) are preserved automatically.
      toApp("/login"),
      toApp("/login/:path*"),
      toApp("/register"),
      toApp("/register/:path*"),
      toApp("/signup", "/register"),
      toApp("/forgot-password"),
      toApp("/reset-password/:path*"),
      toApp("/dashboard"),
      toApp("/dashboard/:path*"),
      toApp("/admin/:path*"),
      toApp("/tenant-admin/:path*"),
      ...legacyHostRedirects(siteOrigin, canonicalHost),
      ...(apex ? [apex] : []),
    ]
  },
  async rewrites() {
    // PostHog reverse proxy: browser events go to our own domain (/ingest) so
    // ad-blockers don't drop them. The /static/ rule must precede the
    // catch-all. See docs/POSTHOG.md.
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ]
  },
}

export default nextConfig
