import type { MetadataRoute } from "next"

import { BRANDING } from "@/configs/branding"
import { AGENTS } from "@/configs/agent-marketing"

export const dynamic = "force-static"

// Every marketing route. Kept as an explicit list because the site is fully
// prerendered — there is no filesystem read at request time to derive it from.
// The per-role pages are derived from the same config the pages themselves use,
// so adding a role can't leave the sitemap behind.
const PRODUCT_ROUTES = [
  "/agents",
  "/runtimes",
  "/integrations",
  "/use-cases",
  "/managed",
  "/byos",
  "/white-label",
  "/api",
  "/security",
  "/pricing",
  "/comparison",
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
    ...PRODUCT_ROUTES.map((path) => ({
      url: `${BRANDING.siteUrl}${path}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
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
