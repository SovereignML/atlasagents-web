"use client";

import { motion } from "framer-motion";
import {
  Server, UserCog, BookOpen, KeyRound,
  HardDriveDownload, PackageOpen, MessagesSquare, Users, Check, Minus,
} from "lucide-react";
import { easing } from "@/lib/motion";
import { BRANDING } from "@/configs/branding";
import { SectionHeader } from "@/components/marketing/primitives";
import {
  ATLAS,
  COMPARISON_PRODUCTS,
  COMPARISON_ROWS,
  type Cell,
} from "@/configs/comparison";

/*
 * Competitor comparison as a ✓/— matrix (per reference design).
 *
 * The people who will also run an agent for you — Agent 37, AgentSky, Jurniti —
 * are agent HOSTS: they hand you an isolated box and a terminal, and you still
 * pick the harness, fork the template, wire the keys and keep it alive. Two of
 * them host the same open runtimes we do. So the axis is not "open vs closed",
 * it is substrate ownership plus how much arrives already done.
 *
 * The axes are chosen to favour us. The CELLS are not: every competitor mark
 * matches what that vendor publicly claims, because a false comparative claim
 * is a legal problem rather than a tone problem. Atlas's qualified wins carry a
 * `notes` caption saying which configuration they hold in — usually BYOS.
 *
 * Data and sourcing rules live in @/configs/comparison. Competitor cells
 * reflect publicly available positioning, researched September 2026. That
 * sourcing is no longer cited on the page — the footnote was removed — so it
 * lives only in the config comments. Keep it current there.
 */

const products = COMPARISON_PRODUCTS;
const rows = COMPARISON_ROWS;

/** Row id → icon. Kept here because configs in this repo stay icon-free. */
const ICONS: Record<string, typeof Server> = {
  "chat-ui": MessagesSquare,
  "own-hardware": Server,
  roles: UserCog,
  "knowledge-base": BookOpen,
  "included-tools": PackageOpen,
  "byo-keys": KeyRound,
  "own-backups": HardDriveDownload,
  "team-seats": Users,
};

/**
 * A single matrix cell: a bold accent ✓ for supported (blue in light, lime in
 * dark), a muted — for absent. An optional note scopes the claim underneath —
 * on any value, since a qualified yes ("on BYOS") needs it as much as a
 * qualified no.
 */
function CellMark({ value, note }: { value: Cell; note?: string }) {
  const mark =
    value === true ? (
      <Check className="size-5 text-accent-blue-rest dark:text-signal" strokeWidth={3} aria-label="Yes" />
    ) : (
      <Minus
        className="size-5 text-text-disabled"
        strokeWidth={2.5}
        aria-label={value === "partial" ? "Limited" : "No"}
      />
    );

  const caption = note ?? (value === "partial" ? "limited" : undefined);

  if (!caption) {
    return <span className="flex justify-center">{mark}</span>;
  }

  return (
    <span className="flex flex-col items-center gap-0.5">
      {mark}
      <span className="text-[10px] leading-tight text-text-disabled">{caption}</span>
    </span>
  );
}

