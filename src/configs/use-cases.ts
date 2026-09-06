// Use cases, framed by the team that feels the pain. Each one points at the
// agent role that does the work, so /use-cases is a route into /agents rather
// than a parallel set of claims.
//
// Rule for `outcome`: describe what changes about the work, not a number we
// cannot substantiate. No invented metrics.

import { AGENT_TEAMS, type AgentTeam, agentsForTeam } from "@/configs/agent-marketing"

export type UseCase = {
  team: AgentTeam
  /** The situation, in the reader's own words. */
  problem: string
  /** What the agent actually takes over. */
  solution: string
  /** What changes once it is running. Qualitative on purpose. */
  outcome: string
  /** Concrete tasks, for the bulleted list. */
  tasks: string[]
}

export const USE_CASES: readonly UseCase[] = [
  {
    team: "Support",
    problem:
      "Tickets arrive around the clock and get answered during business hours. The easy 60% and the hard 40% sit in the same queue, so everything waits on whoever is free.",
    solution:
      "An agent reads every ticket as it lands, classifies it by urgency and intent, answers what your documentation covers, and escalates the rest with context already attached.",
    outcome:
      "The queue your team opens in the morning contains the tickets that actually needed a person.",
    tasks: [
      "First-response on every ticket, at any hour",
      "Answers grounded in your docs, with the source cited",
      "Triage by urgency and intent before a human sees it",
      "Clean escalation when confidence is low",
    ],
  },
  {
    team: "Engineering",
    problem:
      "Incidents start with fifteen minutes of somebody scrolling logs to work out what broke and when. That work is identical every time and nobody wants to be the one doing it at 2am.",
    solution:
      "An agent that reads backwards from the most recent error, summarizes what changed, and drafts the rollback or fix steps for a human to approve.",
    outcome:
      "On-call starts from a summary instead of a blank terminal.",
    tasks: [
      "Work an incident backwards from the last error",
      "Summarize what changed and what is actually broken",
      "Scheduled health checks instead of user reports",
      "Draft the remediation for a human to approve",
    ],
  },
  {
    team: "Revenue",
    problem:
      "Inbound leads get scored when someone has time, sequences stall halfway, and the CRM is accurate for about a week after each cleanup.",
    solution:
      "An agent that scores every lead against your criteria as it arrives, runs the follow-up sequence on schedule, and enriches records from public sources.",
    outcome:
      "Reps spend their day on the leads that survived qualification, not on qualifying.",
    tasks: [
      "Score and route inbound leads on arrival",
      "Run multi-step sequences that always end on a clear ask",
      "Enrich records from public sources",
      "Flag when a lead's situation has visibly changed",
    ],
  },
  {
    team: "Marketing",
    problem:
      "The content calendar is aspirational. Drafts wait on the one person who knows the brand voice, and social goes quiet whenever a launch takes over.",
    solution:
      "An agent given examples of your on-voice writing that proposes structure, drafts, generates the artwork, and keeps a calendar running per channel.",
    outcome:
      "Publishing stops depending on any one person's free afternoon.",
    tasks: [
      "Propose structure before drafting long-form",
      "Draft in your voice, from examples you supplied",
      "Generate accompanying artwork",
      "Plan platform-native calendars per channel",
    ],
  },
  {
    team: "Operations",
    problem:
      "A dozen small processes hold the business together — invoice approvals, data moves, the monthly report — and each one lives in somebody's head or a spreadsheet macro.",
    solution:
      "An agent with its own self-hosted n8n server that builds and runs those workflows by operating the interface, and asks when a case falls outside the rules.",
    outcome:
      "The processes keep running when the person who invented them is on holiday.",
    tasks: [
      "Move data between systems on schedule",
      "Process approvals against rules you set",
      "Generate the recurring reports nobody remembers",
      "Stop and ask when a case is outside the rules",
    ],
  },
] as const

export function findUseCase(team: AgentTeam): UseCase | undefined {
  return USE_CASES.find((u) => u.team === team)
}

/** Use cases joined to the agent roles that serve them, in team display order. */
export const USE_CASES_WITH_AGENTS = AGENT_TEAMS.map((team) => ({
  team,
  useCase: findUseCase(team),
  agents: agentsForTeam(team),
})).filter((entry) => entry.useCase !== undefined)
