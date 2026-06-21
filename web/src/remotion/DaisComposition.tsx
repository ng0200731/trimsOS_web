"use client";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { VIVID, GREY } from "./palette";
import type { ReactElement } from "react";

const FPS = 30;
const SEG = 30; // frames per pattern segment
const PATTERNS = ["Twill", "Herringbone", "Damask", "Woven", "Houndstooth", "Stripes"];
export const DURATION = SEG * PATTERNS.length;

export const DAIS_PROPS = {
  fps: FPS,
  durationInFrames: DURATION,
  width: 1200,
  height: 800,
};

// Each pattern: tile geometry + its own vivid color + caption.
type Pattern = {
  id: string;
  name: string;
  color: string;
  meta: string;
  w: number;
  h: number;
  transform?: string;
  tile: (c: string) => ReactElement;
};

const PAT: Pattern[] = [
  {
    id: "twill",
    name: "Twill",
    color: VIVID[0],
    meta: "Cotton · 2/1",
    w: 10,
    h: 10,
    transform: "rotate(45)",
    tile: (c) => (
      <>
        <rect width={10} height={10} fill={GREY.paper} />
        <line x1={0} y1={0} x2={0} y2={10} stroke={c} strokeWidth={3} />
      </>
    ),
  },
  {
    id: "herring",
    name: "Herringbone",
    color: VIVID[1],
    meta: "Wool · 12gg",
    w: 16,
    h: 16,
    tile: (c) => (
      <>
        <rect width={16} height={16} fill={GREY.paper} />
        <path d="M-2 4 L8 14 L18 4" fill="none" stroke={c} strokeWidth={2} />
        <path d="M-2 12 L8 2 L18 12" fill="none" stroke={c} strokeWidth={2} opacity={0.45} />
      </>
    ),
  },
  {
    id: "damask",
    name: "Damask",
    color: VIVID[2],
    meta: "Silk · jacquard",
    w: 48,
    h: 48,
    tile: (c) => (
      <>
        <rect width={48} height={48} fill={GREY.paper} />
        <g fill="none" stroke={c} strokeWidth={1.4}>
          <ellipse cx={24} cy={13} rx={5} ry={8} />
          <ellipse cx={24} cy={35} rx={5} ry={8} />
          <ellipse cx={13} cy={24} rx={8} ry={5} />
          <ellipse cx={35} cy={24} rx={8} ry={5} />
        </g>
        <circle cx={24} cy={24} r={3} fill={c} />
      </>
    ),
  },
  {
    id: "weave",
    name: "Woven",
    color: VIVID[3],
    meta: "Linen · basket",
    w: 20,
    h: 20,
    tile: (c) => (
      <>
        <rect width={20} height={20} fill={GREY.paper} />
        <rect width={10} height={10} fill={c} />
        <rect x={10} y={10} width={10} height={10} fill={c} />
      </>
    ),
  },
  {
    id: "houndstooth",
    name: "Houndstooth",
    color: VIVID[4],
    meta: "Wool · classic",
    w: 16,
    h: 16,
    tile: (c) => (
      <>
        <rect width={16} height={16} fill={GREY.paper} />
        <path d="M0 0 H5 L9 4 L5 8 L9 12 L5 16 H0 Z" fill={c} />
        <path d="M16 16 H11 L7 12 L11 8 L7 4 L11 0 H16 Z" fill={c} />
      </>
    ),
  },
  {
    id: "stripes",
    name: "Stripes",
    color: VIVID[5],
    meta: "Cotton · yarn-dyed",
    w: 18,
    h: 10,
    tile: (c) => (
      <>
        <rect width={9} height={10} fill={c} />
      </>
    ),
  },
];

