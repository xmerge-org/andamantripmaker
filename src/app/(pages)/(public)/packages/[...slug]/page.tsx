"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/generic/Header";
import Footer from "@/components/generic/Footer";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Star,
  UsersRound,
} from "lucide-react";
import PACKAGES_JSON from "@/utility/json/packages.json";
import { TAG_LABELS } from "@/utility/site";
import { whatsappLink } from "@/utility/enquiry";
import "./page.css";

export default function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = use(params);
  const packageSlug = slug.at(-1);
  const trip = PACKAGES_JSON.find(
    (item) => item.link.split("/").at(-1) === packageSlug,
  );

  if (!trip) {
    return (
      <>
        <Header />
        <main className="grid min-h-[70vh] place-items-center bg-sand px-5 pt-28 text-center">
          <div className="max-w-md">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-coral">
              Route not found
            </p>
            <h1 className="mt-3 font-display text-4xl text-ink">
              This island escape has sailed away.
            </h1>
            <Link
              href="/#packages"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-foam transition-colors hover:bg-sea"
            >
              <ArrowLeft className="size-4" />
              Browse all packages
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const category = TAG_LABELS[trip.tags[0]] ?? "Island escape";
  const relatedTrips = PACKAGES_JSON.filter(
    (item) => item.id !== trip.id && item.tags.some((tag) => trip.tags.includes(tag)),
  ).slice(0, 3);

  return (
    <div className="package-page min-h-screen overflow-hidden bg-sand text-ink">
      <Header />
      <main className="pb-20">
      <section className="package-hero relative isolate pt-28 sm:pt-32">
        <div className="shell relative z-10">
          <Link
            href="/#packages"
            className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-foam transition-colors hover:text-ember"
          >
            <ArrowLeft className="size-3.5" />
            All packages
          </Link>

          <div className="grid items-end gap-7 pb-8 pt-8 md:grid-cols-[minmax(0,1fr)_auto] md:pb-10 md:pt-10">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full border border-reef/45 bg-reef/20 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.15em] text-foam">
                  {category}
                </span>
                {trip.discountPercent > 0 && (
                  <span className="rounded-full bg-ember px-3 py-1.5 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-ink">
                    Save {trip.discountPercent}%
                  </span>
                )}
              </div>
              <h1 className="mt-5 max-w-4xl font-display text-[2.5rem] leading-[0.98] tracking-[-0.045em] text-foam sm:text-5xl md:text-6xl lg:text-[4.5rem]">
                {trip.title}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-foam/90">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="size-4 text-ember" /> {trip.location}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Star className="size-4 fill-ember text-ember" />
                  <span className="font-semibold text-foam">{trip.rating.toFixed(1)}</span>
                  <span>guest rating</span>
                </span>
              </div>
            </div>
            <a
              href="#reserve"
              className="hidden items-center gap-2 rounded-full bg-coral px-5 py-3 text-sm font-semibold text-white shadow-ember transition hover:-translate-y-0.5 hover:bg-[#f0603a] md:inline-flex"
            >
              Plan this trip <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>

        <div className="shell relative z-10 pb-10 sm:pb-14">
          <div className="package-cover relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem]">
            <Image
              src={trip.image}
              alt={`${trip.title} in ${trip.location}`}
              width={1800}
              height={1050}
              priority
              sizes="(max-width: 768px) 100vw, 90vw"
              className="h-[20rem] w-full object-cover sm:h-[28rem] lg:h-[35rem]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-ink/10" />
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-5 p-5 text-white sm:p-8 lg:p-10">
              <div>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/80">
                  Your Andaman chapter
                </p>
                <p className="mt-2 max-w-lg font-display text-2xl leading-tight sm:text-3xl">
                  A little further from ordinary.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-ink/40 px-4 py-2 text-xs font-medium text-white backdrop-blur-md">
                <MapPin className="size-3.5 text-ember" /> {trip.location}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="shell relative z-20 -mt-1 pb-12 lg:pb-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_25rem] xl:gap-20">
          <div className="min-w-0">
            <div className="grid grid-cols-3 divide-x divide-ink/10 rounded-2xl border border-ink/8 bg-foam px-2 py-5 shadow-lift sm:px-5 sm:py-6">
              <div className="px-2 sm:px-4">
                <CalendarDays className="size-4 text-coral" />
                <p className="mt-3 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-ink/70">Duration</p>
                <p className="mt-1 font-display text-lg sm:text-xl">{trip.duration}</p>
              </div>
              <div className="px-3 sm:px-5">
                <UsersRound className="size-4 text-coral" />
                <p className="mt-3 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-ink/70">Travellers</p>
                <p className="mt-1 font-display text-lg sm:text-xl">{trip.people}</p>
              </div>
              <div className="px-3 sm:px-5">
                <MapPin className="size-4 text-coral" />
                <p className="mt-3 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-ink/70">Destination</p>
                <p className="mt-1 line-clamp-1 font-display text-lg sm:text-xl">{trip.location.split(",")[0]}</p>
              </div>
            </div>

            <section className="pt-12 sm:pt-16">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-coral">The experience</p>
              <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight tracking-[-0.025em] sm:text-4xl">
                Made for the way you want to travel.
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-8 text-ink/80 sm:text-lg sm:leading-8">
                {trip.description}
              </p>
            </section>

            <section className="mt-12 border-t border-ink/10 pt-10 sm:mt-14 sm:pt-12">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-coral">Thoughtfully included</p>
                  <h2 className="mt-3 font-display text-3xl tracking-[-0.025em] sm:text-4xl">The good things, covered.</h2>
                </div>
                <span className="hidden font-mono text-xs text-ink/60 sm:block">{trip.amenities.length} inclusions</span>
              </div>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {trip.amenities.map((amenity) => (
                  <li key={amenity} className="flex min-h-20 items-start gap-4 rounded-xl border border-ink/8 bg-foam/75 p-4 sm:p-5">
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-reef/15 text-sea">
                      <Check className="size-4" strokeWidth={2.5} />
                    </span>
                    <span className="pt-1 text-sm leading-6 text-ink sm:text-[0.9375rem]">{amenity}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-10 flex items-start gap-4 rounded-2xl border border-sea/10 bg-sea/[0.045] p-5 sm:p-6">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-sea" />
              <div>
                <h3 className="font-semibold text-ink">Planned by island specialists</h3>
                <p className="mt-1 text-sm leading-6 text-ink/70">
                  Have questions about ferry timings, stays, or making this itinerary your own? Talk directly with a local trip planner before you book.
                </p>
              </div>
            </div>
          </div>

          <aside id="reserve" className="scroll-mt-8 lg:sticky lg:top-8 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-ink/10 bg-foam shadow-elegant">
              <div className="border-b border-ink/8 p-6 sm:p-7">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink/60">Your trip, from</p>
                <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display text-4xl tracking-[-0.04em] text-ink">{trip.price}</span>
                  {trip.originalPrice !== trip.price && (
                    <span className="text-sm text-ink-soft line-through">{trip.originalPrice}</span>
                  )}
                </div>
                {trip.discountPercent > 0 && (
                  <p className="mt-2 text-sm font-medium text-sea">{trip.discountPercent}% off the listed price</p>
                )}
                <p className="mt-4 text-xs leading-5 text-ink/75">
                  Tell us your dates and we&apos;ll confirm availability and the final trip details with you.
                </p>
              </div>
              <div className="space-y-3 p-6 sm:p-7">
                <Link
                  href={`/contact?package=${trip.id}`}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-coral px-5 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#f0603a] hover:shadow-ember"
                >
                  Enquire about this trip <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href={whatsappLink({ crossing: trip.title })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-sea/20 bg-white px-5 py-3.5 text-sm font-semibold text-sea transition hover:border-sea/50 hover:bg-sea/[0.04]"
                >
                  <MessageCircle className="size-4" /> Chat on WhatsApp
                </a>
                <p className="pt-1 text-center font-mono text-[0.58rem] uppercase tracking-[0.12em] text-ink/70">
                  No commitment · Local support
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {relatedTrips.length > 0 && (
        <section className="border-t border-ink/8 bg-foam/55 py-14 sm:py-20">
          <div className="shell">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-coral">Keep exploring</p>
                <h2 className="mt-3 font-display text-3xl tracking-[-0.025em] sm:text-4xl">More ways to meet the islands.</h2>
              </div>
              <Link href="/#packages" className="inline-flex items-center gap-2 text-sm font-semibold text-sea transition-colors hover:text-coral">
                All packages <ArrowUpRight className="size-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTrips.map((item) => (
                <Link
                  key={item.id}
                  href={item.link}
                  className="group overflow-hidden rounded-2xl border border-ink/8 bg-foam shadow-lift transition duration-300 hover:-translate-y-1 hover:shadow-elegant"
                >
                  <div className="relative aspect-[1.55] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-ink/75 px-3 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-foam backdrop-blur">
                      {TAG_LABELS[item.tags[0]] ?? "Island escape"}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-ink/60">{item.location} · {item.duration}</p>
                    <h3 className="mt-2 line-clamp-2 font-display text-xl leading-snug text-ink">{item.title}</h3>
                    <div className="mt-5 flex items-center justify-between border-t border-ink/8 pt-4">
                      <span className="font-display text-2xl">{item.price}</span>
                      <span className="grid size-9 place-items-center rounded-full border border-ink/10 text-sea transition group-hover:border-coral group-hover:bg-coral group-hover:text-white">
                        <ArrowUpRight className="size-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      </main>
      <Footer />
    </div>
  );
}
