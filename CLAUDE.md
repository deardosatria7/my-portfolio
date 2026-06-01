# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server with Turbopack
npm run build    # Production build
npm run lint     # ESLint check
npm start        # Run production server
```

No test suite is configured.

## Architecture

Single-page portfolio for Deardo Satria built with Next.js 15 (App Router), React 19, TypeScript, and Tailwind CSS 4. The entire site lives on one page (`app/page.tsx`) with state-driven navigation — no URL routing.

**Section switching:** A `show` state in `page.tsx` toggles between `<Hero>` (projects/experience) and `<About>` (story). Modals like `<Ballpit>` and `<PongGame>` layer on top via boolean state flags.

**Component responsibilities:**
- `Hero.tsx` — main landing/projects section
- `About.tsx` — bio/story section
- `TerminalPalette.tsx` — keyboard-driven command palette (Cmd+K) that handles navigation and easter egg commands
- `PongGame.tsx` — playable Pong with AI difficulty levels, rendered on a canvas
- `Ballpit.tsx` — Three.js 3D physics ball simulation
- `CustomCursor.tsx` / `SplashCursor.tsx` / `ClickParticles.tsx` — layered cursor and click effects
- `KonamiCode.tsx` — detects the Konami sequence and dispatches an achievement event
- `AchievementSystem.tsx` — listens for custom DOM events (`achievement`) and displays toast-style unlocks

**Achievement system (`lib/achievement.ts`):** Achievements are triggered by dispatching a custom `CustomEvent('achievement', { detail: { id } })` on `window`. `AchievementSystem.tsx` listens and tracks unlocked IDs in state.

**Styling:** Tailwind CSS 4 with CSS variables defined in `app/globals.css`. Shadcn/ui components live in `components/ui/` (New York style, Lucide icons). Path alias `@/` maps to the project root.

**Animation stack:** Framer Motion for React component transitions; GSAP for imperative timeline animations; Three.js for 3D canvas work in Ballpit.

**Deployment:** GitHub Actions workflow deploys to GitHub Pages on push to main.
