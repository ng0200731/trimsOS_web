import { useEffect, useState } from "react";

/**
 * Returns true when the user has stopped scrolling for `delay` ms.
 * Used to trigger "dwell" states (enlarge + autoplay) on in-view sections.
 */
export function useScrollIdle(delay = 250): boolean {
  const [idle, setIdle] = useState(true);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      setIdle(false);
      clearTimeout(t);
      t = setTimeout(() => setIdle(true), delay);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
    };
  }, [delay]);
  return idle;
}
