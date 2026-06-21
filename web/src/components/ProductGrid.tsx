import { products } from "@/data/products";
import { Container, Section, SectionHeading, Reveal } from "./primitives";
import { Search, Tag, Scan, Dashboard, ArrowUpRight } from "./icons";
import type { ComponentType, SVGProps } from "react";

// Product → line-art icon. Keeps the data module pure (no React imports).
const productIcon: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  dais: Search,
  clab: Tag,
  "ai-qc": Scan,
  "eco-crm": Dashboard,
};

// Asymmetric bento spans (desktop): big–small / small–big rhythm.
const productSpan: Record<string, string> = {
  dais: "lg:col-span-2",
  clab: "",
  "ai-qc": "",
  "eco-crm": "lg:col-span-2",
};

export default function ProductGrid() {
  return (
    <Section id="suite" className="border-t border-grey-100">
      <Container>
        <SectionHeading
          kicker="The suite"
          title="One system. Four products."
          subtitle="Everything a garment-trims operation needs, from the first design to the shipped order."
        />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => {
            const Icon = productIcon[p.id] ?? Search;
            return (
              <Reveal key={p.id} delay={i * 0.06} className={productSpan[p.id]}>
                <a
                  href={`#${p.id}`}
                  className="group relative flex h-full min-h-[15rem] flex-col justify-between overflow-hidden rounded-2xl border border-grey-200 bg-paper p-8 transition-all duration-300 hover:-translate-y-1 hover:border-ink/40 hover:shadow-[0_24px_60px_-28px_rgba(10,10,10,0.28)]"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-grey-200 text-ink transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                      <Icon className="h-5 w-5" />
                    </span>
                    <ArrowUpRight className="h-5 w-5 -translate-x-1 text-grey-300 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-ink group-hover:opacity-100" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-2xl font-semibold tracking-tight">
                        {p.name}
                      </h3>
                      <span className="text-xs uppercase tracking-wider text-grey-400">
                        {p.acronym}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-grey-600 line-clamp-3">
                      {p.tagline}
                    </p>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
