"use client";
import { useEffect, useRef } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import { useScroll, useMotionValueEvent, useInView } from "framer-motion";
import type { ComponentType } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useScrollIdle } from "@/lib/useScrollIdle";

type CompProps = {
  fps: number;
  durationInFrames: number;
  width: number;
  height: number;
};

/**
 * Scroll-scrubbed Remotion player with a "dwell" mode:
 *  - scrolling        -> normal size, frame follows scroll (down = forward, up = reverse)
 *  - stopped + in view -> enlarges 10%, border highlights, and AUTO-PLAYS forward (looping)
 *  - scroll resumes    -> shrinks back, returns to scroll-scrub
 *
 * Dwell playback is driven by a manual requestAnimationFrame loop (frame++ and
 * seekTo), so it always keeps moving and loops — independent of Remotion's
 * play()/loop, which proved unreliable here.
 *
 * `origin` is the transform origin so the canvas grows outward, not over text.
 */
export function ScrubbedPlayer({
  composition,
  compositionProps,
  staticFrame,
  origin = "center",
  className = "",
}: {
  composition: ComponentType;
  compositionProps: CompProps;
  staticFrame: number;
  origin?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const playerRef = useRef<PlayerRef>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { amount: 0.05 });
  const idle = useScrollIdle(250);
  const dwell = inView && idle && !reduced;
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
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    player.seekTo(reduced ? staticFrame : frameFor(scrollYProgress.get()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Dwell: auto-play forward, looping. rAF -> seekTo so it never stalls.
  useEffect(() => {
    if (reduced || !dwell) return;
    const total = compositionProps.durationInFrames;
    const fps = compositionProps.fps;
    let frameAcc = playerRef.current?.getCurrentFrame() ?? 0;
    let last = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      frameAcc += ((now - last) / 1000) * fps;
      if (frameAcc >= total) frameAcc -= total;
      playerRef.current?.seekTo(Math.floor(frameAcc));
      last = now;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dwell, reduced]);

  // Scrub on scroll (only when not dwelling / not reduced).
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (reduced || dwell || !inView || !playerRef.current) return;
    playerRef.current.seekTo(frameFor(p));
  });

  return (
    <div
      ref={ref}
      style={{ transformOrigin: origin }}
      className={`${className} transition-all duration-500 ease-out ${
        dwell
          ? "z-30 scale-[1.1] !border-ink !shadow-[0_40px_90px_-32px_rgba(10,10,10,0.40)]"
          : ""
      }`}
    >
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
        acknowledgeRemotionLicense
      />
    </div>
  );
}
