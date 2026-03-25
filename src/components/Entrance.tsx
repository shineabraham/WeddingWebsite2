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

  // Generate particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
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
      {/* Layered ambient gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(184,134,11,0.1)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,_rgba(184,134,11,0.05)_0%,_transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,_rgba(212,168,67,0.05)_0%,_transparent_40%)]" />
      </div>

      {/* Floating gold particles */}
      {particles.map((p) => (
        <GoldParticle key={p.id} delay={p.delay} x={p.x} y={p.y} />
      ))}

      {/* Corner ornaments */}
      <motion.div
        className="absolute left-6 top-6 md:left-12 md:top-12"
        initial={{ opacity: 0 }}
        animate={showContent ? { opacity: 1 } : {}}
        transition={{ delay: 2, duration: 1.5 }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="text-gold/30">
          <path d="M0 0v60" stroke="currentColor" strokeWidth="0.5" />
          <path d="M0 0h60" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="0" cy="0" r="3" fill="currentColor" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute right-6 top-6 md:right-12 md:top-12"
        initial={{ opacity: 0 }}
        animate={showContent ? { opacity: 1 } : {}}
        transition={{ delay: 2.1, duration: 1.5 }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="text-gold/30">
          <path d="M60 0v60" stroke="currentColor" strokeWidth="0.5" />
          <path d="M60 0H0" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="60" cy="0" r="3" fill="currentColor" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute bottom-6 left-6 md:bottom-12 md:left-12"
        initial={{ opacity: 0 }}
        animate={showContent ? { opacity: 1 } : {}}
        transition={{ delay: 2.2, duration: 1.5 }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="text-gold/30">
          <path d="M0 60V0" stroke="currentColor" strokeWidth="0.5" />
          <path d="M0 60h60" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="0" cy="60" r="3" fill="currentColor" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute bottom-6 right-6 md:bottom-12 md:right-12"
        initial={{ opacity: 0 }}
        animate={showContent ? { opacity: 1 } : {}}
        transition={{ delay: 2.3, duration: 1.5 }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="text-gold/30">
          <path d="M60 60V0" stroke="currentColor" strokeWidth="0.5" />
          <path d="M60 60H0" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="60" cy="60" r="3" fill="currentColor" />
        </svg>
      </motion.div>

      {/* Decorative border frame */}
      <motion.div
        className="absolute inset-8 border border-gold/[0.08] md:inset-16 lg:inset-24"
        initial={{ opacity: 0 }}
        animate={showContent ? { opacity: 1 } : {}}
        transition={{ delay: 1.8, duration: 2 }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Top ornamental divider */}
        <motion.div
          className="mb-6 flex items-center gap-4"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={showContent ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.3, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-gold/60">
            <path d="M6 0L7.34 4.66L12 6L7.34 7.34L6 12L4.66 7.34L0 6L4.66 4.66Z" fill="currentColor" />
          </svg>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="mb-6 font-body text-[11px] uppercase tracking-ultrawide text-gold"
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Together with their families
        </motion.p>

        {/* Monogram ring */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          animate={showContent ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ delay: 0.8, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="text-gold/40">
            <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 4" />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-display text-2xl font-light tracking-luxury text-gold">
            {partner1[0]}&{partner2[0]}
          </span>
        </motion.div>

        {/* Partner 1 name */}
        <motion.h1
          className="font-display text-5xl font-light tracking-luxury text-silk md:text-7xl lg:text-[6rem]"
          initial={{ opacity: 0, y: 40 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {partner1}
        </motion.h1>

        {/* Ornamental ampersand */}
        <motion.div
          className="my-3 flex items-center gap-4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={showContent ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold/30" />
          <span className="font-display text-3xl italic text-gold md:text-4xl">&</span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold/30" />
        </motion.div>

        {/* Partner 2 name */}
        <motion.h1
          className="font-display text-5xl font-light tracking-luxury text-silk md:text-7xl lg:text-[6rem]"
          initial={{ opacity: 0, y: 40 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {partner2}
        </motion.h1>

        {/* Bottom ornamental divider */}
        <motion.div
          className="mt-8 flex items-center gap-4"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={showContent ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 1.7, duration: 1.2 }}
        >
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold/40" />
          <svg width="8" height="8" viewBox="0 0 8 8" className="text-gold/50">
            <rect x="2" y="2" width="4" height="4" transform="rotate(45 4 4)" fill="currentColor" />
          </svg>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold/40" />
        </motion.div>

        {/* Date */}
        <motion.p
          className="mt-6 font-body text-sm tracking-wide text-silk/80"
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ delay: 2.0 }}
        >
          {formattedDate}
        </motion.p>

        {/* Tagline */}
        <motion.p
          className="mt-3 font-display text-lg italic text-silk/60 md:text-xl"
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ delay: 2.2 }}
        >
          {tagline}
        </motion.p>

        {/* Enter button */}
        <motion.button
          className="group relative mt-14 overflow-hidden border border-gold/40 bg-transparent px-14 py-5 font-body text-[11px] uppercase tracking-ultrawide text-gold transition-colors hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
          onClick={onEnter}
          initial={{ opacity: 0, y: 30 }}
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

        {/* Scroll hint */}
        <motion.div
          className="mt-10 flex flex-col items-center"
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
