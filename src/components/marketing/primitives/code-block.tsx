import { cn } from "@/lib/utils"
import { Reveal } from "@/components/marketing/motion/reveal"

/**
 * Fixed, non-interactive code sample. Wide lines scroll inside the block so the
 * page body never scrolls horizontally on a phone.
 */
export function CodeBlock({
  label,
  code,
  className,
}: {
  label?: string
  code: string
  className?: string
}) {
  return (
    <Reveal
      className={cn(
        "overflow-hidden rounded-2xl border border-hero/[0.10] bg-[var(--spec-row)]",
        className,
      )}
    >
      {label && (
        <div className="border-b border-hero/[0.08] px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-hero/45">
          {label}
        </div>
      )}
      <pre className="overflow-x-auto px-5 py-4 font-mono text-[12.5px] leading-[1.7] text-hero/85">
        <code>{code}</code>
      </pre>
    </Reveal>
  )
}
