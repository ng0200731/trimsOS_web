import { products, globalSupplyChain } from "@/data/products";
import { Container, Section, SectionHeading, Reveal } from "./primitives";

const cards = [
  ...products.map((p) => ({
    href: `#${p.id}`,
    name: p.name,
    sub: p.acronym,
    tagline: p.tagline,
  })),
  {
    href: `#${globalSupplyChain.id}`,
    name: globalSupplyChain.name,
    sub: "Orchestration",
    tagline: globalSupplyChain.tagline,
  },
];

export default function ProductGrid() {
  return (
    <Section id="suite" className="border-t border-grey-100">
      <Container>
        <SectionHeading
          kicker="The suite"
          title="One system. Five products."
          subtitle="Everything a garment-trims operation needs, from the first design to the shipped order."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-grey-200 bg-grey-200 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.href} delay={i * 0.05}>
              <a
                href={c.href}
                className="flex h-full flex-col bg-paper p-8 transition-colors hover:bg-grey-50"
              >
                <div className="flex items-baseline gap-2">
                  <h3 className="text-xl font-semibold">{c.name}</h3>
                  <span className="text-xs uppercase tracking-wider text-grey-400">
                    {c.sub}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-grey-600">
                  {c.tagline}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
