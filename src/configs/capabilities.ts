// What an agent can actually do, as a marketing-facing view of the platform's
// shipped tool catalog (sovereignml-app/src/configs/agent-tools.ts).
//
// Honesty rule: `status` mirrors the platform's `comingSoon` flag. A capability
// listed as "live" must be enable-able today on at least one runtime. Do not
// promote something here to sell a page.

import type { RuntimeId } from "@/configs/runtimes"

export type CapabilityStatus = "live" | "coming-soon"

export type Capability = {
  /** Matches the platform tool id in agent-tools.ts. */
  id: string
  name: string
  /** lucide-react icon name. */
  icon: string
  description: string
  status: CapabilityStatus
  /** Runtimes this works on. Empty for host-side features that work on both. */
  runtimes: readonly RuntimeId[]
  /** Needs a key from an external provider to function. */
  requiresApiKey?: boolean
}

export const CAPABILITIES: readonly Capability[] = [
  {
    id: "browser",
    name: "Web browser",
    icon: "Globe",
    description:
      "The agent opens real pages, navigates, clicks, and reads what is actually there — not a cached snapshot of it.",
    status: "live",
    runtimes: ["openclaw", "hermes"],
  },
  {
    id: "web_search",
    name: "Web search",
    icon: "Search",
    description:
      "Look things up as the work happens, so answers reflect today rather than the model's training cutoff.",
    status: "live",
    runtimes: ["openclaw", "hermes"],
    requiresApiKey: true,
  },
  {
    id: "knowledge_base",
    name: "Knowledge base",
    icon: "BookOpen",
    description:
      "Upload your documents and add URLs. The agent consults them, cites the source file, and says so when a question is not covered.",
    status: "live",
    runtimes: ["openclaw", "hermes"],
  },
  {
    id: "n8n",
    name: "n8n automation server",
    icon: "Workflow",
    description:
      "Your agent gets its own self-hosted n8n instance and builds workflows by driving the interface, the way a person would.",
    status: "live",
    runtimes: ["openclaw", "hermes"],
  },
  {
    id: "image_gen",
    name: "Image generation",
    icon: "Image",
    description:
      "Generate images from text prompts as part of a task. Hermes only.",
    status: "live",
    runtimes: ["hermes"],
    requiresApiKey: true,
  },
  {
    id: "code",
    name: "Code & terminal",
    icon: "Terminal",
    description:
      "Run shell commands and execute code in a sandbox on the agent's own box.",
    status: "coming-soon",
    runtimes: ["openclaw", "hermes"],
  },
  {
    id: "mcp",
    name: "MCP servers",
    icon: "Plug",
    description:
      "Attach Model Context Protocol servers — Gmail, Slack, and your own tools — to extend what the agent can reach.",
    status: "coming-soon",
    runtimes: ["openclaw", "hermes"],
  },
] as const

export const LIVE_CAPABILITIES = CAPABILITIES.filter((c) => c.status === "live")

/** Capabilities available on a given runtime, live ones first. */
export function capabilitiesForRuntime(runtime: RuntimeId): Capability[] {
  return CAPABILITIES.filter((c) => c.runtimes.includes(runtime)).sort(
    (a, b) => Number(a.status === "coming-soon") - Number(b.status === "coming-soon"),
  )
}

export function findCapability(id: string): Capability | undefined {
  return CAPABILITIES.find((c) => c.id === id)
}

/**
 * Skills are prompt playbooks, not infrastructure — an agent is *given* a skill
 * and the guidance is written into its identity files. Runtime-agnostic by
 * design. Grouped by the agent category they belong to.
 */
export type Skill = {
  id: string
  name: string
  icon: string
  description: string
  /** AGENT_CATEGORIES slug this skill is associated with. */
  category: string
}

export const SKILLS: readonly Skill[] = [
  {
    id: "kb_answer",
    name: "Answer from knowledge base",
    icon: "BookOpen",
    description:
      "Ground answers in your uploaded documents and cite the source file. Say so plainly when the material does not cover the question.",
    category: "support",
  },
  {
    id: "ticket_triage",
    name: "Ticket triage & escalation",
    icon: "Inbox",
    description:
      "Classify incoming requests by urgency and intent, resolve what it can, and hand the rest over cleanly.",
    category: "support",
  },
  {
    id: "lead_qualification",
    name: "Lead qualification",
    icon: "Filter",
    description:
      "Score inbound leads against your criteria and route the ones worth a human's time.",
    category: "sales",
  },
  {
    id: "outreach_sequence",
    name: "Outreach sequencing",
    icon: "Send",
    description:
      "Run multi-step outreach that stays concise and always ends on a clear ask.",
    category: "sales",
  },
  {
    id: "incident_triage",
    name: "Incident triage",
    icon: "AlertTriangle",
    description:
      "Start at the most recent error and work backwards. Terse, actionable, no narration.",
    category: "devops",
  },
  {
    id: "content_brief",
    name: "Content briefs & drafting",
    icon: "PenTool",
    description:
      "Propose structure before drafting long-form, and match the brand voice you gave it.",
    category: "content",
  },
  {
    id: "source_synthesis",
    name: "Source synthesis",
    icon: "Layers",
    description:
      "Compare sources, separate fact from inference, summarize first and expand on request.",
    category: "research",
  },
  {
    id: "calendar_planning",
    name: "Content calendars",
    icon: "Calendar",
    description:
      "Plan platform-native posts and adapt tone per channel rather than cross-posting one voice.",
    category: "social",
  },
] as const

/** Skills associated with an agent category. */
export function skillsForCategory(category: string): Skill[] {
  return SKILLS.filter((s) => s.category === category)
}
