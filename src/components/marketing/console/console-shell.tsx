"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import {
  Activity,
  Bell,
  Bot,
  ChevronRight,
  CreditCard,
  FileText,
  Headset,
  LayoutDashboard,
  LifeBuoy,
  PanelLeft,
  Rocket,
  Server,
  Settings,
  Users,
  ChevronDown,
} from "lucide-react"
import { BRANDING } from "@/configs/branding"
import { CONSOLE_DEMO } from "@/configs/console-demo"
import { cn } from "@/lib/utils"

/**
 * The chrome of the real console: sidebar, top bar, canvas.
 *
 * The nav groups and labels are copied from `[APP]`'s dashboard-sidebar, and the
 * palette comes from the `.app-shell.console-dark` token scope in globals.css —
 * the same block the product ships. That is the point of this component: a
 * visitor should recognise the screenshot when they sign in, so nothing here
 * gets "improved" for marketing. If the product's nav changes, change it here.
 *
 * Nothing in the sidebar is clickable except Overview and Deploy Agent, which
 * drive the two views. Everything else is deliberately inert — this is a
 * picture of the product, not a second implementation of it.
 */

const NAV_GROUPS = [
  {
    label: "Workspace",
    items: [
      { label: "Overview", icon: LayoutDashboard, view: "dashboard" as const },
      { label: "Monitoring", icon: Activity },
      { label: "Notifications", icon: Bell },
    ],
  },
  {
    label: "Agents",
    items: [
      { label: "Deploy Agent", icon: Rocket, view: "deploy" as const },
      { label: "My Agents", icon: Bot, view: "instances" as const },
      { label: "Bring Your Own Server", icon: Server },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Billing & Credits", icon: CreditCard },
      { label: "Team", icon: Users, expandable: true },
      { label: "Audit Log", icon: FileText },
      { label: "Support", icon: LifeBuoy },
      { label: "Settings", icon: Settings },
    ],
  },
]

export type ConsoleView = "dashboard" | "deploy" | "instances"

export function ConsoleShell({
  view,
  onNavigate,
  breadcrumb,
  children,
}: {
  view: ConsoleView
  onNavigate: (view: ConsoleView) => void
  breadcrumb: string
  children: ReactNode
}) {
  return (
    // `app-shell console-dark` switches the whole subtree onto the product's
    // console tokens (near-black canvas, #161618 cards, lime primary) without
    // touching the marketing palette outside it.
    <div className="app-shell console-dark flex min-h-[560px] bg-background text-foreground">
      {/* ── Sidebar ── */}
      <aside className="hidden w-[232px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <div className="flex h-[58px] items-center gap-2.5 border-b border-sidebar-border px-4">
          {/* Still the legacy filename — the Atlas Agents artwork does not
              exist yet (see the org CLAUDE.md note on brand assets). */}
          <Image
            src="/assets/icons/SovereignML-logo-white.svg"
            alt=""
            width={22}
            height={22}
            className="h-[22px] w-auto shrink-0"
          />
          <span className="text-[15px] font-semibold tracking-tight">{BRANDING.name}</span>
        </div>

        <nav className="flex-1 overflow-hidden px-2.5 py-3">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="mb-3">
              <p className="px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">
                {group.label}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon
                  const active = "view" in item && item.view === view
                  const interactive = "view" in item && item.view !== undefined
                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        tabIndex={interactive ? 0 : -1}
                        aria-current={active ? "page" : undefined}
                        onClick={() => interactive && onNavigate(item.view!)}
                        className={cn(
                          "relative flex w-full items-center gap-2.5 rounded-lg px-2 py-[7px] text-[13px] transition-colors",
                          active
                            ? "bg-primary/10 font-medium text-foreground"
                            : interactive
                              ? "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                              : "cursor-default text-muted-foreground",
                        )}
                      >
                        {/* The active rail, exactly as the product draws it. */}
                        {active && (
                          <span
                            aria-hidden
                            className="absolute -ml-[14px] h-[18px] w-[2px] rounded-full bg-primary"
                          />
                        )}
                        <Icon className="size-4 shrink-0" />
                        <span className="flex-1 text-left">{item.label}</span>
                        {"expandable" in item && item.expandable && (
                          <ChevronRight className="size-3.5 shrink-0 opacity-50" />
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* ── Main column ── */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[58px] shrink-0 items-center gap-3 border-b border-border px-4 sm:px-5">
          <PanelLeft aria-hidden className="size-[18px] text-muted-foreground" />
          <span className="text-[15px] font-medium">{breadcrumb}</span>

          <div className="ml-auto flex items-center gap-3 sm:gap-4">
            <Headset aria-hidden className="size-[18px] text-muted-foreground" />
            <span className="relative">
              <Bell aria-hidden className="size-[18px] text-muted-foreground" />
              <span className="absolute -right-1.5 -top-1.5 grid size-[15px] place-items-center rounded-full bg-red-500 font-mono text-[9px] font-bold text-white">
                1
              </span>
            </span>
            <span className="flex items-center gap-2">
              <span className="grid size-7 place-items-center rounded-full border border-border bg-secondary text-[12px] font-medium">
                {CONSOLE_DEMO.user.initial}
              </span>
              <span className="hidden text-[14px] sm:inline">{CONSOLE_DEMO.user.name}</span>
              <ChevronDown aria-hidden className="size-3.5 text-muted-foreground" />
            </span>
          </div>
        </header>

        <div className="flex-1 overflow-hidden p-4 sm:p-6">{children}</div>
      </div>
    </div>
  )
}
