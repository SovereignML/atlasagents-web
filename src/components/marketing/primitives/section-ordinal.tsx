import { cn } from "@/lib/utils"

/**
 * The [01] marker that numbers a page's sections.
 *
 * Deliberately styled the same in every section, including the older ones that
 * use a different heading treatment — the numbering is what ties a mixed page
 * together, so it must not itself vary.
 *
 * Aria-hidden: the ordinal is a visual wayfinding device, and a screen reader
 * announcing "left bracket zero one right bracket" before every heading is
 * noise, not structure.
 */
export function SectionOrdinal({
  index,
  className,
}: {
  index?: number
  className?: string
}) {
  if (index === undefined) return null
  return (
    <span
      aria-hidden
      className={cn(
        "font-mono text-[11px] tabular-nums tracking-[0.14em] text-signal",
        className,
      )}
    >
      [{String(index).padStart(2, "0")}]
    </span>
  )
}
