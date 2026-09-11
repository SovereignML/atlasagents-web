"use client"

import { CheckCircle2, Circle, CircleDotDashed, Trash2 } from "lucide-react"
import { DEPLOY_PHASES, DEPLOY_STAGES } from "@/configs/console-demo"
import { cn } from "@/lib/utils"

/**
 * The deployment-cycle screen, cloned from `[APP]`'s instance detail page.
 *
 * Structure is its `Plan` component (src/components/ui/agent-plan.tsx) fed by
 * deployment-stages.ts: a phase row carrying a status pill, its stages indented
 * under a dashed rail, and a "Cancel & delete" action underneath. The icon and
 * pill colours are the product's own — green-500 / blue-500 / muted for the
 * icons, and the pale -100/-700 pills — so this reads identically to the real
 * screen. Do not restyle it here; restyle it there.
 *
 * `done` is how many stages have finished. Everything before it is completed,
 * the one at that index is in progress, the rest are pending.
 */

type Status = "completed" | "in-progress" | "pending"

/**
 * Where each phase begins in the flat stage list. Static, so it is computed
 * once at module scope rather than by mutating a counter during render.
 */
const PHASE_OFFSETS = DEPLOY_PHASES.reduce<number[]>((acc, phase, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + DEPLOY_PHASES[i - 1].stages.length)
  return acc
}, [])

function statusOf(index: number, done: number): Status {
  if (index < done) return "completed"
  if (index === done) return "in-progress"
  return "pending"
}

export function ConsoleProvisioning({ done }: { done: number }) {
  const complete = done >= DEPLOY_STAGES.length
  // The hint line under the title tracks the stage currently in flight.
  const hint = complete
    ? "Deployment complete."
    : (DEPLOY_STAGES[done]?.hint ?? "Provisioning is starting.")

  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        {complete ? "Agent deployed" : "Deploying your agent"}
      </p>
      <p className="mt-1.5 text-[14px] text-foreground">{hint}</p>

      <div className="mt-5 space-y-1">
        {DEPLOY_PHASES.map((phase, phaseIndex) => {
          const first = PHASE_OFFSETS[phaseIndex]
          const last = first + phase.stages.length - 1

          const phaseStatus: Status =
            done > last ? "completed" : done >= first ? "in-progress" : "pending"

          return (
            <div key={phase.id}>
              {/* Phase row */}
              <div className="flex items-center gap-2.5 py-1">
                <StatusIcon status={phaseStatus} size="md" />
                <span
                  className={cn(
                    "flex-1 text-[14px]",
                    phaseStatus === "completed" ? "text-muted-foreground" : "text-foreground",
                  )}
                >
                  {phase.title}
                </span>
                <span
                  className={cn(
                    "shrink-0 rounded px-1.5 py-0.5 text-[11px]",
                    BADGE[phaseStatus],
                  )}
                >
                  {phaseStatus}
                </span>
              </div>

              {/* Stages, hung off the dashed rail the product draws at 20px. */}
              <div className="relative">
                <div className="absolute bottom-0 left-[20px] top-0 border-l-2 border-dashed border-muted-foreground/30" />
                <ul className="mb-1.5 ml-3 mt-1 space-y-0.5">
                  {phase.stages.map((stage, i) => {
                    const status = statusOf(first + i, done)
                    return (
                      <li key={stage.title} className="flex items-center gap-2 py-0.5 pl-6">
                        <StatusIcon status={status} size="sm" />
                        <span
                          className={cn(
                            "text-[13px]",
                            status === "completed" ? "text-muted-foreground" : "text-foreground",
                          )}
                        >
                          {stage.title}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-4">
        <span className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-[13px] text-foreground">
          <Trash2 className="size-4" />
          Cancel &amp; delete
        </span>
      </div>
    </div>
  )
}

const BADGE: Record<Status, string> = {
  completed: "bg-green-100 text-green-700",
  "in-progress": "bg-blue-100 text-blue-700",
  pending: "bg-muted text-muted-foreground",
}

function StatusIcon({ status, size }: { status: Status; size: "sm" | "md" }) {
  const cls = size === "md" ? "size-[18px]" : "size-[14px]"
  if (status === "completed") return <CheckCircle2 className={cn(cls, "shrink-0 text-green-500")} />
  if (status === "in-progress")
    return <CircleDotDashed className={cn(cls, "shrink-0 animate-spin-slow text-blue-500")} />
  return <Circle className={cn(cls, "shrink-0 text-muted-foreground")} />
}
