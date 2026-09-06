import Link from "next/link"
import { Section } from "@/components/marketing/primitives"
import { RevealGroup, RevealItem } from "@/components/marketing/motion/reveal"
import { CAPABILITIES } from "@/configs/capabilities"
import { findRuntime } from "@/configs/runtimes"
import {
  Globe,
  Search,
  BookOpen,
  Workflow,
  Image as ImageIcon,
  Terminal,
  Plug,
  type LucideIcon,
} from "lucide-react"

// Config carries icon names as strings (the same convention the platform uses),
// so the mapping to components lives here rather than in the data.
const ICONS: Record<string, LucideIcon> = {
  Globe,
  Search,
  BookOpen,
  Workflow,
  Image: ImageIcon,
  Terminal,
  Plug,
}

/**
 * What an agent can actually do. Coming-soon items are shown, dimmed and
 * labelled, rather than hidden — a visitor who finds out later that MCP isn't
 * wired yet trusts the rest of the page less.
 */
export function CapabilitiesGrid({ index }: { index?: number } = {}) {
  return (
    <Section
      index={index}
      id="capabilities"
      eyebrow="Capabilities"
      title="What it can reach"
      lead="Agents work the way a person would when there is no API — through a browser. Turn each capability on per agent; some are runtime-specific."
    >
      <RevealGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CAPABILITIES.map((cap) => {
          const Icon = ICONS[cap.icon] ?? Plug
          const isSoon = cap.status === "coming-soon"
          const runtimeLabel =
            cap.runtimes.length === 1
              ? `${findRuntime(cap.runtimes[0]).name} only`
              : "Both runtimes"

          return (
            <RevealItem
              key={cap.id}
              className={`flex flex-col rounded-2xl border border-hero/[0.10] bg-hero/[0.02] p-5 ${
                isSoon ? "opacity-55" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <Icon className="h-5 w-5 text-signal" strokeWidth={1.5} aria-hidden />
                {isSoon && (
                  <span className="rounded-full border border-hero/[0.12] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-hero/45">
                    Coming soon
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-[15px] font-medium text-hero-white">{cap.name}</h3>
              <p className="mt-2 flex-1 text-[14px] leading-[1.55] text-hero/65">
                {cap.description}
              </p>
              <p className="mt-4 flex flex-wrap gap-x-3 border-t border-hero/[0.08] pt-3 font-mono text-[11px] text-hero/40">
                <span>{runtimeLabel}</span>
                {cap.requiresApiKey && <span>Needs a provider key</span>}
              </p>
            </RevealItem>
          )
        })}
      </RevealGroup>

      <p className="mt-8 text-[14px] text-hero/50">
        Dimmed capabilities are built but not yet wired end to end — the product lists them
        as coming soon and will not let you enable them.{" "}
        <Link
          href="/integrations"
          className="text-signal hover:underline underline-offset-4"
        >
          See everything an agent connects to
        </Link>
        .
      </p>
    </Section>
  )
}
