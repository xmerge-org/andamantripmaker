"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Bathymetry } from "./Bathymetry";
import { SITE } from "@/utility/site";
import { whatsappLink } from "@/utility/enquiry";
import { cn } from "@/lib/utils";

const SLIDES = [
  { src: "/img/hero-aerial.jpg", alt: "Aerial view of a palm-fringed Andaman shore at sunset" },
  { src: "/img/hero-crossing.jpg", alt: "Catamaran crossing between the Andaman islands" },
  { src: "/img/hero-reef.jpg", alt: "Light shafts falling on an Andaman coral reef" },
];

const PLATE = [
  { label: "Season", value: "Oct–May · calmest sea" },
  { label: "Base", value: "Phoenix Bay, Port Blair" },
  { label: "Reach", value: "25+ destinations, 5 regular stops" },
  { label: "Travellers", value: "10,000+ and counting" },
];

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const timer = setInterval(
      () => setActive((prev) => (prev + 1) % SLIDES.length),
      6200,
    );
    return () => clearInterval(timer);
  }, [reduced]);

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-foam"
    >
      {SLIDES.map((slide, index) => (
        <div
          key={slide.src}
          aria-hidden={index !== active}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1800ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
            index === active ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="100vw"
            priority={index === 0}
            className={cn(
              "object-cover",
              index === active && !reduced && "animate-drift",
            )}
          />
        </div>
      ))}

      <div className="scrim-hero absolute inset-0" />
      <div className="grain absolute inset-0 opacity-[0.13] mix-blend-overlay" />
      <Bathymetry
        seed={2}
        rings={11}
        step={68}
        amplitude={30}
        strokeClassName="text-reef/20"
        className="opacity-70"
      />

      <div className="shell relative flex flex-1 items-center pt-32 pb-44 lg:pt-36">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-ember" />
            <span className="eyebrow text-reef">{SITE.coords}</span>
          </div>

          <h1 className="font-display mt-6 text-[clamp(2.5rem,6.6vw,5.25rem)] leading-[0.98] font-light tracking-[-0.03em]">
            572 islands in the
            <br />
            Bay of Bengal.
            <span className="mt-3 block text-ember italic">
              You need six of them.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-foam/75 sm:text-lg">
            We run the crossings between them — catamarans, beachfront stays
            and guides who have worked these reefs for years. Send us your
            dates and we will chart the route, then quote it within a day.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#packages"
              className="group inline-flex items-center gap-2.5 rounded-full bg-coral px-7 py-4 text-[0.9375rem] font-semibold text-foam shadow-ember transition-all duration-300 ease-liquid hover:-translate-y-0.5 hover:bg-[#f0603a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
            >
              View packages
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href={whatsappLink({
                message: "Hi — I would like help planning an Andaman trip.",
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-foam/25 px-7 py-4 text-[0.9375rem] font-semibold text-foam transition-colors duration-300 hover:border-reef/60 hover:bg-foam/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-reef"
            >
              <MessageCircle className="size-4" />
              {SITE.whatsapp.label}
            </a>
          </div>
        </div>
      </div>

      {/* Sailing plate — the practical facts a traveller asks for first. */}
      <div className="relative border-t border-foam/12 bg-ink/60 backdrop-blur-md">
        <dl className="shell grid grid-cols-2 gap-x-8 gap-y-5 py-6 sm:grid-cols-4">
          {PLATE.map((item) => (
            <div key={item.label}>
              <dt className="eyebrow text-[0.5625rem] text-reef/70">
                {item.label}
              </dt>
              <dd className="mt-1.5 text-sm leading-snug font-medium text-foam/90">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
