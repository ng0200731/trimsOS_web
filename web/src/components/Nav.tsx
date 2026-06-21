"use client";
import { useState } from "react";
import { useSyncExternalStore } from "react";
import { navLinks, contact } from "@/data/products";

function useScrolled(threshold = 8): boolean {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      window.addEventListener("scroll", callback, { passive: true });
      return () => window.removeEventListener("scroll", callback);
    },
    () => typeof window !== "undefined" && window.scrollY > threshold,
    () => false,
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(8);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${
        scrolled
          ? "border-grey-200 bg-paper/80 backdrop-blur"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <a href="#top" className="text-lg font-semibold tracking-tight">
          trimsOS
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-grey-600 transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={contact.demoUrl}
            className="hidden rounded-full bg-ink px-5 py-2 text-sm font-medium text-paper transition-opacity hover:opacity-90 md:inline-block"
          >
            Book a Demo
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-grey-200 bg-paper md:hidden">
          <ul className="mx-auto flex w-full max-w-6xl flex-col px-6 py-4">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm text-grey-700"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={contact.demoUrl}
                onClick={() => setOpen(false)}
                className="mt-2 inline-block rounded-full bg-ink px-5 py-2 text-sm font-medium text-paper"
              >
                Book a Demo
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
