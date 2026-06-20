# Task 2 Brief: Design tokens + global styles (monochrome system)

> **NO GIT.** Skip all git/commit steps. Implement, verify (lint + build + dev render), report.
> **Next.js 16 constraint (per `web/AGENTS.md`).** This Next has breaking changes; the plan's code below was written for Next 15. BEFORE coding, read these bundled guides and ADAPT as needed:
> - `web/node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md` (next/font → Inter)
> - `web/node_modules/next/dist/docs/01-app/01-getting-started/11-css.md` (CSS / Tailwind v4)
> - `web/node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md` (root layout)
> - `web/node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md` (Metadata API)
> Verify the exact `next/font/google` Inter API and the `metadata` export against Next 16. Heed deprecation notices.

**Tailwind = v4** (Task 1 confirmed: `tailwindcss@^4`, `@tailwindcss/postcss`, CSS-first `@theme`, NO config file). Use ONLY the `@theme` CSS approach.

**Files:**
- Modify: `web/app/globals.css`
- Modify: `web/app/layout.tsx`

**Interfaces (what later tasks rely on):**
- Tailwind utilities must resolve: `bg-paper`, `text-ink`, `text-grey-{50..900}`, `border-grey-{100..900}`, `bg-grey-{50..900}`, `font-sans`.
- Inter loaded via next/font, applied to `<body>`.
- Global `prefers-reduced-motion` block that neutralizes animation durations (foundational — many components depend on it).

## Design tokens (use verbatim)
Colors: ink `#0a0a0a`, paper `#ffffff`; grey-50 `#f7f7f7`, 100 `#ededed`, 200 `#d9d9d9`, 300 `#bfbfbf`, 400 `#9a9a9a`, 500 `#737373`, 600 `#525252`, 700 `#3d3d3d`, 800 `#262626`, 900 `#171717`.
Font: `--font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;`

## globals.css target (Tailwind v4 `@theme`)
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

:root { --bg: var(--color-paper); --fg: var(--color-ink); }
html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
body { background: var(--bg); color: var(--fg); font-family: var(--font-sans); }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
:focus-visible { outline: 2px solid var(--color-ink); outline-offset: 2px; }
```
Read `11-css.md` to confirm `@theme` is the correct Tailwind-v4 integration here. The scaffolded `globals.css` already has `@import "tailwindcss"` (and maybe a `:root`/dark block from the template) — MERGE cleanly, don't duplicate `@import`.

## layout.tsx target (VERIFY each line against Next 16 docs)
Reference (Next-15-sourced — adapt if Next 16 changed anything):
```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "trimsOS — The operating system for garment trims",
  description: "trimsOS is the integrated operating system for garment trims: DAIS, CLAB, AI QC, ECO-CRM and the Global Supply Chain — from first design to delivered order.",
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
Leave the default `app/page.tsx` content as-is (later tasks replace it) — just ensure it still builds.

## Verify
1. `npm --prefix web run lint` — pass.
2. `npm --prefix web run build` — pass.
3. `npm --prefix web run dev` → start, then `curl -s http://localhost:3000 | grep -i "inter\|font"` to confirm Inter is wired (then kill dev). Visual check not required.

## Report back (report file, then <15-line summary)
- Files modified.
- Which Next 16 docs you read + any API adapted (esp. next/font, metadata).
- lint + build results + the curl evidence.
- Confirm utilities resolve (e.g., `bg-paper text-ink` emitted correct CSS).
