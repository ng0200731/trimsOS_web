import type { CoreProduct } from "@/data/products";
import { Container, Section, Reveal } from "./primitives";

export default function ProductSection({
  product,
  index,
}: {
  product: CoreProduct;
  index: number;
}) {
  const flip = index % 2 === 1;
  return (
    <Section id={product.id} className="border-t border-grey-100">
      <Container>
        <div
          className={`grid items-center gap-12 lg:grid-cols-2 ${
            flip ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <Reveal>
            <div>
              <div className="flex items-baseline gap-3">
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  {product.name}
                </h2>
                <span className="text-sm uppercase tracking-wider text-grey-400">
                  {product.acronym}
                </span>
              </div>
              <p className="mt-4 text-lg text-grey-700">{product.tagline}</p>
              <p className="mt-4 text-base text-grey-600">{product.description}</p>
              <ul className="mt-8 space-y-3">
                {product.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-grey-700">
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink"
                      aria-hidden
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="aspect-[3/2] overflow-hidden rounded-2xl border border-grey-200 bg-grey-50">
              {/* Local placeholder SVG; swap for a real screenshot later. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={`${product.name} — ${product.acronym}`}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
