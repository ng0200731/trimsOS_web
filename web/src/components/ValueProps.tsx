import { Container, Section, SectionHeading, Reveal } from "./primitives";

const props = [
  {
    title: "Integrated by design",
    body: "DAIS, CLAB, AI QC and ECO-CRM share one chain — no silos, no double entry.",
  },
  {
    title: "Built for the factory floor",
    body: "QR-tracked production and real-time AI inspection, proven on real lines.",
  },
  {
    title: "Professional & fast",
    body: "A clean, minimal interface your team and your customers will respect.",
  },
];

export default function ValueProps() {
  return (
    <Section className="border-t border-grey-100">
      <Container>
        <SectionHeading kicker="Why trimsOS" title="One chain. End to end." />
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {props.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div>
                <div
                  className="mb-4 h-8 w-8 border-t border-l border-ink"
                  aria-hidden
                />
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-grey-600">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
