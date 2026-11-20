"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import islands from "@/utility/json/islands.json";

const TOTAL_KM = 172;

/**
 * A schematic crossing rail: the page is read as one ferry route from Port
 * Blair out to Neil, so scroll progress is expressed in kilometres sailed
 * rather than as a bare percentage bar.
 */
export default function VoyageProgress() {
  const { scrollYProgress } = useScroll();
  const [km, setKm] = useState(0);
  const [stop, setStop] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const nextKm = Math.round(value * TOTAL_KM);
    const nextStop = Math.min(
      islands.length - 1,
      Math.floor(value * islands.length),
    );
    setKm((prev) => (prev === nextKm ? prev : nextKm));
    setStop((prev) => (prev === nextStop ? prev : nextStop));
  });

  const pct = `${(km / TOTAL_KM) * 100}%`;

  return (
    <div
      role="progressbar"
      aria-label="Page progress"
      aria-valuemin={0}
      aria-valuemax={TOTAL_KM}
      aria-valuenow={km}
      aria-valuetext={`${km} of ${TOTAL_KM} kilometres sailed, off ${islands[stop].name}`}
      className="pointer-events-none fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:flex"
    >
      <div className="flex flex-col items-center gap-3 rounded-full border border-ink/10 bg-foam/75 px-2.5 py-4 shadow-lift backdrop-blur-md">
        <span className="eyebrow text-[0.5625rem] text-coral">
          {String(islands[stop].code)}
        </span>

        <div className="relative flex h-[34vh] w-px items-center justify-center">
          <span className="absolute inset-0 bg-ink/15" />
          <span
            className="absolute top-0 w-px bg-coral transition-[height] duration-150 ease-out"
            style={{ height: pct }}
          />
          <span
            className="absolute h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-foam bg-coral shadow-ember transition-[top] duration-150 ease-out"
            style={{ top: pct }}
          />
          {islands.map((island, index) => (
            <span
              key={island.code}
              className="absolute h-px w-2 -translate-y-1/2 bg-ink/25"
              style={{ top: `${(index / (islands.length - 1)) * 100}%` }}
            />
          ))}
        </div>

        <span className="font-mono text-[0.5625rem] tabular-nums text-ink-soft">
          {String(km).padStart(3, "0")}
          <span className="text-ink/30">/{TOTAL_KM}</span>
        </span>
      </div>
    </div>
  );
}
