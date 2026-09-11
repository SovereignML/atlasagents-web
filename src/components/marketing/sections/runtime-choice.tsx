import Image from "next/image"
import Link from "next/link"
import { Section } from "@/components/marketing/primitives"
import { RevealGroup, RevealItem } from "@/components/marketing/motion/reveal"
import { RUNTIMES } from "@/configs/runtimes"

/**
 * The second real decision a visitor makes, after which mode they are in. Kept
 * to two cards on the homepage — the full spec table lives on /runtimes.
 */
export function RuntimeChoice({ index }: { index?: number } = {}) {
  return (
    <Section
      index={index}
      id="runtimes"
      eyebrow="The engines"
      align="center"
      title="Two runtimes. One of them has an API."
      lead="The runtime is the agent engine we install on your box. Hermes is the default and is the one with an API. Pick OpenClaw when you want the lightest possible box, or the smallest plan."
    >
      <RevealGroup className="grid gap-3 lg:grid-cols-2">
        {RUNTIMES.map((runtime) => (
          <RevealItem
            key={runtime.id}
            className="flex flex-col rounded-2xl border border-hero/[0.10] bg-hero/[0.02] p-6"
          >
            <div className="flex items-center gap-3">
              <Image
                src={runtime.logo}
                alt=""
                width={28}
                height={28}
                className="shrink-0 opacity-80"
              />
              <div>
                <h3 className="text-[16px] font-medium text-hero-white">{runtime.name}</h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-hero/40">
                  {runtime.vendor}
                </p>
              </div>
              {runtime.isDefault && (
                <span className="ml-auto rounded-full bg-signal/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-signal">
                  Default
                </span>
              )}
            </div>

            <p className="mt-5 text-[15px] leading-[1.5] text-hero-white/90">{runtime.tagline}</p>
            <p className="mt-3 flex-1 text-[14px] leading-[1.6] text-hero/65">
              {runtime.description}
            </p>

            <dl className="mt-6 space-y-2.5 border-t border-hero/[0.08] pt-5">
              {runtime.interfaces.map((iface) => (
                <div key={iface.path} className="flex items-baseline gap-3">
                  <dt className="shrink-0 rounded bg-hero/[0.06] px-2 py-0.5 font-mono text-[11px] text-signal">
                    {iface.path}
                  </dt>
                  <dd className="text-[13px] leading-[1.5] text-hero/60">{iface.description}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-5 font-mono text-[12px] text-hero/40">
              Minimum {runtime.minRamGb} GB RAM
            </p>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-8 text-center">
        <Link
          href="/runtimes"
          className="inline-flex items-center gap-2 text-[14px] font-medium text-signal hover:underline underline-offset-4"
        >
          Full runtime comparison
          <span aria-hidden>→</span>
        </Link>
      </div>
    </Section>
  )
}
