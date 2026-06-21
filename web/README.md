# trimsOS.com — marketing site

Single-page marketing site for **trimsOS** ("Garment Trims Operation System") — a
B2B suite for the garment-trims industry. Showcases the five products: **DAIS,
CLAB, AI QC, ECO-CRM** and the **Global Supply Chain**. Minimal monochrome
aesthetic with three signature motion moments (Hero 3D, Global Supply Chain 3D,
Remotion explainer), plus reduced-motion + mobile fallbacks.

## Stack

- **Next.js 16** (App Router, TypeScript, `src/` dir, Turbopack)
- **Tailwind CSS v4** (CSS-first `@theme`, no config file) — strict monochrome tokens in `src/app/globals.css`
- **Inter** via `next/font/google`
- **Framer Motion** — subtle scroll reveals
- **three** + `@react-three/fiber` + `@react-three/drei` — the two 3D moments
- **Remotion** (`@remotion/player`) — the in-page explainer loop
- **Vitest** + **jsdom** — unit tests for the two hooks

## Develop

```bash
npm install
npm run dev    # http://localhost:3000
```

## Verify

```bash
npm run lint
npm run test
npm run build
npm run start  # serve the production build at :3000
```

## Project layout

```
src/
├── app/            # layout.tsx (Inter + metadata), page.tsx (assembles sections), globals.css (tokens)
├── components/     # Nav, Hero(+Hero3D), ProductGrid, ProductSection, SupplyChain3D,
│                   # RemotionExplainer, ValueProps, ContactCTA, Footer, primitives
├── data/products.ts# Single source of truth (LOCKED copy) — products, suite, nav, contact
├── lib/            # useReducedMotion, useIsMobile (+ .test.ts)
└── remotion/FlowComposition.tsx
public/products/    # Placeholder product SVGs (swap for real screenshots)
```

## Accessibility & performance guardrails (built in)

- `prefers-reduced-motion: reduce` → every 3D/video component renders a static
  fallback; global CSS also neutralizes animations/transitions.
- Heavy 3D (`SupplyChain3D`) falls back to a 2D flow on mobile (`useIsMobile`).
- 3D canvases are lazy-loaded client-only (`next/dynamic`, `ssr: false`) so they
  never block the hero text/CTA.

## Deploy

1. Push `web/` to a GitHub repo.
2. Import on [Vercel](https://vercel.com/new) — it auto-detects Next.js.
3. Set the production domain to `www.trimsOS.com`.

## Replace placeholders (before launch)

- Swap `public/products/*.svg` with real screenshots of DAIS, CLAB, AI QC, ECO-CRM.
- Update `src/data/products.ts` → `contact` with the real email / demo URL.
- Wire the contact form (`ContactCTA.tsx`) to a real endpoint (out of scope for v1).

## Notes

- Product names and one-liners in `src/data/products.ts` are **locked verbatim**
  from the design spec — do not reword.
- The 5th product is **"Global Supply Chain"** (never "Global System Chain").
- Remotion prints a one-time license note during build; if your company requires
  a Remotion license, obtain one and pass `acknowledgeRemotionLicense` to `<Player>`.
