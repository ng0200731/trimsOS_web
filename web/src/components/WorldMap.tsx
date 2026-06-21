"use client";
import { useEffect, useRef, useState } from "react";
import { select } from "d3-selection";
import { zoom, zoomIdentity } from "d3-zoom";
import { motion, useScroll, useMotionValueEvent, useInView } from "framer-motion";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import landTopo from "world-atlas/land-110m.json";
import { globalSupplyChain } from "@/data/products";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useScrollIdle } from "@/lib/useScrollIdle";

const W = 1000;
const H = 520;
const DWELL_STEP_MS = 700;

const hubs = globalSupplyChain.network.hubs;
const hubByName = new Map(hubs.map((h) => [h.name, h]));

type Arc = { key: string; d: string };

// Project the FULL world once. The map opens zoomed/centered on the hubs
// (so the empty Americas aren't shown initially), and the user can drag-pan
// and ctrl+scroll / pinch-zoom to browse any region.
const geometry = (() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const topo = landTopo as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const land: any = feature(topo, topo.objects.land);
  const projection = geoNaturalEarth1().fitExtent(
    [
      [2, 2],
      [W - 2, H - 2],
    ],
    land,
  );
  const path = geoPath(projection);
  const landPath = path(land) ?? "";
  const bounds = path.bounds(land); // [[x0,y0],[x1,y1]] — pannable world extent

  const project = (lng: number, lat: number): [number, number] => {
    const p = projection([lng, lat]);
    return p ? [p[0], p[1]] : [0, 0];
  };

  const arcs: Arc[] = globalSupplyChain.network.arcs
    .map(([from, to]) => {
      const a = hubByName.get(from);
      const b = hubByName.get(to);
      if (!a || !b) return null;
      const [ax, ay] = project(a.lng, a.lat);
      const [bx, by] = project(b.lng, b.lat);
      const cx = (ax + bx) / 2;
      const cy = (ay + by) / 2 - Math.hypot(bx - ax, by - ay) * 0.28;
      return { key: `${from}-${to}`, d: `M ${ax} ${ay} Q ${cx} ${cy} ${bx} ${by}` };
    })
    .filter((x): x is Arc => x !== null);

  const hubPoints = hubs.map((h) => {
    const [x, y] = project(h.lng, h.lat);
    return { name: h.name, x, y };
  });

  // Initial view: zoom + center on the hubs.
  const xs = hubPoints.map((h) => h.x);
  const ys = hubPoints.map((h) => h.y);
  const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
  const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
  const hubW = Math.max(1, Math.max(...xs) - Math.min(...xs));
  const hubH = Math.max(1, Math.max(...ys) - Math.min(...ys));
  const k = Math.min(8, Math.max(1, Math.min(W / (hubW * 1.45), H / (hubH * 1.45))));
  const initial = { x: W / 2 - k * cx, y: H / 2 - k * cy, k };

  return { landPath, arcs, hubPoints, bounds, initial };
})();

/**
 * Flat 2D world map of the supplier & factory network.
 *  - opens zoomed/centered on the hubs (Americas out of view)
 *  - drag to pan, ctrl+scroll / pinch to zoom, anywhere in the world
 *  - scroll reveals the flow arcs in sequence; stopping in view enlarges + auto-cycles
 *  - reduced motion -> all arcs static, no autoplay/enlarge (pan/zoom still work)
 */
export default function WorldMap() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { amount: 0.2 });
  const idle = useScrollIdle(250);
  const dwell = inView && idle && !reduced;
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const svgRef = useRef<SVGSVGElement>(null);
  const [grabbing, setGrabbing] = useState(false);
  const [view, setView] = useState({
    x: geometry.initial.x,
    y: geometry.initial.y,
    k: geometry.initial.k,
  });

  const N = geometry.arcs.length;
  const idxFor = (p: number) => Math.max(0, Math.min(N - 1, Math.floor(p * N)));

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (reduced || dwell) return;
    const i = idxFor(p);
    setActive((cur) => (cur === i ? cur : i));
  });

  useEffect(() => {
    if (!dwell) return;
    const t = setInterval(() => setActive((a) => (a + 1) % N), DWELL_STEP_MS);
    return () => clearInterval(t);
  }, [dwell, N]);

  // Attach d3-zoom once: drag pans, ctrl+wheel / pinch zooms. Plain wheel stays
  // page scroll (so the section still scrolls). Clamped to the world bounds.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const z = zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8])
      .translateExtent([geometry.bounds[0], geometry.bounds[1]])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((event: any) => {
        if (event.type === "wheel" && !event.ctrlKey) return false;
        return !event.button;
      })
      .on("start", () => setGrabbing(true))
      .on("end", () => setGrabbing(false))
      .on("zoom", (event) =>
        setView({ x: event.transform.x, y: event.transform.y, k: event.transform.k }),
      );
    const init = zoomIdentity
      .translate(geometry.initial.x, geometry.initial.y)
      .scale(geometry.initial.k);
    select(svg).call(z).call(z.transform, init);
    return () => {
      select(svg).on(".zoom", null);
    };
  }, []);

  const showCount = reduced ? N : active + 1;
  const activeIdx = reduced ? -1 : active;

  return (
    <div ref={ref}>
      <div
        style={{ transformOrigin: "center" }}
        className={`transition-all duration-500 ease-out ${dwell ? "scale-[1.05]" : ""}`}
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className={`h-auto w-full touch-none select-none ${
            grabbing ? "cursor-grabbing" : "cursor-grab"
          }`}
          role="img"
          aria-label="Worldwide supplier and factory network — drag to pan, ctrl+scroll to zoom"
        >
          <defs>
            <marker id="wm-arrow" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={6} markerHeight={6} orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#0a0a0a" />
            </marker>
          </defs>

          <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
            <path d={geometry.landPath} fill="#f2f2f2" stroke="#e2e2e2" strokeWidth={0.8} />

            {geometry.arcs.map((arc, i) => {
              if (i >= showCount) return null;
              const isActive = i === activeIdx;
              return (
                <motion.path
                  key={arc.key}
                  d={arc.d}
                  fill="none"
                  stroke="#0a0a0a"
                  strokeWidth={isActive ? 2 : 1.3}
                  strokeOpacity={isActive ? 1 : 0.55}
                  markerEnd="url(#wm-arrow)"
                  strokeDasharray="3 6"
                  initial={false}
                  animate={reduced ? undefined : { strokeDashoffset: [0, -9] }}
                  transition={reduced ? undefined : { duration: 0.6, repeat: Infinity, ease: "linear" }}
                />
              );
            })}

            {geometry.hubPoints.map((h, i) => {
              const below = i % 2 === 1;
              const ly = below ? h.y + 18 : h.y - 10;
              return (
                <g key={h.name}>
                  {!reduced && (
                    <circle cx={h.x} cy={h.y} r={4.5} fill="none" stroke="#0a0a0a" strokeWidth={1}>
                      <animate attributeName="r" values="4.5;10;4.5" dur="2.4s" repeatCount="indefinite" />
                      <animate attributeName="stroke-opacity" values="0.35;0;0.35" dur="2.4s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <circle cx={h.x} cy={h.y} r={3.5} fill="#0a0a0a" />
                  <text x={h.x} y={ly} textAnchor="middle" fill="#0a0a0a" style={{ fontSize: 13, fontWeight: 500 }}>
                    {h.name}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
      <p className="mt-2 text-center text-xs text-grey-400">
        Drag to pan · ctrl+scroll or pinch to zoom
      </p>
    </div>
  );
}
