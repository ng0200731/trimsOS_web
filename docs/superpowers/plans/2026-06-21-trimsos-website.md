# trimsOS.com Marketing Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a professional, single-page marketing website for trimsOS.com that showcases DAIS, CLAB, AI QC, ECO-CRM and the Global Supply Chain — minimal monochrome design with three signature 3D/Remotion moments.

**Architecture:** Next.js App Router single-page site (`app/page.tsx` assembles composed sections). Content lives in one typed data file. 3D via React Three Fiber (lazy-loaded client components), motion video via Remotion `<Player>`. All fancy effects are isolated to 3 signature components; the rest is static + Framer Motion reveals.

**Tech Stack:** Next.js 15 (App Router, TypeScript, `src/` dir), Tailwind CSS v4, Framer Motion, `three` + `@react-three/fiber` + `@react-three/drei`, `remotion` + `@remotion/player`, Inter via `next/font`.

## Global Constraints

- **Directory:** Site lives in `d:\project\trimsos_web\web\` (keeps PRDs/docs/tasks at repo root).
- **Aesthetic:** Strict monochrome only — `#0a0a0a` ink, white paper, grey scale. No color/rainbow anywhere, including 3D materials.
- **Copy rule:** Product names and one-liners are LOCKED verbatim from the spec §6. Do not reword. 5th product is **"Global Supply Chain"** (never "Global System Chain").
- **Motion rule:** Three signature moments only (Hero3D, SupplyChain3D, RemotionExplainer). Everything else = static + subtle Framer Motion reveals.
- **Accessibility (non-negotiable):** Every 3D/video component MUST render a static fallback when `prefers-reduced-motion: reduce`. Mobile gets a 2D/placeholder fallback for heavy 3D.
- **Performance:** 3D/video must not block hero text/CTA. Lazy-load with `next/dynamic` (`ssr: false`), pause/dismount when off-screen. Lighthouse Perf/A11y/Best-Practices ≥ 90.
- **Verification convention:** This is a presentational marketing site, so the per-task "test cycle" = `npm run lint` + `npm run build` (both must pass) + a dev-server render check. Add Vitest unit tests only for hooks containing logic (`useReducedMotion`, nav scroll state). Do not write unit tests for pure JSX layout.
- **Frequent commits:** `create-next-app` initializes git. Commit after each task.
- **No backend/auth/database** — marketing only.

---

## File Structure

```
web/
├── app/
│   ├── layout.tsx          # Root layout: Inter font, metadata, global styles
│   ├── page.tsx            # Assembles all sections in order
│   └── globals.css         # Tailwind import + @theme monochrome tokens + base styles
├── src/
│   ├── data/
│   │   └── products.ts     # Single source of truth: products, nav, contact (LOCKED copy)
│   ├── lib/
│   │   └── useReducedMotion.ts  # Hook + unit test
│   ├── components/
│   │   ├── primitives.tsx        # Container, Section, SectionHeading, Reveal
│   │   ├── Nav.tsx               # Sticky nav + mobile menu + CTA
│   │   ├── Hero.tsx              # Headline + CTA + lazy Hero3D
│   │   ├── Hero3D.tsx            # R3F 5-node chain (signature moment #1)
│   │   ├── ProductGrid.tsx       # 5-card suite overview
│   │   ├── ProductSection.tsx    # Reusable alternating section (DAIS/CLAB/AI QC/ECO-CRM)
│   │   ├── SupplyChain3D.tsx     # Interactive 3D chain (signature moment #2)
│   │   ├── RemotionExplainer.tsx # Player wrapper (signature moment #3)
│   │   ├── FlowComposition.tsx   # Remotion composition (the animation)
│   │   ├── ValueProps.tsx
│   │   ├── ContactCTA.tsx        # CTA + contact form
│   │   └── Footer.tsx
│   └── remotion/
│       └── root.ts               # Remotion composition registration (optional, for studio)
├── public/
│   └── products/           # Product screenshots (placeholders now, real later)
└── ...config files from create-next-app
```

---

## Task 1: Scaffold Next.js project + install dependencies

**Files:**
- Create: `d:\project\trimsos_web\web\` (entire create-next-app output)

**Interfaces:**
- Produces: a runnable Next.js app at `web/` with all deps installed; `npm run dev` / `build` / `lint` work.

- [ ] **Step 1: Scaffold the app**

Run from `d:\project\trimsos_web\`:
```bash
npx create-next-app@latest web --typescript --tailwind --app --eslint --src-dir --import-alias "@/*" --no-turbopack --use-npm
```
When prompted "Ok to proceed?" type `y`. If it asks about Turbopack, choose No (we passed `--no-turbopack`).

- [ ] **Step 2: Install runtime dependencies**

```bash
cd web
npm install three @react-three/fiber @react-three/drei framer-motion remotion @remotion/player
```

- [ ] **Step 3: Install dev/test dependencies**

```bash
npm install -D vitest @vitejs/plugin-react jsdom @types/three
```

- [ ] **Step 4: Verify the clean scaffold builds & lints**

```bash
cd web
npm run lint
npm run build
```
Expected: both succeed, no errors. (Warnings OK.)

- [ ] **Step 5: Commit**

```bash
cd web
git add -A
git commit -m "chore: scaffold Next.js + 3D/remotion deps"
```

---

## Task 2: Design tokens + global styles (monochrome system)

**Files:**
- Modify: `web/app/globals.css`
- Modify: `web/app/layout.tsx`
- Create: `web/tailwind.config.ts` (only if Tailwind v3 is present; skip for v4 — see note)

**Interfaces:**
- Produces: CSS custom properties `--color-ink`, `--color-paper`, `--color-grey-{100..900}`, `--font-sans`, usable as Tailwind utilities (`text-ink`, `bg-paper`, `text-grey-500`, etc.) and base element resets.

> **Tailwind version check first:** Run `npm pkg get devDependencies.tailwindcss` in `web/`. If it prints `"^4..."`, use the `@theme` block in `globals.css` (Step 2a). If `"^3..."`, create `tailwind.config.ts` (Step 2b) instead. create-next-app currently ships v4.

- [ ] **Step 1: Read the current globals.css**

Open `web/app/globals.css` to see the scaffolded content before replacing.

- [ ] **Step 2a: If Tailwind v4 — replace globals.css**

```css
@import "tailwindcss";

