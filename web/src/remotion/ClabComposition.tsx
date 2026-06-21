"use client";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { VIVID, GREY } from "./palette";

const FPS = 30;
export const CLAB_PROPS = { fps: FPS, durationInFrames: 150, width: 1200, height: 800 };

// The care-label artwork, parameterised by colour tokens (B&W base + vivid reveal share it).
function Label({
  text,
  line,
  line2,
  sym,
  bar,
  qr,
}: {
  text: string;
  line: string;
  line2: string;
  sym: string;
  bar: string;
  qr: string;
}) {
  return (
    <g>
      <text x={130} y={206} fontSize={13} fontWeight={600} fill={text} fontFamily="Inter, sans-serif">
        100% COTTON
      </text>
      <rect x={130} y={220} width={220} height={7} rx={2} fill={line} />
      <rect x={130} y={236} width={180} height={7} rx={2} fill={line2} />
      <rect x={130} y={252} width={200} height={7} rx={2} fill={line2} />
      <g fill="none" stroke={sym} strokeWidth={1.5}>
        <circle cx={140} cy={300} r={13} />
        <path d="M133 300 H147" />
        <rect x={166} y={289} width={24} height={22} rx={2} />
        <path d="M170 289 V283 H186 V289" />
        <path d="M212 304 l8 -14 8 14 Z" />
        <path d="M220 300 V292" />
        <circle cx={266} cy={300} r={13} />
        <path d="M259 293 l14 14" />
        <path d="M273 293 l-14 14" />
      </g>
      <g fill={bar}>
        <rect x={130} y={340} width={3} height={60} />
        <rect x={137} y={340} width={2} height={60} />
        <rect x={142} y={340} width={4} height={60} />
        <rect x={149} y={340} width={2} height={60} />
        <rect x={154} y={340} width={3} height={60} />
        <rect x={160} y={340} width={5} height={60} />
        <rect x={168} y={340} width={2} height={60} />
        <rect x={173} y={340} width={3} height={60} />
      </g>
      <g>
        <rect x={400} y={330} width={100} height={100} fill={GREY.paper} stroke={GREY.line} />
        <rect x={410} y={340} width={24} height={24} fill={qr} />
        <rect x={466} y={340} width={24} height={24} fill={qr} />
        <rect x={410} y={396} width={24} height={24} fill={qr} />
        <rect x={416} y={346} width={12} height={12} fill={GREY.paper} />
        <rect x={472} y={346} width={12} height={12} fill={GREY.paper} />
        <rect x={416} y={402} width={12} height={12} fill={GREY.paper} />
      </g>
    </g>
  );
}

export const ClabComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const selW = interpolate(frame, [0, 120, 150], [40, 454, 454], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const selH = interpolate(frame, [0, 120, 150], [20, 160, 160], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const BOX_X = 98;
  const BOX_Y = 194;

  return (
    <AbsoluteFill style={{ backgroundColor: GREY.paper }}>
      <svg viewBox="0 0 1200 800" width="100%" height="100%" fontFamily="Inter, ui-sans-serif, system-ui, sans-serif">
        <defs>
          <clipPath id="clab-reveal">
            <rect x={BOX_X} y={BOX_Y} width={selW} height={selH} />
          </clipPath>
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
          CLAB — Care Label Studio
        </text>

        {/* artboard + B&W label */}
        <rect x={110} y={170} width={430} height={330} rx={6} fill={GREY.paper} stroke={GREY.rule} strokeWidth={1.5} />
        <Label text={GREY.mid} line="#e0e0e0" line2="#e8e8e8" sym={GREY.mid} bar={GREY.dark} qr={GREY.dark} />

        {/* vivid reveal, clipped to the selection box */}
        <g clipPath="url(#clab-reveal)">
          <Label text={VIVID[5]} line={VIVID[5]} line2={VIVID[8]} sym={VIVID[2]} bar={VIVID[0]} qr={VIVID[4]} />
        </g>

        {/* selection box (dashed) + handles */}
        <rect
          x={BOX_X}
          y={BOX_Y}
          width={selW}
          height={selH}
          fill="none"
          stroke={GREY.ink}
          strokeWidth={1.5}
          strokeDasharray="6 4"
        />
        {[
          [BOX_X, BOX_Y],
          [BOX_X + selW, BOX_Y],
          [BOX_X, BOX_Y + selH],
          [BOX_X + selW, BOX_Y + selH],
        ].map(([hx, hy], i) => (
          <rect key={i} x={hx - 6} y={hy - 6} width={12} height={12} fill={GREY.ink} />
        ))}

        {/* right: variable data panel (static) */}
        <text x={610} y={190} fontSize={12} fill={GREY.light} fontWeight={600} letterSpacing={1}>
          VARIABLE DATA
        </text>
        {[
          { y: 206, label: "Brand", w: 160 },
          { y: 258, label: "Size / Material", w: 220 },
          { y: 310, label: "Care copy", w: 300 },
        ].map((f) => (
          <g key={f.label}>
            <rect x={610} y={f.y} width={470} height={42} rx={8} fill={GREY.paper} stroke={GREY.line} />
            <text x={626} y={f.y + 17} fontSize={11} fill={GREY.light}>
              {f.label}
            </text>
            <rect x={626} y={f.y + 24} width={f.w} height={8} rx={2} fill={GREY.mid} />
          </g>
        ))}

        {/* export pills */}
        <rect x={610} y={690} width={100} height={40} rx={20} fill={GREY.ink} />
        <text x={660} y={715} textAnchor="middle" fontSize={13} fill="#ffffff" fontWeight={600}>
          Export .ai
        </text>
        <rect x={722} y={690} width={100} height={40} rx={20} fill={GREY.paper} stroke={GREY.rule} />
        <text x={772} y={715} textAnchor="middle" fontSize={13} fill={GREY.dark} fontWeight={600}>
          Export PDF
        </text>
      </svg>
    </AbsoluteFill>
  );
};
