import Link from "next/link"
import { Section, SpecTable, type SpecColumn } from "@/components/marketing/primitives"
import { SERVER_TYPES } from "@/configs/server-types"
import { formatUsd } from "@/configs/plans"

const COLUMNS: SpecColumn[] = [
  { key: "label", header: "Size", sticky: true },
  { key: "vcpu", header: "vCPU", numeric: true },
  { key: "ram", header: "RAM", numeric: true },
  { key: "storage", header: "Storage", numeric: true },
  { key: "price", header: "Per month", numeric: true },
]

export function serverRows(slugs?: readonly string[]) {
  const types = slugs
    ? SERVER_TYPES.filter((t) => slugs.includes(t.slug))
    : SERVER_TYPES.filter((t) => t.isActive)

  return types.map((type) => ({
    key: type.slug,
    // shared-4g is what every self-serve plan actually provisions today.
    highlight: type.slug === "shared-4g",
    badge: type.slug === "shared-4g" ? "Most deploys" : undefined,
    cells: {
      label: type.label,
      vcpu: type.vcpu,
      ram: `${type.ramGb} GB`,
      storage: `${type.storageGb} GB`,
      price: formatUsd(type.priceMonthly),
    },
  }))
}

/**
 * Homepage teaser: three sizes and a link. The full nine-row table lives on
 * /pricing#sizes, where someone is actually comparing.
 */
export function ServerSizes() {
  return (
    <Section
      id="sizes"
      eyebrow="The machines"
      title="Published specs, published prices"
      lead="Shared vCPU for most work, dedicated cores when an agent must not contend for CPU. You can resize later without rebuilding the agent."
    >
      <SpecTable
        columns={COLUMNS}
        rows={serverRows(["shared-1g", "shared-4g", "shared-16g"])}
        caption="Three of nine sizes. Storage is expandable per GB; dedicated-CPU tiers are listed in full on the pricing page."
      />

      <div className="mt-8 flex flex-wrap items-center gap-6">
        <Link
          href="/pricing#sizes"
          className="inline-flex items-center gap-2 text-[14px] font-medium text-signal hover:underline underline-offset-4"
        >
          All nine sizes and dedicated CPU
          <span aria-hidden>→</span>
        </Link>
        <Link
          href="/pricing#byos"
          className="inline-flex items-center gap-2 text-[14px] font-medium text-hero/60 hover:text-hero-white"
        >
          Or bring your own server
          <span aria-hidden>→</span>
        </Link>
      </div>
    </Section>
  )
}
