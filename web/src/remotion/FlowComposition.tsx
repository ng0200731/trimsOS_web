"use client";
import { AbsoluteFill, Sequence, useCurrentFrame, interpolate } from "remotion";
import { globalSupplyChain } from "@/data/products";

const FPS = 30;
const STEP = 45; // frames per step
export const FLOW_DURATION = STEP * globalSupplyChain.steps.length;
export const FLOW_PROPS = {
  fps: FPS,
  durationInFrames: FLOW_DURATION,
  width: 1280,
  height: 480,
};

function Step({ label, tool }: { label: string; tool: string }) {
  // Inside a <Sequence>, useCurrentFrame() is already sequence-local (0..STEP),
  // so no manual offset is needed.
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 8, STEP - 8, STEP], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [0, 12], [12, 0], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <div style={{ textAlign: "center", color: "#0a0a0a", fontFamily: "Inter, sans-serif" }}>
        <div
          style={{
            fontSize: 18,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#737373",
          }}
        >
          {tool}
        </div>
        <div style={{ fontSize: 64, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 8 }}>
          {label}
        </div>
      </div>
    </AbsoluteFill>
  );
}

export const FlowComposition = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#ffffff" }}>
      {globalSupplyChain.steps.map((s, i) => (
        <Sequence key={s.id} from={i * STEP} durationInFrames={STEP}>
          <Step label={s.label} tool={s.tool} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
