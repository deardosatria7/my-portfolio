"use client";

import About from "@/components/About";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BallpitOverlay from "@/components/Ballpit";
import TerminalPalette from "@/components/TerminalPalette";
import PongGame from "@/components/PongGame";
import SplashCursor from "@/components/SplashCursor";
import CustomCursor from "@/components/CustomCursor";
import ClickParticles from "@/components/ClickParticles";
import AchievementSystem from "@/components/AchievementSystem";
import KonamiCode from "@/components/KonamiCode";
import { unlockAchievement } from "@/lib/achievement";
import { useRef, useEffect } from "react";

export default function Home() {
  const [show, setShow] = useState<string>("experience");
  const [ballpitForceOpen, setBallpitForceOpen] = useState(false);
  const [pongOpen, setPongOpen] = useState(false);
  const [cursorEnabled, setCursorEnabled] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          unlockAchievement(
            "thorough-reader",
            "📖",
            "Thorough Reader",
            "You scrolled all the way down. Appreciated!"
          );
        }
      },
      { threshold: 1 }
    );
    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid grid-cols-1 p-4 md:p-6 bg-black text-white">
      {cursorEnabled && <SplashCursor />}
      <CustomCursor />
      <ClickParticles />
      <AchievementSystem />
      <KonamiCode />
      <section className="min-h-[250px] w-full flex justify-between mt-4 md:mt-0">
        <div className="grid grid-rows-2 h-fit">
          <span className="text-2xl font-semibold">Deardo Satria,</span>
          <span className="text-xl text-neutral-400">Fullstack Developer</span>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-7 md:gap-4">
        <div className="col-span-2">
          <div className="md:sticky md:top-0 border-t-1 border-neutral-700">
            <div className="py-8 px-4 mb-8 text-sm">
              <p>
                Experienced Fullstack Developer with 3+ years crafting dynamic
                web apps. Passionate about solving complex problems, writing
                clean code, and collaborating across teams.
              </p>
              <div className="mt-6 flex items-center gap-2">
                {show == "experience" ? (
                  <Button
                    variant="secondary"
                    className="hover:cursor-pointer"
                    onClick={() => setShow("about")}
                  >
                    My Story
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    className="hover:cursor-pointer"
                    onClick={() => setShow("experience")}
                  >
                    Home
                  </Button>
                )}
                <BallpitOverlay
                  forceOpen={ballpitForceOpen}
                  onForceClose={() => setBallpitForceOpen(false)}
                />
              </div>
            </div>

            <a
              href="mailto:deardosatria1@gmail.com"
              className="w-full hover:cursor-pointer hover:bg-white hover:text-black px-4 py-2 border-y-1 border-neutral-700 flex items-center gap-2 text-xs"
            >
              deardosatria1@gmail.com <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="https://wa.me/6281216680537"
              className="w-full hover:cursor-pointer hover:bg-white hover:text-black px-4 py-2 border-b-1 border-neutral-700 flex items-center gap-2 text-xs"
            >
              Whatsapp Me <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="https://www.linkedin.com/in/deardo-satria-5a8b69278?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              className="w-full hover:cursor-pointer hover:bg-white hover:text-black px-4 py-2 border-neutral-700 flex items-center gap-2 text-xs"
            >
              Linkedin <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
        <div className="col-span-5 min-h-screen border-t-1 border-neutral-700 p-6 space-y-12">
          <AnimatePresence mode="wait">
            {show === "experience" ? (
              <motion.div
                key="hero"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Hero />
              </motion.div>
            ) : (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <About />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Scroll sentinel for "thorough reader" achievement */}
      <div ref={bottomRef} className="h-px" />

      {/* Terminal Command Palette */}
      <TerminalPalette
        onNavigate={(section) => setShow(section)}
        onOpenBallpit={() => {
          setBallpitForceOpen(true);
          unlockAchievement("ball-enjoyer", "⚽", "Ball Physics Fan", "Who let the balls out?");
        }}
        onOpenPong={() => {
          setPongOpen(true);
          unlockAchievement("gamer", "🎮", "Gamer Detected", "Get that W against the AI.");
        }}
        onToggleCursor={() => setCursorEnabled((prev) => !prev)}
        cursorEnabled={cursorEnabled}
      />

      {/* Pong Game Overlay */}
      <AnimatePresence>
        {pongOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
            onClick={() => setPongOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setPongOpen(false)}
                className="absolute -top-8 right-0 text-neutral-500 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <PongGame difficulty="hard" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
