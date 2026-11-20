export const SITE = {
  name: "Andaman Trip Maker",
  short: "ATM",
  url: "https://andamantripmaker.in",
  tagline: "The Andaman Explorer",
  phone: {
    display: "+91 85830 10020",
    href: "tel:+918583010020",
  },
  whatsapp: {
    href: "https://wa.me/918583010020",
    label: "WhatsApp a planner",
  },
  email: {
    display: "info@andamantripmaker.in",
    href: "mailto:info@andamantripmaker.in",
  },
  hours: "Mon–Sat · 10am to 8pm IST",
  base: "Phoenix Bay, Port Blair",
  coords: "11.6234° N  92.7265° E",
  dashboard: "https://www.aasvana.com/login",
  season: "Oct–May",
} as const;

export const NAV = [
  { label: "Islands", href: "#islands" },
  { label: "Packages", href: "#packages" },
  { label: "Why us", href: "#aboutus" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
] as const;

export const TAG_LABELS: Record<string, string> = {
  all: "All packages",
  honeymoon: "Honeymoon",
  adventure: "Adventure",
  diving: "Diving",
  family: "Family",
  wellness: "Wellness",
  "island-life": "Island life",
};
