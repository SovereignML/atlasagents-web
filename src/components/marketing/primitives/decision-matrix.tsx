import Link from "next/link"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/marketing/motion/reveal"

export type MatrixOption = {
  key: string
  name: string
  /** The sentence the reader should recognize themselves in. */
  forWho: string
  priceLabel?: string
  priceNote?: string
  cta?: { label: string; href: string }
  highlight?: boolean
}

export type MatrixRow = {
  question: string
  /** One value per option, in the same order as `options`. */
  values: readonly string[]
}

/**
 * "Which one am I?" — options across the top, questions down the side.
 *
 * This is the site's central piece of choice architecture. Most visitors don't
 * need another feature list; they need to find the column that describes them.
 * On narrow screens the table would be unreadable, so it collapses to one card
 * per option with the questions repeated inside — the same information, not a
 * truncated version of it.
 */
export function DecisionMatrix({
  options,
  rows,
  className,
}: {
  options: MatrixOption[]
  rows: readonly MatrixRow[]
  className?: string
}) {
  return (
    <div className={className}>
      {/* Wide: a real matrix. */}
      <Reveal className="hidden lg:block">
        <div className="overflow-x-auto rounded-2xl border border-hero/[0.10] bg-hero/[0.02]">
          <table className="w-full border-collapse text-left text-[14px]">
            <thead>
              <tr className="border-b border-hero/[0.10]">
                <th scope="col" className="w-[190px] px-5 py-5" />
                {options.map((opt) => (
                  <th
                    key={opt.key}
                    scope="col"
                    className={cn(
                      "border-l border-hero/[0.06] px-5 py-5 align-top font-normal",
                      opt.highlight && "bg-signal/[0.05]",
                    )}
                  >
                    <div className="text-[15px] font-medium text-hero-white">{opt.name}</div>
                    <p className="mt-1.5 text-[13px] leading-[1.5] text-hero/55">{opt.forWho}</p>
                    {opt.priceLabel && (
                      <div className="mt-3 font-mono text-[13px] text-signal">
                        {opt.priceLabel}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.question} className="border-b border-hero/[0.06]">
                  <th
                    scope="row"
                    className="px-5 py-3.5 text-left font-mono text-[11px] font-normal uppercase tracking-[0.1em] text-hero/50"
                  >
                    {row.question}
                  </th>
                  {options.map((opt, i) => (
                    <td
                      key={opt.key}
                      className={cn(
                        "border-l border-hero/[0.06] px-5 py-3.5 text-hero/80",
                        opt.highlight && "bg-signal/[0.03]",
                      )}
                    >
                      {row.values[i] ?? "—"}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="px-5 py-5" />
                {options.map((opt) => (
                  <td
                    key={opt.key}
                    className={cn(
                      "border-l border-hero/[0.06] px-5 py-5",
                      opt.highlight && "bg-signal/[0.03]",
                    )}
                  >
                    {opt.cta && (
                      <Link
                        href={opt.cta.href}
                        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-signal hover:underline underline-offset-4"
                      >
                        {opt.cta.label}
                        <span aria-hidden>→</span>
                      </Link>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Reveal>

      {/* Narrow: one card per option, questions repeated. Same information. */}
      <div className="grid gap-4 lg:hidden">
        {options.map((opt, optIndex) => (
          <Reveal
            key={opt.key}
            className={cn(
              "rounded-2xl border border-hero/[0.10] bg-hero/[0.02] p-5",
              opt.highlight && "border-signal/25 bg-signal/[0.04]",
            )}
          >
            <div className="text-[16px] font-medium text-hero-white">{opt.name}</div>
            <p className="mt-1.5 text-[13px] leading-[1.5] text-hero/60">{opt.forWho}</p>
            {opt.priceLabel && (
              <div className="mt-3 font-mono text-[13px] text-signal">
                {opt.priceLabel}
                {opt.priceNote && (
                  <span className="ml-2 text-hero/40">{opt.priceNote}</span>
                )}
              </div>
            )}
            <dl className="mt-4 divide-y divide-hero/[0.06] border-t border-hero/[0.06]">
              {rows.map((row) => (
                <div key={row.question} className="flex justify-between gap-4 py-2.5">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-hero/45">
                    {row.question}
                  </dt>
                  <dd className="text-right text-[13px] text-hero/85">
                    {row.values[optIndex] ?? "—"}
                  </dd>
                </div>
              ))}
            </dl>
            {opt.cta && (
              <Link
                href={opt.cta.href}
                className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-signal hover:underline underline-offset-4"
              >
                {opt.cta.label}
                <span aria-hidden>→</span>
              </Link>
            )}
          </Reveal>
        ))}
      </div>
    </div>
  )
}
