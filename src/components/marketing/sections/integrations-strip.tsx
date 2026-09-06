import Link from "next/link"
import { Section } from "@/components/marketing/primitives"
import { IntegrationConstellation } from "./integration-constellation"
import { INTEGRATION_GROUPS } from "@/configs/integrations"

const total = INTEGRATION_GROUPS.reduce((n, g) => n + g.items.length, 0)

/**
 * The logo marquee, with the heading it was missing. On its own it rendered as
 * an unlabelled strip of dim icons between two headed sections — breadth is a
 * fair thing to show, but only if the reader is told what they are looking at.
 *
 * The marquee itself stays full-bleed; only the heading sits in the gutter.
 */
export function IntegrationsStrip({ index }: { index?: number } = {}) {
  return (
    <>
      <Section
      index={index}
        id="integrations"
        eyebrow="Breadth"
        title="Model-agnostic on purpose"
        lead="Agents route to models through OpenRouter, so the model behind an agent is a setting rather than a rebuild. When something better ships, you switch to it."
        className="!pb-0"
      >
        <Link
          href="/integrations"
          className="inline-flex items-center gap-2 text-[14px] font-medium text-signal hover:underline underline-offset-4"
        >
          All {total} models, clouds and tools
          <span aria-hidden>→</span>
        </Link>
      </Section>
      <IntegrationConstellation />
    </>
  )
}
