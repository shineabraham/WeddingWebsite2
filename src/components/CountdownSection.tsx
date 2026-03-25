"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getCountdown } from "@/lib/data";

interface CountdownSectionProps {
  ceremonyDate: string;
  venueName: string;
}

function CountdownUnit({ value, label, delay }: { value: number; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative">
        {/* Decorative border */}
        <div className="absolute -inset-3 border border-gold/10 md:-inset-4" />
        <div className="relative flex h-20 w-20 items-center justify-center md:h-28 md:w-28">
          <span className="font-display text-4xl font-light tabular-nums text-silk md:text-6xl">
            {String(value).padStart(2, "0")}
          </span>
        </div>
      </div>
      <p className="mt-4 font-body text-[9px] uppercase tracking-ultrawide text-gold/80 md:text-[10px]">
        {label}
      </p>
    </motion.div>
  );
}

export default function CountdownSection({ ceremonyDate, venueName }: CountdownSectionProps) {
  const [countdown, setCountdown] = useState(getCountdown(ceremonyDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(ceremonyDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [ceremonyDate]);

  const formattedDate = new Date(ceremonyDate).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section className="relative bg-obsidian px-6 py-32" id="countdown">
      {/* Double-layer glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(184,134,11,0.08)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(184,134,11,0.04)_0%,_transparent_30%)]" />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.p
          className="font-body text-[10px] uppercase tracking-ultrawide text-gold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Save the Date
        </motion.p>

        <motion.h2
          className="mt-4 font-display text-4xl font-light tracking-luxury text-silk md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Counting Every Moment
        </motion.h2>

        <motion.p
          className="mt-4 font-body text-sm text-silk/70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {formattedDate} &middot; {venueName}
        </motion.p>

        {/* Countdown grid */}
        <div className="mt-16 flex items-center justify-center gap-6 md:gap-12">
          <CountdownUnit value={countdown.days} label="Days" delay={0.4} />
          <motion.span
            className="mt-[-20px] font-display text-2xl text-gold/40"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            :
          </motion.span>
          <CountdownUnit value={countdown.hours} label="Hours" delay={0.5} />
          <motion.span
            className="mt-[-20px] font-display text-2xl text-gold/40"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            :
          </motion.span>
          <CountdownUnit value={countdown.minutes} label="Minutes" delay={0.6} />
          <motion.span
            className="mt-[-20px] font-display text-2xl text-gold/40"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            :
          </motion.span>
          <CountdownUnit value={countdown.seconds} label="Seconds" delay={0.7} />
        </div>
      </div>
    </section>
  );
}
