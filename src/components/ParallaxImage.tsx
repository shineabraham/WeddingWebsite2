"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxImageProps {
  src: string;
  alt: string;
  caption?: string;
  height?: string;
}

export default function ParallaxImage({
  src,
  alt,
  caption,
  height = "50vh",
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-obsidian"
      style={{ height }}
    >
      {/* Parallax image */}
      <motion.div
        className="absolute inset-[-20%] h-[140%] w-full"
        style={{ y }}
      >
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Overlay layers */}
      <div className="absolute inset-0 bg-obsidian/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian" />
      <div className="absolute inset-0 bg-gold/[0.03] mix-blend-multiply" />

      {/* Film grain */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg className="h-full w-full">
          <filter id="parallax-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#parallax-grain)" />
        </svg>
      </div>

      {/* Caption */}
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center pb-12">
          <motion.p
            className="font-display text-lg italic text-silk/70 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {caption}
          </motion.p>
        </div>
      )}
    </section>
  );
}
