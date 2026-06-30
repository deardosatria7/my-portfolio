"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { unlockAchievement } from "@/lib/achievement";

interface TerminalPaletteProps {
  onNavigate: (section: "experience" | "about") => void;
  onOpenBallpit: () => void;
  onOpenPong: () => void;
  onToggleCursor: () => void;
  cursorEnabled: boolean;
}

type HistoryLine = {
  type: "input" | "output" | "error" | "system";
  text: string;
};

const PROMPT = "visitor@deardo.dev:~$";

const WELCOME: HistoryLine[] = [
  { type: "system", text: "Deardo's Portfolio Terminal v1.0.0" },
  { type: "system", text: "Type 'help' to see available commands." },
  { type: "system", text: "" },
];

export default function TerminalPalette({
  onNavigate,
  onOpenBallpit,
  onOpenPong,
  onToggleCursor,
  cursorEnabled,
}: TerminalPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryLine[]>(WELCOME);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdIndex, setCmdIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      unlockAchievement(
        "terminal-opened",
        "💻",
        "Hacker Wannabe",
        "You opened the terminal. Respect."
      );
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const addLines = useCallback(
    (lines: string[], type: HistoryLine["type"] = "output") => {
      setHistory((prev) => [
        ...prev,
        ...lines.map((text) => ({ type, text })),
      ]);
    },
    []
  );

  const processCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim();
      const lower = cmd.toLowerCase();

      setHistory((prev) => [...prev, { type: "input", text: cmd }]);

      if (cmd) {
        setCmdHistory((prev) => [cmd, ...prev]);
        setCmdIndex(-1);
      }

      if (!cmd) return;

      switch (lower) {
        case "help":
          addLines([
            "",
            "  Available commands:",
            "",
            "  help          — show this help",
            "  whoami        — about Deardo",
            "  ls            — list sections",
            "  cd <section>  — navigate (experience, about)",
            "  skills        — show tech stack",
            "  projects      — list featured projects",
            "  contact       — contact information",
            "  pong          — play Pong",
            "  ballpit       — release the balls",
            "  cursor        — toggle splash cursor on/off",
            "  clear         — clear terminal",
            "  exit          — close terminal",
            "",
          ]);
          break;

        case "whoami":
          addLines([
            "",
            "  Deardo Satria",
            "  Fullstack Developer",
            "",
          ]);
          break;

        case "ls":
          addLines([
            "",
            "  drwxr-xr-x  experience/",
            "  drwxr-xr-x  about/",
            "  drwxr-xr-x  projects/",
            "  -rw-r--r--  contact.txt",
            "  -rw-r--r--  skills.json",
            "",
          ]);
          break;

        case "cd experience":
        case "home":
          addLines(["", "  Navigating to experience...", ""]);
          onNavigate("experience");
          setTimeout(() => setIsOpen(false), 600);
          break;

        case "cd about":
        case "about":
        case "story":
          addLines(["", "  Navigating to about...", ""]);
          onNavigate("about");
          setTimeout(() => setIsOpen(false), 600);
          break;

        case "contact":
          addLines([
            "",
            "  Contact Information:",
            "",
            "  Email    →  deardosatria1@gmail.com",
            "  WhatsApp →  tap the WhatsApp button in the Contact section",
            "  LinkedIn →  /in/deardo-satria-5a8b69278",
            "",
          ]);
          break;

        case "projects":
          addLines([
            "",
            "  Featured Projects:",
            "",
            "  [1] PintarPy         →  pintarpy.zenio.id",
            "      Python learning platform with browser IDE",
            "",
            "  [2] Finance Tracker  →  keuangan.zenio.id",
            "      Income/expense management dashboard",
            "",
            "  [3] CETAR AMPersada",
            "      Internal ERP for Antar Mitra Persada",
            "",
          ]);
          break;

        case "skills":
          addLines([
            "",
            "  Tech Stack:",
            "",
            "  Frontend  →  React · Next.js · TypeScript · Tailwind CSS",
            "  Backend   →  Node.js · Python · PostgreSQL · MySQL",
            "  ORM       →  Prisma · Drizzle",
            "  Platform  →  Supabase · Docker · Git",
            "",
          ]);
          break;

        case "pong":
        case "play pong":
          addLines(["", "  Launching Pong... good luck! 🏓", ""]);
          setTimeout(() => {
            setIsOpen(false);
            onOpenPong();
          }, 600);
          break;

        case "ballpit":
        case "play ballpit":
          addLines(["", "  Releasing the balls... 🎱", ""]);
          setTimeout(() => {
            setIsOpen(false);
            onOpenBallpit();
          }, 600);
          break;

        case "neofetch":
          addLines([
            "",
            "  deardo@portfolio",
            "  ────────────────",
            "  OS       : DeardoOS (Next.js 15)",
            "  Shell    : TypeScript",
            "  Stack    : React · Node.js · PostgreSQL",
            "  Uptime   : 3+ years",
            "  Status   : Open to opportunities",
            "",
          ]);
          unlockAchievement(
            "true-dev",
            "🐧",
            "True Developer",
            "Only devs know about neofetch."
          );
          break;

        case "cursor":
        case "toggle cursor":
          onToggleCursor();
          addLines([
            "",
            cursorEnabled
              ? "  Splash cursor disabled."
              : "  Splash cursor enabled.",
            "",
          ]);
          break;

        case "clear":
          setHistory([]);
          return;

        case "exit":
        case "quit":
          setIsOpen(false);
          return;

        case "sudo rm -rf /":
          addLines([
            "",
            "  Nice try.",
            "  Permission denied. (are you even root?)",
            "",
          ]);
          unlockAchievement(
            "try-hard",
            "💀",
            "Nice Try",
            "sudo rm -rf / won't work here, pal."
          );
          break;

        case "ping":
          addLines(["", "  pong!", ""]);
          unlockAchievement("ping-pong", "🏓", "Ping Pong", "pong!");
          break;

        case "date":
          addLines(["", `  ${new Date().toLocaleString()}`, ""]);
          break;

        case "cat resume.pdf":
          addLines([
            "",
            "  Binary file (PDF). Can't display here.",
            "  Hit me up instead: deardosatria1@gmail.com",
            "",
          ]);
          break;

        case "uname -a":
          addLines([
            "",
            "  DeardoOS 1.0.0 x86_64 Next.js/15 TypeScript/5",
            "",
          ]);
          break;

        case "open pintarpy":
          addLines(["", "  Opening PintarPy...", ""]);
          setTimeout(() => window.open("https://pintarpy.zenio.id", "_blank"), 500);
          break;

        case "open finance":
          addLines(["", "  Opening Finance Tracker...", ""]);
          setTimeout(() => window.open("https://keuangan.zenio.id", "_blank"), 500);
          break;

        default:
          addLines(
            [
              "",
              `  command not found: ${cmd}`,
              "  Type 'help' for available commands.",
              "",
            ],
            "error"
          );
      }
    },
    [addLines, onNavigate, onOpenBallpit, onOpenPong, onToggleCursor, cursorEnabled]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      processCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(cmdIndex + 1, cmdHistory.length - 1);
      setCmdIndex(next);
      setInput(cmdHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(cmdIndex - 1, -1);
      setCmdIndex(next);
      setInput(next === -1 ? "" : cmdHistory[next]);
    }
  };

  return (
    <>
      {/* Floating hint button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 2, duration: 0.4 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-40 font-mono text-xs text-neutral-500 border border-neutral-700 px-3 py-2 rounded-md bg-black/80 hover:border-green-500 hover:text-green-400 transition-colors backdrop-blur-sm cursor-pointer select-none"
            title="Open terminal"
          >
            <span className="hidden sm:inline">Ctrl+K </span>⌨
          </motion.button>
        )}
      </AnimatePresence>

      {/* Terminal overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm sm:p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 320 }}
              style={{ originY: 1 }}
              className="w-full sm:max-w-2xl bg-[#0a0a0a] border border-neutral-700 sm:rounded-lg rounded-t-xl shadow-2xl overflow-hidden font-mono"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-neutral-900 border-b border-neutral-800">
                {/* macOS dots — hidden on mobile, replaced with drag handle */}
                <div className="hidden sm:flex items-center gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer"
                  />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                {/* Mobile: drag indicator + close button */}
                <div className="flex sm:hidden w-full items-center justify-between">
                  <span className="text-xs text-neutral-500 select-none">terminal</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-neutral-500 hover:text-white text-lg leading-none px-1"
                  >
                    ✕
                  </button>
                </div>
                <span className="hidden sm:inline ml-3 text-xs text-neutral-500 select-none">
                  terminal — visitor@deardo.dev
                </span>
              </div>

              {/* History */}
              <div className="h-56 sm:h-72 overflow-y-auto p-3 sm:p-4 space-y-0.5 text-xs sm:text-sm scrollbar-thin">
                {history.map((line, i) => (
                  <div
                    key={i}
                    className={
                      line.type === "input"
                        ? "text-white"
                        : line.type === "error"
                          ? "text-red-400"
                          : line.type === "system"
                            ? "text-neutral-500"
                            : "text-green-400"
                    }
                  >
                    {line.type === "input" ? (
                      <span>
                        <span className="text-green-500 mr-2 select-none hidden sm:inline">
                          {PROMPT}
                        </span>
                        <span className="text-green-500 mr-2 select-none sm:hidden">$</span>
                        {line.text}
                      </span>
                    ) : line.text ? (
                      line.text
                    ) : (
                      <span>&nbsp;</span>
                    )}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Input row */}
              <div className="flex items-center gap-2 px-3 sm:px-4 py-3 border-t border-neutral-800">
                <span className="text-green-500 text-xs sm:text-sm whitespace-nowrap select-none hidden sm:inline">
                  {PROMPT}
                </span>
                <span className="text-green-500 text-xs whitespace-nowrap select-none sm:hidden">$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-white text-xs sm:text-sm outline-none caret-green-400 placeholder-neutral-700"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  placeholder="type a command..."
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
