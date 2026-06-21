"use client";
import { useEffect, useRef, useState } from "react";
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

// Project the world land outline + hub/arc geometry once at module load.
const geometry = (() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const topo = landTopo as any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const land: any = feature(topo, topo.objects.land);
  // Focus the projection on the hubs' region — otherwise the map is half-empty
  // ocean/Americas with nothing to look at. North headroom keeps the bulging
  // arcs + labels on screen.
  const minLng = Math.min(...hubs.map((h) => h.lng));
  const maxLng = Math.max(...hubs.map((h) => h.lng));
  const minLat = Math.min(...hubs.map((h) => h.lat));
  const maxLat = Math.max(...hubs.map((h) => h.lat));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const bbox: any = {
    type: "Polygon",
    coordinates: [
      [
        [minLng - 14, minLat - 8],
        [maxLng + 14, minLat - 8],
        [maxLng + 14, maxLat + 22],
        [minLng - 14, maxLat + 22],
        [minLng - 14, minLat - 8],
      ],
    ],
  };
  const projection = geoNaturalEarth1().fitExtent(
    [
      [20, 24],
      [W - 20, H - 24],
    ],
    bbox,
  );
  const path = geoPath(projection);
  const landPath = path(land) ?? "";

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

  return { landPath, arcs, hubPoints };
})();

/**
 * Flat 2D world map of the supplier & factory network. Mirrors the chain's
 * scroll/dwell UX: scrolling reveals the flow arcs in sequence (down = play,
 * up = reverse); stopping in view enlarges the map and auto-cycles the arcs.
 * Reduced motion -> all arcs static, no autoplay, no enlarge.
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

  const N = geometry.arcs.length;
  const idxFor = (p: number) => Math.max(0, Math.min(N - 1, Math.floor(p * N)));

  // Scroll-driven reveal (when not dwelling).
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (reduced || dwell) return;
    const i = idxFor(p);
    setActive((cur) => (cur === i ? cur : i));
  });

  // Dwell: auto-advance the reveal left -> right, looping.
  useEffect(() => {
    if (!dwell) return;
    const t = setInterval(() => setActive((a) => (a + 1) % N), DWELL_STEP_MS);
    return () => clearInterval(t);
  }, [dwell, N]);

  const showCount = reduced ? N : active + 1;
  const activeIdx = reduced ? -1 : active;

  return (
    <div ref={ref}>
      <div
        style={{ transformOrigin: "center" }}
        className={`transition-all duration-500 ease-out ${dwell ? "scale-[1.05]" : ""}`}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full"
          role="img"
          aria-label="Worldwide supplier and factory network — goods flowing between hubs"
        >
          <defs>
            <marker
              id="wm-arrow"
              viewBox="0 0 10 10"
              refX={8}
              refY={5}
              markerWidth={6}
              markerHeight={6}
              orient="auto"
            >
              <path d="M0,0 L10,5 L0,10 z" fill="#0a0a0a" />
            </marker>
          </defs>

          {/* land outline */}
          <path d={geometry.landPath} fill="#f2f2f2" stroke="#e2e2e2" strokeWidth={0.8} />

          {/* flow arcs — revealed in sequence; the active arc is emphasised + flowing */}
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
                transition={
                  reduced
                    ? undefined
                    : { duration: 0.6, repeat: Infinity, ease: "linear" }
                }
              />
            );
          })}

          {/* hubs */}
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
                <text
                  x={h.x}
                  y={ly}
                  textAnchor="middle"
                  fill="#0a0a0a"
                  style={{ fontSize: 13, fontWeight: 500 }}
                >
                  {h.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
