"use client"

import { motion } from "framer-motion"

/**
 * The pointer that walks the console preview.
 *
 * It is decoration over a real, clickable UI, so it is `aria-hidden` and never
 * takes pointer events — a visitor's own cursor always wins. Position is in
 * pixels relative to the frame; the parent measures the targets.
 */
export function DemoCursor({
  x,
  y,
  visible,
  clicking,
}: {
  x: number
  y: number
  visible: boolean
  clicking: boolean
}) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 z-30"
      initial={false}
      animate={{ x, y, opacity: visible ? 1 : 0 }}
      transition={{
        x: { type: "tween", duration: 0.75, ease: [0.33, 1, 0.68, 1] },
        y: { type: "tween", duration: 0.75, ease: [0.33, 1, 0.68, 1] },
        opacity: { duration: 0.3 },
      }}
    >
      {/* The click ring: a lime pulse that fires on the press, centred on the
          pointer tip rather than on the glyph's bounding box. */}
      <motion.span
        className="absolute -left-3 -top-3 block size-6 rounded-full border border-primary"
        initial={false}
        animate={clicking ? { scale: [0.4, 1.5], opacity: [0.9, 0] } : { opacity: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      />
      <motion.svg
        width="20"
        height="22"
        viewBox="0 0 20 22"
        fill="none"
        animate={{ scale: clicking ? 0.82 : 1 }}
        transition={{ duration: 0.14 }}
        style={{ filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.55))" }}
      >
        <path
          d="M1 1L1 16.5L5.2 12.6L8 19.8L11 18.6L8.2 11.6L13.6 11.4L1 1Z"
          fill="#fafafa"
          stroke="#0a0a0b"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.div>
  )
}
