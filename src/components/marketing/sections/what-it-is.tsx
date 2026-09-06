import { Section } from "@/components/marketing/primitives"
import { RevealGroup, RevealItem } from "@/components/marketing/motion/reveal"

// Three things, because a deployed agent is three things — and visitors who
// leave confused are usually confused about which of them they are buying.
const PILLARS = [
  {
    label: "The agent",
    title: "A role, not a chatbot",
    body: "You pick a job — support, DevOps, sales, research — and the agent identifies as that specialist. It comes with a playbook for how that role works, so you are not writing prompts from a blank page.",
    detail: "8 roles · or bring your own",
  },
  {
    label: "The box",
    title: "Your own server, not a seat",
    body: "Every agent gets its own isolated instance with a public URL and SSL. Nothing is shared with another customer, and the root password is encrypted at rest — we cannot read it back either.",
    detail: "1–32 GB · 9 sizes",
  },
  {
    label: "The panel",
    title: "The part you actually use",
    body: "Deploy, watch live logs, restart, rotate credentials, back settings up to your own Drive, point it at your own domain. The things that turn a running process into something you can operate.",
    detail: "Managed, or on your box",
  },
] as const

export function WhatItIs({ index }: { index?: number } = {}) {
  return (
    <Section
      index={index}
      id="what-it-is"
      eyebrow="What you get"
      title="An agent, a server, and the panel that runs both"
      lead="Most AI products sell you a seat on their infrastructure. Atlas Agents deploys a specialist onto a machine that is yours, and gives you the controls."
    >
      <RevealGroup className="grid gap-3 lg:grid-cols-3">
        {PILLARS.map((pillar) => (
          <RevealItem
            key={pillar.label}
            className="flex flex-col rounded-2xl border border-hero/[0.10] bg-hero/[0.02] p-6"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-signal">
              {pillar.label}
            </span>
            <h3 className="mt-4 font-serif text-[22px] leading-[1.2] text-hero-white" style={{ fontWeight: 400 }}>
              {pillar.title}
            </h3>
            <p className="mt-3 flex-1 text-[14px] leading-[1.6] text-hero/70">{pillar.body}</p>
            <p className="mt-5 border-t border-hero/[0.08] pt-4 font-mono text-[12px] text-hero/40">
              {pillar.detail}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
