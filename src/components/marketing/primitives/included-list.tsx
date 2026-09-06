import { cn } from "@/lib/utils"
import { RevealGroup, RevealItem } from "@/components/marketing/motion/reveal"

/**
 * The "you get all of this regardless" checklist. Deliberately a plain dense
 * list rather than a grid of illustrated cards — the point is that it is long,
 * and cards would let it be only six items.
 */
export function IncludedList({
  items,
  columns = 3,
  className,
}: {
  items: readonly string[]
  columns?: 2 | 3
  className?: string
}) {
  return (
    <RevealGroup
      className={cn(
        "grid gap-x-8 gap-y-1 sm:grid-cols-2",
        columns === 3 && "lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item) => (
        <RevealItem
          key={item}
          className="flex items-start gap-3 border-b border-hero/[0.06] py-3 text-[14px] leading-[1.5] text-hero/80"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden
            className="mt-1 shrink-0"
          >
            <path
              d="M3.5 8.5l3 3 6-7"
              stroke="var(--color-signal)"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {item}
        </RevealItem>
      ))}
    </RevealGroup>
  )
}
