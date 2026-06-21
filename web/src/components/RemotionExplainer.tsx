import { Reveal } from "./primitives";
import { Pencil, Tag, Scan, Truck } from "./icons";
import type { ComponentType, SVGProps } from "react";

type Stage = {
  title: string;
  desc: string;
  deliverable: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

// The order's journey — distinct from the Global Supply Chain's product
// orchestration. Each stage ships a concrete artifact; the final one is the
// payoff ("Delivered order"), emphasised below.
const stages: Stage[] = [
  {
    title: "Design",
    desc: "Start from a photo, sketch or spec sheet — every trim is catalogued and searchable.",
    deliverable: "Searchable trim library",
    Icon: Pencil,
  },
  {
    title: "Produce",
    desc: "Lay out the care label and drop in variable data — brand, size, care copy, codes.",
    deliverable: "Print-ready .ai / PDF",
    Icon: Tag,
  },
  {
    title: "Inspect",
    desc: "Every label is camera-checked on the line; defects are caught before they ship.",
    deliverable: "Zero-defect output",
    Icon: Scan,
  },
  {
    title: "Deliver",
    desc: "Quote, source, produce and ship — each order QR-tracked across the factory floor.",
    deliverable: "Delivered order",
    Icon: Truck,
  },
];

/**
 * Order-journey timeline. Formerly a Remotion video that cycled one word at a
 * time; replaced with a substantive, accessible stepper that shows the real
 * deliverable at each stage.
 */
export default function RemotionExplainer() {
  return (
    <div className="relative">
      {/* horizontal rail behind the nodes (desktop only) */}
      <span
        aria-hidden
        className="absolute left-[12.5%] right-[12.5%] top-9 hidden h-[2px] flow-line opacity-60 md:block"
      />
      <ol className="grid gap-10 md:grid-cols-4 md:gap-0">
        {stages.map((s, i) => {
          const isFinal = i === stages.length - 1;
          return (
            <li key={s.title} className="md:px-3">
              <Reveal delay={i * 0.06}>
                <div className="flex flex-col items-center text-center">
                  <span className="relative z-10 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-grey-200 bg-paper text-ink transition-transform duration-300 hover:scale-105 hover:border-ink">
                    <s.Icon className="h-6 w-6" />
                  </span>
                  <span className="mt-4 text-xs font-medium tracking-[0.15em] text-grey-400">
                    STEP {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 text-base font-semibold">{s.title}</h3>
                  <p className="mt-2 max-w-[15rem] text-sm leading-relaxed text-grey-600">
                    {s.desc}
                  </p>
                  <span
                    className={`mt-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                      isFinal
                        ? "bg-ink text-paper"
                        : "border border-grey-300 text-grey-700"
                    }`}
                  >
                    {s.deliverable}
                  </span>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
