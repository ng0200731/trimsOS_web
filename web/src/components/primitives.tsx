"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 ${className}`}>{children}</div>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-24 md:py-32 ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeading({
  kicker,
  title,
  subtitle,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-3xl">
      {kicker && (
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-grey-500">
          {kicker}
        </p>
      )}
      <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.02em] md:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 max-w-2xl text-base text-grey-600 md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/**
 * Scroll-reveal wrapper. Renders children immediately (no animation) when the
 * user prefers reduced motion — foundational accessibility primitive.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function MarqueeRow({
  items,
  ariaHidden,
}: {
  items: string[];
  ariaHidden?: boolean;
}) {
  return (
    <ul aria-hidden={ariaHidden} className="flex w-max shrink-0 items-center">
      {items.map((it, i) => (
        <li key={`${it}-${i}`} className="flex items-center">
          <span className="px-8 text-2xl font-medium tracking-tight text-grey-700 md:text-3xl">
            {it}
          </span>
          <svg
            aria-hidden
            className="h-3 w-3 text-grey-300"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2l1.8 8.2L22 12l-8.2 1.8L12 22l-1.8-8.2L2 12l8.2-1.8z" />
          </svg>
        </li>
      ))}
    </ul>
  );
}

/**
 * Seamless marquee track. Renders the items twice and translates -50% so the
 * loop is invisible. Pure CSS animation — paused on hover via .marquee-pause.
 */
export function Marquee({ items }: { items: string[] }) {
  return (
    <div className="flex w-full overflow-hidden">
      <div className="animate-marquee flex">
        <MarqueeRow items={items} />
        <MarqueeRow items={items} ariaHidden />
      </div>
    </div>
  );
}

/**
 * Translates its contents on scroll for a parallax depth effect. No-op
 * (static) under reduced-motion.
 */
export function Parallax({
  children,
  offset = 40,
  className = "",
}: {
  children: ReactNode;
  offset?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}
