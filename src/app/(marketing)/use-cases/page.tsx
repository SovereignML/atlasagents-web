import type { Metadata } from "next"
import Link from "next/link"
import { PageHero, Section, Hairline } from "@/components/marketing/primitives"
import { Reveal, RevealGroup, RevealItem } from "@/components/marketing/motion/reveal"
import { USE_CASES_WITH_AGENTS } from "@/configs/use-cases"

export const metadata: Metadata = {
  title: "Use cases",
  description:
    "What teams actually hand to an agent — support queues, incident triage, lead qualification, content calendars, and the small processes that hold operations together.",
  alternates: { canonical: "/use-cases" },
}

export default function UseCasesPage() {
  return (
    <>
      <PageHero
        eyebrow="Use cases"
        title="The work that never gets done on time"
        lead="Not because anyone is bad at their job — because it is repetitive, it arrives at inconvenient hours, and it always loses to whatever is on fire. That is the work worth handing over first."
        facts={[`${USE_CASES_WITH_AGENTS.length} teams`, "8 agent roles", "Start with one"]}
        primary={{ label: "Deploy an agent free", href: "/register?deploy=true" }}
        secondary={{ label: "Browse all roles", href: "/agents" }}
      />

      {USE_CASES_WITH_AGENTS.map(({ team, useCase, agents }, index) => {
        if (!useCase) return null
        return (
          <Section key={team} id={team.toLowerCase()} eyebrow={team} title={useCase.solution.split(".")[0] + "."}>
            {index > 0 && <Hairline className="-mt-8 mb-14" />}

            <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
              <Reveal>
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-hero/40">
                  The situation
                </p>
                <p className="mt-3 text-[16px] leading-[1.65] text-hero/75">{useCase.problem}</p>

                <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.12em] text-hero/40">
                  What changes
                </p>
                <p className="mt-3 text-[16px] leading-[1.65] text-hero-white/90">
                  {useCase.outcome}
                </p>
              </Reveal>

              <div>
                <RevealGroup className="space-y-0">
                  {useCase.tasks.map((task) => (
                    <RevealItem
                      key={task}
                      className="flex items-start gap-3 border-b border-hero/[0.06] py-3 text-[14px] leading-[1.5] text-hero/75"
                    >
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden className="mt-1 shrink-0">
                        <path
                          d="M3.5 8.5l3 3 6-7"
                          stroke="var(--color-signal)"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {task}
                    </RevealItem>
                  ))}
                </RevealGroup>

                {agents.length > 0 && (
                  <Reveal className="mt-6 flex flex-wrap gap-2">
                    {agents.map((agent) => (
                      <Link
                        key={agent.slug}
                        href={`/agents/${agent.slug}`}
                        className="inline-flex items-center gap-2 rounded-full border border-hero/[0.12] px-4 py-1.5 text-[13px] font-medium text-hero/75 transition-colors hover:border-signal/40 hover:text-hero-white"
                      >
                        {agent.name}
                        <span aria-hidden className="text-signal">
                          →
                        </span>
                      </Link>
                    ))}
                  </Reveal>
                )}
              </div>
            </div>
          </Section>
        )
      })}

      <Section
        eyebrow="Where to start"
        title="One agent, one job, one week"
        lead="Pick the most repetitive thing on the list above and give it to a single agent. A fleet is a decision you make after the first one has earned it, not before."
        width="narrow"
      >
        <Reveal className="flex flex-wrap items-center gap-4">
          <Link href="/register?deploy=true" className="btn-green !py-3 !px-7 !text-[15px]">
            Deploy an agent free
          </Link>
          <Link href="/pricing" className="text-[14px] font-medium text-hero/60 hover:text-hero-white">
            See what it costs →
          </Link>
        </Reveal>
      </Section>
    </>
  )
}
