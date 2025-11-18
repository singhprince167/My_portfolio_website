"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }

      // Create trailing particles
      if (particlesRef.current && Math.random() > 0.8) {
        const particle = document.createElement("div");
        particle.className = "cursor-particle";
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;
        particlesRef.current.appendChild(particle);

        setTimeout(() => {
          particle.remove();
        }, 1000);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        className="cursor-glow fixed pointer-events-none z-50"
        style={{
          width: "400px",
          height: "400px",
          marginLeft: "-200px",
          marginTop: "-200px",
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(236, 72, 153, 0.1) 30%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div ref={particlesRef} className="fixed inset-0 pointer-events-none z-40" />
    </>
  );
}
