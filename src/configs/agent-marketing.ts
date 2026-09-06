// Marketing depth for each agent role — everything /agents and /agents/[slug]
// need beyond the shared catalog.
//
// Kept SEPARATE from agent-categories.ts on purpose: that file is mirrored in
// sovereignml-app and must stay syncable, so none of this belongs in it. Keyed
// by the same slug; every AGENT_CATEGORIES slug must have an entry here.

import { AGENT_CATEGORIES } from "@/configs/agent-categories"
import type { RuntimeId } from "@/configs/runtimes"

export type AgentMarketing = {
  /** Headline for the role's own page — what it replaces, not what it is. */
  headline: string
  /** One line for the catalog card, under the role name. */
  tagline: string
  /** Which team owns this agent — drives the /agents filter and /use-cases. */
  team: "Support" | "Engineering" | "Revenue" | "Marketing" | "Operations"
  /** Concrete jobs, written as things a person would otherwise do. */
  responsibilities: string[]
  /** Capability ids from capabilities.ts this role leans on. */
  usesCapabilities: string[]
  /** Which runtime we would pick for this role, and why. */
  recommendedRuntime: RuntimeId
  runtimeReason: string
  /** Plan slug this role is realistically usable from. */
  fromPlan: string
  /** What you should have ready before deploying. */
  bringYourOwn: string[]
  faqs: { q: string; a: string }[]
}

