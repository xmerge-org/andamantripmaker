import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { Fraunces, Hanken_Grotesk, Azeret_Mono } from "next/font/google";
import { SITE } from "@/utility/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

const azeret = Azeret_Mono({
  subsets: ["latin"],
  variable: "--font-azeret",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "Andaman Trip Maker — Andaman holiday packages, charted from Port Blair",
  description:
    "Honeymoon, adventure, diving and family packages for the Andaman & Nicobar islands. Private catamarans, beachfront stays and guides who have run these reefs for years. Tell us your dates and we will chart the route.",
  keywords: [
    "Andaman trip maker",
    "Andaman tour operator",
    "Havelock Island package",
    "Neil Island",
    "Port Blair holiday package",
    "Andaman honeymoon package",
    "scuba diving Andaman",
  ],
  openGraph: {
    title: "Andaman Trip Maker",
    description:
      "572 islands in the Bay of Bengal. We plan the packages that are worth your week.",
    type: "website",
    locale: "en_IN",
    siteName: "Andaman Trip Maker",
    images: [{ url: "/img/hero-aerial.jpg", width: 1920, height: 1080 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andaman Trip Maker",
    description:
      "572 islands in the Bay of Bengal. We plan the packages that are worth your week.",
    images: ["/img/hero-aerial.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#04202a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${hanken.variable} ${azeret.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