@theme {
  --color-ink: #0a0a0a;
  --color-paper: #ffffff;
  --color-grey-50: #f7f7f7;
  --color-grey-100: #ededed;
  --color-grey-200: #d9d9d9;
  --color-grey-300: #bfbfbf;
  --color-grey-400: #9a9a9a;
  --color-grey-500: #737373;
  --color-grey-600: #525252;
  --color-grey-700: #3d3d3d;
  --color-grey-800: #262626;
  --color-grey-900: #171717;

  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
}

:root {
  --bg: var(--color-paper);
  --fg: var(--color-ink);
}

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
}

body {
  background: var(--bg);
  color: var(--fg);
  font-family: var(--font-sans);
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}

:focus-visible {
  outline: 2px solid var(--color-ink);
  outline-offset: 2px;
}
```

- [ ] **Step 2b: If Tailwind v3 — create tailwind.config.ts**

```ts
import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",
        paper: "#ffffff",
        grey: {
          50: "#f7f7f7", 100: "#ededed", 200: "#d9d9d9", 300: "#bfbfbf",
          400: "#9a9a9a", 500: "#737373", 600: "#525252", 700: "#3d3d3d",
          800: "#262626", 900: "#171717",
        },
      },
      fontFamily: { sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"] },
    },
  },
} satisfies Config;
```
And set `globals.css` `@tailwind base; @tailwind components; @tailwind utilities;` plus the `html`/`body`/reduced-motion blocks from Step 2a.

- [ ] **Step 3: Wire Inter font in layout.tsx**

Replace the contents of `web/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "trimsOS — The operating system for garment trims",
  description:
    "trimsOS is the integrated operating system for garment trims: DAIS, CLAB, AI QC, ECO-CRM and the Global Supply Chain — from first design to delivered order.",
  metadataBase: new URL("https://www.trimsOS.com"),
  openGraph: {
    title: "trimsOS — The operating system for garment trims",
    description: "Design → Produce → Inspect → Sell & Track, end to end.",
    url: "https://www.trimsOS.com",
    siteName: "trimsOS",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-paper text-ink antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 4: Verify**

```bash
cd web && npm run lint && npm run build
```
Expected: both pass. Run `npm run dev`, open http://localhost:3000 — page loads with Inter font and black-on-white styling.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: monochrome design tokens + Inter font"
```

---

## Task 3: `useReducedMotion` hook + unit test + primitives

**Files:**
- Create: `web/src/lib/useReducedMotion.ts`
- Create: `web/src/lib/useReducedMotion.test.ts`
- Create: `web/src/components/primitives.tsx`
- Create: `web/vitest.config.ts`

**Interfaces:**
- Produces: `useReducedMotion(): boolean`; `Container`, `Section`, `SectionHeading`, `Reveal` React components. `Reveal` renders children immediately when reduced-motion is on (no animation).

- [ ] **Step 1: Add vitest config**

`web/vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";
export default defineConfig({
  plugins: [react()],
  test: { environment: "jsdom", globals: true },
  resolve: { alias: { "@": path.resolve(__dirname, "./") } },
});
```
Add to `web/package.json` scripts: `"test": "vitest run"`, `"test:watch": "vitest"`.

- [ ] **Step 2: Write the failing test**

`web/src/lib/useReducedMotion.test.ts`:
```ts
import { renderHook } from "@testing-library/react";
import { useReducedMotion } from "./useReducedMotion";

it("returns false when media query does not match", () => {
  // jsdom default: matchMedia not implemented → hook defaults to false
  const { result } = renderHook(() => useReducedMotion());
  expect(result.current).toBe(false);
});
```
Install helper: `npm install -D @testing-library/react`.

- [ ] **Step 3: Run test to verify it fails**

```bash
cd web && npx vitest run src/lib/useReducedMotion.test.ts
```
Expected: FAIL ("Cannot find module './useReducedMotion'").

- [ ] **Step 4: Implement the hook**

`web/src/lib/useReducedMotion.ts`:
```ts
"use client";
import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npx vitest run src/lib/useReducedMotion.test.ts
```
Expected: PASS.

- [ ] **Step 6: Create primitives**

`web/src/components/primitives.tsx`:
```tsx
"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/src/lib/useReducedMotion";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-6 ${className}`}>{children}</div>;
}

export function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`py-24 md:py-32 ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeading({ kicker, title, subtitle }: { kicker?: string; title: string; subtitle?: string }) {
  return (
    <div className="max-w-2xl">
      {kicker && <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-grey-500">{kicker}</p>}
      <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base text-grey-600 md:text-lg">{subtitle}</p>}
    </div>
  );
}

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 7: Verify**

```bash
npm run lint && npm run build && npm run test
```
Expected: all pass.

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "feat: useReducedMotion hook + UI primitives"
```

---

## Task 4: Content data file (single source of truth, LOCKED copy)

**Files:**
- Create: `web/src/data/products.ts`
- Create: `web/public/products/.gitkeep`

**Interfaces:**
- Produces: `products` (4 core: DAIS, CLAB, AI QC, ECO-CRM), `globalSupplyChain` object, `navLinks`, `contact`. Later tasks import only from here.

- [ ] **Step 1: Write the data file**

`web/src/data/products.ts`:
```ts
export type CoreProduct = {
  id: string;
  name: string;
  acronym: string;
  tagline: string;     // LOCKED one-liner from spec §6
  description: string;
  features: string[];
  image: string;       // placeholder path under /public/products
};

export const products: CoreProduct[] = [
  {
    id: "dais",
    name: "DAIS",
    acronym: "Design AI Studio",
    tagline:
      "Your visual brain for trims: catalog, tag & search thousands of trims and patterns, with AI reverse-image search that finds a match from just a photo.",
    description:
      "A structured image & pattern library with tagging, metadata, projects, and email sharing. Find any trim or pattern in seconds — even from a single reference photo — using perceptual-hash, color, and hybrid AI search.",
    features: [
      "Structured metadata: book, page, row, column, type, material, dimensions",
      "AI reverse-image search (pHash, color, hybrid)",
      "Projects, boards & email sharing with thumbnails",
      "Role-based access with admin approval",
    ],
    image: "/products/dais.svg",
  },
  {
    id: "clab",
    name: "CLAB",
    acronym: "Care Label Laboratory",
    tagline:
      "From Illustrator to production in one click — import layouts, drop in variable data, export print-ready .ai/PDF. No designer needed per order.",
    description:
      "A care-label layout manager that imports Adobe Illustrator JSON or PDF, adds variable-data overlays (text, barcode, QR), and exports production-ready .ai and PDF files with embedded fonts.",
    features: [
      "Import Illustrator JSON & PDF layouts",
      "Variable-data overlays: text, Code128/EAN13/QR",
      "Export print-ready .ai (multi-artboard) & PDF",
      "Font management with live preview",
    ],
    image: "/products/clab.svg",
  },
  {
    id: "ai-qc",
    name: "AI QC",
    acronym: "AI Quality Check",
    tagline:
      "Catch every defect before it ships — point a camera at the line and AI inspects each label in real time.",
    description:
      "Computer-vision inspection for the production line. A camera captures each label and AI flags defects — misprints, misalignment, missing fields — in real time, on real product.",
    features: [
      "Real-time camera inspection on the line",
      "Automatic defect detection & flagging",
      "Validates CLAB-generated layouts against output",
      "Live demo available",
    ],
    image: "/products/ai-qc.svg",
  },
  {
    id: "eco-crm",
    name: "ECO-CRM",
    acronym: "ERP",
    tagline:
      "The whole factory in one screen — emails, quotations, supplier sourcing, orders, and live QR-tracked production.",
    description:
      "The end-to-end sales-to-production ERP: read customer email, build quotations, source from suppliers via a no-login portal, convert wins to orders, and track each order across the factory floor with QR scans.",
    features: [
      "Email (IMAP/SMTP), quotations & supplier outsourcing portal",
      "Orders with QR-code factory-floor tracking",
      "Dashboard with quotation, outsourcing & revenue analytics",
      "Full status audit trail",
    ],
    image: "/products/eco-crm.svg",
  },
];

export const globalSupplyChain = {
  id: "global-supply-chain",
  name: "Global Supply Chain",
  tagline:
    "One chain, end to end: Design (DAIS) → Produce (CLAB) → Inspect (AI QC) → Sell & Track (ECO-CRM), orchestrated across a worldwide supplier & factory network.",
  steps: [
    { id: "dais", label: "Design", tool: "DAIS" },
    { id: "clab", label: "Produce", tool: "CLAB" },
    { id: "ai-qc", label: "Inspect", tool: "AI QC" },
    { id: "eco-crm", label: "Sell & Track", tool: "ECO-CRM" },
  ],
};

export const navLinks = [
  ...products.map((p) => ({ href: `#${p.id}`, label: p.name })),
  { href: "#global-supply-chain", label: "Global Supply Chain" },
];

export const contact = {
  email: "hello@trimsOS.com",
  demoUrl: "#contact",
  domain: "www.trimsOS.com",
};
```

- [ ] **Step 2: Add placeholder images**

Create `web/public/products/` and add a simple placeholder SVG per product (`dais.svg`, `clab.svg`, `ai-qc.svg`, `eco-crm.svg`). Use this template, changing the label text:

`web/public/products/dais.svg`:
```xml
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <rect width="1200" height="800" fill="#f7f7f7"/>
  <rect x="40" y="40" width="1120" height="720" fill="none" stroke="#d9d9d9" stroke-width="2"/>
  <text x="600" y="410" font-family="Inter, sans-serif" font-size="64" font-weight="600" fill="#0a0a0a" text-anchor="middle">DAIS</text>
</svg>
```
Repeat for CLAB, AI QC, ECO-CRM (change the `<text>` content).

- [ ] **Step 3: Verify**

```bash
npm run lint && npm run build
```
Expected: pass. (Data file has no runtime effect yet, but must compile.)

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: product content data + placeholder images"
```

---

## Task 5: Nav (sticky, minimal, mobile menu, CTA)

**Files:**
- Create: `web/src/components/Nav.tsx`

**Interfaces:**
- Consumes: `navLinks`, `contact` from `@/src/data/products`.
- Produces: `<Nav />` — sticky top nav, scrolls to product anchors, mobile hamburger menu, "Book a Demo" CTA.

- [ ] **Step 1: Implement Nav**

`web/src/components/Nav.tsx`:
```tsx
"use client";
import { useEffect, useState } from "react";
import { navLinks, contact } from "@/src/data/products";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${
        scrolled ? "border-grey-200 bg-paper/80 backdrop-blur" : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <a href="#top" className="text-lg font-semibold tracking-tight">trimsOS</a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm text-grey-600 transition-colors hover:text-ink">{l.label}</a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a href={contact.demoUrl} className="hidden rounded-full bg-ink px-5 py-2 text-sm font-medium text-paper transition-opacity hover:opacity-90 md:inline-block">
            Book a Demo
          </a>
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-grey-200 bg-paper md:hidden">
          <ul className="mx-auto flex w-full max-w-6xl flex-col px-6 py-4">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block py-3 text-sm text-grey-700">{l.label}</a>
              </li>
            ))}
            <li>
              <a href={contact.demoUrl} onClick={() => setOpen(false)} className="mt-2 inline-block rounded-full bg-ink px-5 py-2 text-sm font-medium text-paper">Book a Demo</a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npm run lint && npm run build
```
Expected: pass. (Not wired into page yet — Task 13 wires it.)

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: sticky Nav with mobile menu"
```

---

## Task 6: Hero (text + CTA), 3D added in Task 7

**Files:**
- Create: `web/src/components/Hero.tsx`

**Interfaces:**
- Produces: `<Hero />` rendering headline, subhead, two CTAs, and a reserved block for the lazy 3D canvas (filled in Task 7). Must render fully and be usable WITHOUT 3D.

- [ ] **Step 1: Implement Hero (3D placeholder for now)**

`web/src/components/Hero.tsx`:
```tsx
"use client";
import dynamic from "next/dynamic";
import { Container } from "./primitives";

// 3D is lazy and client-only; falls back to nothing (Task 7 supplies the component).
const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false, loading: () => null });

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 md:pt-40">
      {/* 3D layer sits behind the text */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <Hero3D />
      </div>

      <Container className="pb-24 md:pb-32">
        <div className="max-w-3xl">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.25em] text-grey-500">Garment Trims Operation System</p>
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            The operating system for garment trims.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-grey-600 md:text-xl">
            One integrated suite — from first design to delivered order. Design, produce, inspect, and track every label across a worldwide supply chain.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#contact" className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90">Book a Demo</a>
            <a href="#suite" className="rounded-full border border-grey-300 px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-grey-50">Explore the suite</a>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Create a temporary stub so it compiles before Task 7**

