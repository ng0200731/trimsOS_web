"use client";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { VIVID, GREY } from "./palette";

const FPS = 30;
export const ECO_CRM_PROPS = { fps: FPS, durationInFrames: 180, width: 1200, height: 800 };

const BARS = [60, 80, 100, 120, 110, 140, 125, 155];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
const ORDERS = [
  { id: "#1042", name: "Care labels · 5k", stage: "QC" },
  { id: "#1041", name: "Hang tags · 12k", stage: "Sew" },
  { id: "#1040", name: "Woven · 3k", stage: "Done" },
  { id: "#1039", name: "Stickers · 30k", stage: "Cut" },
];

export const EcoCrmComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const D = ECO_CRM_PROPS.durationInFrames;

  // KPI count-ups (staggered).
  const quotes = Math.round(interpolate(frame, [0, 60], [0, 24], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const orders = Math.round(interpolate(frame, [8, 68], [0, 86], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const revenue = Math.round(interpolate(frame, [16, 76], [0, 128], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const ontime = Math.round(interpolate(frame, [24, 84], [0, 96], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const litDots = Math.floor((frame / D) * ORDERS.length * 4);

  const kpis = [
    { label: "OPEN QUOTES", val: `${quotes}`, color: VIVID[5] },
    { label: "ACTIVE ORDERS", val: `${orders}`, color: VIVID[1] },
    { label: "REVENUE / QTR", val: `$${revenue}k`, color: VIVID[2] },
    { label: "ON-TIME", val: `${ontime}%`, color: VIVID[3] },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: GREY.paper }}>
      <svg viewBox="0 0 1200 800" width="100%" height="100%" fontFamily="Inter, ui-sans-serif, system-ui, sans-serif">
        {/* chrome */}
        <rect width={1200} height={800} fill={GREY.paper} />
        <rect x={60} y={60} width={1080} height={680} rx={16} fill={GREY.paper} stroke={GREY.line} strokeWidth={1.5} />
        <path d="M76 60 H1124 a16 16 0 0 1 16 16 V112 H60 V76 a16 16 0 0 1 16 -16 Z" fill={GREY.ink} />
        <line x1={60} y1={112} x2={1140} y2={112} stroke={GREY.ink} strokeWidth={1.5} />
        <circle cx={92} cy={86} r={5} fill="#525252" />
        <circle cx={112} cy={86} r={5} fill="#525252" />
        <circle cx={132} cy={86} r={5} fill="#525252" />
        <text x={600} y={91} textAnchor="middle" fontSize={14} fill="#ffffff" fontWeight={600}>
          ECO-CRM — Orders &amp; Production
        </text>

        {/* KPI cards (count-up, vivid) */}
        {kpis.map((k, i) => {
          const x = [100, 360, 620, 880][i];
          const w = [240, 240, 240, 220][i];
          return (
            <g key={k.label}>
              <rect x={x} y={140} width={w} height={90} rx={10} fill={GREY.paper} stroke={GREY.line} />
              <text x={x + 18} y={168} fontSize={12} fill={GREY.light} fontWeight={600} letterSpacing={0.5}>
                {k.label}
              </text>
              <text x={x + 18} y={206} fontSize={30} fontWeight={600} fill={k.color}>
                {k.val}
              </text>
            </g>
          );
        })}

        {/* chart panel */}
        <rect x={100} y={250} width={680} height={410} rx={12} fill={GREY.paper} stroke={GREY.line} />
        <text x={124} y={288} fontSize={13} fontWeight={600} fill={GREY.ink}>
          Orders this quarter
        </text>
        <text x={124} y={308} fontSize={12} fill={GREY.light}>
          care labels shipped by month
        </text>
        {BARS.map((target, i) => {
          const start = 10 + i * 8;
          const h = interpolate(frame, [start, start + 50], [0, target], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const x = 150 + i * 75;
          return <rect key={i} x={x} y={620 - h} width={50} height={h} rx={3} fill={VIVID[i % VIVID.length]} />;
        })}
        <line x1={150} y1={624} x2={725} y2={624} stroke={GREY.line} />
        {MONTHS.map((m, i) => (
          <text key={m} x={175 + i * 75} y={644} fontSize={11} fill={GREY.light} textAnchor="middle">
            {m}
          </text>
        ))}

        {/* factory floor panel */}
        <rect x={800} y={250} width={300} height={410} rx={12} fill={GREY.paper} stroke={GREY.line} />
        <text x={824} y={288} fontSize={13} fontWeight={600} fill={GREY.ink}>
          Factory floor
        </text>
        <text x={824} y={308} fontSize={12} fill={GREY.light}>
          QR-tracked, live
        </text>
        {ORDERS.map((o, r) => {
          const y = 340 + r * 72;
          return (
            <g key={o.id}>
              <line x1={824} y1={y - 14} x2={1076} y2={y - 14} stroke="#f2f2f2" />
              <text x={824} y={y + 4} fontSize={13} fontWeight={600} fill={GREY.ink}>
                {o.id}
              </text>
              <text x={864} y={y + 4} fontSize={11} fill={GREY.light}>
                {o.name}
              </text>
              {[0, 1, 2, 3].map((d) => {
                const idx = r * 4 + d;
                const isLit = idx < litDots;
                return (
                  <circle
                    key={d}
                    cx={828 + d * 24}
                    cy={y + 26}
                    r={4}
                    fill={isLit ? VIVID[idx % VIVID.length] : "none"}
                    stroke={isLit ? "none" : GREY.rule}
                    strokeWidth={1.5}
                  />
                );
              })}
              <text x={930} y={y + 30} fontSize={10} fill={GREY.text}>
                {o.stage}
              </text>
            </g>
          );
        })}
        <line x1={824} y1={618} x2={1076} y2={618} stroke={GREY.line} />
        <text x={824} y={642} fontSize={11} fill={GREY.light}>
          Stages: Cut → Sew → QC → Pack
        </text>
      </svg>
    </AbsoluteFill>
  );
};
