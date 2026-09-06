import { Section, StepFlow, type Step } from "@/components/marketing/primitives"
import { REGIONS } from "@/configs/regions"
import { DEPLOYMENT_MODES } from "@/configs/deployment-modes"

const availableRegions = REGIONS.filter((r) => r.available)

const STEPS: readonly Step[] = [
  {
    title: "Pick a role",
    description:
      "Choose the job you want done. The role decides how the agent introduces itself and how it approaches the work.",
    detail: "8 roles, or custom",
  },
  {
    title: "Pick a runtime",
    description:
      "OpenClaw for a chat interface, Hermes when you also want an OpenAI-compatible API on the same agent.",
    detail: "Switchable later",
  },
  {
    title: "Pick a size and region",
    description:
      "Choose the machine. We route the deploy across our cloud providers and pick the healthiest one for you.",
    detail:
      availableRegions.length > 0
        ? `${availableRegions.map((r) => r.name).join(", ")} · more coming`
        : "Multiple regions",
  },
  {
    title: "Open the URL",
    description:
      "The box is provisioned, the runtime installed, SSL terminated, and the agent is answering at its own address.",
    detail: "Minutes, not an afternoon",
  },
] as const

export function HowDeployWorks({ index }: { index?: number } = {}) {
  const freeMode = DEPLOYMENT_MODES.find((m) => m.id === "free")

  return (
    <Section
      index={index}
      id="deploy"
      eyebrow="How it works"
      title="Four choices, then it is running"
      lead="There is no infrastructure step you have to do yourself. You are not handed a server and a README — you are handed a working agent at a URL."
    >
      <StepFlow steps={STEPS} />

      {freeMode && (
        <p className="mt-10 border-t border-hero/[0.08] pt-6 text-[14px] leading-[1.6] text-hero/55">
          You can walk this whole flow without a card. {freeMode.summary}
        </p>
      )}
    </Section>
  )
}
