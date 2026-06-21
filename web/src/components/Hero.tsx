"use client";
import { motion } from "framer-motion";
import { Container } from "./primitives";
import HeroBackground from "./HeroBackground";
import { useReducedMotion } from "@/lib/useReducedMotion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduced = useReducedMotion();
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };
  const item = reduced
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
      };

  return (
    <section id="top" className="relative overflow-hidden pt-36 md:pt-44">
      <HeroBackground />

      <Container className="relative pb-28 md:pb-36">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.p
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-grey-200 bg-paper/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-grey-500 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-ink" /> Garment Trims
            Operation System
          </motion.p>
          <motion.h1
            variants={item}
            className="text-5xl font-semibold leading-[0.98] tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            The operating system for{" "}
            <span className="font-normal italic text-grey-500">
              garment trims.
            </span>
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-7 max-w-xl text-lg text-grey-600 md:text-xl"
          >
            One integrated suite — from first design to delivered order. Design,
            produce, inspect, and track every label across a worldwide supply
            chain.
          </motion.p>
          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#contact"
              className="rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5"
            >
              Book a Demo
            </a>
            <a
              href="#suite"
              className="rounded-full border border-grey-300 px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-grey-50"
            >
              Explore the suite
            </a>
          </motion.div>
        </motion.div>
      </Container>

      <div className="relative flex justify-center pb-10">
        <span className="text-[10px] uppercase tracking-[0.4em] text-grey-400">
          Scroll
        </span>
      </div>
    </section>
  );
}
