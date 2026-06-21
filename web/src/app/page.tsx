import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrimsMarquee from "@/components/TrimsMarquee";
import StatsBand from "@/components/StatsBand";
import ProductGrid from "@/components/ProductGrid";
import ProductSection from "@/components/ProductSection";
import Statement from "@/components/Statement";
import SupplyChain3D from "@/components/SupplyChain3D";
import RemotionExplainer from "@/components/RemotionExplainer";
import ValueProps from "@/components/ValueProps";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import { products, globalSupplyChain } from "@/data/products";
import { Container, Section, SectionHeading } from "@/components/primitives";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="overflow-x-clip">
        <Hero />
        <TrimsMarquee />
        <StatsBand />

        <ProductGrid />

        {products.map((p, i) => (
          <ProductSection key={p.id} product={p} index={i} />
        ))}

        <Statement />

        {/* Global Supply Chain */}
        <Section
          id={globalSupplyChain.id}
          className="border-t border-grey-100"
        >
          <Container>
            <SectionHeading
              kicker="Global Supply Chain"
              title={globalSupplyChain.tagline}
              subtitle={globalSupplyChain.subtitle}
            />
            <div className="mt-12">
              <SupplyChain3D />
            </div>
          </Container>
        </Section>

        {/* How it works */}
        <Section className="border-t border-grey-100">
          <Container>
            <SectionHeading
              kicker="How it works"
              title="From design to delivered order."
              subtitle="Follow a single order through the whole chain — every stage ships a real deliverable."
            />
            <div className="mt-14">
              <RemotionExplainer />
            </div>
          </Container>
        </Section>

        <ValueProps />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