Create `web/src/components/Hero3D.tsx` as a placeholder now (replaced in Task 7):
```tsx
export default function Hero3D() {
  return null;
}
```

- [ ] **Step 3: Verify**

```bash
npm run lint && npm run build
```
Expected: pass.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: Hero with text + CTA (3D stub)"
```

---

## Task 7: Hero3D — R3F 5-node chain (signature moment #1)

**Files:**
- Modify: `web/src/components/Hero3D.tsx`

**Interfaces:**
- Produces: `<Hero3D />` — a client-only R3F canvas with 5 monochrome spheres connected by a line (one node per suite product), slow auto-rotation, mouse-parallax optional. Renders `null` under reduced-motion.

> **Note:** This is a working starter. Geometry/material/rotation speed will be tuned visually during execution (see Verification).

- [ ] **Step 1: Implement Hero3D**

`web/src/components/Hero3D.tsx`:
```tsx
"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/src/lib/useReducedMotion";

const NODES: [number, number, number][] = [
  [-3.0, -0.4, 0],
  [-1.5, 0.5, 0],
  [0.0, -0.5, 0],
  [1.5, 0.5, 0],
  [3.0, -0.4, 0],
];

function Chain() {
  const group = useRef<THREE.Group>(null);
  const points = useMemo(() => NODES.map((n) => new THREE.Vector3(...n)), []);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.12;
  });
  return (
    <group ref={group}>
      {NODES.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.16, 32, 32]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.45} metalness={0.05} />
        </mesh>
      ))}
      <Line points={points} color="#0a0a0a" lineWidth={1.2} transparent opacity={0.6} />
    </group>
  );
}

