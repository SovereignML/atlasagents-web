import Link from "next/link"
import { Reveal } from "@/components/marketing/motion/reveal"

export type IndexEntry = {
  /** Anchor on this page, e.g. "#byos". Must match a Section's id. */
  href: string
  label: string
  summary: string
  /** Optional right-hand value — a price, a count, a spec. */
  value?: string
}

/**
 * Opens a long page by telling the reader what is on it and letting them skip
 * to the part they came for. Borrowed from how dense infrastructure pricing
 * pages stay navigable: an index, not a hero, does the orienting work.
 */
export function SectionIndex({ entries }: { entries: IndexEntry[] }) {
  return (
    <Reveal>
      <nav
        aria-label="On this page"
        className="overflow-hidden rounded-2xl border border-hero/[0.10] bg-hero/[0.02]"
      >
        <ul className="divide-y divide-hero/[0.06]">
          {entries.map((entry, i) => (
            <li key={entry.href}>
              <Link
                href={entry.href}
                className="group flex items-baseline gap-4 px-5 py-4 transition-colors hover:bg-hero/[0.03] sm:gap-6"
              >
                <span className="font-mono text-[11px] tabular-nums text-hero/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-medium text-hero-white">
                    {entry.label}
                  </span>
                  <span className="mt-0.5 block text-[13px] leading-[1.5] text-hero/55">
                    {entry.summary}
                  </span>
                </span>
                {entry.value && (
                  <span className="shrink-0 font-mono text-[13px] text-signal">
                    {entry.value}
                  </span>
                )}
                <span
                  aria-hidden
                  className="shrink-0 text-hero/30 transition-transform group-hover:translate-y-0.5 group-hover:text-hero/60"
                >
                  ↓
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Reveal>
  )
}
