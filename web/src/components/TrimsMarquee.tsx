import { Marquee } from "./primitives";

// The vocabulary of garment trims — the raw material trimsOS orchestrates.
const trims = [
  "Buttons",
  "Zippers",
  "Care Labels",
  "Woven Labels",
  "Hang Tags",
  "Sewing Thread",
  "Elastic",
  "Lace",
  "Rivets",
  "Eyelets",
  "Hook & Eye",
  "Drawcords",
  "Interlining",
  "QR Codes",
  "Barcodes",
  "Snap Fasteners",
];

export default function TrimsMarquee() {
  return (
    <div className="marquee-pause relative overflow-hidden border-y border-grey-100 bg-paper py-7">
      <Marquee items={trims} />
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-paper to-transparent md:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-paper to-transparent md:w-32" />
    </div>
  );
}
