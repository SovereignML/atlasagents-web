import Link from "next/link"
import { Section, IncludedList } from "@/components/marketing/primitives"
import { INCLUDED_EVERYWHERE } from "@/configs/deployment-modes"

/**
 * The long flat list, on purpose. Cards would force this down to six items and
 * the length is the argument — none of this is an upsell tier.
 */
export function WhatsIncluded({ index }: { index?: number } = {}) {
  return (
    <Section
      index={index}
      id="included"
      eyebrow="On every plan"
      align="center"
      title="None of this is an add-on"
      lead="Isolation, SSL, logs, backups, and your own domain are not the premium tier. They are what running an agent requires, so they are in the base price."
    >
      <IncludedList items={INCLUDED_EVERYWHERE} />

      <p className="mt-8 mx-auto max-w-[640px] text-center text-[14px] text-hero/50">
        Plans differ by credits, live agents, and seats, not by whether your data is
        isolated.{" "}
        <Link
          href="/pricing"
          target="_blank"
          rel="noopener noreferrer"
          className="text-signal hover:underline underline-offset-4"
        >
          See what does change
        </Link>
        .
      </p>
    </Section>
  )
}
