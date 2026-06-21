/**
 * Hero background: subtle radial glow + faint dot grid for depth. Abstract and
 * premium (no literal illustrations). Static and reduced-motion safe.
 */
export default function HeroBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* radial glow for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(72% 60% at 76% 12%, rgba(10,10,10,0.08), transparent 70%)",
        }}
      />
      {/* faint dot grid */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ededed 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  );
}
