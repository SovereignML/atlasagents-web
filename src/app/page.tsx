"use client"

import Image from "next/image"
import Link from "next/link"
import type { ComponentType } from "react"
import { motion, MotionConfig } from "framer-motion"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { SmoothScrollProvider } from "@/components/marketing/motion/smooth-scroll-provider"

// The ten sections the page keeps. It used to run sixteen, which read as
// exhaustive rather than persuasive — four came out in the first pass and two
// more (HowDeployWorks, ServerSizes) since. The rest were resequenced to open
// with the thing people actually shop for (a role) and to answer "what do I
// get" before quoting a price.
import { AgentRoles } from "@/components/marketing/sections/agent-roles"
import { Features } from "@/components/ui/features-8"
import { ConsolePreview } from "@/components/marketing/sections/console-preview"
import { RuntimeChoice } from "@/components/marketing/sections/runtime-choice"
import { AgentWheel } from "@/components/marketing/sections/agent-wheel"
import { CompetitorComparison } from "@/components/marketing/sections/competitor-comparison"
import { WhatsIncluded } from "@/components/marketing/sections/whats-included"
import { CapabilitiesGrid } from "@/components/marketing/sections/capabilities-grid"
import { PricingElevation } from "@/components/marketing/sections/pricing-elevation"
import { KnowledgeBaseFAQ } from "@/components/marketing/sections/knowledge-base-faq"

// Outside the numbered sequence, at the very bottom.
import { ConvergenceCTA } from "@/components/marketing/sections/convergence-cta"
import { IntegrationConstellation } from "@/components/marketing/sections/integration-constellation"

// Retired from the homepage in the simplification pass. None were deleted —
// each still renders somewhere it is not redundant:
//   HowDeployWorks — was section 03, "Four choices, then it is running". The
//     four ways to run are still answered on this page as an FAQ entry built
//     from DEPLOYMENT_MODES, and in full on /pricing.
//   ServerSizes — was section 09, "Published specs, published prices". The same
//     table lives on /pricing#sizes, which is where someone comparing specs
//     actually ends up; the component itself already linked there.
//   WhatItIs — restated the hero one screen after the hero.
//   ChooseHow — the four-mode decision matrix. It survives whole on /pricing
//     (DEPLOYMENT_MODE_MATRIX), and its two questions — "which one am I" and
//     "which plan is best for me" — are now FAQ entries built from the same
//     configs, so the answer is still on this page, just not as a table.
//   CapabilityTimeline — also declared id="features", which meant the navbar's
//     /#features link landed here instead of on the Features section below it.
//   IntegrationsStrip — deleted. It was the "Model-agnostic on purpose" heading
//     wrapped around the logo marquee. Only the marquee survives, below the
//     closing CTA; the heading and the "all N models" link were the kind of
//     mid-page explanation this pass exists to remove. The full catalog, with
//     its heading, lives on /integrations.
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

// The page as an ordered argument: which role do I want → what it does → how I
// drive it → which engine → the whole catalog of roles → how it compares →
// what is included → what it can reach → what it costs → what people ask.
//
// Everything that justifies the price is stated before the price: capabilities
// land immediately above PricingElevation on purpose.
//
// The sections carry no ordinal markers. Each still ACCEPTS an optional
// `index` (SectionOrdinal renders null without one), so numbering can be turned
// back on by passing `index={i + 1}` in the map below — but nothing passes it.
// Holding components rather than JSX keeps this a plain list to reorder.
const SECTIONS: ComponentType<{ index?: number }>[] = [
  AgentRoles,
  Features,
  ConsolePreview,
  RuntimeChoice,
  AgentWheel,
  CompetitorComparison,
  WhatsIncluded,
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
                  Deploy AI agents that
                </span>
                <span className="block text-[clamp(2rem,5vw,46px)] text-hero-white">
                  actually work.
                </span>
              </motion.h1>

              <motion.p
                variants={heroContentVariants}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-[20px] leading-[26px] tracking-[-0.1px] text-hero-white/80 max-w-[560px] mt-7 mx-auto"
              >
                Pick a runtime, OpenClaw or Hermes, then customize your agent and
                put support, sales, and ops on autopilot. Zero vendor lock-in;
                your own private instance!
              </motion.p>

              {/* One call to action, centred. The secondary "See pricing" link
                  was removed deliberately — pricing is still reachable from the
                  nav, the footer and the numbered pricing section below. */}
              <motion.div
                variants={heroContentVariants}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 flex items-center justify-center"
              >
                <Link href="/register?deploy=true" className="btn-green text-base">
                  Try a Free Agent
                </Link>
              </motion.div>
            </motion.div>
          </section>

          {/* ─── Product ───
              Order comes from SECTIONS, so reordering that list reorders the
              page. No ordinal markers are rendered. The closing CTA sits
              outside this list — it is the call to action the argument builds
              toward, not another step in it. */}
          {SECTIONS.map((SectionComponent, i) => (
            // Index as key is correct here: SECTIONS is a module constant that
            // never reorders at runtime. Keying on `SectionComponent.name`
            // would be at the mercy of minification.
            <SectionComponent key={i} />
          ))}
          <ConvergenceCTA />
          {/* Just the moving glyphs, no heading and no link — breadth shown
              rather than claimed, sitting above the footer as a sign-off. It
              carries no `index`: it is not a step in the numbered argument, so
              the numbering above stays 01–12. */}
          <IntegrationConstellation />
        </main>
        <Footer />
      </SmoothScrollProvider>
    </MotionConfig>
  )
}
