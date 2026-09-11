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
    // overflow-x-clip, not overflow-hidden. The bottom glow below sits at
    // `bottom-0` with a 100px blur, so clipping the y-axis sliced its lower
    // half off and left a hard horizontal edge along this section's bottom —
    // the top line of the two that bounded the marquee. The x-axis still needs
    // containing: those glows are 600px/400px wide and centred, so they would
    // overflow a narrow viewport. FloatingDots clips itself.
    <section ref={sectionRef} className="relative py-40 overflow-x-clip">
      <FloatingDots count={40} converge />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-accent-blue-rest opacity-[0.04] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent-blue-rest opacity-[0.03] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[700px] mx-auto px-8 text-center">
        <motion.h2
          style={{ opacity: headlineOpacity, y: headlineY, fontWeight: 400 }}
          // Same serif treatment as every section heading, one step larger —
          // this is the page's closing beat, not another section.
          className="mb-5 font-serif text-[clamp(2rem,4.2vw,3rem)] leading-[1.08] tracking-[-0.4px] text-hero-white"
        >
          Stop managing tasks.<br />Start deploying agents.
        </motion.h2>

        <motion.p
          style={{ opacity: subOpacity }}
          className="mx-auto mb-10 max-w-md text-[17px] leading-[1.6] text-hero/70"
        >
          OpenClaw or Hermes: pick a runtime and go live in minutes.
        </motion.p>

        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="inline-flex glass rounded-full p-1.5 gap-2"
        >
          <MagneticButton>
            <Link href="/login?deploy=true" className="btn-green text-sm px-8 py-3.5">
              Deploy Now
            </Link>
          </MagneticButton>
          <MagneticButton>
            <a
              href={BRANDING.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3.5 text-sm font-semibold text-text-loud rounded-full hover:bg-background-faint transition-colors"
            >
              Book a Demo
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
