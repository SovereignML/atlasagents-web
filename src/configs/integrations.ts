// What an agent can reach, and what you can connect your own account to.
//
// Two genuinely different things are on this page, and the distinction matters:
//   - MODELS/CLOUDS you can route an agent to, via OpenRouter and our provider
//     router. You do not connect an account for these.
//   - ACCOUNT integrations, where you authorize your own third-party account and
//     we act on it with a narrowly-scoped credential. There are exactly two
//     today (Google Drive, Cloudflare) — see sovereignml-app/docs/INTEGRATIONS.md.
//
// Conflating the two would overstate what is shipped. Keep them separate.

export type IntegrationGroupId = "models" | "runtimes" | "clouds" | "tools"

export type Integration = {
  name: string
  /** Path under /public, e.g. "/assets/icons/openai.svg". */
  icon: string
  /** Icon is a single-color mark that needs inverting on the dark shell. */
  mono?: boolean
}

export type IntegrationGroup = {
  id: IntegrationGroupId
  title: string
  description: string
  items: readonly Integration[]
}

export const INTEGRATION_GROUPS: readonly IntegrationGroup[] = [
  {
    id: "models",
    title: "Models",
    description:
      "Agents route to models through OpenRouter, so the model behind an agent is a setting rather than a rebuild. Swap it when something better ships.",
    items: [
      { name: "Anthropic", icon: "/assets/icons/anthropic.svg", mono: true },
      { name: "Claude", icon: "/assets/icons/claude-color.svg" },
      { name: "OpenAI", icon: "/assets/icons/openai.svg", mono: true },
      { name: "Gemini", icon: "/assets/icons/gemini-color.svg" },
      { name: "Mistral", icon: "/assets/icons/mistral-color.svg" },
      { name: "Meta Llama", icon: "/assets/icons/meta-color.svg" },
      { name: "DeepSeek", icon: "/assets/icons/deepseek-color.svg" },
      { name: "Qwen", icon: "/assets/icons/qwen-color.svg" },
      { name: "MiniMax", icon: "/assets/icons/minimax-color.svg" },
      { name: "Moonshot", icon: "/assets/icons/moonshot.svg", mono: true },
      { name: "Gemma", icon: "/assets/icons/gemma-color.svg" },
      { name: "OpenRouter", icon: "/assets/icons/openrouter.svg", mono: true },
    ],
  },
  {
    id: "runtimes",
    title: "Runtimes & interfaces",
    description:
      "The engine installed on your box, and the interfaces it exposes once it is running.",
    items: [
      { name: "OpenClaw", icon: "/assets/icons/openclaw-color.svg" },
      { name: "Hermes", icon: "/assets/icons/hermesagent.svg" },
      { name: "Open WebUI", icon: "/assets/icons/openwebui.svg", mono: true },
      { name: "Ollama", icon: "/assets/icons/ollama.svg", mono: true },
      { name: "n8n", icon: "/assets/icons/n8n-color.svg" },
    ],
  },
  {
    id: "clouds",
    title: "Where agents run",
    description:
      "Managed agents are provisioned across multiple clouds by our provider router — you pick a size and a region, we pick the provider. Or bring your own box.",
    items: [
      { name: "DigitalOcean", icon: "/assets/icons/DigitalOcean_idYTUpGPhj_0.svg" },
      // Linode is Akamai-owned; the only mark we hold for it is the Akamai one.
      { name: "Linode / Akamai", icon: "/assets/Programs/Akamai_Light.png" },
      { name: "Cloudflare", icon: "/assets/icons/cloudflare-color.svg" },
      { name: "Docker", icon: "/assets/icons/docker.svg", mono: true },
    ],
  },
  {
    id: "tools",
    title: "Tools the agent drives",
    description:
      "Where an agent has no native connector, it uses the same interface a person would — a browser.",
    items: [
      { name: "GitHub", icon: "/assets/icons/github.svg", mono: true },
      { name: "Jira", icon: "/assets/icons/Jira.svg" },
      { name: "Notion", icon: "/assets/icons/notion.svg", mono: true },
      { name: "Shopify", icon: "/assets/icons/shopify.svg" },
      { name: "Discord", icon: "/assets/icons/discord.svg" },
      { name: "Figma", icon: "/assets/icons/figma.svg" },
      { name: "ElevenLabs", icon: "/assets/icons/elevenlabs.svg", mono: true },
    ],
  },
] as const

/**
 * Account integrations — you authorize your own third-party account and we act
 * on it with a minimal scope. These are the only two that exist today; each has
 * one connection per user and a best-effort revoke on disconnect.
 */
export const ACCOUNT_INTEGRATIONS = [
  {
    name: "Google Drive",
    icon: "/assets/icons/aistudio.svg",
    summary: "Back an agent up to a Drive folder you own.",
    detail:
      "Snapshot an agent's settings and behavior to a JSON file in your own Google Drive, and restore it later — into the same agent or a brand new one.",
    scope:
      "Requests only the drive.file scope, so we can touch only the files we create. The rest of your Drive is not visible to us.",
    guarantees: [
      "Settings only — no API keys, hosts, IPs, tokens, or billing data is ever written to a backup",
      "An explicit allowlist of fields, so a new column cannot silently leak into a backup",
      "Restore in place, or restore as a new agent",
    ],
  },
  {
    name: "Cloudflare",
    icon: "/assets/icons/cloudflare-color.svg",
    summary: "Put agents on subdomains of zones you already own.",
    detail:
      "Connect your own Cloudflare account and give an agent a subdomain on one of your zones, instead of a hostname we assigned it.",
    scope:
      "A narrowly-scoped token, stored encrypted at rest with AES-256-GCM, and revoked on a best-effort basis when you disconnect.",
    guarantees: [
      "Your zones stay yours — we create records, we do not take over DNS",
      "Works on managed and bring-your-own-server instances alike",
      "One connection per account, disconnectable at any time",
    ],
  },
] as const

/** Stated plainly rather than left for someone to discover. */
export const INTEGRATION_NOTES: readonly string[] = [
  "Model Context Protocol (MCP) servers — the path to native Gmail, Slack, and custom-tool connectors — are built but not yet wired end to end. They are listed in the product as coming soon and cannot be enabled today.",
  "Logos here indicate what an agent can work with, through a model route, a browser, or its own n8n server. They do not imply a partnership or an endorsement by those companies.",
] as const
