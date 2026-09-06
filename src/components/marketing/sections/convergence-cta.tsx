"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticButton } from "@/components/marketing/motion/magnetic-button";
import { FloatingDots } from "@/components/marketing/motion/floating-dots";
import { BRANDING } from "@/configs/branding";

export function ConvergenceCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end end"],
  });

  const headlineOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const headlineY = useTransform(scrollYProgress, [0, 0.4], [30, 0]);
  const subOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const ctaOpacity = useTransform(scrollYProgress, [0.35, 0.6], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.35, 0.6], [20, 0]);

  return (
    <section ref={sectionRef} className="relative py-40 overflow-hidden">
      <FloatingDots count={40} converge />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-accent-blue-rest opacity-[0.04] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent-blue-rest opacity-[0.03] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[700px] mx-auto px-8 text-center">
        <motion.h2
          style={{ opacity: headlineOpacity, y: headlineY, fontWeight: 400 }}
          className="mb-5 font-serif text-[clamp(2rem,4.5vw,46px)] leading-[1.06] tracking-[-0.5px] text-hero-white"
          // Matches the serif display face the rest of the page uses for
          // headings; the old bold sans read as a different site's CTA.
        >
          The cheapest way to find out<br />is to deploy one.
        </motion.h2>

        <motion.p
          style={{ opacity: subOpacity }}
          className="text-lg text-text-secondary mb-10 max-w-md mx-auto"
        >
          A real agent on a real box, in minutes. No card, and it cleans itself up after 30 minutes.
        </motion.p>

        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="inline-flex glass rounded-full p-1.5 gap-2"
        >
          <MagneticButton>
            <Link href="/register?deploy=true" className="btn-green text-sm px-8 py-3.5">
              Deploy an agent free
            </Link>
          </MagneticButton>
          <MagneticButton>
            <a
              href={BRANDING.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3.5 text-sm font-semibold text-text-loud rounded-full hover:bg-background-faint transition-colors"
            >
              Book a demo
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
