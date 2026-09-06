import type { Metadata } from "next"
import Link from "next/link"
import {
  PageHero,
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
    "Atlas Agents against a raw VPS and a do-it-yourself setup — what each of the three actually asks of you, and when you should pick the other two.",
  alternates: { canonical: "/comparison" },
}

// Deliberately compared against APPROACHES, not named competitors. Claims about
// a named product's feature set go stale silently and we cannot verify them from
// here; claims about what a blank VPS asks of you are simply true.
const COLUMNS: SpecColumn[] = [
  { key: "feature", header: "What you need", sticky: true },
  { key: "us", header: BRANDING.name },
  { key: "vps", header: "A raw VPS" },
  { key: "diy", header: "Do it yourself" },
]

const ROWS = [
  {
    key: "provision",
    feature: "Server provisioned for you",
    us: <Yes />,
    vps: <Yes>Blank</Yes>,
    diy: <No />,
  },
  {
    key: "runtime",
    feature: "Agent runtime installed and configured",
    us: <Yes />,
    vps: <No />,
    diy: <No>You build it</No>,
  },
  {
    key: "ssl",
    feature: "Public URL with SSL terminated",
    us: <Yes />,
    vps: <No>You configure it</No>,
    diy: <No>You configure it</No>,
  },
  {
    key: "role",
    feature: "Role instructions written for you",
    us: <Yes>8 roles</Yes>,
    vps: <No />,
    diy: <No />,
  },
  {
    key: "tools",
    feature: "Browser, search, and knowledge base wired up",
    us: <Yes />,
    vps: <No />,
    diy: <No>You integrate each</No>,
  },
  {
    key: "logs",
    feature: "Live logs and one-click restart",
    us: <Yes />,
    vps: <No>SSH and journalctl</No>,
    diy: <No>You build it</No>,
  },
  {
    key: "root",
    feature: "Full root access to the machine",
    us: <Yes />,
    vps: <Yes />,
    diy: <Yes />,
  },
  {
    key: "byo",
    feature: "Works on hardware you already own",
    us: <Yes>BYOS</Yes>,
    vps: <No>It is their box</No>,
    diy: <Yes />,
  },
  {
    key: "backup",
    feature: "Config backup and restore",
    us: <Yes>To your Drive</Yes>,
    vps: <No />,
    diy: <No>You build it</No>,
  },
  {
    key: "switch",
    feature: "Swap runtime or model without a rebuild",
    us: <Yes />,
    vps: <No />,
    diy: <No />,
  },
  {
    key: "leave",
    feature: "Leave without a migration project",
    us: <Yes>Open runtimes</Yes>,
    vps: <Yes />,
    diy: <Yes />,
  },
]

const POSITIONING = [
  {
    title: "We are not a hosting company",
    body: "A VPS provider hands you a blank machine and an IP address. Everything that turns it into a working agent — the runtime, the config, the reverse proxy, the certificates, the role instructions — is still yours to do. That is the gap this fills.",
  },
  {
    title: "We are not selling you compute",
    body: "Infrastructure is a commodity and we are not pretending otherwise. On bring-your-own-server we charge nothing for compute at all, because you already have it. What you are paying for is the deployment and the panel.",
  },
  {
    title: "Sometimes you should do it yourself",
    body: "If you enjoy the setup, have opinions about the runtime, and want to own every layer, do it yourself — both runtimes we use are open source and you can install them without us. Buy this when the setup is a means to an end rather than the point.",
  },
]

export default function ComparisonPage() {
  return (
    <>
      <PageHero
        eyebrow="Comparison"
        title="Three ways to get an agent running"
        lead="Buy it managed, rent a blank server and do the work, or build the whole thing. Here is what each one actually asks of you — including the cases where we are the wrong answer."
        primary={{ label: "Deploy an agent free", href: "/register?deploy=true" }}
        secondary={{ label: "See pricing", href: "/pricing" }}
      />

      <Section id="table" eyebrow="Side by side" title="What each approach asks of you" width="wide">
        <SpecTable
          columns={COLUMNS}
          rows={ROWS.map((row) => ({
            key: row.key,
            cells: { feature: row.feature, us: row.us, vps: row.vps, diy: row.diy },
          }))}
          caption="Compared against approaches rather than named products — a claim about a competitor's feature list goes stale the week they ship, and we would not be able to verify it for you anyway."
        />
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
        <Reveal className="space-y-4 text-[15px] leading-[1.65] text-hero/70">
          <p>
            A free demo agent is a real deployment on a real box — the same provisioning
            path a paid one takes. It tears itself down after 30 minutes, and it needs no
            card, so it is the cheapest way to find out whether any of the above matters
            to you.
          </p>
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
