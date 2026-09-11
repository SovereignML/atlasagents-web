import Link from "next/link"
import { Section } from "@/components/marketing/primitives"
import { RevealGroup, RevealItem } from "@/components/marketing/motion/reveal"
import { AGENTS } from "@/configs/agent-marketing"

/**
 * The role catalog, as a homepage strip. Deliberately shows all eight rather
 * than a curated three — the breadth *is* the pitch, and a visitor scanning for
 * their own job title should find it here without a click.
 */
export function AgentRoles({ index }: { index?: number } = {}) {
  return (
    <Section
      index={index}
      id="agents"
      eyebrow="The roles"
      align="center"
      title="Hire the specialist, not the model"
      lead="Each role ships with its own operating instructions: how a support specialist should escalate, how a DevOps engineer should read an incident. You adjust from there instead of starting from nothing."
    >
      <RevealGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {AGENTS.map((agent) => (
          <RevealItem key={agent.slug} className="h-full">
            <Link
              href={`/agents/${agent.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-hero/[0.10] bg-hero/[0.02] p-5 transition-colors hover:border-hero/25 hover:bg-hero/[0.04]"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-hero/40">
                {agent.team}
              </span>
              <h3 className="mt-3 text-[15px] font-medium text-hero-white">{agent.name}</h3>
              <p className="mt-2 flex-1 text-[14px] leading-[1.55] text-hero/65">
                {agent.tagline}
              </p>
              <span
                aria-hidden
                className="mt-4 text-[13px] font-medium text-signal opacity-0 transition-opacity group-hover:opacity-100"
              >
                What it does →
              </span>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-8 text-center">
        <Link
          href="/agents"
          className="inline-flex items-center gap-2 text-[14px] font-medium text-signal hover:underline underline-offset-4"
        >
          Compare all eight roles
          <span aria-hidden>→</span>
        </Link>
      </div>
    </Section>
  )
}
