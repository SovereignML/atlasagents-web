import type { Metadata } from "next"
import Link from "next/link"
import { ComparisonOriginal } from "@/components/marketing/sections/comparison-original"
import {
  Section,
  SpecTable,
  Yes,
  No,
  type SpecColumn,
} from "@/components/marketing/primitives"
import { Reveal, RevealGroup, RevealItem } from "@/components/marketing/motion/reveal"
import { BRANDING } from "@/configs/branding"

export const metadata: Metadata = {
  title: "How we compare",
  description:
    "Atlas Agents against other AI-employee products, against a raw VPS, and against a do-it-yourself setup — including where we are the wrong answer.",
  alternates: { canonical: "/comparison" },
}

// The section above compares against named products. This one compares against
// the two things you would otherwise DO — rent a blank server, or build it —
// which is the comparison most visitors are actually running in their head.
const COLUMNS: SpecColumn[] = [
  { key: "feature", header: "What you need", sticky: true },
  { key: "us", header: BRANDING.name },
  { key: "vps", header: "A raw VPS" },
  { key: "diy", header: "Do it yourself" },
]

const ROWS = [
  {
    key: "provision",
    cells: { feature: "Server provisioned for you", us: <Yes />, vps: <Yes>Blank</Yes>, diy: <No /> },
  },
  {
    key: "runtime",
    cells: {
      feature: "Agent runtime installed and configured",
      us: <Yes />,
      vps: <No />,
      diy: <No>You build it</No>,
    },
  },
  {
    key: "ssl",
    cells: {
      feature: "Public URL with SSL terminated",
      us: <Yes />,
      vps: <No>You configure it</No>,
      diy: <No>You configure it</No>,
    },
  },
  {
    key: "role",
    cells: { feature: "Role instructions written for you", us: <Yes>8 roles</Yes>, vps: <No />, diy: <No /> },
  },
  {
    key: "tools",
    cells: {
      feature: "Browser, search and knowledge base wired up",
      us: <Yes />,
      vps: <No />,
      diy: <No>You integrate each</No>,
    },
  },
  {
    key: "logs",
    cells: {
      feature: "Live logs and one-click restart",
      us: <Yes />,
      vps: <No>SSH and journalctl</No>,
      diy: <No>You build it</No>,
    },
  },
  {
    key: "root",
    cells: { feature: "Full root access to the machine", us: <Yes />, vps: <Yes />, diy: <Yes /> },
  },
  {
    key: "byo",
    cells: {
      feature: "Works on hardware you already own",
      us: <Yes>BYOS</Yes>,
      vps: <No>It is their box</No>,
      diy: <Yes />,
    },
  },
  {
    key: "backup",
    cells: {
      feature: "Config backup and restore",
      us: <Yes>To your Drive</Yes>,
      vps: <No />,
      diy: <No>You build it</No>,
    },
  },
  {
    key: "leave",
    cells: {
      feature: "Leave without a migration project",
      us: <Yes>Open runtimes</Yes>,
      vps: <Yes />,
      diy: <Yes />,
    },
  },
]

const POSITIONING = [
  {
    title: "We are not a hosting company",
    body: "A VPS provider hands you a blank machine and an IP address. Everything that turns it into a working agent — the runtime, the config, the reverse proxy, the certificates, the role instructions — is still yours to do. That is the gap this fills.",
  },
  {
    title: "We are not selling you compute",
    body: "Infrastructure is a commodity and we are not pretending otherwise. On bring-your-own-server we charge nothing for compute at all, because you already have it. What you pay for is the deployment and the panel.",
  },
  {
    title: "Sometimes you should do it yourself",
    body: "If you enjoy the setup, have opinions about the runtime, and want to own every layer, do it yourself — both runtimes we use are open source and you can install them without us. Buy this when the setup is a means to an end rather than the point.",
  },
]

export default function ComparisonPage() {
  return (
    <>
      <ComparisonOriginal />

      <Section
        id="approaches"
        eyebrow="The other comparison"
        title="Against a blank server, and against building it"
        lead="Most visitors are not choosing between us and another product — they are choosing between buying this and doing it themselves. Here is that comparison, including where doing it yourself wins."
      >
        <SpecTable columns={COLUMNS} rows={ROWS} />
      </Section>

      <Section id="positioning" eyebrow="Where we sit" title="Being clear about the trade">
        <RevealGroup className="grid gap-3 lg:grid-cols-3">
          {POSITIONING.map((block) => (
            <RevealItem
              key={block.title}
              className="flex flex-col rounded-2xl border border-hero/[0.10] bg-hero/[0.02] p-6"
            >
              <h3
                className="font-serif text-[20px] leading-[1.2] text-hero-white"
                style={{ fontWeight: 400 }}
              >
                {block.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-hero/70">{block.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section id="next" eyebrow="Next" title="Try it before you weigh it up" width="narrow">
        <Reveal className="text-[15px] leading-[1.65] text-hero/70">
          A free demo agent is a real deployment on a real box — the same provisioning path
          a paid one takes. It tears itself down after 30 minutes, and it needs no card, so
          it is the cheapest way to find out whether any of the above matters to you.
        </Reveal>

        <Reveal className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/register?deploy=true" className="btn-green !py-3 !px-7 !text-[15px]">
            Deploy a demo agent
          </Link>
          <a
            href={BRANDING.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] font-medium text-hero/60 hover:text-hero-white"
          >
            Or book a walkthrough →
          </a>
        </Reveal>
      </Section>
    </>
  )
}
