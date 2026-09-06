import type { Metadata } from "next"
import Link from "next/link"
import {
  PageHero,
  Section,
  SectionIndex,
  SpecTable,
  DecisionMatrix,
  IncludedList,
  type SpecColumn,
} from "@/components/marketing/primitives"
import { Reveal, RevealGroup, RevealItem } from "@/components/marketing/motion/reveal"
import { ManagedPlansSection, ByosSection, CreditTerm } from "@/components/marketing/pricing"
import { serverRows } from "@/components/marketing/sections/server-sizes"
import {
  OVERAGE_PACKS,
  ADD_ONS,
  BYOS_PLAN,
  findPlanBySlug,
  formatUsd,
} from "@/configs/plans"
import {
  DEPLOYMENT_MODES,
  DEPLOYMENT_MODE_MATRIX,
  INCLUDED_EVERYWHERE,
} from "@/configs/deployment-modes"
import { SERVER_CATEGORIES } from "@/configs/server-types"
import { BRANDING } from "@/configs/branding"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "What Atlas Agents costs, at spec level: managed plans from $9/mo, nine server sizes with published prices, bring-your-own-server management at $2.50/mo, credits, overage packs, and add-ons.",
  alternates: { canonical: "/pricing" },
}

const SIZE_COLUMNS: SpecColumn[] = [
  { key: "label", header: "Size", sticky: true },
  { key: "vcpu", header: "vCPU", numeric: true },
  { key: "ram", header: "RAM", numeric: true },
  { key: "storage", header: "Storage", numeric: true },
  { key: "price", header: "Per month", numeric: true },
]

