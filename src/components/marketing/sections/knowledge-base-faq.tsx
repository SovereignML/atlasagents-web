"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { easing, spring } from "@/lib/motion";
import { ChevronDown } from "lucide-react";
import { BRANDING } from "@/configs/branding"

// Questions someone asks while deciding, not questions that let us restate the
// pitch. Where the honest answer is "not yet", it says so.
const faqs = [
  {
    q: "What am I actually buying?",
    a: `A specialist agent running on a server that is yours alone, plus the panel that operates it — deploy, logs, restart, credentials, backups, custom domain. ${BRANDING.name} provisions the box and installs the runtime; you do not touch infrastructure.`,
  },
  {
    q: "Do I have to bring a server?",
    a: "No, and most people should not. We provision and manage the machine as part of the plan. Bring your own server is there for people who already have a VPS, a dedicated box, or a homelab machine and want to keep using it — you paste one public key into authorized_keys and we manage the agent over SSH for a flat fee.",
  },
  {
    q: "OpenClaw or Hermes — which should I pick?",
    a: "OpenClaw unless something other than a person needs to talk to the agent. It is the default, runs on every plan including the 1 GB tier, and gives you a browser chat UI. Pick Hermes when you want an OpenAI-compatible API at /v1/* alongside that chat UI, or when you need image generation. Hermes needs at least 2 GB of RAM. You can switch later, though switching re-provisions the box.",
  },
  {
    q: "Is my data shared with other customers, or used for training?",
    a: "No. Every agent runs on its own isolated instance, dedicated to your account. Uploaded documents live in that agent's workspace, database queries are scoped to your account, and instance root passwords are encrypted at rest with a key we hold outside the database.",
  },
  {
    q: "Can it connect to Gmail, Slack, or our CRM?",
    a: "Not through native connectors today. That path is Model Context Protocol servers, which are built but not yet wired end to end — the product lists them as coming soon and will not let you enable them. What works now: the agent drives tools through a real browser, and it can run its own self-hosted n8n server to build workflows.",
  },
  {
    q: "What does a credit actually pay for?",
    a: "Model usage, workflows, automations, and vector search. Each plan includes an allowance; if you go past it you buy an overage pack rather than being cut off. On bring-your-own-server you can skip credits entirely and use your own provider API key.",
  },
  {
    q: "What happens if I want to leave?",
    a: "Both runtimes are open. Your agent's settings and behavior can be exported to a JSON file in your own Google Drive at any time, and the runtime underneath is not something we own. There is no proprietary format holding the work hostage.",
  },
  {
    q: "Can I try one before paying?",
    a: "Yes, without a card. A free demo agent is a real deployment on a real box; it tears itself down after 30 minutes, so treat it as a test drive rather than a free tier.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: easing.outExpo }}
      className={`relative glass-subtle rounded-2xl overflow-hidden transition-shadow duration-300 ${open ? "shadow-[0_0_30px_var(--glass-glow)]" : ""}`}
    >
      {/* Animated accent bar — scales in on open instead of snapping a border
          (no layout shift, unlike a real left-border). */}
      <motion.span
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent-blue-rest origin-top"
        initial={false}
        animate={{ scaleY: open ? 1 : 0, opacity: open ? 1 : 0 }}
        transition={spring.snappy}
      />
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-5 text-left cursor-pointer"
      >
        <span className="text-base font-semibold text-text-loud pr-4">{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={spring.snappy}
          className="shrink-0"
        >
          <ChevronDown className="w-4 h-4 text-accent-blue-rest" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: easing.outExpo }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">
              <p className="text-sm text-text-secondary leading-relaxed">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function KnowledgeBaseFAQ() {
  return (
    <section id="faq" className="relative mx-auto max-w-[1180px] scroll-mt-28 px-6 pt-24 pb-8 lg:pb-12">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-faint/30 to-transparent" />

      <div className="relative z-10 max-w-[860px]">
        <motion.div
          initial={{ opacity: 0, y: 48, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: easing.outExpo }}
          className="mb-12"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-hero/[0.10] bg-hero/[0.04] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-hero/60">
            Questions
          </span>
          <h2 className="mt-5 font-serif text-[clamp(1.75rem,3.6vw,2.6rem)] leading-[1.08] tracking-[-0.4px] text-hero-white" style={{ fontWeight: 400 }}>
            The things people ask before deploying one
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
