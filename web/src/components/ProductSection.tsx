import type { CoreProduct } from "@/data/products";
import { Container, Section, Reveal } from "./primitives";
import { Check } from "./icons";
import { ScrubbedPlayer } from "./ScrubbedPlayer";
import { DaisComposition, DAIS_PROPS } from "@/remotion/DaisComposition";
import { ClabComposition, CLAB_PROPS } from "@/remotion/ClabComposition";
import { AiQcComposition, AIQC_PROPS } from "@/remotion/AiQcComposition";
import { EcoCrmComposition, ECO_CRM_PROPS } from "@/remotion/EcoCrmComposition";
import type { ComponentType } from "react";

type CompEntry = {
  C: ComponentType;
  P: { fps: number; durationInFrames: number; width: number; height: number };
  F: number; // reduced-motion static frame
};

// Scroll-scrubbed Remotion composition per product.
const COMPS: Record<string, CompEntry> = {
  dais: { C: DaisComposition, P: DAIS_PROPS, F: 90 },
  clab: { C: ClabComposition, P: CLAB_PROPS, F: 90 },
  "ai-qc": { C: AiQcComposition, P: AIQC_PROPS, F: 90 },
  "eco-crm": { C: EcoCrmComposition, P: ECO_CRM_PROPS, F: 130 },
};

const FRAME =
  "relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-grey-200 bg-paper shadow-[0_40px_80px_-30px_rgba(10,10,10,0.30)]";

export default function ProductSection({
  product,
  index,
}: {
  product: CoreProduct;
  index: number;
}) {
  const flip = index % 2 === 1;
  const comp = COMPS[product.id] ?? COMPS.dais;
  return (
    <Section id={product.id} className="border-t border-grey-100">
      <Container>
        <div
          className={`grid items-center gap-10 lg:grid-cols-12 lg:gap-16 ${
            flip ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <Reveal className="lg:col-span-5">
            <div>
              <div className="flex items-baseline gap-3">
                <h2 className="text-4xl font-semibold tracking-[-0.02em] md:text-5xl">
                  {product.name}
                </h2>
                <span className="text-sm uppercase tracking-wider text-grey-400">
                  {product.acronym}
                </span>
              </div>
              <p className="mt-4 text-lg text-grey-700">{product.tagline}</p>
              <p className="mt-4 text-base text-grey-600">
                {product.description}
              </p>
              <ul className="mt-8 space-y-3.5">
                {product.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-grey-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-paper">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-6 -z-10 rounded-[2rem] bg-grey-100/70 blur-3xl"
              />
              <ScrubbedPlayer
                composition={comp.C}
                compositionProps={comp.P}
                staticFrame={comp.F}
                origin={flip ? "right" : "left"}
                className={FRAME}
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
