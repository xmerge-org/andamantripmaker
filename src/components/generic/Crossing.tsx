"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import islands from "@/utility/json/islands.json";
import { Bathymetry } from "./Bathymetry";
import { EASE, Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";
import { cn } from "@/lib/utils";

const STOPS = islands.length;

export default function Crossing() {
  const [index, setIndex] = useState(3);
  const island = islands[index];

  return (
    <section
      id="islands"
      className="relative overflow-hidden bg-sand py-24 text-ink sm:py-28"
    >
      <div className="chart-ground absolute inset-0 opacity-70" />
      <Bathymetry
        seed={4}
        rings={7}
        step={92}
        amplitude={34}
        strokeClassName="text-ink/10"
        className="opacity-60"
      />

      <div className="shell relative">
        <SectionHead
          eyebrow="The chain · North to south"
          title={
            <>
              Five stops. One{" "}
              <span className="italic text-coral">crossing</span> between each.
            </>
          }
          lead="The Andamans are not a destination, they are a schedule. Here is the route we actually run, with the ferry time each leg costs you."
        />

        {/* Route rail — schematic, so the spacing reads as order rather than geography. */}
        <Reveal className="mt-14">
          <div className="relative">
            {/* Five equal cells: the first and last dot centres sit at 10% and 90%. */}
            <div className="absolute left-[10%] right-[10%] top-[0.4375rem] h-px bg-ink/20" />
            <div
              className="absolute left-[10%] top-[0.4375rem] h-px bg-coral transition-[width] duration-700 ease-liquid"
              style={{ width: `calc(80% * ${index / (STOPS - 1)})` }}
            />

            <ol className="relative grid grid-cols-5">
              {islands.map((stop, i) => (
                <li key={stop.code} className="min-w-0">
                  <button
                    onClick={() => setIndex(i)}
                    aria-current={i === index}
                    className="group flex w-full flex-col items-center gap-2.5 text-center"
                  >
                    <span
                      className={cn(
                        "size-3.5 rounded-full border-2 transition-all duration-500 ease-liquid",
                        i === index
                          ? "scale-125 border-coral bg-coral shadow-ember"
                          : i < index
                            ? "border-coral/60 bg-coral/25"
                            : "border-ink/25 bg-sand group-hover:border-coral/60",
                      )}
                    />
                    <span
                      className={cn(
                        "eyebrow text-[0.5625rem] transition-colors",
                        i === index ? "text-coral" : "text-ink-soft",
                      )}
                    >
                      {stop.code}
                    </span>
                    <span
                      className={cn(
                        "font-display hidden text-[0.9375rem] leading-tight transition-colors sm:block",
                        i === index ? "text-ink" : "text-ink-soft",
                      )}
                    >
                      {stop.name}
                    </span>
                  </button>
                </li>
              ))}
            </ol>

            <p className="eyebrow mt-4 text-[0.5625rem] text-ink-soft/60">
              Schematic · not to scale
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid items-stretch gap-8 lg:grid-cols-[1.02fr_0.98fr]">
          <Reveal className="relative min-h-[18rem] overflow-hidden rounded-[1.25rem] bg-ink shadow-elegant">
            <AnimatePresence mode="wait">
              <motion.div
                key={island.code}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="absolute inset-0"
              >
                <Image
                  src={island.image}
                  alt={island.name}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
              <p className="font-mono text-[0.6875rem] text-reef">
                {island.coords}
              </p>
              <p className="rounded-full bg-foam/12 px-3 py-1 font-mono text-[0.6875rem] text-foam backdrop-blur-sm">
                {island.distance}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${island.code}-copy`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex flex-1 flex-col"
              >
                <h3 className="font-display text-[1.75rem] leading-tight font-light tracking-tight sm:text-[2.125rem]">
                  {island.name}
                </h3>
                {island.renamed ? (
                  <p className="eyebrow mt-2 text-[0.5625rem] text-coral">
                    {island.renamed}
                  </p>
                ) : null}

                <p className="mt-5 leading-relaxed text-ink-soft">
                  {island.note}
                </p>

                <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10">
                  {[
                    { term: "Getting there", detail: island.crossing },
                    { term: "Allow", detail: island.days },
                    { term: "From base", detail: island.distance },
                    { term: "Known for", detail: island.bestFor },
                  ].map((row) => (
                    <div key={row.term} className="bg-sand p-4">
                      <dt className="eyebrow text-[0.5625rem] text-ink-soft/70">
                        {row.term}
                      </dt>
                      <dd className="mt-1.5 text-sm leading-snug text-ink">
                        {row.detail}
                      </dd>
                    </div>
                  ))}
                </dl>

                <a
                  href="#packages"
                  className="group mt-7 inline-flex items-center gap-2 self-start border-b border-coral/40 pb-1 text-sm font-semibold text-coral transition-colors hover:border-coral"
                >
                  <Compass className="size-4" />
                  Packages that reach {island.name}
                  <ArrowRight className="size-4 transition-transform duration-300 ease-liquid group-hover:translate-x-1" />
                </a>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
