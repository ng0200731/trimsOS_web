import { Container } from "./primitives";
import { navLinks, contact } from "@/data/products";

export default function Footer() {
  return (
    <footer className="border-t border-grey-200 py-12">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="text-lg font-semibold tracking-tight">trimsOS</div>
            <div className="mt-1 text-sm text-grey-500">{contact.domain}</div>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-grey-500 hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-8 text-xs text-grey-400">
          © {new Date().getFullYear()} trimsOS. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
