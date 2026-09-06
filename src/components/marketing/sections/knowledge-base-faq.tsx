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
    q: `What is ${BRANDING.name}?`,
    a: "An AI operations platform. You deploy intelligent agents that handle real work: support, sales, devops, content, research. Your agents run in your own isolated, managed instance, with your configuration and data under your control.",
  },
  {
    q: "What are OpenClaw and Hermes?",
    a: "The two open, general-purpose agent runtimes your agents run on. Both handle the full range of work. Pick whichever fits your model preferences, or run both. Because they're open, you're never locked in: take your agents and your setup with you anytime.",
  },
  {
    q: "What types of agents can I deploy?",
    a: "Agents run on two open runtimes, OpenClaw and Hermes, across eight categories: Automation, DevOps, Support, Research, Content, Sales, Social Media, and Custom. Each configurable to your exact requirements.",
  },
  {
    q: "Do I need AI expertise?",
    a: "No. You choose the task, we configure the agent. For complex multi-agent systems, our team designs and deploys custom solutions.",
  },
  {
    q: "How does pricing work?",
    a: "Credit-based. Free tier to start, then Lite ($9/mo), Builder ($19/mo), Operator ($69/mo), Scale ($179/mo), and Enterprise (from $499/mo). Credits cover AI usage, workflows, automations, and vector search.",
  },
  {
    q: "Can you build a custom AI system for my business?",
    a: "Yes. Book a strategy call. We design, build, and deploy multi-agent systems tailored to your workflows, with dedicated engineering support and production SLAs.",
  },
];

// Added on top of the original six. These are the questions a visitor asks
// while deciding rather than while browsing, and the ones where the honest
// answer is "not yet" — stated plainly instead of omitted.
const additionalFaqs = [
  {
    q: "Do I have to bring my own server?",
    a: "No, and most people should not. We provision and manage the machine as part of the plan. Bring your own server is there for people who already have a VPS, a dedicated box, or a homelab machine — you paste one public key into authorized_keys and we manage the agent over SSH for a flat fee. No daemon to install.",
  },
  {
    q: "Is my data shared with other customers, or used for training?",
    a: "No to both. Every agent runs on its own isolated instance, dedicated to your account. Uploaded documents live in that agent's workspace, database queries are scoped to your account, and instance root passwords are encrypted at rest with a key held outside the database. We do not train models on your data.",
  },
  {
    q: "Can it connect to Gmail, Slack, or our CRM?",
    a: "Not through native connectors today. That path is Model Context Protocol servers, which are built but not yet wired end to end — the product lists them as coming soon and will not let you enable them. What works now: the agent drives tools through a real browser, and it can run its own self-hosted n8n server to build workflows.",
  },
  {
    q: "Is there any lock-in?",
    a: "No. Both runtimes are open source projects we did not write and do not own. Your agent's settings and behavior export to a JSON file in your own Google Drive at any time, and restore into a new agent. There is no proprietary format holding the work hostage.",
  },
  {
    q: "Can I try one before paying?",
    a: "Yes, without a card. A free demo agent is a real deployment on a real box — the same provisioning path a paid one takes. It tears itself down after 30 minutes, so treat it as a test drive rather than a free tier.",
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
          {[...faqs, ...additionalFaqs].map((faq, i) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
