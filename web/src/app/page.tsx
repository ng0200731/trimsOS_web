import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import ProductSection from "@/components/ProductSection";
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
      <main>
        <Hero />
        <ProductGrid />

        {products.map((p, i) => (
          <ProductSection key={p.id} product={p} index={i} />
        ))}

        {/* Signature moment #2: Global Supply Chain 3D */}
        <Section id={globalSupplyChain.id} className="border-t border-grey-100">
          <Container>
            <SectionHeading
              kicker="Global Supply Chain"
              title={globalSupplyChain.tagline}
            />
            <div className="mt-12">
              <SupplyChain3D />
            </div>
          </Container>
        </Section>

        {/* Signature moment #3: Remotion explainer */}
        <Section className="border-t border-grey-100">
          <Container>
            <SectionHeading
              kicker="How it works"
              title="From design to delivered order."
            />
            <div className="mt-12">
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
