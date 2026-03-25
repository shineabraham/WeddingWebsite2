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
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      data-cursor="View"
    >
      {/* 4:5 on mobile, 3:4 on desktop — natural portrait photo ratio */}
      <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[3/4]">
        <motion.img
          src={image.src}
          alt={image.alt}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-obsidian/10" />
        <div className="absolute inset-0 bg-gold/[0.03] mix-blend-multiply" />

        {/* Caption — always visible on mobile, hover on desktop */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-obsidian/80 to-transparent p-3 sm:p-4 md:translate-y-full md:transition-transform md:duration-500 md:group-hover:translate-y-0">
          <p className="font-display text-xs italic text-silk/80 sm:text-sm">
            {image.caption}
          </p>
        </div>
      </div>
      <div className="absolute inset-0 border border-gold/0 transition-colors duration-500 group-hover:border-gold/20" />
    </motion.div>
  );
}

export default function Gallery({ images }: GalleryProps) {
  return (
    <section className="relative bg-obsidian px-4 py-20 sm:px-6 sm:py-32" id="gallery">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,_rgba(184,134,11,0.04)_0%,_transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-10 text-center sm:mb-16">
          <motion.p
            className="font-body text-[10px] uppercase tracking-ultrawide text-gold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Moments
          </motion.p>
          <motion.h2
            className="mt-3 font-display text-3xl font-light tracking-luxury text-silk sm:mt-4 sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            A Love in Frames
          </motion.h2>
        </div>

        {/* 2 cols on mobile, 3 on desktop */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {images.map((image, i) => (
            <GalleryCard key={i} image={image} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