export default function Hero3D() {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} />
      <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.4}>
        <Chain />
      </Float>
    </Canvas>
  );
}
```

- [ ] **Step 2: Verify build + lint**

```bash
npm run lint && npm run build
```
Expected: pass.

- [ ] **Step 3: Visual verification + tune**

```bash
npm run dev
```
Open http://localhost:3000 (Hero must be wired into page — see Task 13; if not yet wired, temporarily import `<Hero/>` into `app/page.tsx`). Confirm: 5 dark spheres connected by a thin line, slowly rotating, monochrome, behind the hero text (text remains fully readable). Tune `rotationIntensity`, sphere radius, and camera distance until calm and professional. Confirm `prefers-reduced-motion: reduce` (DevTools → Rendering) hides the canvas.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: Hero3D 5-node chain (signature moment 1)"
```

---

## Task 8: ProductGrid — suite overview (5 cards)

**Files:**
- Create: `web/src/components/ProductGrid.tsx`

**Interfaces:**
- Consumes: `products`, `globalSupplyChain` from data file.
- Produces: `<ProductGrid />` — 5-card grid (4 core products + Global Supply Chain), each with name, acronym, one-liner, anchor link.

- [ ] **Step 1: Implement ProductGrid**

`web/src/components/ProductGrid.tsx`:
```tsx
import { products, globalSupplyChain } from "@/src/data/products";
import { Container, Section, SectionHeading, Reveal } from "./primitives";

const cards = [
  ...products.map((p) => ({ href: `#${p.id}`, name: p.name, sub: p.acronym, tagline: p.tagline })),
  { href: `#${globalSupplyChain.id}`, name: globalSupplyChain.name, sub: "Orchestration", tagline: globalSupplyChain.tagline },
];

