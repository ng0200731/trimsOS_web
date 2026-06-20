# Lessons Learned

Capture failure modes, detection signals, and prevention rules after corrections or postmortems. Review at session start and before major refactors.

---

## 2026-06-21 — Don't barrage the user with questions
- **Signal:** User pushed back ("you keep asking me question, let me reply") when I asked multiple open-ended questions in a row.
- **Rule:** Ask **one** focused question per turn with a recommended default (matches this project's `claude.md`). After they dump info, reflect it back; don't immediately ask the next thing. Save project facts to memory so I don't re-ask.

## 2026-06-21 — Naming: "Global Supply Chain", not "Global System Chain"
- **Signal:** User corrected the 5th product name during planning.
- **Rule:** The suite's connective layer is **"Global Supply Chain"** (orchestration across the worldwide supplier/factory network). Use this name everywhere; do not revert to "Global System Chain."
