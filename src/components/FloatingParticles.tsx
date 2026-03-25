"use client";

import { motion } from "framer-motion";

export default function FloatingParticles() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: 1 + Math.random() * 2,
    duration: 8 + Math.random() * 12,
    delay: Math.random() * 10,
    startY: 60 + Math.random() * 40,
    opacity: 0.1 + Math.random() * 0.3,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-[50] overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gold"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            top: `${p.startY}%`,
          }}
          animate={{
            y: [0, -400, -800],
            opacity: [0, p.opacity, 0],
            x: [0, (Math.random() - 0.5) * 80],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
