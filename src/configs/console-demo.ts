/**
 * The dummy account behind the console preview on the homepage.
 *
 * Every number here is INVENTED. It is a demo tenant, not a customer and not an
 * aggregate — nothing on this page may be read as a real usage statistic. What
 * it must be is *arithmetically honest*: the figures are derived from each other
 * the same way the real dashboard derives them, so a visitor who checks the math
 * finds it consistent rather than decorative.
 *
 *   runway  = floor(credits / dailyBurnCredits)
 *   $ / day = dailyBurnCredits / CREDITS_PER_USD        (100 credits = $1)
 *   running ≤ totalAgents
 *
 * If you change one figure, re-derive the rest. The console reads these; it does
 * not hardcode a second copy.
 */

/** Credits per US dollar, mirroring `[APP]`'s CREDITS_PER_USD. */
export const CREDITS_PER_USD = 100

const credits = 48_920
const dailyBurnCredits = 1_180

export const CONSOLE_DEMO = {
  /** Shown in the avatar, the account menu and "Welcome back, ...". */
  user: { name: "Admin", initial: "A" },

  totalAgents: 12,
  runningAgents: 11,
  incidents24h: 0,

  credits,
  dailyBurnCredits,
  /** floor(48,920 / 1,180) = 41 */
  runwayDays: Math.floor(credits / dailyBurnCredits),
  /** 1,180 credits = $11.80 */
  dailyBurnUsd: dailyBurnCredits / CREDITS_PER_USD,
  /** The dashboard pauses agents at one day of burn left. */
  autoPauseBelowCredits: dailyBurnCredits,

  /** Runs per day, last 14 days — drives the Agent activity bars. */
  runs14d: [186, 204, 173, 241, 268, 122, 98, 254, 289, 302, 276, 318, 341, 330],

  /** The agent the scripted walkthrough deploys. */
  newAgent: { name: "support-desk", runtimeLabel: "Hermes" },

  /** The fleet, as it would read on /dashboard/instances. */
  agents: [
    { name: "support-desk", role: "Support Agent", runtime: "OpenClaw", status: "running", uptime: "99.98%" },
    { name: "infra-watch", role: "DevOps Agent", runtime: "Hermes", status: "running", uptime: "99.99%" },
    { name: "lead-qualifier", role: "Sales Agent", runtime: "OpenClaw", status: "running", uptime: "99.95%" },
    { name: "content-desk", role: "Content Agent", runtime: "OpenClaw", status: "idle", uptime: "99.97%" },
  ],
} as const

/** Total runs across the 14-day window, so the caption cannot drift from the bars. */
export const CONSOLE_DEMO_TOTAL_RUNS = CONSOLE_DEMO.runs14d.reduce((a, b) => a + b, 0)

/**
 * The deployment cycle the console shows on a brand-new agent.
 *
 * Phases, stage titles and hints are `[APP]`'s VPS_PHASES and
 * PROVISION_STAGE_HINTS (src/lib/deployment-stages.ts), copied verbatim and in
 * order. The product drives these off the provisioner's log stream; the preview
 * drives them off a timer. Never invent a stage here that the product does not
 * actually perform.
 */
export const DEPLOY_PHASES = [
  {
    id: "provision",
    title: "Provision agent",
    stages: [
      { title: "Prepare agent", hint: "Preparing your agent." },
      { title: "Boot agent", hint: "Booting your agent." },
    ],
  },
  {
    id: "connect",
    title: "Connect & bootstrap",
    stages: [
      { title: "Connect", hint: "Establishing a secure connection." },
      { title: "Bootstrap", hint: "Setting up the environment." },
    ],
  },
  {
    id: "configure",
    title: "Configure agent",
    stages: [{ title: "Write configuration", hint: "Writing configuration." }],
  },
  {
    id: "start",
    title: "Start service",
    stages: [
      { title: "Install service", hint: "Installing services and running health checks." },
      { title: "Start gateway", hint: "Starting the agent gateway." },
      { title: "Health check", hint: "Verifying the agent is responding." },
    ],
  },
  {
    id: "finalize",
    title: "Finalize",
    stages: [{ title: "Finalize deployment", hint: "Finalizing deployment and bringing the agent online." }],
  },
] as const

/** Every stage, flattened — the walkthrough advances one index at a time. */
export const DEPLOY_STAGES = DEPLOY_PHASES.flatMap((phase) =>
  phase.stages.map((stage) => ({ ...stage, phaseId: phase.id })),
)
