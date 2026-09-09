"use client"

import Image from "next/image"
import Link from "next/link"
import type { ComponentType } from "react"
import { motion, MotionConfig } from "framer-motion"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { SmoothScrollProvider } from "@/components/marketing/motion/smooth-scroll-provider"

// The twelve sections the page keeps. It used to run sixteen, which read as
// exhaustive rather than persuasive — the ask was a middle ground, so four came
// out and the rest were resequenced to open with the thing people actually
// shop for (a role) and to answer "what do I get" before quoting a price.
import { AgentRoles } from "@/components/marketing/sections/agent-roles"
import { Features } from "@/components/ui/features-8"
import { HowDeployWorks } from "@/components/marketing/sections/how-deploy-works"
import { MissionControlPlanner } from "@/components/marketing/sections/mission-control-planner"
import { RuntimeChoice } from "@/components/marketing/sections/runtime-choice"
import { AgentWheel } from "@/components/marketing/sections/agent-wheel"
import { CompetitorComparison } from "@/components/marketing/sections/competitor-comparison"
import { WhatsIncluded } from "@/components/marketing/sections/whats-included"
import { ServerSizes } from "@/components/marketing/sections/server-sizes"
import { CapabilitiesGrid } from "@/components/marketing/sections/capabilities-grid"
import { PricingElevation } from "@/components/marketing/sections/pricing-elevation"
import { KnowledgeBaseFAQ } from "@/components/marketing/sections/knowledge-base-faq"

// Outside the numbered sequence, at the very bottom.
import { ConvergenceCTA } from "@/components/marketing/sections/convergence-cta"
import { IntegrationsStrip } from "@/components/marketing/sections/integrations-strip"

// Retired from the homepage in the simplification pass. None were deleted —
// each still renders somewhere it is not redundant:
//   WhatItIs — restated the hero one screen after the hero.
//   ChooseHow — the four-mode decision matrix. It survives whole on /pricing
//     (DEPLOYMENT_MODE_MATRIX), and its two questions — "which one am I" and
//     "which plan is best for me" — are now FAQ entries built from the same
//     configs, so the answer is still on this page, just not as a table.
//   CapabilityTimeline — also declared id="features", which meant the navbar's
//     /#features link landed here instead of on the Features section below it.
//   IntegrationsStrip — still rendered, but after the closing CTA rather than
//     mid-argument, and unnumbered. The full catalog lives on /integrations.
//
// Never rendered here, and not by the site this was rebuilt from either:
//   ComparisonTeaser, PricingPreview — duplicates of CompetitorComparison and
//     PricingElevation; their content lives on /comparison and /pricing.
//   Testimonials — no real, permissioned customer quotes exist yet.
//   BackedBy — program memberships and official logos are unconfirmed.
//   AgentConfigurator — was already commented out upstream.

const lineRevealTransition = (delay: number) => ({
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1] as const,
  delay,
})

function HeroGridLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Outer pair — full height */}
      <motion.div
        className="absolute top-0 left-[15%] h-full w-px"
        style={{ transformOrigin: "top", background: "linear-gradient(to bottom, rgba(219,247,255,0.04) 75%, transparent)" }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={lineRevealTransition(0.5)}
      />
      <motion.div
        className="absolute top-0 right-[15%] h-full w-px"
        style={{ transformOrigin: "top", background: "linear-gradient(to bottom, rgba(219,247,255,0.04) 75%, transparent)" }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={lineRevealTransition(0.5)}
      />

      {/* Middle pair */}
      <motion.div
        className="absolute top-0 left-[28%] h-[85%] w-px"
        style={{ transformOrigin: "top", background: "linear-gradient(to bottom, rgba(219,247,255,0.04) 75%, transparent)" }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={lineRevealTransition(0.4)}
      />
      <motion.div
        className="absolute top-0 right-[28%] h-[85%] w-px"
        style={{ transformOrigin: "top", background: "linear-gradient(to bottom, rgba(219,247,255,0.04) 75%, transparent)" }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={lineRevealTransition(0.4)}
      />

      {/* Inner pair */}
      <motion.div
        className="absolute top-[7%] left-[37%] h-[70%] w-px"
        style={{ transformOrigin: "top", background: "linear-gradient(to bottom, rgba(219,247,255,0.04) 60%, transparent 90%)" }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={lineRevealTransition(0.2)}
      />
      <motion.div
        className="absolute top-[7%] right-[37%] h-[70%] w-px"
        style={{ transformOrigin: "top", background: "linear-gradient(to bottom, rgba(219,247,255,0.04) 60%, transparent 90%)" }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={lineRevealTransition(0.2)}
      />

      {/* Innermost pair */}
      <motion.div
        className="absolute top-[14%] left-[44%] h-[60%] w-px"
        style={{ transformOrigin: "top", background: "linear-gradient(to bottom, rgba(219,247,255,0.04) 75%, transparent 90%)" }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={lineRevealTransition(0.3)}
      />
      <motion.div
        className="absolute top-[14%] right-[44%] h-[60%] w-px"
        style={{ transformOrigin: "top", background: "linear-gradient(to bottom, rgba(219,247,255,0.04) 75%, transparent 90%)" }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={lineRevealTransition(0.3)}
      />

      {/* Horizontal cross lines */}
      <motion.div
        className="absolute left-0 right-0 top-[50%] h-px bg-hero/[0.04]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={lineRevealTransition(0.4)}
      />
      <motion.div
        className="absolute left-[15%] right-[15%] top-[20%] h-px bg-hero/[0.04]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={lineRevealTransition(0.1)}
      />
    </div>
  )
}

const heroContentVariants = {
  hidden: { opacity: 0, y: 48, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
}

// The spec strip under the CTAs. Concrete facts, mono, no adjectives — it is
// there to answer "what is this, exactly" before the fold ends.
const HERO_FACTS = [
  "Your own isolated server",
  "OpenClaw or Hermes",
  "From $9/mo",
  "Free 30-min demo",
] as const

// The page as an ordered argument: which role do I want → what it does → how it
// gets deployed → how I drive it → which engine → the whole catalog of roles →
// how it compares → what is included → what it runs on → what it can reach →
// what it costs → what people ask.
//
// Everything that justifies the price is stated before the price: capabilities
// land immediately above PricingElevation on purpose.
//
// Components, not elements: the ordinal is derived from position, so reordering
// this list renumbers the page and two sections can never claim the same
// ordinal. Holding components keeps it a plain list to reorder rather than JSX
// needing keys.
const NUMBERED_SECTIONS: ComponentType<{ index?: number }>[] = [
  AgentRoles,
  Features,
  HowDeployWorks,
  MissionControlPlanner,
  RuntimeChoice,
  AgentWheel,
  CompetitorComparison,
  WhatsIncluded,
  ServerSizes,
  CapabilitiesGrid,
  PricingElevation,
  KnowledgeBaseFAQ,
]

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider>
        <Navbar />
        <main className="relative overflow-x-clip min-h-screen">
          {/* ─── Hero background gradient ─── */}
          <div className="home-hero-background-gradient absolute top-0 left-0 h-[1600px] w-full lg:h-[2070px]">
            <div className="absolute top-[500px] left-1/2 -translate-x-1/2 w-[3088px] h-[960px] pointer-events-none dark:hidden">
              <div className="absolute top-0 left-0 h-[960px] w-[1440px]">
                <Image
                  alt=""
                  aria-hidden
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-none"
                  width={1884}
                  height={1124}
                  loading="lazy"
                  src="/assets/footer/background-transition.avif"
                />
              </div>
              <div className="absolute top-0 right-0 h-[960px] w-[1440px]">
                <Image
                  alt=""
                  aria-hidden
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-none"
                  width={1884}
                  height={1124}
                  loading="lazy"
                  src="/assets/footer/background-transition.avif"
                />
              </div>
            </div>
          </div>

          {/* ─── HERO ─── */}
          <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-24">
            <HeroGridLines />

            <motion.div
              className="relative z-10 flex flex-col items-center px-4 mt-10 text-center"
              initial="hidden"
              animate="show"
              transition={{ staggerChildren: 0.1, delayChildren: 0.4 }}
            >
              <motion.div
                variants={heroContentVariants}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-hero/[0.06] bg-hero/[0.04] mb-6"
                style={{
                  boxShadow:
                    "inset 0 0.5px 0.5px color-mix(in srgb, var(--color-hero) 24%, transparent), inset 0 -0.5px 0.5px color-mix(in srgb, var(--color-hero) 24%, transparent)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-signal animate-[pulse-glow_2s_ease-in-out_infinite]" />
                <span className="text-xs font-medium text-hero-white">
                  Hermes agents now ship an OpenAI-compatible API
                </span>
              </motion.div>

              <motion.h1
                variants={heroContentVariants}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="m-0 leading-[1.04] tracking-[-0.46px] font-serif"
                style={{ fontWeight: 400 }}
              >
                <span className="block text-[clamp(2rem,5vw,46px)] text-hero-white">
                  An AI specialist, on a server
                </span>
                <span className="block text-[clamp(2rem,5vw,46px)] text-hero-white">
                  that belongs to you.
                </span>
              </motion.h1>

              <motion.p
                variants={heroContentVariants}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-[20px] leading-[26px] tracking-[-0.1px] text-hero-white/80 max-w-[560px] mt-7 mx-auto"
              >
                Pick a role, pick a runtime, and Atlas Agents provisions the box,
                installs the engine, and hands you a working agent at its own URL.
                Isolated instance. Open runtimes. No lock-in.
              </motion.p>

              <motion.div
                variants={heroContentVariants}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 flex flex-wrap items-center justify-center gap-3"
              >
                <Link href="/register?deploy=true" className="btn-green text-base">
                  Deploy an agent free
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex h-[52px] items-center gap-2 rounded-full border border-hero/[0.14] px-7 text-[16px] font-medium text-hero-white transition-colors hover:border-hero/30 hover:bg-hero/[0.04]"
                >
                  See pricing
                  <span aria-hidden>→</span>
                </Link>
              </motion.div>

              <motion.ul
                variants={heroContentVariants}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-[12px] text-hero-white/40"
              >
                {HERO_FACTS.map((fact, i) => (
                  <li key={fact} className="flex items-center gap-3">
                    {i > 0 && (
                      <span aria-hidden className="text-hero-white/20">
                        ·
                      </span>
                    )}
                    {fact}
                  </li>
                ))}
              </motion.ul>
            </motion.div>
          </section>

          {/* ─── Product ───
              Numbered from position in NUMBERED_SECTIONS, so reordering the
              page renumbers it and two sections can never claim the same
              ordinal. The closing CTA sits outside the sequence — it is the
              call to action the numbered argument builds toward, not another
              step in it. */}
          {NUMBERED_SECTIONS.map((SectionComponent, i) => (
            // Index as key is correct here: NUMBERED_SECTIONS is a module
            // constant that never reorders at runtime. Keying on
            // `SectionComponent.name` would be at the mercy of minification.
            <SectionComponent key={i} index={i + 1} />
          ))}
          <ConvergenceCTA />
          {/* Breadth, stated after the ask rather than in the middle of it. No
              `index`: it is not a step in the argument, so SectionOrdinal
              renders nothing and the numbering above stays 01–12. */}
          <IntegrationsStrip />
        </main>
        <Footer />
      </SmoothScrollProvider>
    </MotionConfig>
  )
}
