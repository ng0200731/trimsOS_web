# trimsOS.com — Marketing Website Design Spec

**Date:** 2026-06-21
**Status:** Draft — awaiting user review (rev 2: added Three.js + Remotion)
**Author:** Claude (from user brief + product PRDs)

---

## 1. Overview

A professional, single-page marketing/portfolio website for **trimsOS.com** ("Garment Trims Operation System") — a B2B software suite for the clothing-labels & garment-trims manufacturing industry. The site's sole job: **introduce and sell the suite** to garment factories, brands, and buyers. It is a marketing site, not the products themselves.

## 2. Audience & Goal

- **Audience:** Owners/managers of garment-label & trims factories; brand sourcing teams; production managers.
- **Goal:** Convince a visitor in <60 seconds that trimsOS is a complete, professional, integrated operating system — and drive them to contact/book a demo.
- **Success criteria:** Clear value prop above the fold; each of the 5 products understood in one glance; obvious CTA.

## 3. Design Direction

- **Aesthetic:** Professional, clean, **minimal monochrome** (black/white/greys) — consistent with the brand's existing internal tools (CLAB is strict B&W). Generous whitespace, strong typography, no clutter.
- **Motion principle (fancy but minimal):** Signature 3D + motion in **2–3 hero moments only**; every other section stays clean static with subtle Framer Motion reveals. Restraint is what keeps it "minimal." All 3D/video uses **monochrome materials only** — matte white/grey/black, wireframe — never color/rainbow.
- **Design skills:** `steve-jobs-design-skill` (minimalist lens) + `frontend-design`; `remotion-best-practices` for the video parts.

## 4. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js** (App Router) | Fast, professional default; per-product pages later; great image handling |
| Styling | **Tailwind CSS** | Rapid, consistent monochrome system |
| Motion (UI) | **Framer Motion** | Subtle scroll/hover reveals for static sections |
| 3D | **three** + `@react-three/fiber` + `@react-three/drei` | Signature 3D moments, React-friendly |
| Motion video | **Remotion** (`@remotion/player`) | Looping animated explainer; in-page player, no server render |
| Images | Next.js `<Image>` | Optimized product screenshots |
| Hosting | Vercel (recommended) | Zero-config Next.js; AI QC reference already on Vercel |

No backend, no auth, no database — pure marketing.

## 4b. Motion & 3D — the 3 signature moments

1. **Hero centerpiece (Three.js / R3F):** a subtle, mouse-reactive monochrome 3D object. Recommended: an abstract **5-node "chain"** connected by a thin line/thread (one node per product) — it foreshadows the Global Supply Chain. Alternative: a slowly rotating 3D care label / hang-tag. Slow, calm, professional.
2. **Global Supply Chain section (Three.js / R3F):** an **interactive 3D chain diagram** — 5 nodes (DAIS → CLAB → AI QC → ECO-CRM → Global) with a flowing connection (particles or light travelling the line). This makes "one chain, end to end" tangible. Scroll/click to advance the flow.
3. **"How it works" explainer (Remotion):** a short looping monochrome motion graphic of the flow — Design → Produce → Inspect → Sell & Track → Ship. Plays via `<Player>` (no server render) as a hero-side or mid-page strip.

**Guardrails (non-negotiable — keeps it minimal + fast):**
- `prefers-reduced-motion` → static fallback for all 3D/video.
- Lazy-load 3D canvases; **pause when off-screen**.
- **Mobile:** simpler 2D fallback for heavy 3D (perf + battery).
- Strict monochrome materials; no glow/rainbow.
- Performance budget: LCP stays fast — 3D/video must not block the hero text/CTA.

## 5. Site Structure (single-page, long-scroll)

1. **Nav** (sticky, minimal): logo · product anchors · "Book a Demo" CTA.
2. **Hero**: Headline + subhead + CTA + **3D centerpiece** (moment #1). Headline direction: *"The operating system for garment trims."*
3. **The Suite overview**: 5-card grid (icon + name + one-liner).
4. **DAIS** section: pitch, feature bullets, screenshot, AI reverse-image-search callout.
5. **CLAB** section: pitch, Illustrator→production workflow, screenshot, .ai/PDF badges.
6. **AI QC** section: pitch, real-time inspection bullets, screenshot, demo link.
7. **ECO-CRM** section: pitch, pipeline bullets, dashboard screenshot.
8. **Global Supply Chain** section: **interactive 3D chain** (moment #2) tying Design→Produce→Inspect→Sell & Track across a worldwide network.
9. **How it works (Remotion explainer)** — moment #3.
10. **Why trimsOS / value props** + **CTA / Contact** + **Footer**.

Sections 4–7 alternate image left/right for rhythm; stay static + subtle reveals.

## 6. Product Copy (one-liners, locked)

- **DAIS** — *Your visual brain for trims: catalog, tag & search thousands of trims and patterns, with AI reverse-image search that finds a match from just a photo.*
- **CLAB** — *From Illustrator to production in one click — import layouts, drop in variable data, export print-ready .ai/PDF. No designer needed per order.*
- **AI QC** — *Catch every defect before it ships — point a camera at the line and AI inspects each label in real time.*
- **ECO-CRM** — *The whole factory in one screen — emails, quotations, supplier sourcing, orders, and live QR-tracked production.*
- **Global Supply Chain** — *One chain, end to end: Design (DAIS) → Produce (CLAB) → Inspect (AI QC) → Sell & Track (ECO-CRM), orchestrated across a worldwide supplier & factory network.*

Deeper copy from PRDs: `trimsos_image.txt`, `trims_layout.txt`, `trimsos-crm.txt`, AI QC live reference.

## 7. Components (isolated build units)

- `Nav`, `Hero` (+ `Hero3D`), `ProductGrid`, `ProductSection` (reusable), `SupplyChain3D`, `RemotionExplainer`, `ValueProps`, `CTA`, `ContactForm`, `Footer`.
- Each self-contained, one purpose, independently testable.

## 8. Content I Need From You

- **Screenshots** of each real product (DAIS, CLAB, AI QC, ECO-CRM). Placeholders until provided.
- **Logo** (or confirm wordmark).
- **Contact details** (email, phone, demo booking link).
- Optional: customer logos, preferred tagline.

## 9. Non-Goals

- No real backend, login, or live data — marketing only.
- No per-product detail pages in v1.
- No 3D on every section (restraint).

## 10. Verification (definition of done)

- Builds locally (`npm run dev`) + deploys to Vercel.
- Fully responsive; mobile uses 2D fallbacks for heavy 3D.
- `prefers-reduced-motion` respected everywhere.
- All 5 products clear; CTA reachable from nav + hero.
- Lighthouse: Performance/Accessibility/Best-Practices ≥ 90 (3D must not tank LCP).
- User confirms it "looks professional."

## 11. Next Steps

1. User reviews this spec → approve or request changes.
2. Invoke `writing-plans` for the step-by-step implementation plan.
3. Scaffold Next.js + R3F + Remotion, build section-by-section (thin slices).
