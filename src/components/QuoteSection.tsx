"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function QuoteSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center overflow-hidden bg-obsidian px-6 py-40"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(184,134,11,0.06)_0%,_transparent_50%)]" />

      <div className="relative mx-auto max-w-3xl text-center">
        {/* Large decorative quote mark */}
        <motion.div
          className="mx-auto mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg width="48" height="40" viewBox="0 0 48 40" fill="none" className="mx-auto text-gold/30">
            <path
              d="M0 24.8C0 11.2 8.8 2.4 20 0l1.6 4.8C13.2 7.2 9.6 13.6 9.2 20h8.8v20H0V24.8Zm28 0C28 11.2 36.8 2.4 48 0l1.6 4.8C41.2 7.2 37.6 13.6 37.2 20H46v20H28V24.8Z"
              fill="currentColor"
            />
          </svg>
        </motion.div>

        <motion.blockquote
          className="font-display text-2xl font-light italic leading-relaxed tracking-luxury text-silk/90 md:text-3xl lg:text-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Whatever our souls are made of, his and mine are the same.
        </motion.blockquote>

        <motion.div
          className="mx-auto mt-8 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="h-px w-8 bg-gold/30" />
          <svg width="8" height="8" viewBox="0 0 8 8" className="text-gold/40">
            <rect x="2" y="2" width="4" height="4" transform="rotate(45 4 4)" fill="currentColor" />
          </svg>
          <div className="h-px w-8 bg-gold/30" />
        </motion.div>

        <motion.p
          className="mt-6 font-body text-xs uppercase tracking-ultrawide text-gold/70"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        >
          Emily Bront&euml;, Wuthering Heights
        </motion.p>
      </div>
    </section>
  );
}
