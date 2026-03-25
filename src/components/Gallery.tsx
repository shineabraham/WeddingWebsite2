"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

interface GalleryProps {
  images: GalleryImage[];
}

function GalleryCard({ image, index }: { image: GalleryImage; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="group relative overflow-hidden"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.15,
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      }}
      data-cursor="View"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <motion.img
          src={image.src}
          alt={image.alt}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-obsidian/20" />
        {/* Gold tint layer */}
        <div className="absolute inset-0 bg-gold/[0.03] mix-blend-multiply" />
        {/* Film grain per image */}
        <div className="absolute inset-0 opacity-[0.04]">
          <svg className="h-full w-full">
            <filter id={`grain-${index}`}>
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="4"
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter={`url(#grain-${index})`} />
          </svg>
        </div>
        {/* Hover caption */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4"
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
        >
          <p className="font-display text-sm italic text-silk/90">
            {image.caption}
          </p>
        </motion.div>
      </div>
      {/* Border glow on hover */}
      <div className="absolute inset-0 border border-gold/0 transition-colors duration-500 group-hover:border-gold/20" />
    </motion.div>
  );
}

export default function Gallery({ images }: GalleryProps) {
  return (
    <section className="relative bg-obsidian px-6 py-32" id="gallery">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,_rgba(184,134,11,0.04)_0%,_transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <motion.p
            className="font-body text-[10px] uppercase tracking-ultrawide text-gold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Moments
          </motion.p>
          <motion.h2
            className="mt-4 font-display text-4xl font-light tracking-luxury text-silk md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            A Love in Frames
          </motion.h2>
        </div>

        {/* Masonry-ish grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, i) => (
            <GalleryCard key={i} image={image} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
