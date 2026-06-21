import { Container, Reveal } from "./primitives";

// Structural, defensible facts about the suite — not invented metrics.
const stats = [
  { n: "4", label: "Integrated products, one suite" },
  { n: "1", label: "Unbroken chain, end to end" },
  { n: "7", label: "Global production hubs" },
  { n: "0", label: "Silos or double entry" },
];

export default function StatsBand() {
  return (
    <section className="border-b border-grey-100">
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:divide-x md:divide-grey-100">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.06}
              className="md:px-8 md:first:pl-0"
            >
              <div className="text-5xl font-semibold tracking-[-0.03em] text-ink md:text-6xl">
                {s.n}
              </div>
              <div className="mt-2 max-w-[12rem] text-sm text-grey-500">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
