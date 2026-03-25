"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

interface Hero3DProps {
  partner1: string;
  partner2: string;
  tagline: string;
  date: string;
  galleryImages: { src: string; alt: string }[];
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

  const layer1Scale = useTransform(smoothProgress, [0, 1], [1, 2.5]);
  const layer1Opacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);
  const layer2Scale = useTransform(smoothProgress, [0, 1], [0.8, 2]);
  const layer2Opacity = useTransform(smoothProgress, [0.1, 0.6], [1, 0]);
  const layer3Scale = useTransform(smoothProgress, [0, 1], [0.6, 1.8]);
  const layer3Opacity = useTransform(smoothProgress, [0.2, 0.7], [1, 0]);

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-obsidian">
        {/* Ambient gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(184,134,11,0.08)_0%,_transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,_rgba(184,134,11,0.04)_0%,_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,_rgba(212,168,67,0.04)_0%,_transparent_50%)]" />
        </div>

        {/* Z-Axis floating frames */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "1200px" }}>
          {/* Layer 1 */}
          <motion.div
            className="absolute flex items-center justify-center"
            style={{ scale: layer1Scale, opacity: layer1Opacity }}
          >
            <div className="relative h-[60vh] w-[40vw] max-w-[500px] overflow-hidden border border-gold/20">
              <img
                src={galleryImages[0]?.src || "https://placehold.co/500x750"}
                alt={galleryImages[0]?.alt || "Wedding photo"}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-obsidian/30" />
              <div className="absolute inset-0 bg-gold/5 mix-blend-multiply" />
            </div>
          </motion.div>

          {/* Layer 2 */}
          <motion.div
            className="absolute flex items-center justify-center"
            style={{ scale: layer2Scale, opacity: layer2Opacity }}
          >
            <div className="flex gap-6">
              {galleryImages.slice(1, 3).map((img, i) => (
                <div
                  key={i}
                  className="relative h-[40vh] w-[25vw] max-w-[300px] overflow-hidden border border-gold/15"
                  style={{ transform: `translateX(${i === 0 ? "-20%" : "20%"})` }}
                >
                  <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-obsidian/20" />
                  <div className="absolute inset-0 bg-gold/5 mix-blend-multiply" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Layer 3 */}
          <motion.div
            className="absolute flex items-center justify-center"
            style={{ scale: layer3Scale, opacity: layer3Opacity }}
          >
            <div className="flex gap-4">
              {galleryImages.slice(3, 6).map((img, i) => (
                <div
                  key={i}
                  className="relative h-[30vh] w-[18vw] max-w-[220px] overflow-hidden border border-gold/10"
                >
                  <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/50 via-transparent to-obsidian/10" />
                  <div className="absolute inset-0 bg-gold/5 mix-blend-multiply" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Center text overlay */}
          <motion.div
            className="absolute z-40 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <p className="font-body text-[10px] uppercase tracking-ultrawide text-gold-light">
              {formattedDate}
            </p>
            <h2 className="mt-3 font-display text-4xl font-light tracking-luxury text-silk md:text-6xl">
              {partner1} <span className="italic text-gold">&</span> {partner2}
            </h2>
            <p className="mt-4 font-display text-lg italic text-silk/80">
              {tagline}
            </p>

            <motion.div
              className="mt-12 flex flex-col items-center"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className="mb-2 font-body text-[9px] uppercase tracking-ultrawide text-gold/70">
                Scroll to explore
              </p>
              <div className="h-8 w-px bg-gradient-to-b from-gold/40 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