export const AGENT_MARKETING: Record<string, AgentMarketing> = {
  support: {
    headline: "The first reply, at 3am, every time",
    tagline: "Triages tickets, answers from your docs, escalates the rest.",
    team: "Support",
    responsibilities: [
      "Read an incoming ticket and classify it by urgency and intent",
      "Answer from your uploaded documentation and cite the file it used",
      "Say plainly when your material does not cover the question",
      "Escalate to a human when its confidence is low, with the context attached",
      "Acknowledge the frustration before proposing the fix",
    ],
    usesCapabilities: ["knowledge_base", "web_search", "browser"],
    recommendedRuntime: "openclaw",
    runtimeReason:
      "Support is chat-shaped work, and OpenClaw's admin-login chat UI is exactly that. Pick Hermes instead if you want to drive replies from your own helpdesk over the API.",
    fromPlan: "lite",
    bringYourOwn: [
      "Your help docs, FAQs, or policy pages to upload",
      "The tone you want it to use with customers",
      "Where it should escalate to",
    ],
    faqs: [
      {
        q: "Will it make things up when it does not know?",
        a: "It is instructed not to. The knowledge-base skill grounds answers in your uploaded material, cites the source file, and states plainly when a question is not covered rather than guessing. You should still review its answers before pointing customers at it unsupervised.",
      },
      {
        q: "Can it plug into my existing helpdesk?",
        a: "Not as a native integration today. Deploy it on the Hermes runtime and you get an OpenAI-compatible API at /v1/*, which is what you would point your helpdesk at. Native MCP connectors for tools like Gmail and Slack are on the roadmap, not shipped.",
      },
      {
        q: "What happens to customer data?",
        a: "It stays on your own isolated instance. Every agent is dedicated to your account and never shared. Uploaded documents live in that agent's workspace, and queries are scoped to your account.",
      },
    ],
  },
  devops: {
    headline: "The on-call engineer who reads every log line",
    tagline: "Watches infrastructure, triages incidents, reports in plain terms.",
    team: "Engineering",
    responsibilities: [
      "Work an incident backwards from the most recent error",
      "Summarize what changed and what is actually broken",
      "Check service health on a schedule instead of when someone notices",
      "Draft the deploy or rollback steps for a human to approve",
      "Communicate in terse, actionable language with no narration",
    ],
    usesCapabilities: ["browser", "web_search", "knowledge_base"],
    recommendedRuntime: "hermes",
    runtimeReason:
      "DevOps work is usually triggered by something else — a webhook, a monitor, a CI job. Hermes exposes an OpenAI-compatible API at /v1/*, so your existing tooling can wake the agent up.",
    fromPlan: "operator",
    bringYourOwn: [
      "Runbooks and architecture notes to upload",
      "Read access to whatever you want it watching",
      "A clear boundary on what it may do unattended",
    ],
    faqs: [
      {
        q: "Can it run commands on my infrastructure?",
        a: "Not yet. The code and terminal capability is built but not wired end to end — it is listed as coming soon, and the API rejects enabling it. Today the agent reads, reasons, and drafts; a human executes.",
      },
      {
        q: "How do I trigger it from CI?",
        a: "Deploy it on Hermes. You get a bearer-token API at /v1/* on your agent's own URL that any OpenAI SDK can call, so a CI step, a monitor webhook, or a cron job can hand it work.",
      },
    ],
  },
  automation: {
    headline: "The workflows nobody wants to own",
    tagline: "Runs multi-step business operations without a human in the loop.",
    team: "Operations",
    responsibilities: [
      "Move data between systems on a schedule",
      "Process approvals against rules you set",
      "Generate the recurring reports nobody remembers to run",
      "Build and operate n8n workflows by driving the interface",
      "Prefer deterministic execution over exploratory reasoning",
    ],
    usesCapabilities: ["n8n", "browser", "web_search", "knowledge_base"],
    recommendedRuntime: "openclaw",
    runtimeReason:
      "Automation runs on its own schedule and rarely needs a programmable endpoint. OpenClaw runs on every plan and provisions with the fewest moving parts.",
    fromPlan: "builder",
    bringYourOwn: [
      "The process, written down as you would explain it to a new hire",
      "Logins for whatever it needs to operate",
      "The rule for when it should stop and ask",
    ],
    faqs: [
      {
        q: "How is this different from just using n8n?",
        a: "The agent gets its own self-hosted n8n server and builds the workflows itself by operating the interface. You describe the outcome instead of wiring the nodes. n8n is still there if you want to open it and edit by hand.",
      },
      {
        q: "What if a workflow breaks?",
        a: "You get live logs and one-click restart from the dashboard, on the agent's own box. There is no autonomous self-healing — a broken workflow stays broken until you or the agent is told about it.",
      },
    ],
  },
  research: {
    headline: "The analyst who actually reads the sources",
    tagline: "Gathers, compares, and synthesizes — with the receipts.",
    team: "Operations",
    responsibilities: [
      "Search the live web rather than answering from training data",
      "Open pages and read what is on them",
      "Compare sources and flag where they disagree",
      "Separate what is a fact from what is an inference",
      "Summarize first, expand on request",
    ],
    usesCapabilities: ["web_search", "browser", "knowledge_base"],
    recommendedRuntime: "openclaw",
    runtimeReason:
      "Research is conversational — you ask, it digs, you ask again. OpenClaw's chat UI fits that loop and runs on any plan.",
    fromPlan: "operator",
    bringYourOwn: [
      "The question, framed as precisely as you can",
      "Sources you already trust, uploaded as a starting point",
      "A search-provider API key if you want live search",
    ],
    faqs: [
      {
        q: "Does it cite what it found?",
        a: "For your uploaded material, yes — the knowledge-base skill cites the source file. For live web results, it works from pages it actually opened, so you can ask it which ones.",
      },
    ],
  },
  content: {
    headline: "A writer who already knows your voice",
    tagline: "Drafts, edits, and optimizes — in your tone, not a model's.",
    team: "Marketing",
    responsibilities: [
      "Propose a structure before drafting anything long",
      "Draft posts, newsletters, and page copy in your brand voice",
      "Research the topic live rather than from memory",
      "Edit existing copy against a brief",
      "Optimize for search without writing for robots",
    ],
    usesCapabilities: ["web_search", "browser", "knowledge_base", "image_gen"],
    recommendedRuntime: "hermes",
    runtimeReason:
      "Hermes is the only runtime with image generation, which matters when the draft needs artwork alongside it.",
    fromPlan: "operator",
    bringYourOwn: [
      "Writing you consider on-voice, uploaded as reference",
      "Your style rules — the things you never say",
      "An image-provider API key if you want generated artwork",
    ],
    faqs: [
      {
        q: "How does it learn our voice?",
        a: "You upload writing you consider on-voice to its knowledge base and tell it the rules in its instructions. It is prompt-level, not fine-tuning — which means you can change its voice in a minute rather than a training run.",
      },
      {
        q: "Can it publish directly to our CMS?",
        a: "Not natively today. It drafts; you publish. Direct connectors depend on MCP servers, which are on the roadmap and not shipped.",
      },
    ],
  },
  sales: {
    headline: "Pipeline work that happens whether or not anyone is at a desk",
    tagline: "Qualifies leads, runs sequences, keeps the CRM honest.",
    team: "Revenue",
    responsibilities: [
      "Score inbound leads against your criteria",
      "Route only the ones worth a human's time",
      "Run multi-step outreach that ends on a clear ask",
      "Enrich records from public sources",
      "Keep messages concise and outcome-driven",
    ],
    usesCapabilities: ["web_search", "browser", "knowledge_base"],
    recommendedRuntime: "openclaw",
    runtimeReason:
      "Sequencing and qualification are scheduled, self-contained work. OpenClaw handles it without the extra surface Hermes brings.",
    fromPlan: "operator",
    bringYourOwn: [
      "What actually makes a lead qualified for you",
      "Your current sequences, so it has a baseline",
      "Access to whatever holds your lead data",
    ],
    faqs: [
      {
        q: "Will it email prospects on its own?",
        a: "Only through tooling you connect and permit. There is no built-in mail sender — you decide what it may send and through what. Treat unattended outbound as a decision you make deliberately, not a default.",
      },
    ],
  },
  social: {
    headline: "A social team that posts on the days you are busy",
    tagline: "Plans calendars, writes native, adapts tone per platform.",
    team: "Marketing",
    responsibilities: [
      "Build a content calendar rather than posting reactively",
      "Write platform-native — LinkedIn is not Twitter is not Instagram",
      "Generate accompanying artwork",
      "Read engagement and propose what to do differently",
      "Keep a consistent voice across channels",
    ],
    usesCapabilities: ["web_search", "browser", "image_gen", "knowledge_base"],
    recommendedRuntime: "hermes",
    runtimeReason:
      "Social needs images as often as words, and image generation is Hermes-only.",
    fromPlan: "operator",
    bringYourOwn: [
      "Your posting cadence and channels",
      "Past posts that performed, as reference",
      "An image-provider API key for generated artwork",
    ],
    faqs: [
      {
        q: "Can it post for us automatically?",
        a: "It plans and drafts. Publishing means connecting a scheduler it can drive — which it can do through its browser, or through its own n8n server. We would not recommend fully unattended posting until you trust its voice.",
      },
    ],
  },
  custom: {
    headline: "The role that is not on this list",
    tagline: "A bespoke agent shaped to a job only you have.",
    team: "Operations",
    responsibilities: [
      "Adapt to your domain and your instructions",
      "Ask clarifying questions when a task is ambiguous",
      "Combine capabilities the preset roles keep separate",
      "Coordinate with your other agents",
    ],
    usesCapabilities: ["browser", "web_search", "knowledge_base", "n8n"],
    recommendedRuntime: "hermes",
    runtimeReason:
      "Bespoke usually means something else calls it. Hermes gives you both a browser UI and a programmable API on the same agent.",
    fromPlan: "enterprise",
    bringYourOwn: [
      "The job, described the way you would brief a contractor",
      "Whatever systems it needs to reach",
      "Your definition of done",
    ],
    faqs: [
      {
        q: "What counts as custom?",
        a: "Anything the eight preset roles do not fit — a domain-specific workflow, several agents coordinating, or an integration that has to be built. Start with a conversation rather than the deploy wizard.",
      },
    ],
  },
}

/** Teams present in the catalog, in display order. Drives the /agents filter. */
export const AGENT_TEAMS = [
  "Support",
  "Engineering",
  "Revenue",
  "Marketing",
  "Operations",
] as const

export type AgentTeam = (typeof AGENT_TEAMS)[number]

/**
 * Every category joined to its marketing depth. Throws at module load if a
 * category has no entry — a missing role should break the build, not silently
 * render an empty page.
 */
export const AGENTS = AGENT_CATEGORIES.map((category) => {
  const marketing = AGENT_MARKETING[category.slug]
  if (!marketing) {
    throw new Error(
      `agent-marketing.ts is missing an entry for "${category.slug}". Every AGENT_CATEGORIES slug needs one.`,
    )
  }
  return { ...category, ...marketing }
})

export type Agent = (typeof AGENTS)[number]

export function findAgent(slug: string): Agent | undefined {
  return AGENTS.find((a) => a.slug === slug)
}

export function agentsForTeam(team: AgentTeam): Agent[] {
  return AGENTS.filter((a) => a.team === team)
}
