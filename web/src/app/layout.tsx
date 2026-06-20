import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "trimsOS — The operating system for garment trims",
  description:
    "trimsOS is the integrated operating system for garment trims: DAIS, CLAB, AI QC, ECO-CRM and the Global Supply Chain — from first design to delivered order.",
  metadataBase: new URL("https://www.trimsOS.com"),
  openGraph: {
    title: "trimsOS — The operating system for garment trims",
    description: "Design → Produce → Inspect → Sell & Track, end to end.",
    url: "https://www.trimsOS.com",
    siteName: "trimsOS",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-paper text-ink antialiased">{children}</body>
    </html>
  );
}
