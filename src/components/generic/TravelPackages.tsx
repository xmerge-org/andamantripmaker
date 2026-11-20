"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Star, MessageCircle } from "lucide-react";
import { SectionHead } from "./SectionHead";
import { Reveal } from "./Reveal";
import { Bathymetry } from "./Bathymetry";
import { TAG_LABELS } from "@/utility/site";
import { whatsappLink } from "@/utility/enquiry";
import PACKAGES_JSON from "@/utility/json/packages.json";

export interface Package {
  id: number;
  title: string;
  location: string;
  duration: string;
  people: string;
  price: string;
  originalPrice: string;
  discountPercent: number;
  rating: number;
  tags: string[];
  amenities: string[];
  image: string;
  description: string;
}

const PACKAGES = PACKAGES_JSON as Package[];

const TAGS = [
  "all",
  ...Object.keys(TAG_LABELS).filter(
    (tag) => tag !== "all" && PACKAGES.some((pkg) => pkg.tags.includes(tag)),
  ),
];

const PAGE = 6;

/** The one line that names a package in an enquiry, on WhatsApp or email. */
export const packageLabel = (pkg: Package) =>
  `${pkg.title} (${pkg.duration}, ${pkg.people}) · ${pkg.price}`;

export default function TravelPackages({
  onEnquire,
}: {
  onEnquire: (pkg: Package) => void;
}) {
  const [tag, setTag] = useState("all");
  const [shown, setShown] = useState(PAGE);

  const filtered = useMemo(
    () =>
      tag === "all"
        ? PACKAGES
        : PACKAGES.filter((pkg) => pkg.tags.includes(tag)),
    [tag],
  );

  const visible = filtered.slice(0, shown);

  function selectTag(next: string) {
    setTag(next);
    setShown(PAGE);
  }

  return (
    <section id="packages" className="relative overflow-hidden bg-sand py-24 sm:py-28">
      <Bathymetry
        seed={3}
        rings={5}
        step={150}
        amplitude={26}
        strokeClassName="text-sea/12"
      />

      <div className="shell relative">
        <SectionHead
          eyebrow="Packages"
          title={
            <>
              Twelve itineraries, priced against the{" "}
              <span className="italic text-coral">real ferry timetable</span>.
            </>
          }
          lead="Every quote below already includes the inter-island boats, the permits and the transfers. Pick a theme to narrow it."
          action={
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-soft">
              {filtered.length} packages
            </span>
          }
        />

        <Reveal>
          <div
            role="group"
            aria-label="Filter packages by theme"
            className="mt-10 flex flex-wrap gap-2"
          >
            {TAGS.map((key) => {
              const active = key === tag;
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => selectTag(key)}
                  className={`rounded-full border px-4 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] transition-colors duration-300 ${
                    active
                      ? "border-coral bg-coral text-foam"
                      : "border-ink/15 text-ink-soft hover:border-ink/40 hover:text-ink"
                  }`}
                >
                  {TAG_LABELS[key]}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          key={tag}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((pkg, index) => (
            <Reveal key={pkg.id} delay={Math.min(index, 5) * 0.05}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/8 bg-foam shadow-lift transition-all duration-500 hover:-translate-y-1 hover:shadow-elegant">
                <div className="relative overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    width={1200}
                    height={900}
                    sizes="(min-width: 1024px) 27vw, (min-width: 640px) 45vw, 90vw"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/5 to-transparent" />

                  {pkg.discountPercent > 0 && (
                    <span className="absolute left-4 top-4 rounded-full bg-ember px-2.5 py-1 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-ink">
                      &minus;{pkg.discountPercent}%
                    </span>
                  )}

                  <div className="absolute inset-x-4 bottom-3.5 flex items-center justify-between gap-3 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-foam/90">
                    <span>
                      {pkg.duration} &middot; {pkg.people}
                    </span>
                    <span className="flex items-center gap-1 text-ember">
                      <Star className="size-3 fill-current" />
                      {pkg.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="eyebrow text-[0.5625rem] text-lagoon">
                    {pkg.location}
                  </p>
                  <h3 className="font-display mt-2 line-clamp-2 text-[1.25rem] leading-snug text-ink">
                    {pkg.title}
                  </h3>

                  <ul className="mt-3.5 space-y-1.5 text-sm text-ink-soft">
                    {pkg.amenities.slice(0, 2).map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-[0.5rem] size-1 shrink-0 rounded-full bg-coral/70" />
                        <span>{item}</span>
                      </li>
                    ))}
                    {pkg.amenities.length > 2 && (
                      <li className="pl-[calc(0.5rem+4px)] font-mono text-[0.6875rem] uppercase tracking-wide text-ink-soft/80">
                        +{pkg.amenities.length - 2} more included
                      </li>
                    )}
                  </ul>

                  {/* Wraps rather than squashes: a 3-column card is narrower
                      than the price plus both actions, so the pair drops to
                      its own line instead of overflowing the card. */}
                  <div className="mt-auto flex flex-wrap items-end justify-between gap-x-4 gap-y-3.5 border-t border-ink/10 pt-4">
                    <div className="shrink-0">
                      <span className="font-display block text-[1.5rem] leading-none text-ink">
                        {pkg.price}
                      </span>
                      <span className="mt-1 block text-xs text-ink-soft line-through">
                        {pkg.originalPrice}
                      </span>
                    </div>
                    <div className="flex flex-1 items-center justify-end gap-2">
                      <a
                        href={whatsappLink({ crossing: packageLabel(pkg) })}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Ask about ${pkg.title} on WhatsApp`}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-sea/30 px-3.5 py-2.5 text-sm font-semibold text-sea transition-colors duration-300 hover:border-sea hover:bg-sea/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral sm:flex-none"
                      >
                        <MessageCircle className="size-4" />
                        WhatsApp
                      </a>
                      <button
                        type="button"
                        onClick={() => onEnquire(pkg)}
                        className="flex-1 whitespace-nowrap rounded-full bg-sea px-4 py-2.5 text-sm font-semibold text-foam transition-colors duration-300 hover:bg-coral focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral sm:flex-none"
                      >
                        Enquire
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {shown < filtered.length && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setShown((n) => n + PAGE)}
              className="rounded-full border border-ink/20 px-7 py-3 text-sm font-semibold text-ink transition-colors duration-300 hover:border-coral hover:bg-coral hover:text-foam"
            >
              Show {Math.min(PAGE, filtered.length - shown)} more packages
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
