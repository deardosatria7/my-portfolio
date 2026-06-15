"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = -100,
      mouseY = -100;
    let dotX = -100,
      dotY = -100;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const loop = () => {
      dotX += (mouseX - dotX) * 0.85;
      dotY += (mouseY - dotY) * 0.85;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX - 3}px, ${dotY - 3}px)`;
      }

      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{ willChange: "transform" }}
    />
  );
}
