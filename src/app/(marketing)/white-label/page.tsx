import type { Metadata } from "next"
import Link from "next/link"
import {
  PageHero,
  Section,
  SpecTable,
  Hairline,
  type SpecColumn,
} from "@/components/marketing/primitives"
import { Reveal, RevealGroup, RevealItem } from "@/components/marketing/motion/reveal"
import { ADD_ONS, findPlanBySlug } from "@/configs/plans"
import { BRANDING } from "@/configs/branding"

export const metadata: Metadata = {
  title: "White-label & agencies",
  description:
    "Run Atlas Agents for your own clients: agents on subdomains of your own Cloudflare zones, and a tenant console for customers, subscriptions, revenue and support.",
  alternates: { canonical: "/white-label" },
}

const whiteLabelAddon = ADD_ONS.find((a) => a.name === "White-label")
const scalePlan = findPlanBySlug("scale")

const CONSOLE_COLUMNS: SpecColumn[] = [
  { key: "area", header: "Area", sticky: true },
  { key: "what", header: "What you manage there" },
]

// Mirrors the tenant console surfaces that exist in the platform today.
const CONSOLE = [
  { key: "customers", area: "Customers", what: "The accounts you serve, as records you own rather than ours." },
  { key: "users", area: "Users", what: "Who can sign in under each customer, and at what level." },
  { key: "agents", area: "Agents", what: "Every deployed agent across your book, not one at a time." },
  { key: "subscriptions", area: "Subscriptions", what: "What each customer is on, and what changes when they move." },
  { key: "revenue", area: "Revenue", what: "What the book is producing, in one place." },
  { key: "support", area: "Support", what: "Requests coming in from the customers you manage." },
  { key: "backups", area: "Backups", what: "Agent configuration snapshots across the accounts you run." },
  { key: "notifications", area: "Notifications", what: "What your customers get told, and when." },
  { key: "settings", area: "Settings", what: "How the tenant itself is configured." },
]

const FOR_WHO = [
  {
    title: "Agencies",
    body: "You already run automation for clients and bill for it. This gives each client a real agent on a real box, under your domain, without you building a deployment platform first.",
  },
  {
    title: "Consultants",
    body: "You deliver an agent as part of an engagement and want it to keep running afterwards under your name — not to hand the client a login to someone else's product.",
  },
  {
    title: "Products that need an agent inside",
    body: "You are shipping something of your own and an agent is a component of it. Deploy per customer, keep your branding, and keep the relationship.",
  },
]

export default function WhiteLabelPage() {
  return (
    <>
      <PageHero
        eyebrow="White-label & agencies"
        title="Your clients, your domain, our infrastructure"
        lead="Deploy agents for the people you already bill. They land on subdomains of a Cloudflare zone you own, and you manage the whole book — customers, subscriptions, revenue, support — from a tenant console instead of a spreadsheet."
        facts={[
          whiteLabelAddon ? `White-label ${whiteLabelAddon.price}` : "White-label $199/mo",
          "Your own Cloudflare zones",
          "Tenant console included",
        ]}
        primary={{ label: "Talk to us", href: BRANDING.demoUrl }}
        secondary={{ label: "See pricing", href: "/pricing" }}
      />

      <Section
        index={1}
        id="who"
        eyebrow="Who this is for"
        title="You are reselling the outcome, not the infrastructure"
      >
        <RevealGroup className="grid gap-3 lg:grid-cols-3">
          {FOR_WHO.map((item) => (
            <RevealItem
              key={item.title}
              className="flex flex-col rounded-2xl border border-hero/[0.10] bg-hero/[0.02] p-6"
            >
              <h3
                className="font-serif text-[20px] leading-[1.2] text-hero-white"
                style={{ fontWeight: 400 }}
              >
                {item.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-hero/70">{item.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section
        index={2}
        id="domains"
        eyebrow="Your domain"
        title="Agents on zones you already own"
        lead="Connect your own Cloudflare account and agents get subdomains of your zones instead of hostnames we assigned. Your clients see your domain, because it is your domain."
      >
        <Reveal className="max-w-[760px] space-y-4 text-[15px] leading-[1.65] text-hero/75">
          <p>
            The integration is deliberately narrow: a scoped token, encrypted at rest, one
            connection per account, revoked on a best-effort basis when you disconnect. We
            create records on the zones you point us at — we do not take over your DNS.
          </p>
          <p className="text-hero/55">
            Our own hostnames cannot be claimed as custom domains, so nobody can point a
            white-label domain at a name that belongs to the platform.
          </p>
        </Reveal>

        <Reveal className="mt-8">
          <Link
            href="/integrations#accounts"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-signal hover:underline underline-offset-4"
          >
            How the Cloudflare integration is scoped
            <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </Section>

      <Section
        index={3}
        id="console"
        eyebrow="Tenant console"
        title="A console for the book, not for one agent"
        lead="The dashboard a normal customer gets manages their agents. The tenant console manages your customers."
      >
        <SpecTable
          columns={CONSOLE_COLUMNS}
          rows={CONSOLE.map((c) => ({ key: c.key, cells: { area: c.area, what: c.what } }))}
        />
      </Section>

      <Section
        index={4}
        id="cost"
        eyebrow="What it costs"
        title="An add-on, on top of a plan"
        lead="White-label is priced as an add-on rather than its own tier, because the underlying agents are still ordinary deployments on ordinary plans."
      >
        <Reveal className="rounded-2xl border border-hero/[0.10] bg-hero/[0.02] p-8">
          <p className="font-mono text-[24px] text-signal">
            {whiteLabelAddon?.price ?? "$199/mo"}
            <span className="ml-3 text-[15px] text-hero/50">white-label add-on</span>
          </p>
          <Hairline className="my-6" />
          <p className="text-[15px] leading-[1.65] text-hero/75">
            Add it to a plan that carries enough seats and live agents for your book —{" "}
            {scalePlan
              ? `${scalePlan.name} includes ${scalePlan.seats} seats and ${scalePlan.features.find((f) => f.includes("live agents")) ?? "multiple live agents"}`
              : "Scale is the usual starting point"}
            . Past that, Enterprise is where volume credit pricing and an SLA live.
          </p>
          <p className="mt-4 text-[14px] leading-[1.6] text-hero/50">
            How far the branding goes — and what your clients see at each surface — is worth
            a conversation rather than a bullet list. Bring us the shape of your book and we
            will tell you plainly what fits today and what does not.
          </p>
        </Reveal>

        <Reveal className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={BRANDING.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-green !py-3 !px-7 !text-[15px]"
          >
            Book a call
          </a>
          <Link
            href="/pricing"
            className="text-[14px] font-medium text-hero/60 hover:text-hero-white"
          >
            See plans and add-ons →
          </Link>
        </Reveal>
      </Section>
    </>
  )
}