const litePlan = findPlanBySlug("lite")
const enterprisePlan = findPlanBySlug("enterprise")

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Four things we sell, priced in the open"
        lead="Plans differ by credits, live agents, and seats. They do not differ by whether your data is isolated, whether you get logs, or whether SSL is included — those are in every price on this page."
        facts={[
          litePlan ? `Plans from ${formatUsd(litePlan.displayPriceMonthly)}/mo` : "",
          `BYOS ${formatUsd(BYOS_PLAN.displayPriceMonthly)}/mo`,
          "9 server sizes",
          "Free demo, no card",
        ].filter(Boolean)}
      />

      <Section className="!pt-6">
        <SectionIndex
          entries={[
            {
              href: "#plans",
              label: "Managed plans",
              summary: "We own and run the server. What most people buy.",
              value: litePlan ? `From ${formatUsd(litePlan.displayPriceMonthly)}/mo` : undefined,
            },
            {
              href: "#sizes",
              label: "Server sizes",
              summary: "Nine machines, shared and dedicated CPU, with published specs.",
              value: "From $5/mo",
            },
            {
              href: "#byos",
              label: "Bring your own server",
              summary: "You own the box; we manage the agent on it over SSH.",
              value: `${formatUsd(BYOS_PLAN.displayPriceMonthly)}/mo`,
            },
            {
              href: "#credits",
              label: "Credits, overage & add-ons",
              summary: "What model usage costs once you pass your plan's allowance.",
              value: `From ${formatUsd(OVERAGE_PACKS[0].priceUsd)}`,
            },
            {
              href: "#enterprise",
              label: "Enterprise",
              summary: "Volume pricing, an SLA, custom integrations, unlimited seats.",
              value: enterprisePlan?.enterprisePriceLabel,
            },
          ]}
        />
      </Section>

      <Section
        id="plans"
        eyebrow="Managed plans"
        title="We run the server. You run the agent."
        lead="Every self-serve plan provisions a real, isolated machine. What changes between tiers is your credit allowance, how many agents stay live, and how many people can log in."
      >
        <ManagedPlansSection />
      </Section>

      <Section
        id="sizes"
        eyebrow="Server sizes"
        title="Nine machines, published specs"
        lead="Shared vCPU covers most agent work. Dedicated cores are there for production agents that must not contend for CPU. You can resize later without rebuilding the agent."
      >
        <SpecTable
          columns={SIZE_COLUMNS}
          rows={serverRows()}
          caption="Storage is expandable per GB beyond the included allocation. Prices are for the machine; your plan's credits cover model usage separately."
        />

        <RevealGroup className="mt-8 grid gap-3 sm:grid-cols-2">
          {SERVER_CATEGORIES.map((cat) => (
            <RevealItem
              key={cat.category}
              className="rounded-2xl border border-hero/[0.10] bg-hero/[0.02] p-5"
            >
              <h3 className="text-[15px] font-medium text-hero-white">{cat.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.55] text-hero/65">{cat.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <p className="mt-6 text-[13px] leading-[1.6] text-hero/45">
          Hermes needs at least 2 GB of RAM — the 1 GB tier runs OpenClaw only. See{" "}
          <Link href="/runtimes" className="text-signal hover:underline underline-offset-4">
            runtimes
          </Link>{" "}
          for what that changes.
        </p>
      </Section>

      <Section
        id="byos"
        eyebrow="Bring your own server"
        title="Keep your hardware. Hand us the agent."
        lead="Paste one public key into your server's authorized_keys and we take it from there — install, run, monitor, restart, configure, back up. There is no daemon for you to install and no compute for us to bill."
      >
        <ByosSection />
      </Section>

      <Section
        id="credits"
        eyebrow="Usage"
        title="What a credit actually pays for"
        lead="Credits meter the AI, not the server. Your plan includes an allowance; going past it buys an overage pack rather than cutting the agent off."
      >
        <Reveal>
          <ul className="grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-4">
            {["Model usage", "Workflows", "Automations", "Vector search"].map((item) => (
              <li
                key={item}
                className="border-b border-hero/[0.06] py-3 text-[15px] text-hero/80"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[14px] leading-[1.6] text-hero/55">
            <CreditTerm>Credits</CreditTerm> reset each billing period. On bring-your-own-server
            you can skip them entirely and use your own provider API key instead.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.12em] text-hero/40">
              Overage packs
            </h3>
            <RevealGroup className="mt-4 space-y-0">
              {OVERAGE_PACKS.map((pack) => (
                <RevealItem
                  key={pack.credits}
                  className="flex items-center justify-between border-b border-hero/[0.06] py-3.5"
                >
                  <span className="text-[15px] text-hero-white">
                    {pack.credits.toLocaleString("en-US")} credits
                  </span>
                  <span className="font-mono text-[15px] tabular-nums text-signal">
                    {formatUsd(pack.priceUsd)}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
            <p className="mt-4 text-[13px] text-hero/45">
              Only bought when you pass your plan&apos;s allowance.
            </p>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.12em] text-hero/40">
              Add-ons
            </h3>
            <RevealGroup className="mt-4 space-y-0">
              {ADD_ONS.map((addon) => (
                <RevealItem
                  key={addon.name}
                  className="flex items-center justify-between gap-4 border-b border-hero/[0.06] py-3.5"
                >
                  <span className="text-[15px] text-hero-white">{addon.name}</span>
                  <span className="shrink-0 font-mono text-[15px] text-signal">
                    {addon.price}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Section>

      <Section
        id="included"
        eyebrow="On every plan"
        title="None of this is an upsell tier"
        lead="Isolation, SSL, logs, backups, and your own domain are what running an agent requires. Charging separately for them would just be charging twice."
      >
        <IncludedList items={INCLUDED_EVERYWHERE} />
      </Section>

      <Section
        id="which"
        eyebrow="Which one am I?"
        title="If you are still deciding, decide here"
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

      <Section
        id="enterprise"
        eyebrow="Enterprise"
        title="Volume, an SLA, and someone to call"
        lead="Custom credit allocation and volume pricing, a contractual SLA, custom integrations, dedicated support, and unlimited seats. Start with a conversation rather than a checkout."
        width="narrow"
      >
        <Reveal className="rounded-2xl border border-hero/[0.10] bg-hero/[0.02] p-8">
          <p className="font-mono text-[15px] text-signal">
            {enterprisePlan?.enterprisePriceLabel ?? "From $499/mo"}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href={BRANDING.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-green !py-3 !px-7 !text-[15px]"
            >
              Book a call
            </a>
            <Link
              href="/comparison"
              className="text-[14px] font-medium text-hero/60 hover:text-hero-white"
            >
              How we compare →
            </Link>
          </div>
        </Reveal>

        <p className="mt-8 text-center font-mono text-[13px] text-hero/40">
          Payments processed securely via Stripe. Cancel anytime.
        </p>
      </Section>
    </>
  )
}
