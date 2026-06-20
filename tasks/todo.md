# trimsOS.com Website — Task Checklist

**Goal:** Build a professional, single-page marketing site for trimsOS.com (DAIS, CLAB, AI QC, ECO-CRM, Global Supply Chain) — minimal monochrome, with 2–3 fancy 3D/Remotion moments.
**Spec:** `docs/superpowers/specs/2026-06-21-trimsos-website-design.md`

## Acceptance Criteria (done when…)
- [ ] Single-page site, monochrome professional aesthetic, fully responsive.
- [ ] All 5 products presented clearly with copy + (placeholder) screenshots.
- [ ] Hero + sticky nav + "Book a Demo" CTA working.
- [ ] 3 signature moments work: Hero 3D, Global Supply Chain 3D, Remotion explainer.
- [ ] `prefers-reduced-motion` fallbacks + mobile 2D fallbacks in place.
- [ ] Builds locally and deploys to Vercel.
- [ ] Lighthouse Perf/A11y/Best-Practices ≥ 90 (3D must not tank LCP).
- [ ] User confirms it "looks professional."

## Tasks
- [ ] **0. Spec approved by user** ← current gate
- [ ] 1. Write implementation plan (`writing-plans` skill)
- [ ] 2. Scaffold Next.js + Tailwind + Framer Motion + R3F + Remotion
- [ ] 3. Monochrome design tokens (colors, type, spacing)
- [ ] 4. `Nav` + `Hero` (with `Hero3D` centerpiece — moment #1)
- [ ] 5. `ProductGrid` (suite overview)
- [ ] 6. `ProductSection` (reusable) + DAIS section
- [ ] 7. CLAB section
- [ ] 8. AI QC section
- [ ] 9. ECO-CRM section
- [ ] 10. `SupplyChain3D` interactive chain (moment #2)
- [ ] 11. `RemotionExplainer` loop (moment #3)
- [ ] 12. `ValueProps` + `CTA` + `ContactForm` + `Footer`
- [ ] 13. Reduced-motion + mobile 2D fallbacks
- [ ] 14. Responsive pass (mobile/tablet/desktop)
- [ ] 15. Placeholder images → real screenshots (needs user assets)
- [ ] 16. Lighthouse + verification
- [ ] 17. Deploy to Vercel

## Working Notes
- Aesthetic: strict monochrome (matches CLAB's B&W internal tool). 3D/video = monochrome materials only, no color/rainbow.
- Motion rule: fancy in 3 signature spots only; everything else clean static + subtle Framer Motion reveals.
- "Global System Chain" → renamed **"Global Supply Chain"** per user (2026-06-21).
- Product substance: `trimsos_image.txt`, `trims_layout.txt`, `trimsos-crm.txt`, AI QC ref https://label-qc.vercel.app
- No backend/auth — marketing only.
- User rejected Playwright MCP ("waste time") — verify visually via `run`/manual instead.

## Results
_(to fill after implementation)_
