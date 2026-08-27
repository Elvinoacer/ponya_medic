import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Ponya Medical Centre — Primary & Urgent Care in Mwiki, Kasarani",
  description:
    "KMPDC-licensed Level 2 clinic on Mwiki–Kasarani Road, Nairobi. Outpatient care, maternity, child immunisation, Class B lab and dental — open 7 days, 24/7 emergency line 0722 700 593.",
  keywords: [
    "Ponya Medical Centre",
    "clinic in Mwiki",
    "Kasarani hospital",
    "hospitals in Nairobi",
    "ANC clinic Kasarani",
    "chanjo ya watoto Mwiki",
    "SHA accredited clinic Nairobi",
  ],
  openGraph: {
    title: "Ponya Medical Centre — Mwiki, Kasarani",
    description:
      "Care that heals, close to home. Outpatient, maternity, immunisation, laboratory and dental services on Mwiki–Kasarani Road.",
    images: ["/images/hero.png"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e362d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
