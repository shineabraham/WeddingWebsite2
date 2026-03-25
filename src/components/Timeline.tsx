"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  icon: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

const iconMap: Record<string, JSX.Element> = {
  champagne: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 2v6l-2 8h12l-2-8V2" />
      <path d="M12 16v6" />
      <path d="M8 22h8" />
      <path d="M6 2h12" />
    </svg>
  ),
  rings: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="9" cy="12" r="5" />
      <circle cx="15" cy="12" r="5" />
    </svg>
  ),
  camera: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  dinner: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 8h1a4 4 0 010 8h-1" />
      <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  ),
  music: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  party: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5.8 11.3L2 22l10.7-3.79" />
      <path d="M4 3h.01" />
      <path d="M22 8h.01" />
      <path d="M15 2h.01" />
      <path d="M22 20h.01" />
      <path d="M22 2l-2.24.75a2.9 2.9 0 00-1.96 3.12v0c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" />
      <path d="M22 13l-1-.5" />
    </svg>
  ),
};

function TimelineItem({
  event,
  index,
}: {
  event: TimelineEvent;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-40% 0px -40% 0px" });

  return (
    <motion.div
      ref={ref}
      className="group relative flex gap-6 md:gap-10"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        delay: index * 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Timeline node */}
      <div className="relative flex flex-col items-center">
        <motion.div
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/20 bg-obsidian"
          animate={
            isInView
              ? {
                  borderColor: "rgba(184, 134, 11, 0.6)",
                  boxShadow: "0 0 20px rgba(184, 134, 11, 0.15)",
                }
              : {
                  borderColor: "rgba(184, 134, 11, 0.2)",
                  boxShadow: "0 0 0px rgba(184, 134, 11, 0)",
                }
          }
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="text-gold/60"
            animate={isInView ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.6 }}
          >
            {iconMap[event.icon] || iconMap.party}
          </motion.div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-16">
        <p className="font-body text-[10px] uppercase tracking-ultrawide text-gold">
          {event.time}
        </p>
        <h3 className="mt-2 font-display text-2xl font-light tracking-luxury text-silk md:text-3xl">
          {event.title}
        </h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-silk/70">
          {event.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Timeline({ events }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end 40%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative bg-obsidian px-6 py-32" id="itinerary">
      {/* Section header */}
      <div className="mx-auto mb-20 max-w-3xl text-center">
        <motion.p
          className="font-body text-[10px] uppercase tracking-ultrawide text-gold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          The Celebration
        </motion.p>
        <motion.h2
          className="mt-4 font-display text-4xl font-light tracking-luxury text-silk md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Order of the Day
        </motion.h2>
      </div>

      <div ref={containerRef} className="relative mx-auto max-w-2xl">
        {/* Animated golden line */}
        <div className="absolute left-[19px] top-0 h-full w-px bg-gold/10 md:left-[19px]">
          <motion.div
            className="w-full bg-gradient-to-b from-gold/60 via-gold/40 to-gold/60"
            style={{ height: lineHeight }}
          />
        </div>

        {/* Timeline events */}
        {events.map((event, i) => (
          <TimelineItem key={i} event={event} index={i} />
        ))}
      </div>
    </section>
  );
}
