import { RevealGroup, RevealItem } from "@/components/marketing/motion/reveal"

export type Step = {
  title: string
  description: string
  /** Optional mono detail — a command, a value, a time. */
  detail?: string
}

/**
 * Numbered steps for "how a deploy actually works". Horizontal on wide screens
 * with a connecting rule; a plain vertical list on narrow ones, where a
 * horizontal flow would just be four cramped columns.
 */
export function StepFlow({ steps }: { steps: readonly Step[] }) {
  return (
    <RevealGroup className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      {/* The rule threading the numbers together. Wide screens only. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-[15px] hidden h-px bg-hero/[0.10] lg:block"
      />
      {steps.map((step, i) => (
        <RevealItem key={step.title} className="relative">
          <div className="flex items-center gap-3">
            <span className="relative z-10 flex h-[31px] w-[31px] shrink-0 items-center justify-center rounded-full border border-hero/[0.14] bg-[#141009] font-mono text-[12px] tabular-nums text-signal">
              {i + 1}
            </span>
            <div aria-hidden className="h-px flex-1 bg-hero/[0.10] lg:hidden" />
          </div>
          <h3 className="mt-4 text-[15px] font-medium text-hero-white">{step.title}</h3>
          <p className="mt-2 text-[14px] leading-[1.55] text-hero/65">{step.description}</p>
          {step.detail && (
            <p className="mt-3 font-mono text-[12px] text-hero/40">{step.detail}</p>
          )}
        </RevealItem>
      ))}
    </RevealGroup>
  )
}
