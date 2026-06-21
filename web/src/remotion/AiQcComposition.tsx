"use client";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { VIVID, GREY } from "./palette";

const FPS = 30;
export const AIQC_PROPS = { fps: FPS, durationInFrames: 150, width: 1200, height: 800 };

// Care label drawn inside the camera viewport, parameterised by colour tokens.
function ScanLabel({
  text,
  line,
  sym,
  bar,
  qr,
}: {
  text: string;
  line: string;
  sym: string;
  bar: string;
  qr: string;
}) {
  return (
    <g>
      <text x={334} y={296} fontSize={12} fontWeight={600} fill={text} fontFamily="Inter, sans-serif">
        100% COTTON
      </text>
      <rect x={334} y={305} width={70} height={6} rx={2} fill={line} />
      <rect x={334} y={315} width={90} height={6} rx={2} fill={line} />
      <g fill="none" stroke={sym} strokeWidth={1.5}>
        <circle cx={346} cy={345} r={10} />
        <path d="M340 345 H352" />
      </g>
      <g fill={bar}>
        <rect x={334} y={365} width={2} height={30} />
        <rect x={339} y={365} width={3} height={30} />
        <rect x={344} y={365} width={2} height={30} />
        <rect x={349} y={365} width={4} height={30} />
        <rect x={355} y={365} width={2} height={30} />
        <rect x={360} y={365} width={3} height={30} />
      </g>
      <g>
        <rect x={412} y={365} width={42} height={42} fill={GREY.paper} stroke={GREY.line} />
        <rect x={418} y={371} width={12} height={12} fill={qr} />
        <rect x={440} y={371} width={10} height={10} fill={qr} />
        <rect x={418} y={393} width={10} height={10} fill={qr} />
      </g>
    </g>
  );
}

export const AiQcComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const beamY = interpolate(frame, [10, 130, 150], [200, 640, 640], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: GREY.paper }}>
      <svg viewBox="0 0 1200 800" width="100%" height="100%" fontFamily="Inter, ui-sans-serif, system-ui, sans-serif">
        <defs>
          <clipPath id="aiqc-reveal">
            <rect x={100} y={180} width={600} height={Math.max(0, beamY - 180)} />
          </clipPath>
          <linearGradient id="beam-band" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={VIVID[5]} stopOpacity={0} />
            <stop offset="1" stopColor={VIVID[5]} stopOpacity={0.22} />
          </linearGradient>
        </defs>

        {/* chrome */}
        <rect width={1200} height={800} fill={GREY.paper} />
        <rect x={60} y={60} width={1080} height={680} rx={16} fill={GREY.paper} stroke={GREY.line} strokeWidth={1.5} />
        <path d="M76 60 H1124 a16 16 0 0 1 16 16 V112 H60 V76 a16 16 0 0 1 16 -16 Z" fill={GREY.ink} />
        <line x1={60} y1={112} x2={1140} y2={112} stroke={GREY.ink} strokeWidth={1.5} />
        <circle cx={92} cy={86} r={5} fill="#525252" />
        <circle cx={112} cy={86} r={5} fill="#525252" />
        <circle cx={132} cy={86} r={5} fill="#525252" />
        <text x={600} y={91} textAnchor="middle" fontSize={14} fill="#ffffff" fontWeight={600}>
          AIQC — Real-time Line Inspection
        </text>

        {/* LIVE pill */}
        <rect x={100} y={138} width={66} height={24} rx={12} fill={GREY.ink} />
        <circle cx={116} cy={150} r={4} fill="#ffffff" />
        <text x={128} y={154} fontSize={11} fill="#ffffff" fontWeight={700} letterSpacing={1}>
          LIVE
        </text>

        {/* camera viewport */}
        <rect x={100} y={180} width={600} height={480} rx={12} fill={GREY.faint} stroke={GREY.line} />

        {/* care label (B&W base) */}
        <rect x={320} y={270} width={160} height={200} rx={8} fill={GREY.paper} stroke={GREY.rule} strokeWidth={1.5} />
        <ScanLabel text={GREY.mid} line="#e8e8e8" sym={GREY.mid} bar={GREY.dark} qr={GREY.dark} />

        {/* detection boxes (B&W) */}
        <g fill="none" stroke={GREY.ink} strokeWidth={1.5}>
          <rect x={330} y={361} width={78} height={48} />
          <rect x={408} y={361} width={50} height={50} />
        </g>
        <rect x={324} y={276} width={132} height={36} fill="none" stroke={GREY.ink} strokeWidth={1.5} strokeDasharray="5 4" />

        {/* vivid reveal (clipped above the beam) */}
        <g clipPath="url(#aiqc-reveal)">
          <ScanLabel text={VIVID[5]} line={VIVID[8]} sym={VIVID[2]} bar={VIVID[0]} qr={VIVID[4]} />
          {/* vivid pass badges */}
          <circle cx={330} cy={361} r={9} fill={VIVID[3]} />
          <path d="M326 361 l3 3 l6 -7" fill="none" stroke="#ffffff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={408} cy={361} r={9} fill={VIVID[3]} />
          <path d="M404 361 l3 3 l6 -7" fill="none" stroke="#ffffff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
          {/* vivid flagged badge */}
          <circle cx={324} cy={276} r={9} fill={VIVID[0]} />
          <path d="M321 273 l6 6 M327 273 l-6 6" fill="none" stroke="#ffffff" strokeWidth={1.8} strokeLinecap="round" />
        </g>

        {/* scan beam + band (on top) */}
        <rect x={100} y={beamY - 40} width={600} height={40} fill="url(#beam-band)" />
        <line x1={100} y1={beamY} x2={700} y2={beamY} stroke={VIVID[5]} strokeWidth={2} />

        <text x={120} y={636} fontSize={12} fill={GREY.light}>
          CAM 01 · Care-label line · 60 labels/min
        </text>

        {/* right stats panel (static) */}
        <rect x={720} y={180} width={380} height={480} rx={12} fill={GREY.paper} stroke={GREY.line} />
        <text x={744} y={218} fontSize={12} fill={GREY.light} fontWeight={700} letterSpacing={1}>
          TODAY
        </text>
        <text x={744} y={282} fontSize={46} fontWeight={600} fill={GREY.ink}>
          99.7%
        </text>
        <text x={744} y={308} fontSize={13} fill={GREY.text}>
          pass rate · 4,812 labels scanned
        </text>
        <line x1={744} y1={332} x2={1076} y2={332} stroke={GREY.line} />
        <text x={744} y={368} fontSize={13} fill={GREY.mid}>
          <tspan fontSize={22} fontWeight={600} fill={GREY.ink}>
            14
          </tspan>
          <tspan dx={8}>defects caught</tspan>
        </text>
        <text x={744} y={648} fontSize={12} fill={GREY.text}>
          Validated against CLAB layouts in real time
        </text>
      </svg>
    </AbsoluteFill>
  );
};
