import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const experiences = [
  {
    title: "Fullstack Web Developer",
    company_time: "Fungsitama Cipta Teknologi  ·  Jan 2026 — Present",
    description:
      "Assisting the team in developing and maintaining the company's ERP system using Next.js, while partnering with end-users to convert business needs into scalable features that streamline operations across departments.",
  },
  {
    title: "Fullstack Web Developer",
    company_time: "Antar Mitra Persada  ·  Sep 2024 — Dec 2025",
    description:
      "Leading the fullstack development of an internal company web system using Next.js and Supabase. Working closely with end-users to identify needs and translate them into tailored, scalable features that improve operational efficiency.",
  },
  {
    title: "Custom PC Build Specialist",
    company_time: "Self-Employed  ·  Aug 2025 — Present",
    description:
      "Providing tailored PC building services for clients ranging from casual users to performance-focused gamers. Offering consultation, hardware selection, and assembly with attention to performance, aesthetics, and budget.",
  },
  {
    title: "Intern Front-end Developer",
    company_time: "Indonesia Direct  ·  Nov 2021 — Jan 2022",
    description:
      "Developed responsive web layouts and dynamic UI components using React. Worked alongside UI/UX designers to translate Figma mockups into fully functional web interfaces.",
  },
];

const skills: Record<string, string[]> = {
  Frontend: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Shadcn/ui"],
  Backend:  ["Node.js", "Python", "PostgreSQL", "MySQL", "Prisma ORM", "Drizzle ORM"],
  Tools:    ["Supabase", "Docker", "Git"],
};

const projects = [
  {
    name: "Beam",
    tagline: "Peer-to-peer file transfer via WebRTC",
    description:
      "Send files directly between devices. No uploads, no database — the server only brokers the WebRTC handshake. Files never touch a server.",
    tags: ["Next.js", "Node.js", "WebRTC", "WebSocket"],
    image: "/beam-ss.png",
    demo: "https://beam.zenio.id",
    github: "https://github.com/deardosatria7",
  },
  {
    name: "YT Downloader",
    tagline: "Download YouTube & Twitter videos",
    description:
      "Fast, browser-based downloader powered by yt-dlp. No installation required — works directly in the browser without any local setup.",
    tags: ["Next.js", "Python", "yt-dlp", "Node.js"],
    image: "/yt-downloader-ss.png",
    demo: "https://yt.zenio.id",
    github: "https://github.com/deardosatria7",
  },
  {
    name: "PintarPy",
    tagline: "Python learning platform with in-browser IDE",
    description:
      "Learn Python with an integrated development environment running directly in the browser via PyScript. No setup, just code.",
    tags: ["Next.js", "PyScript", "PostgreSQL", "Prisma ORM"],
    image: "/pintarpy-screenshot.png",
    demo: "https://pintarpy.zenio.id",
    github: "https://github.com/deardosatria7",
  },
  {
    name: "Finance Tracker",
    tagline: "Personal finance dashboard",
    description:
      "Track income and expenses with an intuitive dashboard. Understand your full financial picture at a glance with clean visual summaries.",
    tags: ["Next.js", "PostgreSQL", "Drizzle ORM", "Better Auth"],
    image: "/finance-tracking-ss.png",
    demo: "https://keuangan.zenio.id",
    github: "https://github.com/deardosatria7",
  },
];

export default function Hero() {
  return (
    <div className="pb-24 space-y-16">

      {/* ── 01 Experience ── */}
      <section>
        <div className="ds-section-header">
          <span className="ds-section-num">01</span>
          <h2 className="ds-section-title">Experience</h2>
          <div className="ds-section-rule" />
        </div>

        <div>
          {experiences.map((item, idx) => (
            <div key={idx} className="ds-exp-item">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="exp-index">{String(idx + 1).padStart(2, "0")}</span>
                <h3 className="exp-title text-[15px] font-medium">{item.title}</h3>
              </div>
              <p className="exp-company pl-7 mb-2">{item.company_time}</p>
              <p className="exp-desc pl-7">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 02 Skills ── */}
      <section>
        <div className="ds-section-header">
          <span className="ds-section-num">02</span>
          <h2 className="ds-section-title">Skills</h2>
          <div className="ds-section-rule" />
        </div>

        <div className="space-y-5">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="flex gap-5 items-start">
              <div
                className="w-20 shrink-0 pt-0.5 text-[10px] tracking-widest uppercase"
                style={{ color: "var(--ds-text-muted)", fontFamily: "var(--font-mono-ds), monospace" }}
              >
                {category}
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span key={skill} className="ds-skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 03 Projects ── */}
      <section>
        <div className="ds-section-header">
          <span className="ds-section-num">03</span>
          <h2 className="ds-section-title">Projects</h2>
          <div className="ds-section-rule" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project) => (
            <div key={project.name} className="ds-project-card">
              {/* Image */}
              <div
                className="relative w-full h-40 overflow-hidden"
                style={{ backgroundColor: "var(--ds-surface-high)" }}
              >
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover card-img"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, var(--ds-surface) 0%, transparent 55%)",
                  }}
                />
              </div>

              {/* Body */}
              <div className="p-5">
                <h3
                  className="text-base font-bold mb-1"
                  style={{ fontFamily: "var(--font-display), Georgia, serif", color: "var(--ds-text)" }}
                >
                  {project.name}
                </h3>
                <p
                  className="text-xs mb-3"
                  style={{ color: "var(--ds-accent)", fontFamily: "var(--font-mono-ds), monospace" }}
                >
                  {project.tagline}
                </p>
                <p
                  className="text-[13px] leading-relaxed mb-4"
                  style={{ color: "var(--ds-text-secondary)" }}
                >
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="ds-tag-pill">{tag}</span>
                  ))}
                </div>
                <div
                  className="flex gap-4 pt-3"
                  style={{ borderTop: "1px solid var(--ds-border)" }}
                >
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] transition-colors duration-200"
                    style={{ color: "var(--ds-text-secondary)", fontFamily: "var(--font-mono-ds), monospace" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--ds-accent)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--ds-text-secondary)")}
                  >
                    Live Demo <ArrowUpRight className="w-3 h-3" />
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] transition-colors duration-200"
                    style={{ color: "var(--ds-text-secondary)", fontFamily: "var(--font-mono-ds), monospace" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--ds-text)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--ds-text-secondary)")}
                  >
                    GitHub <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p
          className="mt-8 text-center text-xs"
          style={{ color: "var(--ds-text-muted)", fontFamily: "var(--font-mono-ds), monospace" }}
        >
          + more projects available on request
        </p>
      </section>
    </div>
  );
}
