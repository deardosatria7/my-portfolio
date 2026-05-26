"use client";

import { useEffect } from "react";

const COLORS = ["#ffffff", "#4ade80", "#86efac", "#d4d4d4"];

export default function ClickParticles() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const count = 10;
      for (let i = 0; i < count; i++) {
        const el = document.createElement("div");
        const angle = (i / count) * 360 + Math.random() * 20;
        const speed = 35 + Math.random() * 55;
        const dx = Math.cos((angle * Math.PI) / 180) * speed;
        const dy = Math.sin((angle * Math.PI) / 180) * speed;
        const size = 3 + Math.random() * 3;
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const duration = 500 + Math.random() * 300;

        el.style.cssText = `
          position: fixed;
          left: ${e.clientX}px;
          top: ${e.clientY}px;
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          transition: transform ${duration}ms cubic-bezier(0,.9,.57,1), opacity ${duration}ms ease-out;
          will-change: transform, opacity;
        `;

        document.body.appendChild(el);

        requestAnimationFrame(() => {
          el.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
          el.style.opacity = "0";
        });

        setTimeout(() => el.remove(), duration + 50);
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return null;
}
