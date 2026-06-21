"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent, useInView } from "framer-motion";
import { globalSupplyChain } from "@/data/products";
import { Reveal } from "./primitives";
import { Pencil, Tag, Scan, Truck, Globe } from "./icons";
import type { ComponentType, SVGProps } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useScrollIdle } from "@/lib/useScrollIdle";
import dynamic from "next/dynamic";

const WorldMap = dynamic(() => import("./WorldMap"), { ssr: false });

// Stage → line-art icon. Keeps the data module pure.
const stepIcon: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  dais: Pencil,
  clab: Tag,
  "ai-qc": Scan,
  "eco-crm": Truck,
};

const N = globalSupplyChain.steps.length;
const DWELL_STEP_MS = 1100; // auto-advance speed while dwelling

/**
 * Global supply-chain flow.
 *  - scrolling      -> highlight follows scroll (01 → 04), reverses on scroll-up
 *  - stopped + in view ("dwell") -> block enlarges 10% and the highlight
 *    auto-cycles left → right through the four boxes
 *  - scroll resumes -> shrinks back to scroll-scrub
 * Static (full chain) under reduced-motion.
 */
export default function SupplyChain3D() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { amount: 0.05 });
  const idle = useScrollIdle(250);
  const dwell = inView && idle && !reduced;
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const idxFor = (p: number) => Math.max(0, Math.min(N - 1, Math.floor(p * N)));

  // Scroll-driven highlight (when not dwelling).
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (reduced || dwell) return;
    const i = idxFor(p);
    setActive((cur) => (cur === i ? cur : i));
  });

  // Dwell: auto-advance the highlight left → right, looping.
  useEffect(() => {
    if (!dwell) return;
    const t = setInterval(() => setActive((a) => (a + 1) % N), DWELL_STEP_MS);
    return () => clearInterval(t);
  }, [dwell]);

  const { steps, network } = globalSupplyChain;
  const fillPct = reduced ? 100 : ((active + 1) / N) * 100;

  return (
    <div ref={ref}>
      <div
        style={{ transformOrigin: "center" }}
        className={`transition-all duration-500 ease-out ${
          dwell ? "z-30 scale-[1.1]" : ""
        }`}
      >
        {/* progress rail — fills toward the active stage */}
        <div className="mb-8 h-1 w-full overflow-hidden rounded-full bg-grey-100">
          <div
            className="h-full rounded-full bg-ink transition-[width] duration-300 ease-out"
            style={{ width: `${fillPct}%` }}
          />
        </div>

        <ol className="grid gap-px overflow-hidden rounded-2xl border border-grey-200 bg-grey-200 md:grid-cols-4">
          {steps.map((s, i) => {
            const Icon = stepIcon[s.id] ?? Pencil;
            const isActive = !reduced && i === active;
            return (
              <li key={s.id} className="bg-paper">
                <div
                  className={`flex h-full flex-col gap-4 p-7 transition-colors duration-300 ${
                    isActive ? "bg-ink text-paper" : "bg-paper text-ink"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-colors duration-300 ${
                        isActive
                          ? "border-paper/30 bg-paper text-ink"
                          : "border-grey-200 text-ink"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span
                      className={`text-xs font-medium tracking-wider transition-colors duration-300 ${
                        isActive ? "text-paper/50" : "text-grey-300"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <div className="text-base font-semibold">{s.label}</div>
                    <div
                      className={`text-xs uppercase tracking-wider transition-colors duration-300 ${
                        isActive ? "text-paper/60" : "text-grey-400"
                      }`}
                    >
                      {s.tool}
                    </div>
                  </div>
                  <p
                    className={`text-sm leading-relaxed transition-colors duration-300 ${
                      isActive ? "text-paper/80" : "text-grey-600"
                    }`}
                  >
                    {s.desc}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Worldwide network — animated 3D globe (goods flowing hub-to-hub) */}
      <Reveal delay={0.1}>
        <div className="mt-8 rounded-2xl border border-grey-200 bg-grey-50 p-5 md:p-7">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-grey-300 bg-paper text-ink">
              <Globe className="h-5 w-5" />
            </span>
            <div>
              <div className="text-sm font-semibold">{network.label}</div>
              <div className="text-xs text-grey-500">{network.note}</div>
            </div>
          </div>
          <WorldMap />
        </div>
      </Reveal>
    </div>
  );
}
