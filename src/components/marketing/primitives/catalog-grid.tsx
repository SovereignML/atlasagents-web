"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/marketing/motion/reveal"

export type CatalogItem = {
  key: string
  name: string
  description: string
  /** Filter bucket this item belongs to. */
  group: string
  href?: string
  /** Rendered top-left — an icon element the caller builds. */
  media?: React.ReactNode
  /** Small mono labels along the bottom of the card. */
  meta?: readonly string[]
  /** Renders the card dimmed with the badge, e.g. "Coming soon". */
  badge?: string
  muted?: boolean
}

/**
 * Filterable card grid, used by /agents and /integrations.
 *
 * The filter is client state and the full item list is always in the DOM — the
 * page stays statically prerenderable and every item is present for search
 * engines and for users with JS off, who simply see everything unfiltered.
 */
export function CatalogGrid({
  items,
  groups,
  allLabel = "All",
  columns = 3,
}: {
  items: readonly CatalogItem[]
  /** Filter buttons, in display order. Omit to render without a filter bar. */
  groups?: readonly string[]
  allLabel?: string
  columns?: 2 | 3 | 4
}) {
  const [active, setActive] = useState<string | null>(null)

  const counts = useMemo(() => {
    const map = new Map<string, number>()
    for (const item of items) map.set(item.group, (map.get(item.group) ?? 0) + 1)
    return map
  }, [items])

  const visible = active ? items.filter((i) => i.group === active) : items

  return (
    <div>
      {groups && groups.length > 0 && (
        <Reveal className="mb-8 flex flex-wrap gap-2">
          <FilterChip
            active={active === null}
            onClick={() => setActive(null)}
            label={allLabel}
            count={items.length}
          />
          {groups.map((group) => (
            <FilterChip
              key={group}
              active={active === group}
              onClick={() => setActive(group)}
              label={group}
              count={counts.get(group) ?? 0}
            />
          ))}
        </Reveal>
      )}

      <div
        className={cn(
          "grid gap-3 sm:grid-cols-2",
          columns === 3 && "lg:grid-cols-3",
          columns === 4 && "lg:grid-cols-4",
        )}
      >
        {visible.map((item) => (
          <CatalogCard key={item.key} item={item} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-12 text-center text-[14px] text-hero/50">
          Nothing in this group yet.
        </p>
      )}
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean
  onClick: () => void
  label: string
  count: number
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors",
        active
          ? "border-signal/40 bg-signal/10 text-hero-white"
          : "border-hero/[0.10] text-hero/60 hover:border-hero/25 hover:text-hero-white",
      )}
    >
      {label}
      <span className="font-mono text-[11px] tabular-nums text-hero/35">{count}</span>
    </button>
  )
}

function CatalogCard({ item }: { item: CatalogItem }) {
  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        {item.media}
        {item.badge && (
          <span className="shrink-0 rounded-full border border-hero/[0.12] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-hero/45">
            {item.badge}
          </span>
        )}
      </div>
      <h3 className="mt-4 text-[15px] font-medium text-hero-white">{item.name}</h3>
      <p className="mt-2 text-[14px] leading-[1.55] text-hero/65">{item.description}</p>
      {item.meta && item.meta.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-hero/40">
          {item.meta.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      )}
      {item.href && (
        <span
          aria-hidden
          className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-signal opacity-0 transition-opacity group-hover:opacity-100"
        >
          Learn more →
        </span>
      )}
    </>
  )

  const className = cn(
    "group flex h-full flex-col rounded-2xl border border-hero/[0.10] bg-hero/[0.02] p-5 transition-colors",
    item.href && "hover:border-hero/25 hover:bg-hero/[0.04]",
    item.muted && "opacity-55",
  )

  if (item.href) {
    // The Reveal wrapper is the grid item, so it carries the height the card
    // stretches into; the Link fills it.
    return (
      <Reveal className="h-full">
        <Link href={item.href} className={className}>
          {inner}
        </Link>
      </Reveal>
    )
  }

  return <Reveal className={className}>{inner}</Reveal>
}