export default function ProductGrid() {
  return (
    <Section id="suite" className="border-t border-grey-100">
      <Container>
        <SectionHeading kicker="The suite" title="One system. Five products." subtitle="Everything a garment-trims operation needs, from the first design to the shipped order." />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-grey-200 bg-grey-200 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.href} delay={i * 0.05}>
              <a href={c.href} className="flex h-full flex-col bg-paper p-8 transition-colors hover:bg-grey-50">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-xl font-semibold">{c.name}</h3>
                  <span className="text-xs uppercase tracking-wider text-grey-400">{c.sub}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-grey-600">{c.tagline}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npm run lint && npm run build
```
Expected: pass.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: ProductGrid suite overview"
```

---

## Task 9: ProductSection — reusable alternating section (DAIS/CLAB/AI QC/ECO-CRM)

**Files:**
- Create: `web/src/components/ProductSection.tsx`

**Interfaces:**
- Consumes: a `CoreProduct` from data file.
- Produces: `<ProductSection product={p} index={n} />` — alternating image-left/right layout, name, acronym, tagline, description, feature list, placeholder image.

- [ ] **Step 1: Implement ProductSection**

`web/src/components/ProductSection.tsx`:
```tsx
import type { CoreProduct } from "@/src/data/products";
import { Container, Section, Reveal } from "./primitives";

export default function ProductSection({ product, index }: { product: CoreProduct; index: number }) {
  const flip = index % 2 === 1;
  return (
    <Section id={product.id} className="border-t border-grey-100">
      <Container>
        <div className={`grid items-center gap-12 lg:grid-cols-2 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
          <Reveal>
            <div>
              <div className="flex items-baseline gap-3">
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{product.name}</h2>
                <span className="text-sm uppercase tracking-wider text-grey-400">{product.acronym}</span>
              </div>
              <p className="mt-4 text-lg text-grey-700">{product.tagline}</p>
              <p className="mt-4 text-base text-grey-600">{product.description}</p>
              <ul className="mt-8 space-y-3">
                {product.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-grey-700">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink" aria-hidden />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-grey-200 bg-grey-50 aspect-[3/2]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.image} alt={`${product.name} — ${product.acronym}`} className="h-full w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npm run lint && npm run build
```
Expected: pass.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: reusable ProductSection"
```

---

## Task 10: SupplyChain3D — interactive 3D chain (signature moment #2)

**Files:**
- Create: `web/src/components/SupplyChain3D.tsx`

**Interfaces:**
- Consumes: `globalSupplyChain.steps` from data file.
- Produces: `<SupplyChain3D />` — client-only R3F canvas: 4 nodes (Design→Produce→Inspect→Sell & Track) on a line with a travelling particle indicating flow; HTML labels overlay via drei `<Html>`. Reduced-motion → renders a static 2D fallback (the steps as a horizontal flow).

> **Note:** Working starter; tune visually during execution.

- [ ] **Step 1: Implement the 3D scene**

`web/src/components/SupplyChain3D.tsx`:
```tsx
"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { globalSupplyChain } from "@/src/data/products";
import { useReducedMotion } from "@/src/lib/useReducedMotion";

const steps = globalSupplyChain.steps;
const SPAN = 6;
const xFor = (i: number) => (i - (steps.length - 1) / 2) * (SPAN / (steps.length - 1));

function Flow() {
  const dot = useRef<THREE.Mesh>(null);
  const pts = useMemo(() => steps.map((_, i) => new THREE.Vector3(xFor(i), 0, 0)), []);
  useFrame(({ clock }) => {
    if (!dot.current) return;
    const t = (clock.getElapsedTime() * 0.25) % 1;
    const seg = t * (pts.length - 1);
    const i = Math.floor(seg);
    const f = seg - i;
    const a = pts[i];
    const b = pts[Math.min(i + 1, pts.length - 1)];
    dot.current.position.lerpVectors(a, b, f);
  });
  return (
    <>
      <Line points={pts} color="#0a0a0a" lineWidth={1.5} />
      {pts.map((p, i) => (
        <group key={i} position={p.toArray()}>
          <mesh>
            <sphereGeometry args={[0.22, 32, 32]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.4} />
          </mesh>
          <Html center distanceFactor={10} position={[0, -0.7, 0]} wrapperClass="pointer-events-none">
            <div className="text-center">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-ink">{steps[i].label}</div>
              <div className="text-[10px] text-grey-500">{steps[i].tool}</div>
            </div>
          </Html>
        </group>
      ))}
      <mesh ref={dot}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#525252" />
      </mesh>
    </>
  );
}

function StaticFallback() {
  return (
    <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-between">
      {steps.map((s, i) => (
        <div key={s.id} className="flex items-center gap-4 md:flex-1 md:flex-col md:text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-grey-300 text-sm font-semibold">{i + 1}</div>
          <div>
            <div className="text-sm font-semibold">{s.label}</div>
            <div className="text-xs text-grey-500">{s.tool}</div>
          </div>
          {i < steps.length - 1 && <div className="hidden h-px flex-1 bg-grey-300 md:block" aria-hidden />}
        </div>
      ))}
    </div>
  );
}

export default function SupplyChain3D() {
  const reduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (reduced || isMobile) {
    return (
      <div className="rounded-2xl border border-grey-200 bg-grey-50 p-8 md:p-12">
        <StaticFallback />
      </div>
    );
  }

  return (
    <div className="h-[360px] w-full md:h-[420px]">
      <Canvas camera={{ position: [0, 0, 9], fov: 45 }} dpr={[1, 2]} gl={{ alpha: true }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 4, 6]} intensity={0.6} />
        <Flow />
      </Canvas>
    </div>
  );
}
```

> **Self-note for Task 14:** refactor this inline `matchMedia` gate to reuse the shared `useIsMobile` hook (created in Task 14) so the mobile-detection logic isn't duplicated.

- [ ] **Step 2: Verify build + lint**

```bash
npm run lint && npm run build
```
Expected: pass.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: SupplyChain3D interactive chain (signature moment 2)"
```

---

## Task 11: Remotion explainer (signature moment #3)

**Files:**
- Create: `web/src/remotion/FlowComposition.tsx`
- Create: `web/src/components/RemotionExplainer.tsx`

**Interfaces:**
- Produces: `<RemotionExplainer />` — wraps Remotion `<Player>` showing a looping monochrome animation of the 4 steps. Reduced-motion → static poster (first frame as image / StaticFallback).

> **Note:** Remotion `<Player>` requires a fixed `durationInFrames`, `fps`, and dimensions. Working starter; tune timing/typography during execution.

- [ ] **Step 1: Create the composition**

`web/src/remotion/FlowComposition.tsx`:
```tsx
"use client";
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from "remotion";
import { globalSupplyChain } from "@/src/data/products";

const FPS = 30;
const STEP = 45; // frames per step
export const FLOW_DURATION = STEP * globalSupplyChain.steps.length;

function Step({ label, tool, start }: { label: string; tool: string; start: number }) {
  const frame = useCurrentFrame() - start;
  const opacity = interpolate(frame, [0, 8, STEP - 8, STEP], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(frame, [0, 12], [12, 0], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity, transform: `translateY(${y}px)` }}>
      <div style={{ textAlign: "center", color: "#0a0a0a", fontFamily: "Inter, sans-serif" }}>
        <div style={{ fontSize: 18, letterSpacing: "0.2em", textTransform: "uppercase", color: "#737373" }}>{tool}</div>
        <div style={{ fontSize: 64, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 8 }}>{label}</div>
      </div>
    </AbsoluteFill>
  );
}

