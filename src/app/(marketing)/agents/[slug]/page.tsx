import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  PageHero,
  Section,
  SpecTable,
  IncludedList,
  Hairline,
  type SpecColumn,
} from "@/components/marketing/primitives"
import { RevealGroup, RevealItem, Reveal } from "@/components/marketing/motion/reveal"
import { AGENTS, findAgent } from "@/configs/agent-marketing"
import { findRuntime } from "@/configs/runtimes"
import { findCapability } from "@/configs/capabilities"
import { findPlanBySlug, formatUsd } from "@/configs/plans"
import { skillsForCategory } from "@/configs/capabilities"

// Every role is known at build time, so all eight pages prerender as static.
export function generateStaticParams() {
  return AGENTS.map((agent) => ({ slug: agent.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const agent = findAgent(slug)
  if (!agent) return {}
  return {
    title: agent.name,
    description: `${agent.tagline} ${agent.description}`,
    alternates: { canonical: `/agents/${agent.slug}` },
  }
}

const SPEC_COLUMNS: SpecColumn[] = [
  { key: "label", header: "Detail", sticky: true },
  { key: "value", header: "Value" },
]

export default async function AgentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const agent = findAgent(slug)
  if (!agent) notFound()

  const runtime = findRuntime(agent.recommendedRuntime)
  const plan = findPlanBySlug(agent.fromPlan)
  const capabilities = agent.usesCapabilities
    .map(findCapability)
    .filter((c) => c !== undefined)
  const skills = skillsForCategory(agent.slug)

  return (
    <>
      <PageHero
        eyebrow={`${agent.team} · Agent role`}
        title={agent.headline}
        lead={agent.description}
        facts={[
          `Identifies as: ${agent.role}`,
          `Recommended runtime: ${runtime.name}`,
          plan ? `From ${plan.name} · ${formatUsd(plan.displayPriceMonthly)}/mo` : "",
        ].filter(Boolean)}
        primary={{ label: `Deploy a ${agent.name.toLowerCase()}`, href: "/register?deploy=true" }}
        secondary={{ label: "All roles", href: "/agents" }}
      />

      <Section
        eyebrow="What it does"
        title="The work it takes over"
        lead="Written as things a person would otherwise be doing, because that is the comparison that matters."
      >
        <IncludedList items={agent.responsibilities} columns={2} />
      </Section>

      <Section
        eyebrow="Setup"
        title="What to have ready"
        lead="An agent is only as good as its brief. These are the inputs that make the difference between a demo and something you would actually let near your customers."
        width="narrow"
      >
        <RevealGroup className="grid gap-3 sm:grid-cols-2">
          {agent.bringYourOwn.map((item) => (
            <RevealItem
              key={item}
              className="rounded-2xl border border-hero/[0.10] bg-hero/[0.02] p-5 text-[14px] leading-[1.55] text-hero/75"
            >
              {item}
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section eyebrow="Configuration" title="What we would pick" width="wide">
        <SpecTable
          columns={SPEC_COLUMNS}
          rows={[
            {
              key: "runtime",
              cells: { label: "Recommended runtime", value: `${runtime.name} — ${agent.runtimeReason}` },
            },
            {
              key: "plan",
              cells: {
                label: "Realistic from",
                value: plan
                  ? `${plan.name} · ${formatUsd(plan.displayPriceMonthly)}/mo · ${plan.creditsPerPeriod.toLocaleString("en-US")} credits`
                  : "Contact sales",
              },
            },
            {
              key: "identity",
              cells: { label: "Identifies as", value: agent.role },
            },
            {
              key: "capabilities",
              cells: {
                label: "Capabilities used",
                value: capabilities.map((c) => c.name).join(", "),
              },
            },
          ]}
          caption="A starting point, not a constraint — runtime, size, and capabilities are all changeable after deploy."
        />

        {capabilities.some((c) => c.status === "coming-soon") && (
          <p className="mt-4 text-[13px] text-hero/45">
            Some capabilities above are listed in the product as coming soon and cannot be
            enabled yet.
          </p>
        )}
      </Section>

      {skills.length > 0 && (
        <Section
          eyebrow="Playbooks"
          title="Skills it can be given"
          lead="Skills are prompt playbooks, not infrastructure — battle-tested guidance written into the agent's instructions so you are not authoring them from scratch."
        >
          <RevealGroup className="grid gap-3 sm:grid-cols-2">
            {skills.map((skill) => (
              <RevealItem
                key={skill.id}
                className="rounded-2xl border border-hero/[0.10] bg-hero/[0.02] p-5"
              >
                <h3 className="text-[15px] font-medium text-hero-white">{skill.name}</h3>
                <p className="mt-2 text-[14px] leading-[1.55] text-hero/65">
                  {skill.description}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      )}

      <Section eyebrow="Questions" title="Before you deploy one" width="narrow">
        <div className="space-y-6">
          {agent.faqs.map((faq) => (
            <Reveal key={faq.q}>
              <h3 className="text-[16px] font-medium text-hero-white">{faq.q}</h3>
              <p className="mt-2 text-[15px] leading-[1.6] text-hero/70">{faq.a}</p>
            </Reveal>
          ))}
        </div>

        <Hairline className="my-10" />

        <Reveal className="flex flex-wrap items-center gap-4">
          <Link href="/register?deploy=true" className="btn-green !py-3 !px-7 !text-[15px]">
            Deploy a {agent.name.toLowerCase()}
          </Link>
          <Link
            href="/agents"
            className="text-[14px] font-medium text-hero/60 hover:text-hero-white"
          >
            Compare all eight roles →
          </Link>
        </Reveal>
      </Section>
    </>
  )
}
