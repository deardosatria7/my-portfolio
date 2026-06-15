"use client";

import About from "@/components/About";
import Hero from "@/components/Hero";
import { ArrowUpRight, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
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

const NAV_ITEMS = [
  { id: "experience", label: "Work & Projects", index: "01" },
  { id: "about",      label: "My Story",        index: "02" },
];

const CONTACT_LINKS = [
  { label: "deardosatria1@gmail.com", href: "mailto:deardosatria1@gmail.com" },
  { label: "WhatsApp",                href: "https://wa.me/6281216680537" },
  { label: "LinkedIn",                href: "https://www.linkedin.com/in/deardo-satria-5a8b69278" },
];

export default function Home() {
  const [show, setShow] = useState<string>("experience");
  const [ballpitForceOpen, setBallpitForceOpen] = useState(false);
  const [pongOpen, setPongOpen] = useState(false);
  const [cursorEnabled, setCursorEnabled] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          unlockAchievement("thorough-reader", "📖", "Thorough Reader", "You scrolled all the way down. Appreciated!");
        }
      },
      { threshold: 1 }
    );
    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ backgroundColor: "var(--ds-bg)", color: "var(--ds-text)", fontFamily: "var(--font-body-ds), sans-serif" }}>
      {cursorEnabled && <SplashCursor />}
      <CustomCursor />
      <ClickParticles />
      <AchievementSystem />
      <KonamiCode />

      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* ── Editorial Header ── */}
        <motion.header
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="pt-14 pb-10 md:pt-20 md:pb-14"
          style={{ borderBottom: "1px solid var(--ds-border)" }}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <p
                className="mb-5 tracking-[0.28em] uppercase text-xs"
                style={{ color: "var(--ds-accent)", fontFamily: "var(--font-mono-ds), monospace" }}
              >
                Portfolio — 2026
              </p>
              <h1
                style={{
                  fontFamily: "var(--font-display), Georgia, serif",
                  lineHeight: "0.88",
                  letterSpacing: "-0.01em",
                }}
              >
                <span
                  className="block font-bold"
                  style={{ fontSize: "clamp(3.5rem, 10vw, 7.5rem)", color: "var(--ds-text)" }}
                >
                  Deardo
                </span>
                <span
                  className="block font-normal italic"
                  style={{ fontSize: "clamp(3.5rem, 10vw, 7.5rem)", color: "var(--ds-text)" }}
                >
                  Satria.
                </span>
              </h1>
              <div className="mt-6 flex items-center gap-5">
                <span
                  className="tracking-widest uppercase text-xs"
                  style={{ color: "var(--ds-text-secondary)", fontFamily: "var(--font-mono-ds), monospace" }}
                >
                  Fullstack Developer
                </span>
                <span style={{ color: "var(--ds-border-strong)" }}>—</span>
                <div className="flex items-center gap-2">
                  <span
                    className="w-[7px] h-[7px] rounded-full block"
                    style={{
                      backgroundColor: "var(--ds-green)",
                      animation: "pulse-dot 2.2s ease-in-out infinite",
                    }}
                  />
                  <span
                    className="text-xs"
                    style={{ color: "var(--ds-text-secondary)", fontFamily: "var(--font-mono-ds), monospace" }}
                  >
                    Available
                  </span>
                </div>
              </div>
            </div>

            {/* Ballpit trigger — desktop top-right */}
            <div className="hidden md:block pb-1">
              <BallpitOverlay
                forceOpen={ballpitForceOpen}
                onForceClose={() => setBallpitForceOpen(false)}
              />
            </div>
          </div>
        </motion.header>

        {/* ── Main Layout ── */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-0">

          {/* ── Sidebar ── */}
          <motion.aside
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="col-span-2"
          >
            <div className="md:sticky md:top-8 pt-10 md:pr-9">
              <p
                className="text-sm leading-relaxed mb-10"
                style={{ color: "var(--ds-text-secondary)" }}
              >
                Experienced Fullstack Developer with 3+ years crafting dynamic
                web apps. Passionate about solving complex problems and
                collaborating across teams.
              </p>

              {/* Navigation */}
              <nav className="mb-10">
                <p
                  className="text-xs tracking-widest uppercase mb-3"
                  style={{ color: "var(--ds-text-muted)", fontFamily: "var(--font-mono-ds), monospace" }}
                >
                  Navigate
                </p>
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setShow(item.id)}
                    className={`ds-nav-btn ${show === item.id ? "active" : ""}`}
                  >
                    <span className="nav-index">{item.index}</span>
                    <span className="nav-label">{item.label}</span>
                  </button>
                ))}
              </nav>

              {/* Contact */}
              <div className="mb-10">
                <p
                  className="text-xs tracking-widest uppercase mb-3"
                  style={{ color: "var(--ds-text-muted)", fontFamily: "var(--font-mono-ds), monospace" }}
                >
                  Contact
                </p>
                {CONTACT_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="ds-contact-link"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="link-arrow w-3 h-3" />
                  </a>
                ))}
              </div>

              {/* Mobile Ballpit */}
              <div className="md:hidden">
                <BallpitOverlay
                  forceOpen={ballpitForceOpen}
                  onForceClose={() => setBallpitForceOpen(false)}
                />
              </div>
            </div>
          </motion.aside>

          {/* ── Main Content ── */}
          <main
            className="col-span-5 pt-10 pl-0 md:pl-10"
            style={{ borderLeft: "1px solid var(--ds-border)", minHeight: "100vh" }}
          >
            <AnimatePresence mode="wait">
              {show === "experience" ? (
                <motion.div
                  key="hero"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Hero />
                </motion.div>
              ) : (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                >
                  <About />
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Scroll sentinel */}
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

      {/* Pong Overlay */}
      <AnimatePresence>
        {pongOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
            style={{ backgroundColor: "rgba(13, 13, 15, 0.88)" }}
            onClick={() => setPongOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 24 }}
              transition={{ type: "spring", damping: 26, stiffness: 300 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setPongOpen(false)}
                className="absolute -top-8 right-0 transition-colors"
                style={{ color: "var(--ds-text-muted)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--ds-text)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "var(--ds-text-muted)")}
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
