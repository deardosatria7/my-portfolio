"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AchievementData } from "@/lib/achievement";

type ToastEntry = AchievementData & { uid: number };

export default function AchievementSystem() {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);
  const [unlocked] = useState(() => new Set<string>());

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<AchievementData>).detail;
      if (unlocked.has(detail.id)) return;
      unlocked.add(detail.id);

      const uid = Date.now() + Math.random();
      setToasts((prev) => [...prev, { ...detail, uid }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.uid !== uid));
      }, 4500);
    };

    window.addEventListener("achievement", handler);
    return () => window.removeEventListener("achievement", handler);
  }, [unlocked]);

  return (
    <div className="fixed bottom-20 left-4 z-[9997] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <motion.div
            key={toast.uid}
            initial={{ opacity: 0, x: -80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -80, scale: 0.85 }}
            transition={{ type: "spring", damping: 22, stiffness: 320 }}
            className="flex items-center gap-3 bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 shadow-2xl w-72"
          >
            <span className="text-2xl leading-none">{toast.icon}</span>
            <div className="min-w-0">
              <p className="text-[10px] text-green-400 font-mono uppercase tracking-widest mb-0.5">
                Achievement Unlocked
              </p>
              <p className="text-sm font-semibold text-white truncate">
                {toast.title}
              </p>
              <p className="text-xs text-neutral-400 truncate">{toast.desc}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
