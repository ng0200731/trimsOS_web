# Task 1 Brief: Scaffold Next.js project + install dependencies

> **ENVIRONMENT NOTE — NO GIT.** Git write operations (init/commit) are NOT permitted in this environment. **SKIP every git/commit step.** Implement, verify (lint + build), and report. Do NOT run any `git` command. If `create-next-app` tries a git step and warns/fails on it, that is fine — the app files + `node_modules` + working lint/build are what matter.

**Files:**
- Create: `d:\project\trimsos_web\web\` (entire create-next-app output)

**Interfaces (what this task produces for later tasks):**
- A runnable Next.js app at `web/` with all deps installed.
- `npm run dev` / `npm run build` / `npm run lint` must all work from `web/`.
- **You MUST report the exact Tailwind major version (v3 vs v4)** — Task 2 branches on it. Also report `next`, `react`, `three`, `@react-three/fiber`, `@react-three/drei`, `framer-motion`, `remotion`, `@remotion/player` versions.

## Steps

### Step 1: Scaffold the app
Run from `d:\project\trimsos_web\`:
```
npx --yes create-next-app@latest web --typescript --tailwind --app --eslint --src-dir --import-alias "@/*" --use-npm --no-turbopack
```
- `--yes` on npx skips the "Ok to install create-next-app?" prompt.
- If any flag is unrecognized by the installed version, drop that flag and re-run.
- If it still prompts interactively, answer: TypeScript=Yes, Tailwind=Yes, ESLint=Yes, `src/` dir=Yes, App Router=Yes, import alias=`@/*`, Turbopack=No.

### Step 2: Install runtime dependencies
```
cd web
npm install three @react-three/fiber @react-three/drei framer-motion remotion @remotion/player
```

### Step 3: Install dev/test dependencies
```
npm install -D vitest @vitejs/plugin-react jsdom @types/three @testing-library/react
```

### Step 4: Verify the clean scaffold builds & lints
```
npm run lint
npm run build
```
Expected: both succeed. Warnings are OK; errors are not.

### Step 5: SKIP (no git) — do not commit.

## Report back (to your report file, then a <15 line summary)
- Top-level files/dirs created under `web/`.
- `npm ls next react tailwindcss three @react-three/fiber @react-three/drei framer-motion remotion @remotion/player` output (versions).
- **Tailwind major version: v3 or v4** (check `web/package.json` `devDependencies.tailwindcss`).
- `npm run lint` result (pass/fail + any output).
- `npm run build` result (pass/fail + any output).
- Any deviation from the steps above and why.
