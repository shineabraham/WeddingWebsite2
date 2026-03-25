"use client";

export default function GrainOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full opacity-[0.035]">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}
