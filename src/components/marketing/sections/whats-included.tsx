import Link from "next/link"
import { Section, IncludedList } from "@/components/marketing/primitives"
import { INCLUDED_EVERYWHERE } from "@/configs/deployment-modes"

/**
 * The long flat list, on purpose. Cards would force this down to six items and
 * the length is the argument — none of this is an upsell tier.
 */
export function WhatsIncluded() {
  return (
    <Section
      id="included"
      eyebrow="On every plan"
      title="None of this is an add-on"
      lead="Isolation, SSL, logs, backups, and your own domain are not the premium tier. They are what running an agent requires, so they are in the base price."
    >
      <IncludedList items={INCLUDED_EVERYWHERE} />

      <p className="mt-8 text-[14px] text-hero/50">
        Plans differ by credits, live agents, and seats — not by whether your data is
        isolated.{" "}
        <Link href="/pricing" className="text-signal hover:underline underline-offset-4">
          See what does change
        </Link>
        .
      </p>
    </Section>
  )
}
