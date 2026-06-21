# trimsOS.com Website — Task Checklist

**Goal:** Build a professional, single-page marketing site for trimsOS.com (DAIS, CLAB, AI QC, ECO-CRM, Global Supply Chain) — minimal monochrome, with 2–3 fancy 3D/Remotion moments.
**Spec:** `docs/superpowers/specs/2026-06-21-trimsos-website-design.md`

## Acceptance Criteria (done when…)
- [x] Single-page site, monochrome professional aesthetic, fully responsive.
- [x] All 5 products presented clearly with copy + (placeholder) screenshots.
- [x] Hero + sticky nav + "Book a Demo" CTA working.
- [x] 3 signature moments work: Hero 3D, Global Supply Chain 3D, Remotion explainer.
- [x] `prefers-reduced-motion` fallbacks + mobile 2D fallbacks in place.
- [x] Builds locally (lint + test + build all green). _Deploys to Vercel — pending user._
- [ ] Lighthouse Perf/A11y/Best-Practices ≥ 90 — _pending manual Lighthouse run._
- [ ] User confirms it "looks professional" — _pending visual review._

## Tasks
- [x] **0. Spec approved by user**
- [x] 1. Write implementation plan (`writing-plans` skill)
- [x] 2. Scaffold Next.js + Tailwind + Framer Motion + R3F + Remotion
- [x] 3. Monochrome design tokens (colors, type, spacing)
- [x] 4. `Nav` + `Hero` (with `Hero3D` centerpiece — moment #1)
- [x] 5. `ProductGrid` (suite overview)
- [x] 6. `ProductSection` (reusable) + DAIS section
- [x] 7. CLAB section
- [x] 8. AI QC section
- [x] 9. ECO-CRM section
- [x] 10. `SupplyChain3D` interactive chain (moment #2)
- [x] 11. `RemotionExplainer` loop (moment #3)
- [x] 12. `ValueProps` + `CTA` + `ContactForm` + `Footer`
- [x] 13. Reduced-motion + mobile 2D fallbacks
- [x] 14. Responsive pass (mobile/tablet/desktop)
- [ ] 15. Placeholder images → real screenshots (needs user assets)
- [ ] 16. Lighthouse + verification (_Lighthouse pending; build verified_)
- [ ] 17. Deploy to Vercel (_pending user_)

## Working Notes
- Aesthetic: strict monochrome (matches CLAB's B&W internal tool). 3D/video = monochrome materials only, no color/rainbow.
- Motion rule: fancy in 3 signature spots only; everything else clean static + subtle Framer Motion reveals.
- "Global System Chain" → renamed **"Global Supply Chain"** per user (2026-06-21).
- Product substance: `trimsos_image.txt`, `trims_layout.txt`, `trimsos-crm.txt`, AI QC ref https://label-qc.vercel.app
- No backend/auth — marketing only.
- User rejected Playwright MCP ("waste time") — verify visually via `run`/manual instead.

## Results
**Implemented:** full single-page trimsOS.com marketing site in `web/` (Next 16.2.9, React 19, Tailwind v4, R3F, Remotion, Framer Motion). All 5 products (DAIS, CLAB, AI QC, ECO-CRM, Global Supply Chain), sticky Nav + mobile menu + "Book a Demo" CTA, Hero with lazy 3D, suite grid, 4 alternating product sections, interactive Supply Chain 3D, looping Remotion explainer, value props, contact form, footer.
**Verified:** `npm run lint` clean · `npm run test` 2/2 pass · `npm run build` 4/4 static pages · `next start` HTTP 200 with all content + Inter woff2 wired. Reduced-motion + mobile (2D) fallbacks in place.
**Deviations from plan (see `lessons.md`):** `@/` import paths (no `src/`), `useSyncExternalStore` hooks, eslint `_`-arg rule, Remotion Sequence offset fix.
**Pending user:** real screenshots, real contact email/demo URL, wire contact form, Lighthouse run, Vercel deploy, visual "looks professional" sign-off.