export const FlowComposition = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#ffffff" }}>
      {globalSupplyChain.steps.map((s, i) => (
        <Sequence key={s.id} from={i * STEP} durationInFrames={STEP}>
          <Step label={s.label} tool={s.tool} start={i * STEP} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export const FLOW_PROPS = { fps: FPS, durationInFrames: FLOW_DURATION, width: 1280, height: 480 };
```

- [ ] **Step 2: Create the Player wrapper**

`web/src/components/RemotionExplainer.tsx`:
```tsx
"use client";
import { Player } from "@remotion/player";
import { FlowComposition, FLOW_PROPS } from "@/src/remotion/FlowComposition";
import { useReducedMotion } from "@/src/lib/useReducedMotion";

export default function RemotionExplainer() {
  const reduced = useReducedMotion();
  if (reduced) {
    return (
      <div className="flex aspect-[1280/480] w-full items-center justify-center rounded-2xl border border-grey-200 bg-grey-50">
        <div className="text-center">
          <div className="text-sm uppercase tracking-[0.2em] text-grey-500">DAIS → CLAB → AI QC → ECO-CRM</div>
          <div className="mt-2 text-2xl font-semibold">Design · Produce · Inspect · Sell &amp; Track</div>
        </div>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-2xl border border-grey-200">
      <Player
        component={FlowComposition}
        durationInFrames={FLOW_PROPS.durationInFrames}
        fps={FLOW_PROPS.fps}
        compositionWidth={FLOW_PROPS.width}
        compositionHeight={FLOW_PROPS.height}
        style={{ width: "100%" }}
        autoPlay
        loop
        controls={false}
      />
    </div>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npm run lint && npm run build
```
Expected: pass.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: Remotion flow explainer (signature moment 3)"
```

---

## Task 12: ValueProps + ContactCTA + Footer

**Files:**
- Create: `web/src/components/ValueProps.tsx`
- Create: `web/src/components/ContactCTA.tsx`
- Create: `web/src/components/Footer.tsx`

**Interfaces:**
- Produces: three sections used in the page assembly (Task 13).

- [ ] **Step 1: ValueProps**

`web/src/components/ValueProps.tsx`:
```tsx
import { Container, Section, SectionHeading, Reveal } from "./primitives";

const props = [
  { title: "Integrated by design", body: "DAIS, CLAB, AI QC and ECO-CRM share one chain — no silos, no double entry." },
  { title: "Built for the factory floor", body: "QR-tracked production and real-time AI inspection, proven on real lines." },
  { title: "Professional & fast", body: "A clean, minimal interface your team and your customers will respect." },
];

export default function ValueProps() {
  return (
    <Section className="border-t border-grey-100">
      <Container>
        <SectionHeading kicker="Why trimsOS" title="One chain. End to end." />
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {props.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div>
                <div className="mb-4 h-8 w-8 border-t border-l border-ink" aria-hidden />
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-grey-600">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: ContactCTA (CTA + non-functional contact form)**

`web/src/components/ContactCTA.tsx`:
```tsx
"use client";
import { useState } from "react";
import { Container, Section } from "./primitives";
import { contact } from "@/src/data/products";

export default function ContactCTA() {
  const [sent, setSent] = useState(false);
  return (
    <Section id="contact" className="border-t border-grey-100">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Book a demo.</h2>
            <p className="mt-4 max-w-md text-grey-600">See the full trimsOS suite on your own products. We'll walk you through design, production, QC, and tracking.</p>
            <p className="mt-8 text-sm text-grey-500">Or email <a className="text-ink underline" href={`mailto:${contact.email}`}>{contact.email}</a></p>
          </div>
          {sent ? (
            <div className="flex items-center justify-center rounded-2xl border border-grey-200 bg-grey-50 p-10 text-center">
              <p className="text-grey-700">Thanks — we'll be in touch within one business day.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="rounded-2xl border border-grey-200 p-6 md:p-8"
            >
              <div className="grid gap-4">
                <label className="text-sm">
                  <span className="mb-1 block text-grey-600">Name</span>
                  <input required className="w-full rounded-lg border border-grey-300 bg-paper px-3 py-2 text-ink" />
                </label>
                <label className="text-sm">
                  <span className="mb-1 block text-grey-600">Work email</span>
                  <input required type="email" className="w-full rounded-lg border border-grey-300 bg-paper px-3 py-2 text-ink" />
                </label>
                <label className="text-sm">
                  <span className="mb-1 block text-grey-600">Company</span>
                  <input className="w-full rounded-lg border border-grey-300 bg-paper px-3 py-2 text-ink" />
                </label>
                <button type="submit" className="mt-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90">Request demo</button>
              </div>
            </form>
          )}
        </div>
      </Container>
    </Section>
  );
}
```

> **Note:** Form is front-end only (sets a "sent" state). Wiring to a real endpoint/email service is out of scope (spec §9) — flagged as a follow-up.

- [ ] **Step 3: Footer**

`web/src/components/Footer.tsx`:
```tsx
import { Container } from "./primitives";
import { navLinks, contact } from "@/src/data/products";

export default function Footer() {
  return (
    <footer className="border-t border-grey-200 py-12">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="text-lg font-semibold tracking-tight">trimsOS</div>
            <div className="mt-1 text-sm text-grey-500">{contact.domain}</div>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((l) => (
              <li key={l.href}><a href={l.href} className="text-sm text-grey-500 hover:text-ink">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <p className="mt-8 text-xs text-grey-400">© {new Date().getFullYear()} trimsOS. All rights reserved.</p>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 4: Verify**

```bash
npm run lint && npm run build
```
Expected: pass.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: ValueProps, ContactCTA, Footer"
```

---

## Task 13: Assemble page.tsx (wire everything)

**Files:**
- Modify: `web/app/page.tsx`

**Interfaces:**
- Consumes: all components built in Tasks 5–12.

- [ ] **Step 1: Replace app/page.tsx**

`web/app/page.tsx`:
```tsx
import Nav from "@/src/components/Nav";
import Hero from "@/src/components/Hero";
import ProductGrid from "@/src/components/ProductGrid";
import ProductSection from "@/src/components/ProductSection";
import SupplyChain3D from "@/src/components/SupplyChain3D";
import RemotionExplainer from "@/src/components/RemotionExplainer";
import ValueProps from "@/src/components/ValueProps";
import ContactCTA from "@/src/components/ContactCTA";
import Footer from "@/src/components/Footer";
import { products, globalSupplyChain } from "@/src/data/products";
import { Container, Section, SectionHeading } from "@/src/components/primitives";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProductGrid />

        {products.map((p, i) => (
          <ProductSection key={p.id} product={p} index={i} />
        ))}

        {/* Signature moment #2: Global Supply Chain 3D */}
        <Section id={globalSupplyChain.id} className="border-t border-grey-100">
          <Container>
            <SectionHeading
              kicker="Global Supply Chain"
              title={globalSupplyChain.tagline}
            />
            <div className="mt-12">
              <SupplyChain3D />
            </div>
          </Container>
        </Section>

        {/* Signature moment #3: Remotion explainer */}
        <Section className="border-t border-grey-100">
          <Container>
            <SectionHeading kicker="How it works" title="From design to delivered order." />
            <div className="mt-12">
              <RemotionExplainer />
            </div>
          </Container>
        </Section>

        <ValueProps />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify the full site**

```bash
npm run lint && npm run build && npm run test
```
Expected: all pass. Then `npm run dev` → open http://localhost:3000 → confirm: nav, hero with 3D, suite grid, 4 product sections, supply chain 3D, remotion explainer, value props, contact, footer all present and in order.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: assemble full single-page site"
```

---

## Task 14: Responsive + reduced-motion + mobile-fallback pass

**Files:**
- Modify: `web/src/components/SupplyChain3D.tsx` (real mobile gate)
- Create: `web/src/lib/useIsMobile.ts` (+ test)
- Review: all components for responsive behavior

**Interfaces:**
- Produces: `useIsMobile(breakpoint=768)`; SupplyChain3D uses it so phones get the 2D fallback.

- [ ] **Step 1: Write failing test for useIsMobile**

`web/src/lib/useIsMobile.test.ts`:
```ts
import { renderHook } from "@testing-library/react";
import { useIsMobile } from "./useIsMobile";
it("defaults to false in jsdom (wide viewport)", () => {
  const { result } = renderHook(() => useIsMobile());
  expect(typeof result.current).toBe("boolean");
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/lib/useIsMobile.test.ts
```
Expected: FAIL (module missing).

- [ ] **Step 3: Implement**

`web/src/lib/useIsMobile.ts`:
```ts
"use client";
import { useEffect, useState } from "react";
export function useIsMobile(breakpoint = 768): boolean {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    setMobile(mq.matches);
    const onChange = () => setMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [breakpoint]);
  return mobile;
}
```

- [ ] **Step 4: Refactor SupplyChain3D to the shared hook**

In `web/src/components/SupplyChain3D.tsx`, replace the inline `matchMedia` `useEffect` block (added in Task 10) with:
- import `{ useIsMobile } from "@/src/lib/useIsMobile";`
- `const isMobile = useIsMobile();`
- remove the now-unused `useEffect` import and the local `isMobile` state + effect.

- [ ] **Step 5: Run test + verify**

```bash
npm run test && npm run lint && npm run build
```
Expected: all pass. In dev: DevTools mobile view → SupplyChain3D shows the 2D fallback; DevTools → Rendering → "Emulate reduced motion" → all 3D/video become static.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: responsive + reduced-motion + mobile fallbacks"
```

---

## Task 15: Lighthouse + final verification + deploy notes

**Files:**
- Modify: `web/README.md` (add run/deploy instructions)

- [ ] **Step 1: Production build + serve**

```bash
cd web
npm run build
npm run start
```
Open http://localhost:3000.

- [ ] **Step 2: Run Lighthouse**

In Chrome DevTools → Lighthouse → generate a report on mobile + desktop. Targets: Performance ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90. If Perf < 90, the likely culprit is 3D — verify Hero3D/SupplyChain3D are lazy and not blocking LCP; reduce `dpr` or geometry detail.

- [ ] **Step 3: Manual checklist**

- [ ] All 5 products present and copy matches spec §6 exactly.
- [ ] "Global Supply Chain" (not "System Chain") everywhere.
- [ ] Nav anchors scroll to each section; mobile menu works.
- [ ] Reduced motion hides 3D/video.
- [ ] Mobile shows 2D fallback for SupplyChain3D.
- [ ] No color anywhere outside the grey scale.

- [ ] **Step 4: Deploy notes in README**

Append to `web/README.md`:
```md
## Deploy
1. Push `web/` to a GitHub repo.
2. Import on Vercel — auto-detects Next.js.
3. Set production domain to www.trimsOS.com.

## Replace placeholders
- Swap `public/products/*.svg` with real screenshots of DAIS, CLAB, AI QC, ECO-CRM.
- Update `src/data/products.ts` `contact` with real email/demo URL.
- Wire the contact form to a real endpoint (out of scope for v1).
```

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "docs: deploy + verification notes"
```

---

## Definition of Done

All acceptance criteria from `tasks/todo.md` met: single-page monochrome site, all 5 products, hero + nav + CTA, 3 signature moments with reduced-motion + mobile fallbacks, builds + deploys, Lighthouse ≥ 90, user confirms "professional".
