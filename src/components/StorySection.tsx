"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StorySectionProps {
  story: string;
  partner1: string;
  partner2: string;
}

export default function StorySection({ story, partner1, partner2 }: StorySectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-obsidian px-6 py-32"
    >
      {/* Ambient radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(184,134,11,0.06)_0%,_transparent_60%)]" />

      <div className="relative mx-auto max-w-3xl text-center">
        {/* Decorative element */}
        <motion.div
          className="mx-auto mb-8 h-px w-24 bg-gradient-to-r from-transparent via-gold/40 to-transparent"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.p
          className="mb-6 font-body text-[10px] uppercase tracking-ultrawide text-gold"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Our Story
        </motion.p>

        <motion.h2
          className="font-display text-4xl font-light leading-display tracking-luxury text-silk md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {partner1} <span className="italic text-gold">&</span> {partner2}
        </motion.h2>

        <motion.div
          className="mx-auto mt-10 h-px w-12 bg-gold/30"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        />

        <motion.p
          className="mx-auto mt-10 max-w-xl font-body text-base leading-relaxed text-silk/80"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 1 }}
        >
          {story}
        </motion.p>

        {/* Decorative ornament */}
        <motion.div
          className="mx-auto mt-12 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
        >
          <div className="h-px w-8 bg-gold/40" />
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-gold/60"
          >
            <path
              d="M8 0L9.79 6.21L16 8L9.79 9.79L8 16L6.21 9.79L0 8L6.21 6.21L8 0Z"
              fill="currentColor"
            />
          </svg>
          <div className="h-px w-8 bg-gold/40" />
        </motion.div>
      </div>
    </section>
  );
}
