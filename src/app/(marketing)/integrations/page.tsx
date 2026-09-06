import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { PageHero, Section, CatalogGrid, type CatalogItem } from "@/components/marketing/primitives"
import { RevealGroup, RevealItem } from "@/components/marketing/motion/reveal"
import {
  INTEGRATION_GROUPS,
  ACCOUNT_INTEGRATIONS,
  INTEGRATION_NOTES,
} from "@/configs/integrations"
import { CAPABILITIES } from "@/configs/capabilities"

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "The models, clouds, and tools an Atlas Agents agent works with — plus the two account integrations you can connect: Google Drive backups and your own Cloudflare zones.",
  alternates: { canonical: "/integrations" },
}

const items: CatalogItem[] = INTEGRATION_GROUPS.flatMap((group) =>
  group.items.map((item) => ({
    key: `${group.id}-${item.name}`,
    name: item.name,
    description: group.description,
    group: group.title,
    media: (
      <Image
        src={item.icon}
        alt=""
        width={28}
        height={28}
        className={item.mono ? "opacity-80 invert" : "opacity-90"}
      />
    ),
  })),
)

const groups = INTEGRATION_GROUPS.map((g) => g.title)

export default function IntegrationsPage() {
  const comingSoon = CAPABILITIES.filter((c) => c.status === "coming-soon")

  return (
    <>
      <PageHero
        eyebrow="Integrations"
        title="What an agent can reach"
        lead="Two different things live on this page, and the difference matters. Models and tools are what an agent works with. Account integrations are where you authorize your own third-party account and we act on it — there are exactly two of those."
        facts={[
          `${items.length} models, clouds and tools`,
          `${ACCOUNT_INTEGRATIONS.length} account integrations`,
          "MCP connectors not yet shipped",
        ]}
        primary={{ label: "Deploy an agent free", href: "/register?deploy=true" }}
        secondary={{ label: "See capabilities", href: "/#capabilities" }}
      />

      <Section
        id="catalog"
        eyebrow="The catalog"
        title="Models, clouds, and tools"
        lead="Where an agent has no native connector, it uses the interface a person would — a real browser — or drives its own self-hosted n8n server."
        width="wide"
      >
        <CatalogGrid items={items} groups={groups} allLabel="Everything" columns={4} />
      </Section>

      <Section
        id="accounts"
        eyebrow="Account integrations"
        title="The two you actually connect"
        lead="Both follow the same shape: a minimal scope, the secret encrypted at rest, one connection per account, and a best-effort revoke when you disconnect."
      >
        <RevealGroup className="grid gap-3 lg:grid-cols-2">
          {ACCOUNT_INTEGRATIONS.map((integration) => (
            <RevealItem
              key={integration.name}
              className="flex flex-col rounded-2xl border border-hero/[0.10] bg-hero/[0.02] p-6"
            >
              <div className="flex items-center gap-3">
                <Image src={integration.icon} alt="" width={26} height={26} className="opacity-85" />
                <h3 className="text-[16px] font-medium text-hero-white">{integration.name}</h3>
              </div>
              <p className="mt-4 text-[15px] leading-[1.5] text-hero-white/90">
                {integration.summary}
              </p>
              <p className="mt-3 flex-1 text-[14px] leading-[1.6] text-hero/65">
                {integration.detail}
              </p>

              <p className="mt-5 rounded-xl border border-hero/[0.08] bg-hero/[0.02] p-4 text-[13px] leading-[1.55] text-hero/60">
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-signal">
                  Scope
                </span>
                <br />
                {integration.scope}
              </p>

              <ul className="mt-5 space-y-2">
                {integration.guarantees.map((g) => (
                  <li key={g} className="flex gap-2.5 text-[14px] leading-[1.5] text-hero/70">
                    <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-signal" />
                    {g}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section
        id="not-yet"
        eyebrow="Not yet"
        title="What we would rather you hear from us"
        lead="These are built but not wired end to end. The product lists them as coming soon and will not let you enable them — which is also why they are on this page instead of quietly omitted."
        width="narrow"
      >
        <RevealGroup className="grid gap-3 sm:grid-cols-2">
          {comingSoon.map((cap) => (
            <RevealItem
              key={cap.id}
              className="rounded-2xl border border-hero/[0.10] bg-hero/[0.02] p-5 opacity-70"
            >
              <h3 className="text-[15px] font-medium text-hero-white">{cap.name}</h3>
              <p className="mt-2 text-[14px] leading-[1.55] text-hero/65">{cap.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <ul className="mt-8 space-y-3">
          {INTEGRATION_NOTES.map((note) => (
            <li key={note} className="text-[13px] leading-[1.6] text-hero/45">
              {note}
            </li>
          ))}
        </ul>

        <Link
          href="/runtimes"
          className="mt-8 inline-flex items-center gap-2 text-[14px] font-medium text-signal hover:underline underline-offset-4"
        >
          Which runtime supports what
          <span aria-hidden>→</span>
        </Link>
      </Section>
    </>
  )
}
