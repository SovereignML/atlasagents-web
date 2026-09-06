"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, MotionConfig } from "framer-motion"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { SmoothScrollProvider } from "@/components/marketing/motion/smooth-scroll-provider"

// Product sections — the page's spine. Ordered as a decision, not a mood:
// what it is → which mode am I → which role → which engine → how it runs →
// what's included → what it costs.
import { WhatItIs } from "@/components/marketing/sections/what-it-is"
import { ChooseHow } from "@/components/marketing/sections/choose-how"
import { AgentRoles } from "@/components/marketing/sections/agent-roles"
import { RuntimeChoice } from "@/components/marketing/sections/runtime-choice"
import { HowDeployWorks } from "@/components/marketing/sections/how-deploy-works"
import { CapabilitiesGrid } from "@/components/marketing/sections/capabilities-grid"
import { WhatsIncluded } from "@/components/marketing/sections/whats-included"
import { ServerSizes } from "@/components/marketing/sections/server-sizes"

// The original SovereignWeb sections, all of them. This site is a superset of
// that one: nothing it showed has been dropped, the product sections below are
// added around them.
import { AgentWheel } from "@/components/marketing/sections/agent-wheel"
import { MissionControlPlanner } from "@/components/marketing/sections/mission-control-planner"
import { CapabilityTimeline } from "@/components/marketing/sections/capability-timeline"
import { Features } from "@/components/ui/features-8"
import { CompetitorComparison } from "@/components/marketing/sections/competitor-comparison"
import { PricingElevation } from "@/components/marketing/sections/pricing-elevation"

// Carried over from the brand site — these still earn their place.
import { IntegrationsStrip } from "@/components/marketing/sections/integrations-strip"
import { KnowledgeBaseFAQ } from "@/components/marketing/sections/knowledge-base-faq"
import { ConvergenceCTA } from "@/components/marketing/sections/convergence-cta"

// Not rendered on the homepage:
//   ComparisonTeaser, PricingPreview — I built these as replacements for
//     CompetitorComparison and PricingElevation. Now that both originals are
//     restored, rendering mine too put the same plan grid on the page twice
//     and two comparison tables back to back. Their content lives on
//     /comparison and /pricing, where it is not a duplicate.
//
// Still not rendered — and neither was rendered on the original site either:
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
              Original sections and new ones interleaved, ordered as a purchase
              decision: what it is → which way do I run it → which role → which
              engine → how it runs → what it reaches → what it costs. */}
          <AgentWheel />
          <WhatItIs />
          <ChooseHow />
          <AgentRoles />
          <MissionControlPlanner />
          <RuntimeChoice />
          <HowDeployWorks />
          <CapabilityTimeline />
          <CapabilitiesGrid />
          <Features />
          <IntegrationsStrip />
          <WhatsIncluded />
          <ServerSizes />
          <CompetitorComparison />
          <PricingElevation />
          <KnowledgeBaseFAQ />
          <ConvergenceCTA />
        </main>
        <Footer />
      </SmoothScrollProvider>
    </MotionConfig>
  )
}
