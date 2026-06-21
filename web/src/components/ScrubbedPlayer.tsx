"use client";
import { useLayoutEffect, useRef } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import { useScroll, useMotionValueEvent, useInView } from "framer-motion";
import type { ComponentType } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

type CompProps = {
  fps: number;
  durationInFrames: number;
  width: number;
  height: number;
};

/**
 * Wraps a Remotion <Player> and scrubs it by scroll position:
 *   scroll down  -> frame advances (animation plays forward)
 *   scroll up    -> frame decreases (animation reverses)
 *
 * - Uses Framer Motion's useScroll (change-driven, frame-coalesced) -> playerRef.seekTo.
 * - useInView gates the seek so off-screen players do no work (4 players on the page).
 * - Under prefers-reduced-motion, seeks once to a representative `staticFrame` and never scrubs.
 */
export function ScrubbedPlayer({
  composition,
  compositionProps,
  staticFrame,
  className = "",
}: {
  composition: ComponentType;
  compositionProps: CompProps;
  staticFrame: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const playerRef = useRef<PlayerRef>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { amount: 0.05 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const frameFor = (p: number) =>
    Math.max(
      0,
      Math.min(
        compositionProps.durationInFrames - 1,
        Math.round(p * (compositionProps.durationInFrames - 1)),
      ),
    );

  // Initial paint: match the section's current scroll position (or the static frame).
  useLayoutEffect(() => {
    const f = reduced ? staticFrame : frameFor(scrollYProgress.get());
    playerRef.current?.seekTo(f);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (reduced || !inView || !playerRef.current) return;
    playerRef.current.seekTo(frameFor(p));
  });

  return (
    <div ref={ref} className={className}>
      <Player
        ref={playerRef}
        component={composition}
        durationInFrames={compositionProps.durationInFrames}
        fps={compositionProps.fps}
        compositionWidth={compositionProps.width}
        compositionHeight={compositionProps.height}
        style={{ width: "100%", height: "100%" }}
        controls={false}
        autoPlay={false}
        loop={false}
        acknowledgeRemotionLicense
      />
    </div>
  );
}
