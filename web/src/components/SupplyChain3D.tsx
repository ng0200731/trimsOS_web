import { globalSupplyChain } from "@/data/products";
import { Reveal } from "./primitives";
import { Pencil, Tag, Scan, Truck, Globe } from "./icons";
import type { ComponentType, SVGProps } from "react";

// Stage → line-art icon. Keeps the data module pure.
const stepIcon: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  dais: Pencil,
  clab: Tag,
  "ai-qc": Scan,
  "eco-crm": Truck,
};

/**
 * Global supply-chain flow. Four numbered stage cards (icon + stage + tool +
 * outcome) on an animated flow rail, plus a worldwide-network band. Static,
 * accessible, consistent with the B&W minimal system — no 3D dependency.
 */
export default function SupplyChain3D() {
  const { steps, network } = globalSupplyChain;

  return (
    <div>
      {/* animated flow rail */}
      <div aria-hidden className="mb-8 h-[2px] w-full flow-line opacity-50" />

      <ol className="grid gap-px overflow-hidden rounded-2xl border border-grey-200 bg-grey-200 md:grid-cols-4">
        {steps.map((s, i) => {
          const Icon = stepIcon[s.id] ?? Pencil;
          return (
            <li key={s.id} className="bg-paper">
              <Reveal delay={i * 0.06}>
                <div className="group flex h-full flex-col gap-4 p-7 transition-colors duration-300 hover:bg-grey-50">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-grey-200 text-ink transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-medium tracking-wider text-grey-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <div className="text-base font-semibold">{s.label}</div>
                    <div className="text-xs uppercase tracking-wider text-grey-400">
                      {s.tool}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-grey-600">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>

      {/* Worldwide network band */}
      <Reveal delay={0.1}>
        <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-grey-200 bg-grey-50 p-7 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-grey-300 text-ink">
              <Globe className="h-5 w-5" />
            </span>
            <div>
              <div className="text-sm font-semibold">{network.label}</div>
              <div className="text-xs text-grey-500">{network.note}</div>
            </div>
          </div>
          <ul className="flex flex-wrap gap-2">
            {network.regions.map((r) => (
              <li
                key={r}
                className="rounded-full border border-grey-200 bg-paper px-3 py-1 text-xs text-grey-600"
              >
                {r}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}