export const DaisComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const idx = Math.min(PAT.length - 1, Math.floor(frame / SEG));
  const segFrame = frame - idx * SEG;
  const fade =
    idx < PAT.length - 1
      ? interpolate(segFrame, [SEG - 6, SEG], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: GREY.paper }}>
      <svg
        viewBox="0 0 1200 800"
        width="100%"
        height="100%"
        fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
      >
        <defs>
          {PAT.flatMap((p) => [
            <pattern
              key={`${p.id}-bw`}
              id={`p-${p.id}-bw`}
              width={p.w}
              height={p.h}
              patternUnits="userSpaceOnUse"
              patternTransform={p.transform}
            >
              {p.tile(GREY.ink)}
            </pattern>,
            <pattern
              key={`${p.id}-c`}
              id={`p-${p.id}-c`}
              width={p.w}
              height={p.h}
              patternUnits="userSpaceOnUse"
              patternTransform={p.transform}
            >
              {p.tile(p.color)}
            </pattern>,
          ])}
        </defs>

        {/* card chrome */}
        <rect width={1200} height={800} fill={GREY.paper} />
        <rect x={60} y={60} width={1080} height={680} rx={16} fill={GREY.paper} stroke={GREY.line} strokeWidth={1.5} />
        <path d="M76 60 H1124 a16 16 0 0 1 16 16 V112 H60 V76 a16 16 0 0 1 16 -16 Z" fill={GREY.ink} />
        <line x1={60} y1={112} x2={1140} y2={112} stroke={GREY.ink} strokeWidth={1.5} />
        <circle cx={92} cy={86} r={5} fill="#525252" />
        <circle cx={112} cy={86} r={5} fill="#525252" />
        <circle cx={132} cy={86} r={5} fill="#525252" />
        <text x={600} y={91} textAnchor="middle" fontSize={14} fill="#ffffff" fontWeight={600}>
          DAIS — Pattern Library
        </text>

        {/* search bar */}
        <rect x={100} y={140} width={1000} height={44} rx={10} fill={GREY.faint} stroke={GREY.line} />
        <circle cx={124} cy={162} r={7} fill="none" stroke={GREY.light} strokeWidth={1.5} />
        <line x1={130} y1={168} x2={136} y2={174} stroke={GREY.light} strokeWidth={1.5} strokeLinecap="round" />
        <text x={148} y={167} fontSize={13} fill="#bfbfbf">
          Search by pattern, color, or reverse-image…
        </text>

        {/* main swatch (active pattern, vivid) */}
        <g>
          <rect x={100} y={210} width={680} height={400} rx={12} fill={GREY.paper} stroke={GREY.line} strokeWidth={1.5} />
          <rect x={100} y={210} width={680} height={400} rx={12} fill={`url(#p-${PAT[idx].id}-c)`} />
          {fade > 0 && (
            <rect
              x={100}
              y={210}
              width={680}
              height={400}
              rx={12}
              fill={`url(#p-${PAT[idx + 1].id}-c)`}
              opacity={fade}
            />
          )}
          {/* name chip */}
          <rect x={116} y={226} width={150} height={30} rx={7} fill="rgba(10,10,10,0.86)" />
          <text x={128} y={246} fontSize={15} fontWeight={600} fill="#ffffff">
            {PAT[idx].name}
          </text>
        </g>

        {/* thumbnail list (right) */}
        {PAT.map((p, i) => {
          const active = i === idx;
          const y = 210 + i * 70;
          return (
            <g key={p.id}>
              <rect
                x={800}
                y={y}
                width={300}
                height={60}
                rx={8}
                fill={active ? GREY.faint : GREY.paper}
                stroke={active ? GREY.ink : GREY.line}
                strokeWidth={active ? 1.5 : 1}
              />
              <rect
                x={812}
                y={y + 10}
                width={40}
                height={40}
                rx={6}
                fill={`url(#p-${p.id}-${active ? "c" : "bw"})`}
              />
              <text x={864} y={y + 28} fontSize={13} fontWeight={600} fill={GREY.ink}>
                {p.name}
              </text>
              <text x={864} y={y + 44} fontSize={10} fill={GREY.text}>
                {p.meta}
              </text>
            </g>
          );
        })}

        {/* footer hint */}
        <text x={100} y={660} fontSize={12} fill={GREY.text}>
          {PATTERNS.length} patterns · AI reverse-image search · scroll to cycle
        </text>
      </svg>
    </AbsoluteFill>
  );
};
