import type { MetadataRoute } from "next"

import { BRANDING } from "@/configs/branding"

export const dynamic = "force-static"

// Every marketing route. Kept as an explicit list because the site is fully
// prerendered — there is no filesystem read at request time to derive it from.
const ROUTES = [
  "",
  "/pricing",
  "/comparison",
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
  return ROUTES.map((path) => ({
    url: `${BRANDING.siteUrl}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }))
}
