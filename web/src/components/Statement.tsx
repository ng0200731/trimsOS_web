import { Container, Reveal } from "./primitives";

export default function Statement() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      {/* soft highlight for depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 18% 0%, rgba(255,255,255,0.07), transparent 70%)",
        }}
      />
      <Container className="relative py-28 md:py-40">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-grey-400">
            One operating system
          </p>
          <h2 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.02em] md:text-6xl">
            Every button. Every zipper. Every label.{" "}
            <span className="text-grey-500">
              Designed, produced, inspected and tracked in one place.
            </span>
          </h2>
          <div className="mt-10 h-px w-full max-w-sm bg-paper/15" />
          <p className="mt-6 max-w-xl text-base text-grey-400 md:text-lg">
            trimsOS replaces the spreadsheets, siloed apps and email chains that
            run a garment-trims operation today — with one connected suite.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
