"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { easing } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { SectionHeader } from "@/components/marketing/primitives"
import { ConsoleShell, type ConsoleView } from "@/components/marketing/console/console-shell"
import { ConsoleDashboard } from "@/components/marketing/console/console-dashboard"
import { ConsoleDeploy, type RuntimeValue } from "@/components/marketing/console/console-deploy"
import { ConsoleProvisioning } from "@/components/marketing/console/console-provisioning"
import { DemoCursor } from "@/components/marketing/console/demo-cursor"
import { CONSOLE_DEMO, DEPLOY_STAGES } from "@/configs/console-demo"

/**
 * The console itself, on the homepage, walking itself through a deploy.
 *
 * A scripted pointer clicks Deploy New Agent, picks Hermes, and submits; the
 * provisioning card then ticks through the real steps. Everything it touches is
 * a real control — the script drives the same state a visitor's clicks drive,
 * so the walkthrough cannot drift from what the UI actually does.
 *
 * Three rules for editing it:
 *   1. If the product's dashboard or deploy flow changes, change this to match.
 *      A preview that flatters the product is worse than no preview.
 *   2. Numbers live in console-demo.ts and are derived from each other. Never
 *      hardcode a figure in the markup.
 *   3. The script must never be the only way to reach a state. A visitor who
 *      takes over gets the whole flow by hand.
 */

/** Pacing, in ms. One place, so the walkthrough can be retimed without hunting. */
const BEAT = {
  cursorTravel: 750, // must match DemoCursor's tween
  beforeFirstMove: 1100,
  afterClick: 620,
  betweenClicks: 480,
  provisionStep: 620,
  holdAtEnd: 3400,
}

type Phase = "dashboard" | "deploy" | "provisioning"

/**
 * Which sidebar entry is lit for each phase. Provisioning lives under My Agents
 * because that is where the product lands you once a deploy is submitted.
 */
const SHELL_VIEW: Record<Phase, ConsoleView> = {
  dashboard: "dashboard",
  deploy: "deploy",
  provisioning: "instances",
}

