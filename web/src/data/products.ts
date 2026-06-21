// Single source of truth for all marketing-site content.
// Product names + taglines are LOCKED verbatim from the design spec §6.

export type CoreProduct = {
  id: string;
  name: string;
  acronym: string;
  tagline: string; // LOCKED one-liner from spec §6
  description: string;
  features: string[];
  image: string; // placeholder path under /public/products
};

export const products: CoreProduct[] = [
  {
    id: "dais",
    name: "DAIS",
    acronym: "Design AI Studio",
    tagline:
      "Your visual brain for trims: catalog, tag & search thousands of trims and patterns, with AI reverse-image search that finds a match from just a photo.",
    description:
      "A structured image & pattern library with tagging, metadata, projects, and email sharing. Find any trim or pattern in seconds — even from a single reference photo — using perceptual-hash, color, and hybrid AI search.",
    features: [
      "Structured metadata: book, page, row, column, type, material, dimensions",
      "AI reverse-image search (pHash, color, hybrid)",
      "Projects, boards & email sharing with thumbnails",
      "Role-based access with admin approval",
    ],
    image: "/products/dais.svg",
  },
  {
    id: "clab",
    name: "CLAB",
    acronym: "Care Label Laboratory",
    tagline:
      "From Illustrator to production in one click — import layouts, drop in variable data, export print-ready .ai/PDF. No designer needed per order.",
    description:
      "A care-label layout manager that imports Adobe Illustrator JSON or PDF, adds variable-data overlays (text, barcode, QR), and exports production-ready .ai and PDF files with embedded fonts.",
    features: [
      "Import Illustrator JSON & PDF layouts",
      "Variable-data overlays: text, Code128/EAN13/QR",
      "Export print-ready .ai (multi-artboard) & PDF",
      "Font management with live preview",
    ],
    image: "/products/clab.svg",
  },
  {
    id: "ai-qc",
    name: "AI QC",
    acronym: "AI Quality Check",
    tagline:
      "Catch every defect before it ships — point a camera at the line and AI inspects each label in real time.",
    description:
      "Computer-vision inspection for the production line. A camera captures each label and AI flags defects — misprints, misalignment, missing fields — in real time, on real product.",
    features: [
      "Real-time camera inspection on the line",
      "Automatic defect detection & flagging",
      "Validates CLAB-generated layouts against output",
      "Live demo available",
    ],
    image: "/products/ai-qc.svg",
  },
  {
    id: "eco-crm",
    name: "ECO-CRM",
    acronym: "ERP",
    tagline:
      "The whole factory in one screen — emails, quotations, supplier sourcing, orders, and live QR-tracked production.",
    description:
      "The end-to-end sales-to-production ERP: read customer email, build quotations, source from suppliers via a no-login portal, convert wins to orders, and track each order across the factory floor with QR scans.",
    features: [
      "Email (IMAP/SMTP), quotations & supplier outsourcing portal",
      "Orders with QR-code factory-floor tracking",
      "Dashboard with quotation, outsourcing & revenue analytics",
      "Full status audit trail",
    ],
    image: "/products/eco-crm.svg",
  },
];

export const globalSupplyChain = {
  id: "global-supply-chain",
  name: "Global Supply Chain",
  tagline:
    "One chain, end to end: Design (DAIS) → Produce (CLAB) → Inspect (AI QC) → Sell & Track (ECO-CRM), orchestrated across a worldwide supplier & factory network.",
  steps: [
    { id: "dais", label: "Design", tool: "DAIS" },
    { id: "clab", label: "Produce", tool: "CLAB" },
    { id: "ai-qc", label: "Inspect", tool: "AI QC" },
    { id: "eco-crm", label: "Sell & Track", tool: "ECO-CRM" },
  ],
};

export const navLinks = [
  ...products.map((p) => ({ href: `#${p.id}`, label: p.name })),
  { href: "#global-supply-chain", label: "Global Supply Chain" },
];

export const contact = {
  email: "hello@trimsOS.com",
  demoUrl: "#contact",
  domain: "www.trimsOS.com",
};
