import { Section } from "@/components/marketing/primitives"
import { DecisionMatrix } from "@/components/marketing/primitives"
import {
  DEPLOYMENT_MODES,
  DEPLOYMENT_MODE_MATRIX,
} from "@/configs/deployment-modes"

/**
 * The site's central piece of choice architecture. Placed high on the page on
 * purpose: the most common reason someone bounces is not knowing which of these
 * four they are, and no amount of feature copy fixes that.
 */
export function ChooseHow({ id = "how", index }: { id?: string; index?: number }) {
  return (
    <Section
      index={index}
      id={id}
      eyebrow="Which one am I?"
      title="Four ways to run an agent. Most people want the second."
      lead="You can try one for free, let us run it, run it on hardware you already own, or hand us the whole fleet. The difference is who owns the server and who pays for it."
    >
      <DecisionMatrix
        rows={DEPLOYMENT_MODE_MATRIX}
        options={DEPLOYMENT_MODES.map((mode) => ({
          key: mode.id,
          name: mode.name,
          forWho: mode.forWho,
          priceLabel: mode.priceLabel,
          priceNote: mode.priceNote,
          cta: mode.cta,
          highlight: mode.id === "managed",
        }))}
      />
    </Section>
  )
}
