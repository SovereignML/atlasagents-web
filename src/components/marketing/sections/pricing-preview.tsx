import Link from "next/link"
import { Section } from "@/components/marketing/primitives"
import { ManagedPlansSection } from "@/components/marketing/pricing"
import { BYOS_PLAN, formatUsd } from "@/configs/plans"

/**
 * Plans on the landing page. Replaces the old PricingElevation, which centered
 * itself in a 1100px container and so sat a few pixels off every other section's
 * gutter, and which hid BYOS behind a mode toggle rather than linking to it.
 */
export function PricingPreview() {
  return (
    <Section
      id="pricing"
      eyebrow="Pricing"
      title="Free to start. Priced in the open after that."
      lead="Upgrade when your agents are pulling their weight, not before. Every tier provisions a real isolated machine — what changes is credits, live agents, and seats."
    >
      <ManagedPlansSection />

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 text-[14px] font-medium text-signal hover:underline underline-offset-4"
        >
          Server sizes, credits, overage and add-ons
          <span aria-hidden>→</span>
        </Link>
        <Link
          href="/pricing#byos"
          className="inline-flex items-center gap-2 text-[14px] font-medium text-hero/60 hover:text-hero-white"
        >
          Already own a server? {formatUsd(BYOS_PLAN.displayPriceMonthly)}/mo
          <span aria-hidden>→</span>
        </Link>
      </div>
    </Section>
  )
}
