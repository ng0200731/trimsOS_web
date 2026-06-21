"use client";
import { Player } from "@remotion/player";
import { FlowComposition, FLOW_PROPS } from "@/remotion/FlowComposition";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function RemotionExplainer() {
  const reduced = useReducedMotion();
  if (reduced) {
    return (
      <div className="flex aspect-[1280/480] w-full items-center justify-center rounded-2xl border border-grey-200 bg-grey-50">
        <div className="text-center">
          <div className="text-sm uppercase tracking-[0.2em] text-grey-500">
            DAIS → CLAB → AI QC → ECO-CRM
          </div>
          <div className="mt-2 text-2xl font-semibold">
            Design · Produce · Inspect · Sell &amp; Track
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-2xl border border-grey-200">
      <Player
        component={FlowComposition}
        durationInFrames={FLOW_PROPS.durationInFrames}
        fps={FLOW_PROPS.fps}
        compositionWidth={FLOW_PROPS.width}
        compositionHeight={FLOW_PROPS.height}
        style={{ width: "100%" }}
        autoPlay
        loop
        controls={false}
      />
    </div>
  );
}
