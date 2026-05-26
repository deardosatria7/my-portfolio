"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { unlockAchievement } from "@/lib/achievement";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const MATRIX_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&アイウエオカキクケコサシスセソ";

export default function KonamiCode() {
  const [active, setActive] = useState(false);
  const seqRef = useRef<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      seqRef.current = [...seqRef.current, e.key].slice(-SEQUENCE.length);
      if (seqRef.current.join(",") === SEQUENCE.join(",")) {
        setActive(true);
        unlockAchievement(
          "konami",
          "🎮",
          "You Know The Code",
          "↑↑↓↓←→←→BA — respect."
        );
        setTimeout(() => setActive(false), 7000);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (!active) {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cols = Math.floor(canvas.width / 16);
    const drops = Array.from({ length: cols }, () =>
      Math.floor(Math.random() * -canvas.height / 16)
    );

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drops.forEach((drop, i) => {
        const char =
          MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        const bright = drop === drops[i]; // lead char brighter
        ctx.fillStyle = bright ? "#afffb0" : "#00ff41";
        ctx.font = "14px monospace";
        ctx.fillText(char, i * 16, drop * 16);

        if (drop * 16 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9990] pointer-events-none"
          onClick={() => setActive(false)}
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <motion.p
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", damping: 14 }}
              className="font-mono text-4xl md:text-5xl font-bold text-green-400"
              style={{ textShadow: "0 0 30px #00ff41, 0 0 60px #00ff41" }}
            >
              YOU FOUND IT
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1 }}
              className="font-mono text-sm text-green-600 tracking-[0.4em]"
            >
              ↑↑↓↓←→←→BA
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
