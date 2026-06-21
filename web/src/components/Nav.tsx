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
      <nav className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6">
        <a
          href="#top"
          className="text-[1.2rem] font-semibold tracking-tight transition-all duration-200 hover:scale-110"
        >
          trimsOS
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative inline-block text-[0.96rem] font-medium text-grey-700 transition-all duration-200 hover:scale-110 hover:text-ink"
              >
                {l.label}
                <span
                  aria-hidden
                  className="absolute -bottom-1.5 left-0 h-[2px] w-full origin-left scale-x-0 bg-ink transition-transform duration-300 ease-out group-hover:scale-x-100"
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={contact.demoUrl}
            className="hidden rounded-full bg-ink px-6 py-2.5 text-[0.96rem] font-medium text-paper transition-opacity hover:opacity-90 md:inline-block"
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
              width="26"
              height="26"
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
                  className="block border-b border-grey-100 py-3.5 text-[0.96rem] text-grey-700 last:border-0"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={contact.demoUrl}
                onClick={() => setOpen(false)}
                className="mt-3 inline-block rounded-full bg-ink px-6 py-2.5 text-[0.96rem] font-medium text-paper"
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
