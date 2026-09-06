import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/marketing/motion/reveal"

export type SpecColumn = {
  key: string
  header: ReactNode
  /** Numeric/machine values get the mono face and right alignment. */
  numeric?: boolean
  /** Keeps the first column readable while the rest scroll on narrow screens. */
  sticky?: boolean
}

export type SpecRow = {
  key: string
  cells: Record<string, ReactNode>
  /** Draws the row as the recommended one. */
  highlight?: boolean
  /** Small label rendered next to the first cell, e.g. "Most popular". */
  badge?: string
}

/**
 * Dense, scannable table for specs and prices — the thing marketing cards are
 * usually hiding. Wide tables scroll inside their own container so the page
 * body never scrolls horizontally on a phone.
 */
export function SpecTable({
  columns,
  rows,
  caption,
  className,
}: {
  columns: SpecColumn[]
  rows: SpecRow[]
  caption?: ReactNode
  className?: string
}) {
  return (
    <Reveal className={cn("w-full", className)}>
      <div className="overflow-x-auto rounded-2xl border border-hero/[0.10] bg-hero/[0.02]">
        <table className="w-full min-w-[640px] border-collapse text-left text-[14px]">
          {caption && (
            <caption className="caption-bottom px-5 pb-4 pt-3 text-left text-[13px] text-hero/50">
              {caption}
            </caption>
          )}
          <thead>
            <tr className="border-b border-hero/[0.10] bg-[var(--spec-row)]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={cn(
                    "px-5 py-3.5 font-mono text-[11px] font-normal uppercase tracking-[0.12em] text-hero/50",
                    col.numeric && "text-right",
                    col.sticky && "sticky left-0 bg-inherit",
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.key}
                className={cn(
                  // The row owns its background so a sticky cell can inherit it
                  // instead of painting over the highlight tint.
                  "border-b border-hero/[0.06] last:border-b-0 transition-colors",
                  row.highlight
                    ? "bg-[var(--spec-row-highlight)]"
                    : "bg-[var(--spec-row)] hover:bg-[var(--spec-row-hover)]",
                )}
              >
                {columns.map((col, i) => (
                  <td
                    key={col.key}
                    className={cn(
                      "px-5 py-3.5 align-middle",
                      col.numeric
                        ? "text-right font-mono tabular-nums text-hero-white"
                        : "text-hero/80",
                      i === 0 && "font-medium text-hero-white",
                      col.sticky && "sticky left-0 bg-inherit",
                    )}
                  >
                    <span className="inline-flex items-center gap-2">
                      {row.cells[col.key] ?? "—"}
                      {i === 0 && row.badge && (
                        <span className="rounded-full bg-signal/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-signal">
                          {row.badge}
                        </span>
                      )}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  )
}

/** Yes/no cell. Reads at a glance without relying on color alone. */
export function Yes({ children }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-hero-white">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M3.5 8.5l3 3 6-7"
          stroke="var(--color-signal)"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {children ?? "Yes"}
    </span>
  )
}

export function No({ children }: { children?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-hero/40">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M5 5l6 6M11 5l-6 6"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
      {children ?? "No"}
    </span>
  )
}
