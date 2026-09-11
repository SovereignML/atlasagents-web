"use client"

import Image from "next/image"
import { ArrowLeft, Check } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * `/dashboard/deploy`, cut down to the one step that carries the argument:
 * choose a runtime, then deploy.
 *
 * The real wizard has four steps (Agent · Project · Plan · Billing). The other
 * three are a name field, a plan grid and a price — all of which the marketing
 * page already covers in its own sections, and none of which are interesting to
 * watch. Showing them turned the preview into a form to fill in rather than a
 * thing to watch, so this shows the runtime choice and then the part nobody
 * else shows: the box actually being built.
 *
 * Fully controlled. The parent owns the state so the scripted cursor can drive
 * it, and a visitor who takes over drives exactly the same state.
 */

export const RUNTIME_OPTIONS = [
  {
    value: "openclaw",
    label: "OpenClaw",
    hint: "Default agent runtime",
    logo: "/runtimes/openclaw.svg",
  },
  {
    value: "hermes",
    label: "Hermes",
    hint: "Nous Research Hermes (Python)",
    logo: "/runtimes/hermes.svg",
  },
] as const

export type RuntimeValue = (typeof RUNTIME_OPTIONS)[number]["value"]

export function ConsoleDeploy({
  runtime,
  onRuntimeChange,
  onDeploy,
  onBack,
}: {
  runtime: RuntimeValue
  onRuntimeChange: (r: RuntimeValue) => void
  onDeploy: () => void
  onBack: () => void
}) {
  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Back to overview
      </button>

      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
        <h3 className="text-[16px] font-semibold">Choose Your Agent</h3>
        <p className="mt-0.5 text-[12px] text-muted-foreground">
          Pick the runtime that powers your bot.
        </p>

        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
          Runtime Engine
        </p>

        <div className="mt-2 grid gap-2 md:grid-cols-2">
          {RUNTIME_OPTIONS.map((r) => {
            const selected = runtime === r.value
            return (
              <button
                key={r.value}
                type="button"
                data-demo={`runtime-${r.value}`}
                aria-pressed={selected}
                onClick={() => onRuntimeChange(r.value)}
                className={cn(
                  "relative flex flex-col items-start rounded-xl border p-4 text-left transition-colors",
                  selected
                    ? "border-ring bg-ring/15 ring-1 ring-ring"
                    : "border-border hover:bg-secondary/60",
                )}
              >
                {selected && (
                  <span className="absolute right-2.5 top-2.5 grid size-4 place-items-center rounded-full bg-primary text-primary-foreground">
                    <Check className="size-2.5" />
                  </span>
                )}
                <span className="grid size-11 place-items-center rounded-[11px] border border-border bg-muted">
                  <Image src={r.logo} alt="" width={24} height={24} className="size-6" />
                </span>
                <span className="mt-2.5 flex items-center gap-2 text-[14px] font-medium">
                  {r.label}
                  {r.value === "openclaw" && (
                    <span className="rounded-full border border-border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground">
                      Default
                    </span>
                  )}
                </span>
                <span className="mt-0.5 text-[11px] text-muted-foreground">{r.hint}</span>
              </button>
            )
          })}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          {/* Inert: the real wizard's Back leaves the flow, which this preview
              already offers above. */}
          <span className="rounded-lg border border-border px-3 py-1.5 text-[12px] text-muted-foreground">
            Back
          </span>
          <button
            type="button"
            data-demo="deploy-submit"
            onClick={onDeploy}
            className="rounded-full bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Deploy Agent
          </button>
        </div>
      </div>
    </div>
  )
}
