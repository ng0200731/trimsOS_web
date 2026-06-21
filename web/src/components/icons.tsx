import type { SVGProps } from "react";

/**
 * Shared line-art icon set.
 * - One visual language: 24×24 viewBox, stroke = currentColor, width 1.5,
 *   round caps/joins, no fills. Matches the B&W minimal aesthetic.
 * - Decorative by default (aria-hidden). Pass aria-label when an icon
 *   conveys meaning on its own.
 */
type IconProps = SVGProps<SVGSVGElement>;

function base(props: IconProps) {
  return {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...props,
  };
}

export function Search(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

/** Care-label / hang-tag — the core garment-trim motif. */
export function Tag(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 11.5V20a1 1 0 0 0 1 1h8.5l9.2-9.2a1.4 1.4 0 0 0 0-2L13.2 1.3a1.4 1.4 0 0 0-2 0L3 9.5" />
      <circle cx="7.5" cy="7.5" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Scan / viewfinder + scanline — AI QC camera inspection. */
export function Scan(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" />
      <path d="M4 12h16" />
    </svg>
  );
}

/** Dashboard / analytics grid — ECO-CRM. */
export function Dashboard(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
    </svg>
  );
}

/** Linked chain — "integrated by design". */
export function Chain(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 0 1 0 10h-2M8 12h8" />
    </svg>
  );
}

/** Factory — "built for the factory floor". */
export function Factory(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 21h18M5 21V9l6 4V9l6 4V5a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3" />
      <path d="M9 13h.01M9 17h.01" />
    </svg>
  );
}

/** Bolt / zap — "professional & fast". */
export function Bolt(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M13 2 4.5 13.2a.6.6 0 0 0 .5 1H11l-1 7.8 8.5-11.2a.6.6 0 0 0-.5-1H12z" />
    </svg>
  );
}

/** Pencil — Design stage. */
export function Pencil(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" />
    </svg>
  );
}

/** Check badge — Inspect stage / verified. */
export function CheckBadge(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m9.5 12 1.8 1.8 3.7-3.8" />
      <path d="M9.3 3.6a2 2 0 0 1 1.4-1.1 2 2 0 0 1 2 .8 2 2 0 0 0 1.7.6 2 2 0 0 1 1.9 1.3 2 2 0 0 0 1.1 1.4 2 2 0 0 1 .8 2.2 2 2 0 0 0 .1 1.8 2 2 0 0 1-.6 2.3 2 2 0 0 0-.5 1.7 2 2 0 0 1-1.6 1.7 2 2 0 0 0-1.4 1.1 2 2 0 0 1-2.2.8 2 2 0 0 0-1.8.1 2 2 0 0 1-2.3-.6 2 2 0 0 0-1.7-.5 2 2 0 0 1-1.7-1.6 2 2 0 0 0-1.1-1.4 2 2 0 0 1-.8-2.2 2 2 0 0 0-.1-1.8 2 2 0 0 1 .6-2.3 2 2 0 0 0 .5-1.7 2 2 0 0 1 1.6-1.7 2 2 0 0 0 1.4-1.1z" />
    </svg>
  );
}

/** Truck / delivery — Sell & Track, delivered order. */
export function Truck(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 6a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v11H3z" />
      <path d="M14 9h3.5a1 1 0 0 1 .9.5L21 13v4h-7" />
      <circle cx="7" cy="18.5" r="1.8" />
      <circle cx="17" cy="18.5" r="1.8" />
    </svg>
  );
}

/** QR code — factory-floor tracking. */
export function QrCode(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3M21 14v.01M14 21h3M21 17v4" />
    </svg>
  );
}

/** Globe — worldwide supplier & factory network. */
export function Globe(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" />
    </svg>
  );
}

/** Up-right arrow — card affordance. */
export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

/** Check — feature marker. */
export function Check(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/** Button — the quintessential garment trim (hero motif). */
export function Button(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="9.5" cy="10.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="10.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="13.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="13.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
