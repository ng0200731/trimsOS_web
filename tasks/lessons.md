# Lessons Learned

Capture failure modes, detection signals, and prevention rules after corrections or postmortems. Review at session start and before major refactors.

---

## 2026-06-21 — Don't barrage the user with questions
- **Signal:** User pushed back ("you keep asking me question, let me reply") when I asked multiple open-ended questions in a row.
- **Rule:** Ask **one** focused question per turn with a recommended default (matches this project's `claude.md`). After they dump info, reflect it back; don't immediately ask the next thing. Save project facts to memory so I don't re-ask.

## 2026-06-21 — Naming: "Global Supply Chain", not "Global System Chain"
- **Signal:** User corrected the 5th product name during planning.
- **Rule:** The suite's connective layer is **"Global Supply Chain"** (orchestration across the worldwide supplier/factory network). Use this name everywhere; do not revert to "Global System Chain."

## 2026-06-21 — `@/*` import alias maps to `./src/*`, not project root
- **Signal:** The plan (written for a `web/app` layout) used `@/src/components/...`, `@/src/lib/...`, `@/src/data/...`. But `web/tsconfig.json` sets `"paths": { "@/*": ["./src/*"] }` (create-next-app `--src-dir`), so `@/src/x` resolves to `./src/src/x` — broken.
- **Rule:** In this project, `@/` already points at `src/`. Import as `@/components/...`, `@/lib/...`, `@/data/...`, `@/remotion/...` — never `@/src/...`. Same for the vitest alias (`@` → `./src`).

## 2026-06-21 — Next 16 lints `setState`-in-effect; use `useSyncExternalStore` for media queries
- **Signal:** Next 16's flat ESLint config (`eslint-config-next` + React Compiler rules) flags `react-hooks/set-state-in-effect` on the plan's `useReducedMotion`/`useIsMobile` (`setReduced(mq.matches)` inside `useEffect`) and on `Nav`'s initial `onScroll()` call.
- **Rule:** For matchMedia / window-scroll subscriptions, use `useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)` — no `useEffect`+`useState`, no stale-first-render, SSR-safe. Pass a `() => false` server snapshot. This is the idiomatic React 19 fix and passes lint.

## 2026-06-21 — R3F `useFrame((_, delta) => …)` needs an `_`-arg lint allowance
- **Signal:** R3F `useFrame((state, delta) => …)` often ignores `state`; writing `(_, delta)` tripped `@typescript-eslint/no-unused-vars` (default config doesn't ignore `_`).
- **Rule:** `web/eslint.config.mjs` now has `@typescript-eslint/no-unused-vars` with `argsIgnorePattern: "^_"`. Keep R3F callbacks idiomatic; don't bend the code to the linter.

## 2026-06-21 — Remotion `<Sequence>` already offsets time; don't subtract `start` again
- **Signal:** The plan's `FlowComposition` `Step` did `const frame = useCurrentFrame() - start` *inside* a `<Sequence from={i*STEP}>`. `useCurrentFrame()` inside a Sequence returns the **local** (already-shifted) frame, so subtracting `start` double-offsets → steps after the first render with clamped/zero opacity.
- **Rule:** Inside `<Sequence>`, call `useCurrentFrame()` directly and use that for the `interpolate` math; drop the `start` prop. Only subtract manually if the component is rendered **outside** any Sequence.
