import type { Metadata } from "next"
import Link from "next/link"
import { PricingMarketingSection } from "@/components/marketing/pricing"
import {
  Section,
  SectionIndex,
  SpecTable,
  DecisionMatrix,
  IncludedList,
  type SpecColumn,
} from "@/components/marketing/primitives"
import { Reveal, RevealGroup, RevealItem } from "@/components/marketing/motion/reveal"
import { serverRows } from "@/components/marketing/sections/server-sizes"
import { OVERAGE_PACKS, BYOS_PLAN, findPlanBySlug, formatUsd } from "@/configs/plans"
import {
  DEPLOYMENT_MODES,
  DEPLOYMENT_MODE_MATRIX,
  INCLUDED_EVERYWHERE,
} from "@/configs/deployment-modes"
import { SERVER_CATEGORIES } from "@/configs/server-types"

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

export default function PricingPage() {
  return (
    <div className="relative">
      {/* Soft brand glow behind the hero, fading into the page background. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] opacity-60"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, color-mix(in srgb, var(--primary) 10%, transparent) 0%, transparent 70%)",
        }}
      />
      <div className="relative">
        {/* The original pricing page: headline, mode toggle, plan grid, usage,
            overage packs, add-ons, enterprise CTA. Unchanged. */}
        <PricingMarketingSection />

        {/* Everything below is added on top of it — the spec-level detail the
            plan cards do not carry. */}
        <Section>
          <SectionIndex
            entries={[
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
                href: "#included",
                label: "Included on every plan",
                summary: "What you get regardless of tier — and never pay extra for.",
                value: `${INCLUDED_EVERYWHERE.length} things`,
              },
              {
                href: "#which",
                label: "Which one am I?",
                summary: "The four ways to run an agent, compared side by side.",
              },
            ]}
          />
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
                <p className="mt-2 text-[14px] leading-[1.55] text-hero/65">
                  {cat.description}
                </p>
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
          lead="Paste one public key into your server's authorized_keys and we take it from there — install, run, monitor, restart, configure, back up. No daemon for you to install, and no compute for us to bill."
        >
          <Reveal className="rounded-2xl border border-hero/[0.10] bg-hero/[0.02] p-8">
            <p className="font-mono text-[15px] text-signal">
              {formatUsd(BYOS_PLAN.displayPriceMonthly)}/mo per server
              <span className="ml-3 text-hero/40">management only</span>
            </p>
            <ul className="mt-6 space-y-2">
              {BYOS_PLAN.features.map((f) => (
                <li key={f} className="flex gap-2.5 text-[14px] leading-[1.5] text-hero/75">
                  <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-signal" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/byos"
              className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-signal hover:underline underline-offset-4"
            >
              How bring your own server works
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
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

          <p className="mt-8 text-[14px] text-hero/50">
            Overage packs start at {formatUsd(OVERAGE_PACKS[0].priceUsd)} for{" "}
            {OVERAGE_PACKS[0].credits.toLocaleString("en-US")} credits, and plans start at{" "}
            {litePlan ? formatUsd(litePlan.displayPriceMonthly) : "$9"}/mo.
          </p>
        </Section>
      </div>
    </div>
  )
}
