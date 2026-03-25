"use client";

import { motion } from "framer-motion";

interface FooterProps {
  partner1: string;
  partner2: string;
  hashtag: string;
  date: string;
  venue: string;
}

export default function Footer({ partner1, partner2, hashtag, date, venue }: FooterProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <footer className="relative bg-obsidian px-6 pb-12 pt-24">
      {/* Top ornamental divider */}
      <div className="mx-auto mb-16 flex items-center justify-center gap-4">
        <div className="h-px w-20 bg-gradient-to-r from-transparent to-gold/20" />
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gold/30">
          <path d="M10 0L12.2 7.8L20 10L12.2 12.2L10 20L7.8 12.2L0 10L7.8 7.8Z" fill="currentColor" />
        </svg>
        <div className="h-px w-20 bg-gradient-to-l from-transparent to-gold/20" />
      </div>

      <motion.div
        className="mx-auto max-w-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Monogram */}
        <div className="mx-auto mb-8">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="mx-auto text-gold/25">
            <circle cx="30" cy="30" r="28" stroke="currentColor" strokeWidth="0.5" />
          </svg>
          <p className="-mt-[42px] font-display text-lg font-light tracking-luxury text-gold/60">
            {partner1[0]} & {partner2[0]}
          </p>
        </div>

        <div className="mt-8" />

        <p className="font-display text-3xl font-light tracking-luxury text-silk/60 md:text-4xl">
          {partner1} <span className="italic text-gold/70">&</span> {partner2}
        </p>

        <p className="mt-4 font-body text-sm text-silk/50">
          {formattedDate} &middot; {venue}
        </p>

        <motion.p
          className="mt-6 font-body text-xs tracking-ultrawide text-gold/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {hashtag}
        </motion.p>

        {/* Bottom flourish */}
        <div className="mx-auto mt-12 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/15" />
          <svg width="6" height="6" viewBox="0 0 6 6" className="text-gold/25">
            <rect x="1" y="1" width="4" height="4" transform="rotate(45 3 3)" fill="currentColor" />
          </svg>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/15" />
        </div>

        <p className="mt-8 font-body text-[10px] text-silk/30">
          Crafted with love
        </p>
      </motion.div>
    </footer>
  );
}
