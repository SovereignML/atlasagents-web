import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/marketing/motion/reveal"

/**
 * Shared section shell. Every product section on this site opens the same way —
 * an optional eyebrow, a serif heading, a lead paragraph — so the page reads as
 * one document rather than a stack of independently-designed blocks.
 *
 * `id` is used as the anchor target by SectionIndex, so any section that appears
 * in an index must carry one.
 */
export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  className,
  align = "left",
  width = "wide",
}: {
  id?: string
  eyebrow?: string
  title?: ReactNode
  lead?: ReactNode
  children?: ReactNode
  className?: string
  align?: "left" | "center"
  width?: "wide" | "narrow"
}) {
  // `width` sets the measure of the CONTENT, never the position of the section.
  // Every section shares one outer container so the left gutter is constant all
  // the way down the page — mixing centered containers of different widths made
  // the left edge visibly zig-zag while scrolling.
  const innerWidth = width === "narrow" ? "max-w-[860px]" : undefined

  return (
    <section
      id={id}
      className={cn(
        // scroll-mt clears the fixed navbar when an anchor link lands here.
        "relative mx-auto max-w-[1180px] scroll-mt-28 px-6 py-16 lg:py-24",
        className,
      )}
    >
      {(eyebrow || title || lead) && (
        <Reveal className={cn("mb-10 lg:mb-14", innerWidth, align === "center" && "mx-auto text-center")}>
          {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
          {title && (
            <h2
              className="mt-5 font-serif text-[clamp(1.75rem,3.6vw,2.6rem)] leading-[1.08] tracking-[-0.4px] text-hero-white"
              style={{ fontWeight: 400 }}
            >
              {title}
            </h2>
          )}
          {lead && (
            <p
              className={cn(
                "mt-4 text-[17px] leading-[1.6] text-hero/70",
                align === "center" ? "mx-auto max-w-[640px]" : "max-w-[680px]",
              )}
            >
              {lead}
            </p>
          )}
        </Reveal>
      )}
      {innerWidth ? <div className={innerWidth}>{children}</div> : children}
    </section>
  )
}

/** The small pill above a section heading. Mono, uppercase, tracked out. */
export function SectionEyebrow({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-hero/[0.10] bg-hero/[0.04] px-3 py-1",
        "font-mono text-[11px] uppercase tracking-[0.14em] text-hero/60",
        className,
      )}
    >
      {children}
    </span>
  )
}

/** Hairline rule used to separate dense blocks inside a section. */
export function Hairline({ className }: { className?: string }) {
  return <div className={cn("h-px w-full bg-hero/[0.08]", className)} />
}
