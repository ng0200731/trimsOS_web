import { Container, Section, SectionHeading, Reveal } from "./primitives";
import { Chain, Factory, Bolt } from "./icons";
import type { ComponentType, SVGProps } from "react";

type Prop = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  body: string;
};

const props: Prop[] = [
  {
    icon: Chain,
    title: "Integrated by design",
    body: "DAIS, CLAB, AI QC and ECO-CRM share one chain — no silos, no double entry.",
  },
  {
    icon: Factory,
    title: "Built for the factory floor",
    body: "QR-tracked production and real-time AI inspection, proven on real lines.",
  },
  {
    icon: Bolt,
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
          {props.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={i * 0.05}>
                <div>
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-grey-200 text-ink">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-grey-600">{p.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
