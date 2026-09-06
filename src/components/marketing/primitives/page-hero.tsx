import type { ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/marketing/motion/reveal"
import { SectionEyebrow } from "./section"

/**
 * How every sub-page opens. The landing page keeps its own animated hero; these
 * are the interior pages, and they open identically so moving between them
 * feels like moving through one site rather than eight separate designs.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  /** Small mono facts under the lead — "8 roles · 2 runtimes · from $9/mo". */
  facts,
  primary,
  secondary,
  children,
  className,
}: {
  eyebrow?: string
  title: ReactNode
  lead?: ReactNode
  facts?: readonly string[]
  primary?: { label: string; href: string }
  secondary?: { label: string; href: string }
  children?: ReactNode
  className?: string
}) {
  return (
    <header className={cn("relative mx-auto max-w-[1180px] px-6 pb-6 pt-4 lg:pt-10", className)}>
      {/* Soft brand glow, fading into the page. Matches the landing hero's key. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 h-[420px] opacity-70"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, color-mix(in srgb, var(--color-hero) 7%, transparent) 0%, transparent 70%)",
        }}
      />
      <Reveal className="relative max-w-[820px]">
        {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
        <h1
          className="mt-5 font-serif text-[clamp(2.1rem,5vw,3.25rem)] leading-[1.05] tracking-[-0.5px] text-hero-white"
          style={{ fontWeight: 400 }}
        >
          {title}
        </h1>
        {lead && (
          <p className="mt-5 max-w-[640px] text-[18px] leading-[1.55] text-hero/75">{lead}</p>
        )}

        {facts && facts.length > 0 && (
          <ul className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[12px] text-hero/45">
            {facts.map((fact, i) => (
              <li key={fact} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden className="text-hero/20">·</span>}
                {fact}
              </li>
            ))}
          </ul>
        )}

        {(primary || secondary) && (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {primary && (
              <Link href={primary.href} className="btn-green !py-3 !px-7 !text-[15px]">
                {primary.label}
              </Link>
            )}
            {secondary && (
              <Link
                href={secondary.href}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-hero/[0.14] px-6 text-[15px] font-medium text-hero-white transition-colors hover:border-hero/30 hover:bg-hero/[0.04]"
              >
                {secondary.label}
                <span aria-hidden>→</span>
              </Link>
            )}
          </div>
        )}
      </Reveal>
      {children}
    </header>
  )
}
