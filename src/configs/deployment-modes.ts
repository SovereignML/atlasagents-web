// The four ways to actually run an agent. This is the site's central piece of
// choice architecture: most visitors do not need a feature list, they need to
// know which of these four they are.
//
// Facts mirrored from sovereignml-app/docs/BYOS.md and src/configs/plans.ts.

import { BYOS_PLAN, FREE_DEMO_TTL_MS, findPlanBySlug, formatUsd } from "@/configs/plans"

export type DeploymentModeId = "free" | "managed" | "byos" | "enterprise"

export type DeploymentMode = {
  id: DeploymentModeId
  name: string
  /** The sentence a visitor should recognize themselves in. */
  forWho: string
  summary: string
  priceLabel: string
  priceNote: string
  cta: { label: string; href: string }
  /** Anchor on /pricing where this mode is priced in full. */
  pricingAnchor: string
}

const litePlan = findPlanBySlug("lite")

export const FREE_DEMO_TTL_MINUTES = FREE_DEMO_TTL_MS / 60_000

export const DEPLOYMENT_MODES: readonly DeploymentMode[] = [
  {
    id: "free",
    name: "Free demo",
    forWho: "I want to see one running before I decide anything.",
    summary: `A real agent on a real box, deployed in minutes. It tears itself down after ${FREE_DEMO_TTL_MINUTES} minutes — it is a demo, not a free tier.`,
    priceLabel: "Free",
    priceNote: `${FREE_DEMO_TTL_MINUTES}-minute session · no card`,
    cta: { label: "Deploy a demo agent", href: "/register?deploy=true" },
    pricingAnchor: "/pricing#plans",
  },
  {
    id: "managed",
    name: "Managed VPS",
    forWho: "I want an agent running and I do not want to think about servers.",
    summary:
      "We provision the box, install the runtime, terminate SSL, and keep it alive. You pick a role, a size, and a region. This is what most people want.",
    priceLabel: litePlan ? `From ${formatUsd(litePlan.displayPriceMonthly)}/mo` : "From $9/mo",
    priceNote: "Compute and management included",
    cta: { label: "See plans", href: "/pricing#plans" },
    pricingAnchor: "/pricing#plans",
  },
  {
    id: "byos",
    name: "Bring your own server",
    forWho: "I already have a VPS, a dedicated box, or a homelab machine.",
    summary:
      "Keep your hardware. Paste one public key into your authorized_keys and we manage the agent on it over SSH — logs, restarts, config, backups — for a flat fee. No daemon to install.",
    priceLabel: `${formatUsd(BYOS_PLAN.displayPriceMonthly)}/mo`,
    priceNote: "Management only — you pay for the box",
    cta: { label: "How BYOS works", href: "/pricing#byos" },
    pricingAnchor: "/pricing#byos",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    forWho: "I need volume, an SLA, and someone to call.",
    summary:
      "Custom credit allocation and volume pricing, contractual SLA, custom integrations, dedicated support, and unlimited seats.",
    priceLabel: findPlanBySlug("enterprise")?.enterprisePriceLabel ?? "From $499/mo",
    priceNote: "Talk to us about your fleet",
    cta: { label: "Contact sales", href: "/pricing#enterprise" },
    pricingAnchor: "/pricing#enterprise",
  },
] as const

/**
 * "Which one am I?" — the decision matrix rows. Values are indexed to match
 * DEPLOYMENT_MODES order, so a mode added above must gain a cell in every row.
 */
export const DEPLOYMENT_MODE_MATRIX: readonly {
  question: string
  values: readonly string[]
}[] = [
  {
    question: "Who owns the server",
    values: ["We do", "We do", "You do", "Either"],
  },
  {
    question: "Who provisions it",
    values: ["We do", "We do", "We do, over SSH", "We do"],
  },
  {
    question: "How long it lives",
    values: [`${FREE_DEMO_TTL_MINUTES} minutes`, "As long as you pay", "As long as you pay", "Contracted"],
  },
  {
    question: "Compute billed by us",
    values: ["No", "Yes, in the plan", "No", "Negotiated"],
  },
  {
    question: "Always-on agent",
    values: ["No", "Yes", "Yes", "Yes"],
  },
  {
    question: "Custom domain",
    values: ["No", "Yes", "Yes", "Yes"],
  },
  {
    question: "Team seats",
    values: ["1", "2 to 25 by plan", "5", "Unlimited"],
  },
  {
    question: "Card required",
    values: ["No", "Yes", "Yes", "Invoiced"],
  },
] as const

/** Everything you get regardless of which mode or plan you land on. */
export const INCLUDED_EVERYWHERE: readonly string[] = [
  "Your own isolated instance — never shared with another customer",
  "A public URL with SSL terminated for you",
  "Browser chat interface out of the box",
  "Live logs and one-click restart",
  "Web browser and web search tools",
  "Knowledge base — upload documents the agent cites",
  "Choice of OpenClaw or Hermes runtime",
  "Agent settings backed up to your own Google Drive",
  "Custom subdomains on your own Cloudflare zone",
  "Root password encrypted at rest, never stored in plaintext",
  "Queries scoped to your account — no cross-tenant reads",
  "Switch runtime, size, or region later without starting over",
] as const
