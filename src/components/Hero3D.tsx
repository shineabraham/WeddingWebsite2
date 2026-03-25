"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";

interface Hero3DProps {
  partner1: string;
  partner2: string;
  tagline: string;
  date: string;
  galleryImages: { src: string; alt: string }[];
}

function MobileImageCarousel({ images }: { images: { src: string; alt: string }[] }) {
  const [current, setCurrent] = useState(0);
  const displayImages = images.slice(0, 4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % displayImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [displayImages.length]);

  return (
    <div className="relative w-full px-4">
      {/* Stacked card carousel */}
      <div className="relative mx-auto h-[45vh] max-h-[360px] w-full max-w-[300px]">
        <AnimatePresence mode="popLayout">
          {displayImages.map((img, i) => {
            const offset = (i - current + displayImages.length) % displayImages.length;
            if (offset > 2) return null;

            return (
              <motion.div
                key={`${img.src}-${i}`}
                className="absolute inset-0 overflow-hidden border border-gold/20"
                initial={{ scale: 0.85, y: 40, opacity: 0, rotateZ: offset === 1 ? -3 : offset === 2 ? 3 : 0 }}
                animate={{
                  scale: offset === 0 ? 1 : offset === 1 ? 0.93 : 0.86,
                  y: offset === 0 ? 0 : offset === 1 ? -16 : -28,
                  x: offset === 0 ? 0 : offset === 1 ? 8 : -8,
                  opacity: offset === 0 ? 1 : offset === 1 ? 0.6 : 0.3,
                  rotateZ: offset === 0 ? 0 : offset === 1 ? 2.5 : -2.5,
                  zIndex: 3 - offset,
                }}
                exit={{ scale: 0.8, y: 50, opacity: 0, rotateZ: -5 }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ zIndex: 3 - offset }}
                onClick={() => setCurrent((current + 1) % displayImages.length)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-obsidian/10" />
                <div className="absolute inset-0 bg-gold/[0.03] mix-blend-multiply" />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {displayImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current ? "w-6 bg-gold" : "w-1.5 bg-gold/30"
            }`}
            aria-label={`View image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Hero3D({
  partner1,
  partner2,
  tagline,
  date,
  galleryImages,
}: Hero3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const galleryY = useTransform(smoothProgress, [0, 1], ["0%", "-30%"]);
  const galleryScale = useTransform(smoothProgress, [0, 1], [1, 1.15]);
  const galleryOpacity = useTransform(smoothProgress, [0.3, 0.8], [1, 0]);
  const textOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  const textY = useTransform(smoothProgress, [0, 0.3], ["0%", "-10%"]);

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section ref={containerRef} className="relative h-[200vh] snap-section-hero">
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden bg-obsidian">
        {/* Ambient gradient */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(184,134,11,0.08)_0%,_transparent_70%)]" />
        </div>

        {/* ===== TOP: Text area ===== */}
        <motion.div
          className="relative z-20 flex flex-shrink-0 flex-col items-center justify-center px-6 pt-14 pb-4 text-center sm:pt-16 sm:pb-8 md:pt-20 md:pb-10"
          style={{ opacity: textOpacity, y: textY }}
        >
          <motion.div
            className="mb-3 h-px w-16 bg-gradient-to-r from-transparent via-gold/50 to-transparent md:mb-6 md:w-20"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 1.2 }}
          />

          <motion.p
            className="mb-2 font-body text-[10px] uppercase tracking-ultrawide text-gold sm:mb-3 md:mb-4 md:text-[11px]"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {formattedDate}
          </motion.p>

          <motion.h2
            className="font-display text-3xl font-light tracking-luxury text-silk sm:text-4xl md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            {partner1}
          </motion.h2>

          <motion.div
            className="my-1.5 flex items-center gap-3 sm:my-2 md:my-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="h-px w-6 bg-gold/30 md:w-10" />
            <span className="font-display text-xl italic text-gold md:text-2xl">&</span>
            <div className="h-px w-6 bg-gold/30 md:w-10" />
          </motion.div>

          <motion.h2
            className="font-display text-3xl font-light tracking-luxury text-silk sm:text-4xl md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            {partner2}
          </motion.h2>

          <motion.p
            className="mt-2 font-display text-sm italic text-silk/70 sm:mt-3 md:mt-4 md:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {tagline}
          </motion.p>

          <motion.div
            className="mt-3 h-px w-12 bg-gradient-to-r from-transparent via-gold/30 to-transparent sm:mt-4 md:mt-6 md:w-16"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.0, duration: 1 }}
          />
        </motion.div>

        {/* ===== BOTTOM: Image gallery ===== */}
        <motion.div
          className="relative z-10 flex flex-1 items-center justify-center overflow-hidden px-0 pb-6 sm:px-4 md:px-8 md:pb-10"
          style={{ y: galleryY, scale: galleryScale, opacity: galleryOpacity }}
        >
          {/* Mobile: stacked card carousel */}
          <div className="block sm:hidden w-full">
            <MobileImageCarousel images={galleryImages} />
          </div>

          {/* Desktop: triptych layout */}
          <div className="hidden sm:flex h-full w-full max-w-5xl items-center justify-center gap-3 md:gap-5">
            {/* Left image */}
            <motion.div
              className="h-[55%] w-[22%] overflow-hidden border border-gold/15"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 1 }}
            >
              <img
                src={galleryImages[1]?.src || "https://placehold.co/300x450"}
                alt={galleryImages[1]?.alt || ""}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
            </motion.div>

            {/* Center image */}
            <motion.div
              className="relative h-[75%] w-[40%] overflow-hidden border border-gold/20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              <img
                src={galleryImages[0]?.src || "https://placehold.co/500x750"}
                alt={galleryImages[0]?.alt || "Wedding photo"}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/50 via-transparent to-obsidian/20" />
              <div className="absolute inset-0 bg-gold/[0.03] mix-blend-multiply" />
            </motion.div>

            {/* Right image */}
            <motion.div
              className="h-[55%] w-[22%] overflow-hidden border border-gold/15"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              <img
                src={galleryImages[2]?.src || "https://placehold.co/300x450"}
                alt={galleryImages[2]?.alt || ""}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center md:bottom-8"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <p className="mb-1 font-body text-[8px] uppercase tracking-ultrawide text-gold/60 md:text-[9px]">
              Scroll
            </p>
            <div className="h-6 w-px bg-gradient-to-b from-gold/40 to-transparent md:h-8" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
