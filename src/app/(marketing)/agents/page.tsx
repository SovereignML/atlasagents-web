import type { Metadata } from "next"
import Link from "next/link"
import { PageHero, Section, CatalogGrid, type CatalogItem } from "@/components/marketing/primitives"
import { AGENTS, AGENT_TEAMS } from "@/configs/agent-marketing"
import { findRuntime } from "@/configs/runtimes"
import { findPlanBySlug } from "@/configs/plans"

export const metadata: Metadata = {
  title: "Agent roles",
  description:
    "Eight agent roles — support, DevOps, automation, research, content, sales, social, and custom. Each ships with its own operating instructions and runs on your own isolated server.",
  alternates: { canonical: "/agents" },
}

const items: CatalogItem[] = AGENTS.map((agent) => ({
  key: agent.slug,
  name: agent.name,
  description: agent.tagline,
  group: agent.team,
  href: `/agents/${agent.slug}`,
  meta: [
    findRuntime(agent.recommendedRuntime).name,
    `From ${findPlanBySlug(agent.fromPlan)?.name ?? "Lite"}`,
  ],
}))

export default function AgentsPage() {
  return (
    <>
      <PageHero
        eyebrow="The roles"
        title="Eight specialists. Pick the job, not the model."
        lead="An agent role is not a preset prompt — it is the job title the agent identifies as, plus the operating instructions for how that job is done well. You adjust from there."
        facts={[
          `${AGENTS.length} roles`,
          "2 runtimes",
          "Your own isolated server",
          "Switchable later",
        ]}
        primary={{ label: "Deploy an agent free", href: "/register?deploy=true" }}
        secondary={{ label: "See pricing", href: "/pricing" }}
      />

      <Section>
        <CatalogGrid items={items} groups={AGENT_TEAMS} allLabel="Every role" columns={4} />
      </Section>

      <Section
        eyebrow="Not on the list?"
        title="Most bespoke work starts as a conversation"
        lead="If none of the eight fit — a domain-specific workflow, several agents coordinating, or an integration that has to be built — start there rather than in the deploy wizard."
        width="narrow"
      >
        <Link
          href="/agents/custom"
          className="inline-flex items-center gap-2 text-[14px] font-medium text-signal hover:underline underline-offset-4"
        >
          How custom agents work
          <span aria-hidden>→</span>
        </Link>
      </Section>
    </>
  )
}