export function CompetitorComparison({ index }: { index?: number } = {}) {
  return (
    <section
      id="comparison"
      aria-label={`How ${BRANDING.name} compares to other AI agent platforms`}
      className="relative py-32 overflow-hidden"
    >
      <div className="max-w-[1150px] mx-auto px-8">
        {/* Header */}
        <SectionHeader
          index={index}
          align="center"
          eyebrow="How we compare"
          title="Everyone else sells you a server. We sell you the work."
          lead={
            <>
              Every other option hands you an empty box and a terminal, then you
              pick the harness, fork the template, wire the keys, and babysit it
              forever. {BRANDING.name} hands your team a working agent on day one,
              for less than the price of the box.
            </>
          }
        />

        {/* Matrix — horizontally scrollable on small screens */}
        <motion.div
          initial={{ opacity: 0, y: 32, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: easing.outExpo }}
          className="-mx-8 overflow-x-auto px-8 md:mx-0 md:overflow-visible md:px-0 max-md:mx-0 max-md:overflow-visible max-md:px-0"
        >
          {/* Phones get the Atlas Agents column only: five products in a 720px
              table meant a sideways scroll to read anything, and the competitor
              columns are the first thing to lose. The cells are hidden in CSS
              rather than filtered in JS so the markup stays one server-rendered
              table, and the full matrix is still on /comparison.
              Only the first two <col>s apply on mobile; the rest are ignored
              once their cells are display:none. */}
          <table className="w-full border-separate border-spacing-0 text-left md:min-w-[720px]">
            <colgroup>
              <col className="w-[26%] max-md:w-[62%]" />
              <col className="w-[14.8%] max-md:w-[38%]" />
              <col className="w-[14.8%]" />
              <col className="w-[14.8%]" />
              <col className="w-[14.8%]" />
              <col className="w-[14.8%]" />
            </colgroup>
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-background align-bottom p-0" />
                {products.map((p) => {
                  const owned = p.key === ATLAS;
                  return (
                    <th
                      key={p.key}
                      className={
                        "align-bottom p-0 text-center " + (owned ? "" : "max-md:hidden")
                      }
                    >
                      <div className="px-3 pb-5 pt-6">
                        <p
                          className={
                            "text-base font-semibold tracking-[-0.5px] " +
                            (owned ? "text-text-loud" : "text-text-muted")
                          }
                        >
                          {p.name}
                        </p>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const Icon = ICONS[row.id];
                return (
                  <tr key={row.id} className="group">
                    {/* Feature label */}
                    <th
                      scope="row"
                      className="sticky left-0 z-10 border-b border-border-muted bg-background py-4 pl-7 pr-6 text-left align-middle font-normal transition-colors group-hover:rounded-l-lg group-hover:border-transparent group-hover:bg-text-loud/[0.04] [tr:has(+tr:hover)_&]:border-transparent"
                    >
                      <span className="flex items-center gap-2.5">
                        {Icon && <Icon className="size-4 shrink-0 text-text-muted" />}
                        <span className="text-sm font-medium text-text-loud">
                          {row.feature}
                        </span>
                        {row.badge && (
                          <span className="rounded-full bg-accent-blue-rest/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-blue-rest">
                            {row.badge}
                          </span>
                        )}
                      </span>
                    </th>

                    {products.map((p, i) => {
                      const owned = p.key === ATLAS;
                      return (
                        <td
                          key={p.key}
                          className={
                            "border-b border-border-muted py-4 pl-3 text-center align-middle transition-colors group-hover:border-transparent group-hover:bg-text-loud/[0.04] [tr:has(+tr:hover)_&]:border-transparent " +
                            (i === products.length - 1 ? "pr-6 group-hover:rounded-r-lg" : "pr-3") +
                            // Atlas is the last cell standing on a phone, so it
                            // takes the closing padding and corner there.
                            (owned
                              ? " max-md:pr-6 max-md:group-hover:rounded-r-lg"
                              : " max-md:hidden")
                          }
                        >
                          <CellMark value={row.values[p.key]} note={row.notes?.[p.key]} />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}

              {/* Cost row */}
              <tr className="group">
                <th
                  scope="row"
                  className="sticky left-0 z-10 rounded-bl-xl bg-background py-5 pl-7 pr-6 text-left align-middle font-normal transition-colors group-hover:rounded-l-lg group-hover:bg-text-loud/[0.04]"
                >
                  <span className="text-sm font-semibold text-text-loud">Cost</span>
                </th>
                {products.map((p, i) => {
                  const owned = p.key === ATLAS;
                  return (
                    <td
                      key={p.key}
                      className={
                        "py-5 pl-3 text-center align-middle transition-colors group-hover:bg-text-loud/[0.04] " +
                        (i === products.length - 1 ? "rounded-br-xl pr-6 group-hover:rounded-r-lg" : "pr-3") +
                        (owned
                          ? " max-md:rounded-br-xl max-md:pr-6 max-md:group-hover:rounded-r-lg"
                          : " max-md:hidden")
                      }
                    >
                      <span className="flex flex-col items-center gap-0.5">
                        <span
                          className={
                            "whitespace-nowrap text-sm " +
                            (owned
                              ? "font-bold text-accent-blue-rest dark:text-signal"
                              : "font-medium text-text-muted")
                          }
                        >
                          {p.cost}
                        </span>
                        {p.costNote && (
                          <span className="text-[10px] leading-tight text-text-disabled">
                            {p.costNote}
                          </span>
                        )}
                      </span>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </motion.div>

      </div>
    </section>
  );
}
