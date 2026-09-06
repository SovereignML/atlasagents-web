import type { Metadata } from "next"
import Link from "next/link"
import {
  PageHero,
  Section,
  StepFlow,
  DecisionMatrix,
  IncludedList,
  Hairline,
  type Step,
} from "@/components/marketing/primitives"
import { Reveal, RevealGroup, RevealItem } from "@/components/marketing/motion/reveal"
import { BYOS_PLAN, BYOS_SIGNUP_CREDITS, formatUsd } from "@/configs/plans"

export const metadata: Metadata = {
  title: "Bring your own server",
  description:
    "Already have a VPS, a dedicated box, or a homelab machine? Paste one public key into authorized_keys and Atlas Agents manages the agent on it over SSH for a flat $2.50/mo. No compute charges, no daemon to install.",
  alternates: { canonical: "/byos" },
}

const STEPS: readonly Step[] = [
  {
    title: "Add our public key",
    description:
      "We show you one line. Paste it into the authorized_keys of the SSH user on your server. That is the whole install.",
    detail: "No agent, no daemon",
  },
  {
    title: "Give us the address",
    description:
      "Host or IP, SSH port, and the user to connect as. Defaults are port 22 and root.",
    detail: "Editable later",
  },
  {
    title: "Choose how the AI is paid for",
    description:
      "Meter model calls against your credit wallet, or hand us your own provider API key and pay them directly.",
    detail: "Switchable",
  },
  {
    title: "We provision over SSH",
    description:
      "We connect, install the runtime, configure the proxy, and the agent comes up on your box.",
    detail: "Same runtime as managed",
  },
]

const SAME_AS_MANAGED = [
  "Live logs and one-click restart",
  "Credential reveal and rotation",
  "Backups to your own Google Drive",
  "Custom domain on your own Cloudflare zone",
  "Choice of OpenClaw or Hermes",
  "Web browser, web search and knowledge base",
  "Agent settings, roles and skills",
  "Five team seats",
]

export default function ByosPage() {
  return (
    <>
      <PageHero
        eyebrow="Bring your own server"
        title="Keep your hardware. Hand us the agent."
        lead="You already pay for a box. We are not going to sell you another one — we will connect to yours over SSH, put the agent on it, and manage it exactly the way we manage the machines we own."
        facts={[
          `${formatUsd(BYOS_PLAN.displayPriceMonthly)}/mo per server`,
          "No compute charges",
          "One public key, no daemon",
          `${BYOS_SIGNUP_CREDITS} credits on signup`,
        ]}
        primary={{ label: "Connect a server", href: "/register?byos=true" }}
        secondary={{ label: "See pricing", href: "/pricing#byos" }}
      />

      <Section
        index={1}
        id="setup"
        eyebrow="Setup"
        title="Four steps, and none of them are an install"
      >
        <StepFlow steps={STEPS} />
        <p className="mt-10 border-t border-hero/[0.08] pt-6 text-[14px] leading-[1.6] text-hero/55">
          There is nothing for you to run on the server first. We connect with a key you
          authorize, and you can remove that key at any time to cut off access.
        </p>
      </Section>

      <Section
        index={2}
        id="cost"
        eyebrow="What it costs"
        title="A flat fee for management. Nothing for compute."
        lead="We do not own your box, so we do not bill for it. The fee covers deployment and the panel — the same panel a managed customer gets."
      >
        <Reveal className="rounded-2xl border border-hero/[0.10] bg-hero/[0.02] p-8">
          <p className="font-mono text-[24px] text-signal">
            {formatUsd(BYOS_PLAN.displayPriceMonthly)}
            <span className="ml-2 text-[15px] text-hero/50">/mo per server</span>
          </p>
          <p className="mt-2 font-mono text-[13px] text-hero/40">
            or {formatUsd(BYOS_PLAN.displayPriceYearly)}/yr
          </p>

          <Hairline className="my-6" />

          <ul className="space-y-2">
            {BYOS_PLAN.features.map((f) => (
              <li key={f} className="flex gap-2.5 text-[14px] leading-[1.5] text-hero/75">
                <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-signal" />
                {f}
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section
        index={3}
        id="llm"
        eyebrow="Paying for the AI"
        title="Two ways, and you can change your mind"
        lead="Compute is yours. The model calls still have to be paid for by someone — pick which."
      >
        <DecisionMatrix
          options={[
            {
              key: "managed",
              name: "Metered credits",
              forWho: "I would rather have one bill and not manage provider accounts.",
              priceLabel: `${BYOS_SIGNUP_CREDITS} credits on signup`,
              priceNote: "then top up as you go",
              highlight: true,
              cta: { label: "See credit pricing", href: "/pricing#credits" },
            },
            {
              key: "byok",
              name: "Your own API key",
              forWho: "I already have a provider account and volume pricing on it.",
              priceLabel: "No credits used",
              priceNote: "you pay the provider directly",
              cta: { label: "How runtimes route models", href: "/runtimes" },
            },
          ]}
          rows={[
            { question: "Who you pay", values: ["Us", "Your model provider"] },
            { question: "Setup", values: ["Nothing — it just works", "Paste a provider key"] },
            { question: "Included at signup", values: [`${BYOS_SIGNUP_CREDITS} credits`, "—"] },
            { question: "Good when", values: ["Getting started", "You have volume pricing"] },
            { question: "Switchable later", values: ["Yes", "Yes"] },
          ]}
        />
      </Section>

      <Section
        index={4}
        id="parity"
        eyebrow="Parity"
        title="Everything the managed product does, on your box"
        lead="Bring your own server is not a stripped-down tier. The only thing you give up is us owning the hardware — which is the point."
      >
        <IncludedList items={SAME_AS_MANAGED} columns={2} />
      </Section>

      <Section
        index={5}
        id="honestly"
        eyebrow="Honestly"
        title="Where this is the wrong choice"
        lead="Two cases where managed is genuinely better, so you do not find out the hard way."
      >
        <RevealGroup className="grid gap-3 lg:grid-cols-2">
          <RevealItem className="rounded-2xl border border-hero/[0.10] bg-hero/[0.02] p-6">
            <h3 className="text-[15px] font-medium text-hero-white">
              You do not already have a server
            </h3>
            <p className="mt-3 text-[14px] leading-[1.6] text-hero/65">
              Renting a box specifically to run this rarely comes out cheaper than the
              managed plan once you have paid for the box, and now the uptime of the machine
              is your problem. Bring your own server pays off when the hardware already
              exists and is already paid for.
            </p>
          </RevealItem>
          <RevealItem className="rounded-2xl border border-hero/[0.10] bg-hero/[0.02] p-6">
            <h3 className="text-[15px] font-medium text-hero-white">
              You want us on the hook for the machine
            </h3>
            <p className="mt-3 text-[14px] leading-[1.6] text-hero/65">
              We manage the agent, not your server. If the box runs out of disk, loses
              network, or gets rebooted by your provider, that is yours to fix. On managed
              plans it is ours.
            </p>
          </RevealItem>
        </RevealGroup>

        <Reveal className="mt-10 flex flex-wrap items-center gap-4">
          <Link href="/register?byos=true" className="btn-green !py-3 !px-7 !text-[15px]">
            Connect a server
          </Link>
          <Link
            href="/managed"
            className="text-[14px] font-medium text-hero/60 hover:text-hero-white"
          >
            Or let us provide the machine →
          </Link>
        </Reveal>
      </Section>
    </>
  )
}
