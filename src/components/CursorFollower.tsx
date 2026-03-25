"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CursorFollower() {
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [visible, setVisible] = useState(false);

  const springConfig = { stiffness: 300, damping: 25, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    // Only show on devices with a fine pointer (no touch)
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    setVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor]");
      if (interactive) {
        setIsHovering(true);
        setHoverText(
          interactive.getAttribute("data-cursor") || ""
        );
      } else {
        setIsHovering(false);
        setHoverText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [x, y]);

  if (!visible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9998] flex items-center justify-center"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        className="rounded-full border border-gold/60"
        animate={{
          width: isHovering ? 80 : 12,
          height: isHovering ? 80 : 12,
          backgroundColor: isHovering
            ? "rgba(184, 134, 11, 0.1)"
            : "rgba(184, 134, 11, 0.4)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {isHovering && hoverText && (
          <motion.span
            className="flex h-full items-center justify-center text-[10px] font-body uppercase tracking-ultrawide text-gold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}
