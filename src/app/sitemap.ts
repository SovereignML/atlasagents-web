import type { MetadataRoute } from "next"

import { BRANDING } from "@/configs/branding"
import { AGENTS } from "@/configs/agent-marketing"

export const dynamic = "force-static"

// Every marketing route. Kept as an explicit list because the site is fully
// prerendered — there is no filesystem read at request time to derive it from.
// The per-role pages are derived from the same config the pages themselves use,
// so adding a role can't leave the sitemap behind.
// Split by the 2026-09 target keyword list: KEYWORD_ROUTES are the pages those
// searches should land on (Hermes hosting, managed hosting, BYOS, pricing, the
// Agent 37 / AgentSky / Jurniti alternatives, use cases). Google ignores
// `priority`; Bing and others still read it, and it documents intent here.
const KEYWORD_ROUTES = [
  "/runtimes",
  "/managed",
  "/byos",
  "/pricing",
  "/comparison",
  "/use-cases",
] as const

const PRODUCT_ROUTES = [
  "/agents",
  "/integrations",
  "/white-label",
  "/api",
  "/security",
] as const

const SUPPORTING_ROUTES = [
  "/docs",
  "/changelog",
  "/community",
  "/team",
  "/careers",
  "/terms",
  "/privacy",
  "/refund",
  "/sla",
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BRANDING.siteUrl,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    ...KEYWORD_ROUTES.map((path) => ({
      url: `${BRANDING.siteUrl}${path}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...PRODUCT_ROUTES.map((path) => ({
      url: `${BRANDING.siteUrl}${path}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...AGENTS.map((agent) => ({
      url: `${BRANDING.siteUrl}/agents/${agent.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...SUPPORTING_ROUTES.map((path) => ({
      url: `${BRANDING.siteUrl}${path}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ]
}
