import Link from "next/link"
import { Section, SpecTable, Yes, No, type SpecColumn } from "@/components/marketing/primitives"
import { BRANDING } from "@/configs/branding"

/**
 * Compact version of /comparison. Compared against APPROACHES rather than named
 * products, matching the stance the full page takes and explains: a claim about
 * a named competitor's feature list goes stale the week they ship, and we cannot
 * verify it on the reader's behalf.
 *
 * (`competitor-comparison.tsx` does name products, and IS rendered — on the
 * homepage, via NUMBERED_SECTIONS in src/app/page.tsx. This teaser is the one
 * kept in the tree unrendered; running both would have the site arguing with
 * itself. The two stances are reconciled by scope: the named matrix compares
 * against agent hosts on the homepage, the full /comparison page compares
 * against approaches.)
 */
const COLUMNS: SpecColumn[] = [
  { key: "feature", header: "What you need", sticky: true },
  { key: "us", header: BRANDING.name },
  { key: "vps", header: "A raw VPS" },
  { key: "diy", header: "Do it yourself" },
]

const ROWS = [
  {
    key: "runtime",
    cells: {
      feature: "Runtime installed and configured",
      us: <Yes />,
      vps: <No />,
      diy: <No>You build it</No>,
    },
  },
  {
    key: "url",
    cells: {
      feature: "Public URL with SSL",
      us: <Yes />,
      vps: <No>You configure it</No>,
      diy: <No>You configure it</No>,
    },
  },
  {
    key: "role",
    cells: {
      feature: "Role instructions written for you",
      us: <Yes>8 roles</Yes>,
      vps: <No />,
      diy: <No />,
    },
  },
  {
    key: "root",
    cells: { feature: "Full root access", us: <Yes />, vps: <Yes />, diy: <Yes /> },
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

export function ComparisonTeaser() {
  return (
    <Section
      id="compare"
      eyebrow="How we compare"
      title="Against a blank server, and against building it"
      lead="The honest comparison is not with other agent products — it is with the two things you would otherwise do. Here is the short version."
    >
      <SpecTable columns={COLUMNS} rows={ROWS} />

      <div className="mt-8">
        <Link
          href="/comparison"
          className="inline-flex items-center gap-2 text-[14px] font-medium text-signal hover:underline underline-offset-4"
        >
          The full comparison, including when we are the wrong answer
          <span aria-hidden>→</span>
        </Link>
      </div>
    </Section>
  )
}
