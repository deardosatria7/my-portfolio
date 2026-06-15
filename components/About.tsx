"use client";

import Link from "next/link";

export default function About() {
  return (
    <div className="pb-24">
      {/* Section header */}
      <div className="ds-section-header mb-10">
        <span className="ds-section-num">02</span>
        <h2 className="ds-section-title">My Story</h2>
        <div className="ds-section-rule" />
      </div>

      {/* Pull quote */}
      <blockquote className="ds-pull-quote">
        &ldquo;Programming is like playing an adventure game — every feature is a boss to defeat.&rdquo;
      </blockquote>

      {/* Body text */}
      <div className="space-y-6 max-w-prose">
        <p className="text-[14px] leading-[1.8]" style={{ color: "var(--ds-text-secondary)" }}>
          Welcome to a snippet of my life story. I started my programming journey in
          2020, right at the beginning of university. Creating a website, building a new
          feature, turning an idea into something functional — it feels like solving a puzzle
          or defeating a boss. Curiosity drove me to keep learning until I finally designed my
          first real project:{" "}
          <Link
            href="https://pintarpy.zenio.id"
            target="_blank"
            className="font-medium transition-colors duration-200"
            style={{ color: "var(--ds-accent)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--ds-accent-light)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--ds-accent)")}
          >
            PintarPy
          </Link>
          , a Python learning platform with an in-browser IDE — my final university project.
        </p>

        <p className="text-[14px] leading-[1.8]" style={{ color: "var(--ds-text-secondary)" }}>
          Beyond code, I&apos;m passionate about{" "}
          <span style={{ color: "var(--ds-text)" }}>building custom PCs</span> — it&apos;s
          like Lego, but far more expensive. In 2025 I started a small local business
          assembling machines tailored to specific needs, whether for office use, content
          creation, or budget gaming.
        </p>

        <p className="text-[14px] leading-[1.8]" style={{ color: "var(--ds-text-secondary)" }}>
          I currently work at a software development company, developing web-based systems for clients. Every new challenge is a learning opportunity,
          and every line of code is a new story I enjoy writing.
        </p>

        <p className="text-[14px] leading-[1.8]" style={{ color: "var(--ds-text-secondary)" }}>
          Thanks for visiting. Feel free to explore — who knows, we might connect or even
          collaborate on something interesting.
        </p>
      </div>

      {/* Closing mono accent */}
      <p
        className="mt-16 text-xs tracking-widest uppercase"
        style={{ color: "var(--ds-text-muted)", fontFamily: "var(--font-mono-ds), monospace" }}
      >
        — Deardo Satria, 2026
      </p>
    </div>
  );
}
