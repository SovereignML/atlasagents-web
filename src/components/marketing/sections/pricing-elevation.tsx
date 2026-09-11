"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { easing } from "@/lib/motion";
import { ArrowRight } from "lucide-react";
import { ModeToggle, type PricingMode } from "@/components/marketing/pricing/mode-toggle";
import { ManagedPlansGrid } from "@/components/marketing/pricing/managed-plans-grid";
import { ByosPanel } from "@/components/marketing/pricing/byos-panel";
import { SectionHeader } from "@/components/marketing/primitives";

export function PricingElevation({ index }: { index?: number } = {}) {
  const [mode, setMode] = useState<PricingMode>("managed");

  return (
    <section id="pricing" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-blue-rest opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1100px] mx-auto px-8 relative z-10">
        <SectionHeader
          index={index}
          align="center"
          eyebrow="Pricing"
          title="Free to start. Built to scale."
          lead="Upgrade when your agents are pulling their weight, not before."
          className="mb-10 lg:mb-10"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.2, ease: easing.outExpo }}
          className="flex justify-center mb-12"
        >
          <ModeToggle value={mode} onChange={setMode} />
        </motion.div>

        {mode === "managed" ? (
          <ManagedPlansGrid interval="month" />
        ) : (
          <ByosPanel interval="month" />
        )}

        <p className="mt-8 text-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent-blue-rest hover:underline"
          >
            See full pricing &amp; add-ons <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </p>
      </div>
    </section>
  );
}
