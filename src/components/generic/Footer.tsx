"use client";

import Image from "next/image";
import Logo from "@/assets/logo/ATM-logo.png";
import { SITE } from "@/utility/site";
import { whatsappLink } from "@/utility/enquiry";

const COLUMNS: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}[] = [
  {
    title: "The chain",
    links: [
      { label: "Port Blair", href: "/#islands" },
      { label: "Ross Island", href: "/#islands" },
      { label: "Baratang", href: "/#islands" },
      { label: "Havelock", href: "/#islands" },
      { label: "Neil Island", href: "/#islands" },
    ],
  },
  {
    title: "Plan",
    links: [
      { label: "Packages & itineraries", href: "/#packages" },
      { label: "Before you sail", href: "/#practical" },
      { label: "Who we are", href: "/#aboutus" },
      { label: "Reviews", href: "/#reviews" },
    ],
  },
  {
    title: "Reach us",
    links: [
      { label: SITE.phone.display, href: SITE.phone.href },
      { label: SITE.email.display, href: SITE.email.href },
      {
        label: "WhatsApp a planner",
        href: whatsappLink({
          message: "Hi — I would like a quote for an Andaman trip.",
        }),
        external: true,
      },
      { label: "Partner dashboard", href: SITE.dashboard, external: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-foam/10 bg-ink text-foam">
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 w-full opacity-[0.14]"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 120C180 180 360 60 540 100C720 140 900 40 1080 90C1260 140 1350 90 1440 110V220H0Z"
          fill="url(#footer-sea)"
        />
        <defs>
          <linearGradient id="footer-sea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#57cfc6" />
            <stop offset="100%" stopColor="#0c5468" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="shell relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-full bg-foam ring-1 ring-foam/20">
                <Image
                  src={Logo}
                  alt=""
                  width={44}
                  height={44}
                  className="size-full object-cover object-top"
                />
              </span>
              <span>
                <span className="font-display block text-[1.125rem] leading-tight">
                  {SITE.name}
                </span>
                <span className="eyebrow block text-[0.5625rem] text-reef/70">
                  {SITE.tagline}
                </span>
              </span>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-foam/55">
              A Port Blair operator building Andaman itineraries around the real
              ferry timetable. {SITE.hours}.
            </p>

            <p className="mt-5 flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-foam/40">
              <span className="h-px w-6 bg-coral" />
              {SITE.coords}
            </p>
          </div>

          <nav aria-label="Footer" className="grid gap-8 sm:grid-cols-3">
            {COLUMNS.map((column) => (
              <div key={column.title}>
                <h2 className="eyebrow text-[0.5625rem] text-reef">{column.title}</h2>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        {...(link.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : null)}
                        className="text-foam/65 underline-offset-4 transition-colors duration-200 hover:text-ember hover:underline"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-foam/10 pt-6 text-xs text-foam/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {SITE.name}. Routes drawn to
            schedule, not to scale.
          </p>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em]">
            Made with love by{" "}
            <span className="text-foam/75">justaquib</span>
          </p>
        </div>

        {/* The basemap licences ask for a visible credit, so it lives here as a
            colophon rather than over the chart itself. */}
        <p className="mt-5 max-w-3xl font-mono text-[0.625rem] leading-relaxed tracking-[0.06em] text-foam/45">
          Chart map data &copy; OpenStreetMap contributors, tiles &copy;
          OpenMapTiles, served by OpenFreeMap. Aerial view imagery &copy; Esri,
          Maxar, Earthstar Geographics.
        </p>
      </div>
    </footer>
  );
}
