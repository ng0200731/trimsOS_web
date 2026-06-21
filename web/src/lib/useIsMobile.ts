"use client";
import { useSyncExternalStore } from "react";

/** True when the viewport is at or below `breakpoint` px. SSR-safe. */
export function useIsMobile(breakpoint = 768): boolean {
  const query = `(max-width: ${breakpoint}px)`;
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined" || !window.matchMedia) return () => {};
      const mq = window.matchMedia(query);
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () =>
      typeof window === "undefined" || !window.matchMedia
        ? false
        : window.matchMedia(query).matches,
    () => false,
  );
}
