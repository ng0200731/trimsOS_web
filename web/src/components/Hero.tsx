"use client";
import dynamic from "next/dynamic";
import { Container } from "./primitives";

// 3D is lazy and client-only; renders nothing on the server and while loading.
const Hero3D = dynamic(() => import("./Hero3D"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 md:pt-40">
      {/* 3D layer sits behind the text */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <Hero3D />
      </div>

      <Container className="pb-24 md:pb-32">
        <div className="max-w-3xl">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.25em] text-grey-500">
            Garment Trims Operation System
          </p>
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            The operating system for garment trims.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-grey-600 md:text-xl">
            One integrated suite — from first design to delivered order. Design,
            produce, inspect, and track every label across a worldwide supply
            chain.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90"
            >
              Book a Demo
            </a>
            <a
              href="#suite"
              className="rounded-full border border-grey-300 px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-grey-50"
            >
              Explore the suite
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
