"use client"

import {
  Activity,
  BarChart3,
  Bot,
  ChevronRight,
  Clock,
  Coins,
  Gauge,
  Plus,
  Server,
  ShieldCheck,
} from "lucide-react"
import { CONSOLE_DEMO, CONSOLE_DEMO_TOTAL_RUNS } from "@/configs/console-demo"
import { cn } from "@/lib/utils"

/**
 * `/dashboard` as the product renders it, populated from CONSOLE_DEMO.
 *
 * Layout, copy and ordering track `[APP]`'s dashboard page: hero card, four stat
 * tiles, then Agent activity + Wallet. The product also carries Daily spend and
 * Avg latency below these; they are omitted here so the frame stays short
 * enough to sit inside a marketing section without scrolling.
 *
 * The two CSS recipes it leans on, `.console-hero` and `.stat-glow`, are the
 * product's own and already live in globals.css.
 */

const HERO_TILES = [
  { icon: Bot, cls: "text-primary" },
  { icon: Activity, cls: "text-emerald-400" },
  { icon: Gauge, cls: "text-cyan-400" },
  { icon: Coins, cls: "text-amber-400" },
  { icon: Server, cls: "text-violet-400" },
  { icon: ShieldCheck, cls: "text-rose-400" },
]

export function ConsoleDashboard({ onDeploy }: { onDeploy: () => void }) {
  const d = CONSOLE_DEMO

  return (
    <div className="space-y-4">
      {/* ── Hero ── */}
      <div className="console-hero relative overflow-hidden rounded-[18px] border border-border p-5 sm:p-6">
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
              Launch · Automate · Scale
            </p>
            <h3 className="mt-2 text-[22px] font-semibold leading-tight sm:text-[26px]">
              Welcome back, {d.user.name}
            </h3>
            <p className="mt-1.5 text-[13px] text-muted-foreground">
              Deploy, monitor, and scale your AI agents from a single control plane.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                data-demo="deploy-cta"
                onClick={onDeploy}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Plus className="size-4" />
                Deploy New Agent
              </button>
              <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[13px] text-foreground">
                <Activity className="size-4" />
                View monitoring
              </span>
            </div>
          </div>

          <div className="grid w-fit shrink-0 grid-cols-3 grid-rows-2 gap-2.5 max-lg:hidden">
            {HERO_TILES.map((tile, i) => {
              const Icon = tile.icon
              return (
                <div
                  key={i}
                  className="grid size-10 place-items-center rounded-[11px] border border-border bg-secondary"
                >
                  <Icon className={cn("size-[18px]", tile.cls)} />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Stat tiles ── */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile
          label="Total Agents"
          value={d.totalAgents}
          hint={`${plural(d.incidents24h, "incident")} in 24h`}
          icon={Bot}
          glow="var(--primary)"
          iconCls="text-primary"
        />
        <StatTile
          label="Running"
          value={d.runningAgents}
          hint={`of ${d.totalAgents} total`}
          icon={Activity}
          glow="#34d27b"
          iconCls="text-emerald-400"
        />
        <StatTile
          label="Credits"
          value={d.credits.toLocaleString()}
          hint={`${d.dailyBurnCredits.toLocaleString()} cr/day burn`}
          icon={Coins}
          glow="#f59e0b"
          iconCls="text-amber-400"
        />
        <StatTile
          label="Runway"
          value={`${d.runwayDays} days`}
          hint={`at ~$${d.dailyBurnUsd.toFixed(2)}/day`}
          icon={Clock}
          glow="#22d3ee"
          iconCls="text-cyan-400"
        />
      </div>

      {/* ── Agent activity + Wallet ── */}
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.4fr_1fr]">
        <Panel className="flex flex-col">
          <PanelTitle icon={BarChart3} iconCls="text-primary">
            Agent activity
          </PanelTitle>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {CONSOLE_DEMO_TOTAL_RUNS.toLocaleString()} runs in the last 14 days
          </p>
          <BarChart values={d.runs14d} className="mt-4 min-h-[104px] flex-1" />
        </Panel>

        <Panel>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-primary">
            Credit runway
          </p>
          <p className="mt-1 text-[15px] font-semibold">Wallet</p>

          <p className="mt-4 text-[26px] font-bold tabular-nums leading-none">
            {d.credits.toLocaleString()}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">credits left</p>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-muted-foreground">Runway</span>
              <span className="font-mono">{d.runwayDays} days</span>
            </div>
            {/* The product caps the bar at a 5-day window, so a healthy wallet
                reads as full rather than as a sliver off the end of a scale. */}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-full rounded-full bg-primary" />
            </div>
          </div>

          <dl className="mt-4">
            <Row label="Daily burn" value={`${d.dailyBurnCredits.toLocaleString()} cr/day`} />
            <Row
              label="Auto-pause below"
              value={`${d.autoPauseBelowCredits.toLocaleString()} cr`}
            />
          </dl>
        </Panel>
      </div>

      <div className="flex justify-end">
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[12px] text-muted-foreground">
          View all agents
          <ChevronRight className="size-3.5" />
        </span>
      </div>
    </div>
  )
}

/* ── pieces ──────────────────────────────────────────────────────────────── */

/** "0 incidents", "1 incident" — the product pluralises its hints, so this does. */
function plural(n: number, word: string) {
  return `${n.toLocaleString()} ${word}${n === 1 ? "" : "s"}`
}

function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card p-4 sm:p-5", className)}>
      {children}
    </div>
  )
}

function PanelTitle({
  icon: Icon,
  iconCls,
  children,
}: {
  icon: React.ElementType
  iconCls: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className={cn("size-4", iconCls)} />
      <span className="text-[14px] font-semibold">{children}</span>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-t border-border py-2 text-[11px]">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-mono">{value}</dd>
    </div>
  )
}

function StatTile({
  label,
  value,
  hint,
  icon: Icon,
  glow,
  iconCls,
}: {
  label: string
  value: string | number
  hint: string
  icon: React.ElementType
  glow: string
  iconCls: string
}) {
  return (
    <div
      className="stat-glow rounded-2xl border border-border bg-card p-4"
      style={{ "--stat-glow": glow } as React.CSSProperties}
    >
      <span className="grid size-8 place-items-center rounded-lg bg-secondary">
        <Icon className={cn("size-[15px]", iconCls)} />
      </span>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-[26px] font-bold tabular-nums leading-none">{value}</p>
      <p className="mt-1.5 text-[11px] text-muted-foreground">{hint}</p>
    </div>
  )
}

/**
 * Column chart, scaled to the series max so the shape is the data.
 *
 * Fills match `[APP]`'s overview charts: solid brand bars with the peak day a
 * shade lighter. Alpha-blended bars were tried and read as olive on the console
 * canvas, which is not a colour the product ever draws.
 */
function BarChart({
  values,
  className,
  tone = "var(--brand-bar)",
  peakTone = "var(--brand-bar-peak)",
}: {
  values: readonly number[]
  className?: string
  tone?: string
  peakTone?: string
}) {
  const max = Math.max(...values)
  return (
    <div className={cn("flex items-end gap-[4px]", className)}>
      {values.map((v, i) => (
        <div
          key={i}
          className="min-w-0 flex-1 rounded-t-[5px]"
          style={{
            height: `${Math.max(6, (v / max) * 100)}%`,
            background: v === max ? peakTone : tone,
          }}
        />
      ))}
    </div>
  )
}
