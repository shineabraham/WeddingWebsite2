"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getCountdown, formatCoordinates } from "@/lib/data";

interface HUDProps {
  ceremonyDate: string;
  coordinates: { lat: number; lng: number };
}

export default function HUD({ ceremonyDate, coordinates }: HUDProps) {
  const [countdown, setCountdown] = useState(getCountdown(ceremonyDate));
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(ceremonyDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [ceremonyDate]);

  const coordStr = formatCoordinates(coordinates.lat, coordinates.lng);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] p-4 md:p-6">
      {/* Top-left: Countdown */}
      <motion.div
        className="absolute left-4 top-4 md:left-6 md:top-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <p className="font-body text-[9px] uppercase tracking-ultrawide text-gold/80">
          Countdown
        </p>
        <div className="mt-1 flex items-baseline gap-1 font-body tabular-nums">
          <span className="text-lg font-light text-silk">{countdown.days}</span>
          <span className="text-[9px] uppercase tracking-wide text-gold/80">d</span>
          <span className="ml-1 text-lg font-light text-silk">{countdown.hours}</span>
          <span className="text-[9px] uppercase tracking-wide text-gold/80">h</span>
          <span className="ml-1 text-lg font-light text-silk">{countdown.minutes}</span>
          <span className="text-[9px] uppercase tracking-wide text-gold/80">m</span>
          <span className="ml-1 text-lg font-light text-silk">{countdown.seconds}</span>
          <span className="text-[9px] uppercase tracking-wide text-gold/80">s</span>
        </div>
      </motion.div>

      {/* Top-right: Coordinates */}
      <motion.div
        className="absolute right-4 top-4 text-right md:right-6 md:top-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.7, duration: 0.8 }}
      >
        <p className="font-body text-[9px] uppercase tracking-ultrawide text-gold/80">
          Location
        </p>
        <p className="mt-1 font-body text-xs tabular-nums text-silk/80">
          {coordStr}
        </p>
      </motion.div>

      {/* Bottom-right: Audio toggle */}
      <motion.div
        className="absolute bottom-4 right-4 md:bottom-6 md:right-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.8 }}
      >
        <button
          className="pointer-events-auto flex items-center gap-2 border border-gold/20 bg-obsidian/80 px-3 py-1.5 font-body text-[9px] uppercase tracking-ultrawide text-gold backdrop-blur-sm transition-colors hover:border-gold/40 hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/50 active:scale-95"
          onClick={() => setIsMuted(!isMuted)}
        >
          {/* Sound wave icon */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-gold"
          >
            {isMuted ? (
              <>
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </>
            ) : (
              <>
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </>
            )}
          </svg>
          {isMuted ? "Muted" : "Playing"}
        </button>
      </motion.div>

      {/* Bottom-left: Hashtag */}
      <motion.div
        className="absolute bottom-4 left-4 md:bottom-6 md:left-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.2, duration: 0.8 }}
      >
        <p className="font-body text-[9px] uppercase tracking-ultrawide text-gold/70">
          #AlexAndIsabella2026
        </p>
      </motion.div>
    </div>
  );
}
