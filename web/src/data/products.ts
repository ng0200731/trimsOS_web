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
  tagline: "One chain, end to end.",
  subtitle:
    "Four products, one unbroken chain — orchestrated across a worldwide supplier & factory network.",
  steps: [
    {
      id: "dais",
      label: "Design",
      tool: "DAIS",
      desc: "Catalog, tag & reverse-search every trim from a single photo.",
    },
    {
      id: "clab",
      label: "Produce",
      tool: "CLAB",
      desc: "Turn Illustrator layouts into print-ready care labels in one click.",
    },
    {
      id: "ai-qc",
      label: "Inspect",
      tool: "AI QC",
      desc: "Camera vision flags every defect on the line, in real time.",
    },
    {
      id: "eco-crm",
      label: "Sell & Track",
      tool: "ECO-CRM",
      desc: "Quote, source, order and QR-track each order all the way to delivery.",
    },
  ],
  network: {
    label: "Worldwide supplier & factory network",
    note: "Sourcing & production across the world's major apparel hubs.",
    // Real garment-producing hubs (lat/lng) — illustrative of global reach.
    hubs: [
      { name: "Bangladesh", lat: 23.81, lng: 90.41 },
      { name: "China", lat: 31.23, lng: 121.47 },
      { name: "Vietnam", lat: 10.82, lng: 106.63 },
      { name: "Turkey", lat: 41.01, lng: 28.98 },
      { name: "India", lat: 28.61, lng: 77.21 },
      { name: "Cambodia", lat: 11.56, lng: 104.93 },
      { name: "Indonesia", lat: -6.21, lng: 106.85 },
    ],
    // Goods-flow arcs (pairs of hub names) drawn on the globe.
    arcs: [
      ["China", "Bangladesh"],
      ["China", "Vietnam"],
      ["China", "India"],
      ["China", "Turkey"],
      ["China", "Cambodia"],
      ["China", "Indonesia"],
      ["India", "Turkey"],
      ["Vietnam", "Cambodia"],
      ["Bangladesh", "India"],
      ["Indonesia", "Vietnam"],
    ],
  },
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
