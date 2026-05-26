"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = -100,
      mouseY = -100;
    let dotX = -100,
      dotY = -100;
    let ringX = -100,
      ringY = -100;
    let rafId: number;
    let isHovering = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest(
        "a, button, [role='button'], input, textarea, select, label, [tabindex]"
      );
      if (el && !isHovering) {
        isHovering = true;
        ringRef.current?.classList.add("scale-[2]", "!border-green-400");
      }
    };

    const onOut = () => {
      if (isHovering) {
        isHovering = false;
        ringRef.current?.classList.remove("scale-[2]", "!border-green-400");
      }
    };

    const loop = () => {
      dotX += (mouseX - dotX) * 0.85;
      dotY += (mouseY - dotY) * 0.85;
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX - 3}px, ${dotY - 3}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
      }

      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 border border-white/50 rounded-full pointer-events-none z-[9999] transition-[transform,border-color] duration-200 mix-blend-difference"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
