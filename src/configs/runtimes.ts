// The two agent engines Atlas Agents installs on a box. Mirrors the facts in
// sovereignml-app/docs/RUNTIMES.md — when the platform changes, update here.
//
// The runtime is chosen in the deploy wizard's Interface step and stored per
// instance; switching it later re-provisions the box.

export type RuntimeId = "openclaw" | "hermes"

export type RuntimeConfig = {
  id: RuntimeId
  name: string
  /** Who actually builds the engine. */
  vendor: string
  logo: string
  /** One line, for cards and comparison headers. */
  tagline: string
  description: string
  /** Minimum RAM the wizard will let you pick this on, in GB. */
  minRamGb: number
  /** How you (or your bots) actually talk to a deployed agent. */
  interfaces: { name: string; path: string; description: string }[]
  bestFor: string[]
  /** Rendered as the comparison table's rows, in this order. */
  specs: { label: string; value: string }[]
  isDefault?: boolean
}

export const RUNTIMES: readonly RuntimeConfig[] = [
  {
    id: "openclaw",
    name: "OpenClaw",
    vendor: "Open source",
    logo: "/runtimes/openclaw.svg",
    tagline: "The light engine. Runs on every plan.",
    description:
      "OpenClaw is the runtime to pick when the box should stay small. Install is config-only, with no engine CLI to babysit, so it provisions fast and is the only engine that fits the 1 GB plan. You get an admin-login chat UI on your agent's own domain.",
    minRamGb: 1,
    interfaces: [
      {
        name: "Chat UI",
        path: "/",
        description:
          "A browser chat interface behind an admin email and password, on your agent's public URL.",
      },
    ],
    bestFor: [
      "Your first agent",
      "The 1 GB tier, where Hermes will not run",
      "Chat-driven work: support, research, content",
      "Fast provisioning with the fewest moving parts",
    ],
    specs: [
      { label: "Minimum plan", value: "Any — including 1 GB" },
      { label: "Browser chat UI", value: "Yes — admin login at /" },
      { label: "OpenAI-compatible API", value: "No" },
      { label: "Install style", value: "Config-only, no engine CLI" },
      { label: "Web browser tool", value: "Yes" },
      { label: "Web search tool", value: "Yes" },
      { label: "Knowledge base", value: "Yes" },
      { label: "Image generation", value: "No" },
      { label: "Auth", value: "Admin email + password" },
    ],
  },
  {
    id: "hermes",
    name: "Hermes",
    vendor: "Nous Research",
    logo: "/runtimes/hermes.svg",
    tagline: "The default engine. A chat UI and an API behind one URL.",
    description:
      "Hermes is the Nous Research engine, in Python, shipped with a bundled Open WebUI chat interface. What makes it different is the second door: an OpenAI-compatible API at /v1/*, so your own bots and scripts can drive the agent with a bearer token while people use the same agent in a browser.",
    minRamGb: 2,
    isDefault: true,
    interfaces: [
      {
        name: "Open WebUI chat",
        path: "/",
        description:
          "A full browser chat interface with session login, bundled as a sidecar service.",
      },
      {
        name: "OpenAI-compatible API",
        path: "/v1/*",
        description:
          "Point any OpenAI SDK at your agent with a bearer token. CORS-enabled, for bots and scripts.",
      },
    ],
    bestFor: [
      "Anything you want to call from code",
      "Teams who need both a UI and an API on one agent",
      "Image generation",
      "Swapping an existing OpenAI integration onto your own agent",
    ],
    specs: [
      { label: "Minimum plan", value: "2 GB RAM or larger" },
      { label: "Browser chat UI", value: "Yes — Open WebUI at /" },
      { label: "OpenAI-compatible API", value: "Yes — bearer token at /v1/*" },
      { label: "Install style", value: "CLI-driven, needs Node 22.14+" },
      { label: "Web browser tool", value: "Yes" },
      { label: "Web search tool", value: "Yes" },
      { label: "Knowledge base", value: "Yes" },
      { label: "Image generation", value: "Yes" },
      { label: "Auth", value: "WebUI login + separate gateway token" },
    ],
  },
] as const

export const DEFAULT_RUNTIME_ID: RuntimeId = "openclaw"

/** Resolve a runtime by id, falling back to the default. */
export function findRuntime(id: string): RuntimeConfig {
  return (
    RUNTIMES.find((r) => r.id === id) ??
    RUNTIMES.find((r) => r.id === DEFAULT_RUNTIME_ID)!
  )
}

/**
 * Rows for the side-by-side runtime table. Derived from each runtime's `specs`
 * so the two lists can never drift out of alignment — the label order of the
 * first runtime wins, and a runtime missing a label renders an em dash.
 */
export function runtimeComparisonRows(): { label: string; values: string[] }[] {
  return RUNTIMES[0].specs.map((spec) => ({
    label: spec.label,
    values: RUNTIMES.map(
      (r) => r.specs.find((s) => s.label === spec.label)?.value ?? "—",
    ),
  }))
}

/** Caveats worth stating plainly rather than burying — shown under the table. */
export const RUNTIME_NOTES: readonly string[] = [
  "Hermes needs at least 2 GB of RAM. The deploy wizard hides it on the 1 GB tier, and reverts an existing agent to OpenClaw if you downsize onto that tier.",
  "You can switch an agent's runtime later from its settings. Switching re-provisions the box, so treat it as a redeploy rather than a toggle.",
  "A Hermes agent's browser login and its API bearer token are independent credentials. Rotating one does not rotate the other.",
] as const
