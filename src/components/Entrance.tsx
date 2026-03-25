"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface EntranceProps {
  partner1: string;
  partner2: string;
  date: string;
  tagline: string;
  onEnter: () => void;
}

function GoldParticle({ delay, x, y }: { delay: number; x: string; y: string }) {
  return (
    <motion.div
      className="absolute h-1 w-1 rounded-full bg-gold/40"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.6, 0],
        scale: [0, 1.5, 0],
        y: [0, -60],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}

export default function Entrance({
  partner1,
  partner2,
  date,
  tagline,
  onEnter,
}: EntranceProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(t);
  }, []);

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: `${Math.random() * 100}%`,
    y: `${50 + Math.random() * 50}%`,
    delay: Math.random() * 6,
  }));

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-obsidian"
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Ambient gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(184,134,11,0.1)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,_rgba(184,134,11,0.05)_0%,_transparent_40%)]" />
      </div>

      {/* Particles — fewer on mobile */}
      {particles.map((p) => (
        <GoldParticle key={p.id} delay={p.delay} x={p.x} y={p.y} />
      ))}

      {/* Corner ornaments — hidden on small mobile */}
      <motion.div
        className="absolute left-4 top-4 hidden sm:block md:left-12 md:top-12"
        initial={{ opacity: 0 }}
        animate={showContent ? { opacity: 1 } : {}}
        transition={{ delay: 2, duration: 1.5 }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-gold/30 md:h-[60px] md:w-[60px]">
          <path d="M0 0v40" stroke="currentColor" strokeWidth="0.5" />
          <path d="M0 0h40" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="0" cy="0" r="2" fill="currentColor" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute right-4 top-4 hidden sm:block md:right-12 md:top-12"
        initial={{ opacity: 0 }}
        animate={showContent ? { opacity: 1 } : {}}
        transition={{ delay: 2.1, duration: 1.5 }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-gold/30 md:h-[60px] md:w-[60px]">
          <path d="M40 0v40" stroke="currentColor" strokeWidth="0.5" />
          <path d="M40 0H0" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="40" cy="0" r="2" fill="currentColor" />
        </svg>
      </motion.div>

      {/* Decorative border frame — inset adapts to screen */}
      <motion.div
        className="absolute inset-4 border border-gold/[0.08] sm:inset-8 md:inset-16 lg:inset-24"
        initial={{ opacity: 0 }}
        animate={showContent ? { opacity: 1 } : {}}
        transition={{ delay: 1.8, duration: 2 }}
      />

      {/* Main content — overflow scroll on tiny screens */}
      <div className="relative z-10 flex max-h-[90vh] flex-col items-center overflow-y-auto px-6 py-8 text-center sm:py-0">
        {/* Top ornamental divider */}
        <motion.div
          className="mb-4 flex items-center gap-3 sm:mb-6 sm:gap-4"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={showContent ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.3, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold/50 sm:w-16" />
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="text-gold/60">
            <path d="M6 0L7.34 4.66L12 6L7.34 7.34L6 12L4.66 7.34L0 6L4.66 4.66Z" fill="currentColor" />
          </svg>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold/50 sm:w-16" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="mb-4 font-body text-[10px] uppercase tracking-ultrawide text-gold sm:mb-6 sm:text-[11px]"
          initial={{ opacity: 0, y: 15 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Together with their families
        </motion.p>

        {/* Monogram ring — smaller on mobile */}
        <motion.div
          className="relative mb-5 sm:mb-8"
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          animate={showContent ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ delay: 0.8, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg width="70" height="70" viewBox="0 0 100 100" fill="none" className="text-gold/40 sm:h-[100px] sm:w-[100px]">
            <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 4" />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-display text-lg font-light tracking-luxury text-gold sm:text-2xl">
            {partner1[0]}&{partner2[0]}
          </span>
        </motion.div>

        {/* Partner 1 */}
        <motion.h1
          className="font-display text-4xl font-light tracking-luxury text-silk sm:text-5xl md:text-7xl lg:text-[6rem]"
          initial={{ opacity: 0, y: 30 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {partner1}
        </motion.h1>

        {/* Ampersand */}
        <motion.div
          className="my-2 flex items-center gap-3 sm:my-3 sm:gap-4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={showContent ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-gold/30 sm:w-10" />
          <span className="font-display text-2xl italic text-gold sm:text-3xl md:text-4xl">&</span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-gold/30 sm:w-10" />
        </motion.div>

        {/* Partner 2 */}
        <motion.h1
          className="font-display text-4xl font-light tracking-luxury text-silk sm:text-5xl md:text-7xl lg:text-[6rem]"
          initial={{ opacity: 0, y: 30 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {partner2}
        </motion.h1>

        {/* Bottom divider */}
        <motion.div
          className="mt-5 flex items-center gap-3 sm:mt-8 sm:gap-4"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={showContent ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 1.7, duration: 1.2 }}
        >
          <div className="h-px w-14 bg-gradient-to-r from-transparent to-gold/40 sm:w-20" />
          <svg width="6" height="6" viewBox="0 0 8 8" className="text-gold/50">
            <rect x="2" y="2" width="4" height="4" transform="rotate(45 4 4)" fill="currentColor" />
          </svg>
          <div className="h-px w-14 bg-gradient-to-l from-transparent to-gold/40 sm:w-20" />
        </motion.div>

        {/* Date */}
        <motion.p
          className="mt-4 font-body text-xs tracking-wide text-silk/80 sm:mt-6 sm:text-sm"
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ delay: 2.0 }}
        >
          {formattedDate}
        </motion.p>

        {/* Tagline */}
        <motion.p
          className="mt-2 font-display text-base italic text-silk/60 sm:mt-3 sm:text-lg md:text-xl"
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ delay: 2.2 }}
        >
          {tagline}
        </motion.p>

        {/* Enter button — larger tap target on mobile */}
        <motion.button
          className="group relative mt-8 overflow-hidden border border-gold/40 bg-transparent px-10 py-4 font-body text-[10px] uppercase tracking-ultrawide text-gold transition-colors hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 sm:mt-14 sm:px-14 sm:py-5 sm:text-[11px]"
          onClick={onEnter}
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2.6, duration: 0.8 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          data-cursor="Enter"
        >
          <span className="relative z-10">Open Invitation</span>
          <motion.div
            className="absolute inset-0 bg-gold/10"
            initial={{ y: "100%" }}
            whileHover={{ y: "0%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.button>

        {/* Scroll hint mouse — hidden on mobile */}
        <motion.div
          className="mt-6 hidden flex-col items-center sm:flex sm:mt-10"
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ delay: 3.2 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="text-gold/40">
              <rect x="5.5" y="0.5" width="5" height="9" rx="2.5" stroke="currentColor" strokeWidth="0.5" />
              <line x1="8" y1="3" x2="8" y2="5" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
