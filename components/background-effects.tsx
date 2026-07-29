"use client";

import Image from "next/image";

const particles = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  top: `${(index * 19) % 100}%`,
  left: `${(index * 11) % 100}%`,
  delay: `${(index % 10) * 0.4}s`,
  duration: `${6 + (index % 6)}s`,
}));

export function BackgroundEffects() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#320000_0%,#0B0B0B_45%,#0B0B0B_100%)]" />
      <Image
        src="/world-map.svg"
        alt=""
        fill
        priority
        className="object-cover opacity-[0.08]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,0,0,0.1),transparent_45%,rgba(255,255,255,0.03))]" />
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute h-1 w-1 animate-particle rounded-full bg-red-500/60"
          style={{
            top: particle.top,
            left: particle.left,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}
    </div>
  );
}
