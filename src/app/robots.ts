import type { MetadataRoute } from "next"

import { BRANDING } from "@/configs/branding"

export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${BRANDING.siteUrl}/sitemap.xml`,
    host: BRANDING.siteUrl,
  }
}
