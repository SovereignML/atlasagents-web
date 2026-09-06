import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  PageHero,
  Section,
  SpecTable,
  DecisionMatrix,
  type SpecColumn,
} from "@/components/marketing/primitives"
import { RevealGroup, RevealItem, Reveal } from "@/components/marketing/motion/reveal"
import { RUNTIMES, RUNTIME_NOTES, runtimeComparisonRows } from "@/configs/runtimes"

export const metadata: Metadata = {
  title: "Runtimes — OpenClaw & Hermes",
  description:
    "The agent engine we install on your box. OpenClaw is the default and runs on every plan; Hermes adds an OpenAI-compatible API at /v1/* alongside a browser chat UI, and needs 2 GB of RAM.",
  alternates: { canonical: "/runtimes" },
}

const COLUMNS: SpecColumn[] = [
  { key: "spec", header: "", sticky: true },
  ...RUNTIMES.map((r) => ({ key: r.id, header: r.name })),
]

const rows = runtimeComparisonRows().map((row) => ({
  key: row.label,
  cells: {
    spec: row.label,
    ...Object.fromEntries(RUNTIMES.map((r, i) => [r.id, row.values[i]])),
  },
}))

export default function RuntimesPage() {
  return (
    <>
      <PageHero
        eyebrow="The engine"
        title="Two runtimes. One of them has an API."
        lead="The runtime is the agent engine installed on your server. It decides how you talk to the agent, what tools it can use, and how much machine it needs. You pick it at deploy, and you can change it later."
        facts={["OpenClaw — default, any plan", "Hermes — API + chat, 2 GB minimum", "Both open source"]}
        primary={{ label: "Deploy an agent free", href: "/register?deploy=true" }}
        secondary={{ label: "See plans", href: "/pricing#plans" }}
      />

      <Section id="side-by-side" eyebrow="Side by side" title="What actually differs">
        <SpecTable
          columns={COLUMNS}
          rows={rows}
          caption="Both runtimes are open source. Neither locks your agent's configuration into a format only we can read."
        />

        <ul className="mt-8 space-y-3">
          {RUNTIME_NOTES.map((note) => (
            <li key={note} className="flex gap-3 text-[14px] leading-[1.6] text-hero/60">
              <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-signal" />
              {note}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="pick"
        eyebrow="Which one am I?"
        title="The decision is narrower than it looks"
        lead="Almost everyone should take the default. The one question that actually matters is whether something other than a person needs to talk to your agent."
      >
        <DecisionMatrix
          options={RUNTIMES.map((r) => ({
            key: r.id,
            name: r.name,
            forWho: r.tagline,
            priceLabel: `${r.minRamGb} GB RAM minimum`,
            highlight: r.isDefault,
            cta: { label: "Deploy on " + r.name, href: "/register?deploy=true" },
          }))}
          rows={[
            {
              question: "A person uses it",
              values: ["Yes — chat UI at /", "Yes — Open WebUI at /"],
            },
            {
              question: "Code calls it",
              values: ["No", "Yes — OpenAI-compatible /v1/*"],
            },
            {
              question: "Generates images",
              values: ["No", "Yes, with a provider key"],
            },
            {
              question: "Runs on the 1 GB tier",
              values: ["Yes", "No — needs 2 GB"],
            },
            {
              question: "Install",
              values: ["Config only", "CLI-driven, Node 22.14+"],
            },
            {
              question: "Credentials",
              values: ["One admin login", "Login + separate API token"],
            },
          ]}
        />
      </Section>

      <Section id="interfaces" eyebrow="Interfaces" title="How you reach a running agent">
        <RevealGroup className="grid gap-3 lg:grid-cols-2">
          {RUNTIMES.map((runtime) => (
            <RevealItem
              key={runtime.id}
              className="flex flex-col rounded-2xl border border-hero/[0.10] bg-hero/[0.02] p-6"
            >
              <div className="flex items-center gap-3">
                <Image src={runtime.logo} alt="" width={26} height={26} className="opacity-80" />
                <h3 className="text-[16px] font-medium text-hero-white">{runtime.name}</h3>
              </div>
              <dl className="mt-5 space-y-4">
                {runtime.interfaces.map((iface) => (
                  <div key={iface.path}>
                    <dt className="font-mono text-[12px] text-signal">
                      {iface.name} · <span className="text-hero/50">{iface.path}</span>
                    </dt>
                    <dd className="mt-1.5 text-[14px] leading-[1.55] text-hero/65">
                      {iface.description}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 border-t border-hero/[0.08] pt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-hero/40">
                Best for
              </p>
              <ul className="mt-3 space-y-1.5">
                {runtime.bestFor.map((b) => (
                  <li key={b} className="text-[14px] leading-[1.5] text-hero/70">
                    {b}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section
        id="no-lock-in"
        eyebrow="No lock-in"
        title="You can take this with you"
        width="narrow"
      >
        <Reveal className="space-y-4 text-[15px] leading-[1.65] text-hero/70">
          <p>
            Both runtimes are open source projects we did not write and do not own. What
            Atlas Agents adds is provisioning, configuration, and the panel — not a
            proprietary engine you would have to migrate off.
          </p>
          <p>
            Your agent&apos;s settings and behavior can be exported to a JSON file in your
            own Google Drive at any time, and restored into a new agent. Backups carry
            settings only — never API keys, hosts, tokens, or billing data.
          </p>
        </Reveal>

        <Reveal className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/register?deploy=true" className="btn-green !py-3 !px-7 !text-[15px]">
            Deploy an agent free
          </Link>
          <Link
            href="/integrations"
            className="text-[14px] font-medium text-hero/60 hover:text-hero-white"
          >
            What agents connect to →
          </Link>
        </Reveal>
      </Section>
    </>
  )
}
