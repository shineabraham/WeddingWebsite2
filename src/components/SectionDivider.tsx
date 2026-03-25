"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
  variant?: "ornament" | "line" | "diamond" | "flourish";
}

export default function SectionDivider({ variant = "ornament" }: SectionDividerProps) {
  return (
    <div className="relative bg-obsidian py-12">
      <div className="flex items-center justify-center">
        {variant === "ornament" && (
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold/30 md:w-32" />
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gold/40">
              <path d="M10 0L12.2 7.8L20 10L12.2 12.2L10 20L7.8 12.2L0 10L7.8 7.8Z" fill="currentColor" />
            </svg>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold/30 md:w-32" />
          </motion.div>
        )}

        {variant === "diamond" && (
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/20 md:w-28" />
            <div className="flex gap-2">
              <svg width="6" height="6" viewBox="0 0 6 6" className="text-gold/30">
                <rect x="1" y="1" width="4" height="4" transform="rotate(45 3 3)" fill="currentColor" />
              </svg>
              <svg width="8" height="8" viewBox="0 0 8 8" className="text-gold/50">
                <rect x="2" y="2" width="4" height="4" transform="rotate(45 4 4)" fill="currentColor" />
              </svg>
              <svg width="6" height="6" viewBox="0 0 6 6" className="text-gold/30">
                <rect x="1" y="1" width="4" height="4" transform="rotate(45 3 3)" fill="currentColor" />
              </svg>
            </div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/20 md:w-28" />
          </motion.div>
        )}

        {variant === "line" && (
          <motion.div
            className="h-px w-32 bg-gradient-to-r from-transparent via-gold/30 to-transparent md:w-48"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
        )}

        {variant === "flourish" && (
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <svg width="80" height="20" viewBox="0 0 80 20" fill="none" className="text-gold/30">
              <path d="M0 10C10 10 15 2 25 2S35 10 40 10S50 2 55 2S70 10 80 10" stroke="currentColor" strokeWidth="0.5" />
            </svg>
            <svg width="10" height="10" viewBox="0 0 10 10" className="text-gold/50">
              <circle cx="5" cy="5" r="2" fill="currentColor" />
            </svg>
            <svg width="80" height="20" viewBox="0 0 80 20" fill="none" className="text-gold/30">
              <path d="M0 10C10 10 15 18 25 18S35 10 40 10S50 18 55 18S70 10 80 10" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </motion.div>
        )}
      </div>
    </div>
  );
}
