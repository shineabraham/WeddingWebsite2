"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface VenueSectionProps {
  ceremony: {
    name: string;
    address: string;
  };
  reception: {
    name: string;
    address: string;
  };
  dressCode: string;
}

export default function VenueSection({
  ceremony,
  reception,
  dressCode,
}: VenueSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative bg-obsidian px-6 py-32"
      id="venue"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,_rgba(184,134,11,0.04)_0%,_transparent_60%)]" />

      <div className="relative mx-auto max-w-4xl">
        {/* Section header */}
        <div className="mb-20 text-center">
          <motion.p
            className="font-body text-[10px] uppercase tracking-ultrawide text-gold"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            The Venue
          </motion.p>
          <motion.h2
            className="mt-4 font-display text-4xl font-light tracking-luxury text-silk md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            Where to Find Us
          </motion.h2>
        </div>

        <div className="grid gap-16 md:grid-cols-2">
          {/* Ceremony */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold/20">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-gold/60"
              >
                <path d="M3 21h18" />
                <path d="M5 21V7l7-4 7 4v14" />
                <path d="M9 21v-6h6v6" />
              </svg>
            </div>
            <p className="font-body text-[10px] uppercase tracking-ultrawide text-gold">
              The Ceremony
            </p>
            <h3 className="mt-3 font-display text-2xl font-light tracking-luxury text-silk">
              {ceremony.name}
            </h3>
            <p className="mt-2 font-body text-sm text-silk/90">
              {ceremony.address}
            </p>
          </motion.div>

          {/* Reception */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold/20">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-gold/60"
              >
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              </svg>
            </div>
            <p className="font-body text-[10px] uppercase tracking-ultrawide text-gold">
              The Reception
            </p>
            <h3 className="mt-3 font-display text-2xl font-light tracking-luxury text-silk">
              {reception.name}
            </h3>
            <p className="mt-2 font-body text-sm text-silk/90">
              {reception.address}
            </p>
          </motion.div>
        </div>

        {/* Dress code */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <div className="mx-auto h-px w-16 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <p className="mt-6 font-body text-[10px] uppercase tracking-ultrawide text-gold/80">
            Dress Code
          </p>
          <p className="mt-2 font-display text-xl tracking-luxury text-silk/90">
            {dressCode}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
