// How Atlas Agents compares to the other people who will run an agent for you.
//
// Honesty rules, in order of importance:
//
//  1. Every `true` in the Atlas column must be true of the SHIPPED product, and
//     is qualified by a `notes` caption when it holds only in one configuration
//     (most often BYOS). Nothing here may claim a `comingSoon` capability —
//     code execution and MCP connectors are not shipped, so they are not rows.
//  2. The axes are chosen to favour us — that is what a comparison page is for.
//     What is NOT negotiable is the cells: a competitor mark must match what
//     that vendor publicly says it does, because a false comparative claim is a
//     legal problem, not a tone problem. Persuade with which rows you pick,
//     never with a wrong mark.
//  3. Competitor cells reflect each vendor's own public positioning, researched
//     September 2026. The page no longer carries a sourcing footnote or a
//     trademark line, so this block is the ONLY record of where these marks
//     came from — keep it accurate, and re-verify before changing a price.
//
// Atlas facts mirrored from sovereignml-app: docs/BYOS.md (own hardware, own
// key, no compute billing), docs/INTEGRATIONS.md (Drive backups), and
// src/configs/plans.ts (prices, live-agent counts, which are imported below
// rather than retyped).

import { BYOS_PLAN, findPlanBySlug, formatUsd } from "@/configs/plans"
import { BRANDING } from "@/configs/branding"

/** true = yes, false = no, "partial" = qualified (renders muted, with a note). */
export type Cell = true | false | "partial"

/** The columns, left to right. */
export type ProductKey = "atlas" | "agent37" | "agentsky" | "jurniti" | "selfhost"

export type ComparisonProduct = {
  key: ProductKey
  name: string
  /** Entry price as the vendor states it. Kept short enough for one line. */
  cost: string
  /** Smaller second line under the price — the qualifier that would otherwise wrap. */
  costNote?: string
}

const litePlan = findPlanBySlug("lite")

export const COMPARISON_PRODUCTS: readonly ComparisonProduct[] = [
  {
    key: "atlas",
    name: BRANDING.name,
    cost: `From ${formatUsd(BYOS_PLAN.displayPriceMonthly)}/mo`,
    costNote: litePlan
      ? `${formatUsd(litePlan.displayPriceMonthly)} fully managed`
      : "$9 fully managed",
  },
  {
    key: "agent37",
    name: "Agent 37",
    cost: "From $3.99/mo",
  },
  {
    key: "agentsky",
    name: "AgentSky",
    // Their own pricing page publishes $238.46/mo always-on for the default
    // 2 vCPU · 4 GB machine ($0.331/hr, billed per second). Compute only —
    // model tokens are extra unless you attach your own Claude/ChatGPT plan.
    cost: "From ~$238/mo",
    costNote: "always-on, compute only",
  },
  {
    key: "jurniti",
    name: "Jurniti",
    cost: "From $25/mo",
    costNote: "per agent",
  },
  {
    key: "selfhost",
    name: "Self-hosting",
    cost: "Infra + your time",
  },
]

/** Our column. Carries no tinted band — only a louder name and an accent price. */
export const ATLAS: ProductKey = "atlas"

export type ComparisonRow = {
  /** Stable id — the component maps this to a lucide icon. */
  id: string
  feature: string
  badge?: string
  values: Record<ProductKey, Cell>
  /** Per-cell caption rendered under the mark, e.g. { atlas: "on BYOS" }. */
  notes?: Partial<Record<ProductKey, string>>
}

// Eight rows, matching the row count and tight labelling of the previous
// comparison page so the table keeps the same visual rhythm.
export const COMPARISON_ROWS: readonly ComparisonRow[] = [
  {
    id: "chat-ui",
    feature: "UI first Agent Dashboard",
    values: { atlas: true, agent37: "partial", agentsky: "partial", jurniti: "partial", selfhost: false },
    notes: { agent37: "operator dashboard", agentsky: "developer console", jurniti: "CLI-first" },
  },
  {
    id: "own-hardware",
    feature: "Runs on your own hardware",
    values: { atlas: true, agent37: false, agentsky: false, jurniti: false, selfhost: true },
    notes: { atlas: "BYOS: no compute or AI metering" },
  },
  {
    id: "roles",
    feature: "Built in Agent Templates",
    values: { atlas: true, agent37: false, agentsky: false, jurniti: true, selfhost: false },
    notes: { atlas: "8 roles, or build your own" },
  },
  {
    id: "knowledge-base",
    feature: "Per Agent Knowledgebase",
    values: { atlas: true, agent37: false, agentsky: false, jurniti: false, selfhost: "partial" },
    notes: { selfhost: "build it yourself" },
  },
  {
    id: "included-tools",
    feature: "Tools and Add-ons for free",
    values: { atlas: true, agent37: "partial", agentsky: false, jurniti: false, selfhost: false },
    notes: {
      atlas: "browser + your own n8n server",
      agent37: "bundled models",
      agentsky: "billed per call",
      jurniti: "sidecars from $19/mo",
    },
  },
  {
    // Parity row, verified September 2026: every option on this table supports
    // your own model keys, so all five marks are true. It stays because it
    // answers the "am I locked into their models?" objection — the notes carry
    // what actually differs, which is what each vendor still bills you for.
    //   Agent 37  — BYOK standard from Basic; keys call the provider direct.
    //   AgentSky  — attach a Claude Pro/Max or ChatGPT Plus/Pro plan, or use
    //               their router at 0 markup; compute is still metered.
    //   Jurniti   — "your keys never leave the box" is their headline claim.
    id: "byo-keys",
    feature: "Bring your own AI keys",
    values: { atlas: true, agent37: true, agentsky: true, jurniti: true, selfhost: true },
    notes: {
      atlas: "every agent, every plan",
      agent37: "Basic and up",
      agentsky: "compute still metered",
      jurniti: "per microVM",
    },
  },
  {
    id: "own-backups",
    feature: "Per Agent Backup",
    values: { atlas: true, agent37: false, agentsky: false, jurniti: false, selfhost: true },
    notes: { atlas: "your Google Drive" },
  },
  {
    id: "team-seats",
    feature: "Team Feature with RBAC",
    values: { atlas: true, agent37: false, agentsky: false, jurniti: false, selfhost: false },
    notes: { atlas: "up to 25, viewer to manager" },
  },
] as const
