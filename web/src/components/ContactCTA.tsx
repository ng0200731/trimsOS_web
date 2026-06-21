"use client";
import { useState } from "react";
import { Container, Section } from "./primitives";
import { contact } from "@/data/products";

export default function ContactCTA() {
  const [sent, setSent] = useState(false);
  return (
    <Section id="contact" className="border-t border-grey-100">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
              Book a demo.
            </h2>
            <p className="mt-4 max-w-md text-grey-600">
              See the full trimsOS suite on your own products. We&apos;ll walk you
              through design, production, QC, and tracking.
            </p>
            <p className="mt-8 text-sm text-grey-500">
              Or email{" "}
              <a className="text-ink underline" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </p>
          </div>
          {sent ? (
            <div className="flex items-center justify-center rounded-2xl border border-grey-200 bg-grey-50 p-10 text-center">
              <p className="text-grey-700">
                Thanks — we&apos;ll be in touch within one business day.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="rounded-2xl border border-grey-200 p-6 md:p-8"
            >
              <div className="grid gap-4">
                <label className="text-sm">
                  <span className="mb-1 block text-grey-600">Name</span>
                  <input
                    required
                    className="w-full rounded-lg border border-grey-300 bg-paper px-3 py-2 text-ink"
                  />
                </label>
                <label className="text-sm">
                  <span className="mb-1 block text-grey-600">Work email</span>
                  <input
                    required
                    type="email"
                    className="w-full rounded-lg border border-grey-300 bg-paper px-3 py-2 text-ink"
                  />
                </label>
                <label className="text-sm">
                  <span className="mb-1 block text-grey-600">Company</span>
                  <input className="w-full rounded-lg border border-grey-300 bg-paper px-3 py-2 text-ink" />
                </label>
                <button
                  type="submit"
                  className="mt-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-90"
                >
                  Request demo
                </button>
              </div>
            </form>
          )}
        </div>
      </Container>
    </Section>
  );
}
