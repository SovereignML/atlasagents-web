import type { Metadata } from "next"
import Link from "next/link"
import {
  PageHero,
  Section,
  SpecTable,
  StepFlow,
  IncludedList,
  type SpecColumn,
  type Step,
} from "@/components/marketing/primitives"
import { Reveal, RevealGroup, RevealItem } from "@/components/marketing/motion/reveal"
import { serverRows } from "@/components/marketing/sections/server-sizes"
import { REGIONS } from "@/configs/regions"
import { INCLUDED_EVERYWHERE } from "@/configs/deployment-modes"
import { findPlanBySlug, formatUsd } from "@/configs/plans"

export const metadata: Metadata = {
  title: "Managed hosting",
  description:
    "We provision the server, install the runtime, terminate SSL and keep the agent alive. Nine machine sizes, multi-cloud provisioning, live logs and one-click restart — from $9/mo.",
  alternates: { canonical: "/managed" },
}

const SIZE_COLUMNS: SpecColumn[] = [
  { key: "label", header: "Size", sticky: true },
  { key: "vcpu", header: "vCPU", numeric: true },
  { key: "ram", header: "RAM", numeric: true },
  { key: "storage", header: "Storage", numeric: true },
  { key: "price", header: "Per month", numeric: true },
]

const STEPS: readonly Step[] = [
  {
    title: "Pick a role and a runtime",
    description: "The job you want done, and the engine that runs it. Both changeable later.",
    detail: "8 roles · 2 runtimes",
  },
  {
    title: "Pick a size and region",
    description: "Choose the machine. We route the deploy to the healthiest provider for you.",
    detail: "9 sizes",
  },
  {
    title: "We provision it",
    description: "Server created, runtime installed, reverse proxy configured, SSL terminated.",
    detail: "Minutes, not an afternoon",
  },
  {
    title: "You operate it",
    description: "Live logs, one-click restart, credential rotation, backups, custom domain.",
    detail: "From the dashboard",
  },
]

const OPERATIONS = [
  {
    title: "Live logs",
    body: "Read what the agent is actually doing, as it does it — not a summary written after the fact.",
  },
  {
    title: "One-click restart",
    body: "Restart the runtime from the dashboard instead of finding the box and the service name.",
  },
  {
    title: "Credential rotation",
    body: "Reveal and rotate the agent's admin login or gateway token without touching the server.",
  },
  {
    title: "Backups to your Drive",
    body: "Snapshot settings and behavior to a file in your own Google Drive, and restore into the same agent or a new one.",
  },
  {
    title: "Your own domain",
    body: "Put the agent on a subdomain of a Cloudflare zone you already own, instead of a hostname we assigned.",
  },
  {
    title: "Resize and re-runtime",
    body: "Change the machine or swap OpenClaw for Hermes later. It re-provisions; you do not rebuild.",
  },
]

const availableRegions = REGIONS.filter((r) => r.available)
const comingRegions = REGIONS.filter((r) => !r.available)
const litePlan = findPlanBySlug("lite")

export default function ManagedPage() {
  return (
    <>
      <PageHero
        eyebrow="Managed hosting"
        title="We run the server. You run the agent."
        lead="The default way to use Atlas Agents, and what most people want. You never touch a terminal, a certificate, or a reverse proxy — you pick what the agent should be and open the URL it comes back on."
        facts={[
          litePlan ? `From ${formatUsd(litePlan.displayPriceMonthly)}/mo` : "From $9/mo",
          "9 machine sizes",
          "Multi-cloud provisioning",
          "Free demo, no card",
        ]}
        primary={{ label: "Deploy an agent free", href: "/register?deploy=true" }}
        secondary={{ label: "See plans", href: "/pricing" }}
      />

      <Section index={1} id="how" eyebrow="How it works" title="Four choices, then it is running">
        <StepFlow steps={STEPS} />
      </Section>

      <Section
        index={2}
        id="where"
        eyebrow="Where it runs"
        title="Multi-cloud, chosen for you"
        lead="We provision across more than one cloud and pick per deploy on health and capacity. You choose the size and the region; which provider serves it is our problem, not yours."
      >
        <Reveal className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-hero/[0.10] bg-hero/[0.02] p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-signal">
              Available now
            </p>
            <ul className="mt-4 space-y-2">
              {availableRegions.map((r) => (
                <li key={r.slug} className="flex items-center gap-3 text-[15px] text-hero-white">
                  <span aria-hidden>{r.flag}</span>
                  {r.name}
                  <span className="text-[13px] text-hero/45">{r.country}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-hero/[0.10] bg-hero/[0.02] p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-hero/40">
              In the catalog, not yet enabled
            </p>
            <ul className="mt-4 space-y-2">
              {comingRegions.map((r) => (
                <li key={r.slug} className="flex items-center gap-3 text-[15px] text-hero/55">
                  <span aria-hidden>{r.flag}</span>
                  {r.name}
                  <span className="text-[13px] text-hero/35">{r.country}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[13px] leading-[1.6] text-hero/45">
              Listed because they are real locations we intend to open, not because you can
              pick them today. If you need one of them now, tell us — it changes our order.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section
        index={3}
        id="sizes"
        eyebrow="The machines"
        title="Published specs, published prices"
        lead="Shared vCPU for most work. Dedicated cores when an agent must not contend for CPU."
      >
        <SpecTable
          columns={SIZE_COLUMNS}
          rows={serverRows()}
          caption="Storage is expandable per GB. Hermes needs 2 GB or more; the 1 GB tier runs OpenClaw."
        />
      </Section>

      <Section
        index={4}
        id="operate"
        eyebrow="Operating it"
        title="The controls that make it a product"
        lead="Provisioning a server is the easy half. What makes this worth paying for is everything after."
      >
        <RevealGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {OPERATIONS.map((op) => (
            <RevealItem
              key={op.title}
              className="rounded-2xl border border-hero/[0.10] bg-hero/[0.02] p-5"
            >
              <h3 className="text-[15px] font-medium text-hero-white">{op.title}</h3>
              <p className="mt-2 text-[14px] leading-[1.55] text-hero/65">{op.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section index={5} id="included" eyebrow="On every plan" title="Included, not upsold">
        <IncludedList items={INCLUDED_EVERYWHERE} />
      </Section>

      <Section
        index={6}
        id="next"
        eyebrow="Next"
        title="Managed is the default. It is not the only option."
        width="narrow"
      >
        <Reveal className="text-[15px] leading-[1.65] text-hero/75">
          If you already own a server, you do not need us to sell you another one — we will
          manage the agent on yours instead, and charge nothing for compute.
        </Reveal>

        <Reveal className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/register?deploy=true" className="btn-green !py-3 !px-7 !text-[15px]">
            Deploy an agent free
          </Link>
          <Link href="/byos" className="text-[14px] font-medium text-hero/60 hover:text-hero-white">
            Bring your own server instead →
          </Link>
        </Reveal>
      </Section>
    </>
  )
}