export function ConsolePreview({ index }: { index?: number } = {}) {
  const frameRef = useRef<HTMLDivElement>(null)
  const inView = useInView(frameRef, { once: false, amount: 0.35 })
  const reduceMotion = useReducedMotion()

  const [phase, setPhase] = useState<Phase>("dashboard")
  const [runtime, setRuntime] = useState<RuntimeValue>("openclaw")
  const [provisioned, setProvisioned] = useState(0)

  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false })
  const [clicking, setClicking] = useState(false)

  // The script yields control permanently the moment a visitor touches the
  // frame. Competing with someone's real cursor is worse than stopping.
  const [scripted, setScripted] = useState(true)
  const takeOver = useCallback(() => {
    setScripted(false)
    setCursor((c) => ({ ...c, visible: false }))
  }, [])

  useEffect(() => {
    if (!scripted || !inView || reduceMotion) return

    let alive = true
    const timers: ReturnType<typeof setTimeout>[] = []
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(setTimeout(resolve, ms))
      })

    /** Centre of a `data-demo` target, in frame-local pixels. */
    const pointAt = (name: string) => {
      const frame = frameRef.current
      const el = frame?.querySelector<HTMLElement>(`[data-demo="${name}"]`)
      if (!frame || !el) return null
      const f = frame.getBoundingClientRect()
      const r = el.getBoundingClientRect()
      return { x: r.left - f.left + r.width / 2, y: r.top - f.top + r.height / 2 }
    }

    /** Move to a target and press it. Resolves false if the target is gone. */
    const clickTarget = async (name: string) => {
      const p = pointAt(name)
      if (!p || !alive) return false
      setCursor({ ...p, visible: true })
      await sleep(BEAT.cursorTravel)
      if (!alive) return false
      setClicking(true)
      await sleep(160)
      setClicking(false)
      return alive
    }

    async function run() {
      while (alive) {
        // Reset to a fresh account and let the dashboard read for a beat.
        setPhase("dashboard")
        setRuntime("openclaw")
        setProvisioned(0)
        setCursor((c) => ({ ...c, visible: false }))
        await sleep(BEAT.beforeFirstMove)
        if (!alive) return

        if (!(await clickTarget("deploy-cta"))) return
        setPhase("deploy")
        await sleep(BEAT.afterClick)

        if (!(await clickTarget("runtime-hermes"))) return
        setRuntime("hermes")
        await sleep(BEAT.betweenClicks)

        if (!(await clickTarget("deploy-submit"))) return
        setPhase("provisioning")
        setCursor((c) => ({ ...c, visible: false }))
        await sleep(BEAT.afterClick)

        for (let i = 1; i <= DEPLOY_STAGES.length; i++) {
          if (!alive) return
          setProvisioned(i)
          await sleep(BEAT.provisionStep)
        }

        await sleep(BEAT.holdAtEnd)
      }
    }

    void run()
    return () => {
      alive = false
      timers.forEach(clearTimeout)
    }
  }, [scripted, inView, reduceMotion])

  const breadcrumb =
    phase === "dashboard"
      ? "Dashboard"
      : phase === "deploy"
        ? "Deploy Agent"
        : "Dashboard › Agents › Detail"

  const path =
    phase === "dashboard"
      ? "/dashboard"
      : phase === "deploy"
        ? "/dashboard/deploy"
        : `/dashboard/instances/${CONSOLE_DEMO.newAgent.name}`

  return (
    <section id="console" className="relative scroll-mt-28 overflow-hidden py-24 lg:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-faint to-transparent opacity-60" />

      <div className="relative z-10 mx-auto max-w-[1180px] px-6">
        <SectionHeader
          index={index}
          align="center"
          eyebrow="Live operations"
          title="Complete control, from one dashboard."
          lead="Deploy an agent, watch it build, and run the whole fleet from a single screen. Health, spend and activity in one place, with no terminal and no dashboard of your own to maintain."
        />

        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.9, ease: easing.outExpo }}
          className="glass rounded-3xl p-1"
        >
          {/* Window chrome, so the frame reads as an application rather than as
              a slab of the marketing page that happens to be dark. */}
          <div
            ref={frameRef}
            onPointerDown={takeOver}
            className="relative overflow-hidden rounded-[22px] border border-border-ghost"
          >
            <div className="flex items-center gap-2 border-b border-border-muted bg-[#0c0c0d] px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-red-400/60" />
              <span className="size-2.5 rounded-full bg-yellow-400/60" />
              <span className="size-2.5 rounded-full bg-green-400/60" />
              <span className="ml-3 truncate font-mono text-[11px] text-white/35">
                app.atlasagents.dev{path}
              </span>
            </div>

            <ConsoleShell
              view={SHELL_VIEW[phase]}
              onNavigate={(v) => setPhase(v === "dashboard" ? "dashboard" : "deploy")}
              breadcrumb={breadcrumb}
            >
              {/* All three phases occupy one grid cell, so the frame is always
                  as tall as the tallest (the dashboard) and never reflows the
                  page as the script loops. `inert` keeps the hidden ones out of
                  the tab order and unclickable. */}
              <div className="grid *:col-start-1 *:row-start-1">
                <Phase active={phase === "dashboard"}>
                  <ConsoleDashboard onDeploy={() => setPhase("deploy")} />
                </Phase>
                <Phase active={phase === "deploy"}>
                  <ConsoleDeploy
                    runtime={runtime}
                    onRuntimeChange={setRuntime}
                    onDeploy={() => {
                      setProvisioned(0)
                      setPhase("provisioning")
                    }}
                    onBack={() => setPhase("dashboard")}
                  />
                </Phase>
                <Phase active={phase === "provisioning"}>
                  <ConsoleProvisioning done={provisioned} />
                </Phase>
              </div>
            </ConsoleShell>

            <DemoCursor
              x={cursor.x}
              y={cursor.y}
              visible={cursor.visible && scripted}
              clicking={clicking}
            />
          </div>
        </motion.div>

      </div>
    </section>
  )
}

/**
 * One stacked phase. Hidden phases stay in the layout (that is what keeps the
 * frame a constant height as the script loops) but are invisible, unclickable
 * and untabbable. Content is top-aligned, the way the console aligns it.
 */
function Phase({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <div
      inert={!active}
      aria-hidden={!active}
      className={cn("self-start", !active && "pointer-events-none invisible")}
    >
      {children}
    </div>
  )
}
