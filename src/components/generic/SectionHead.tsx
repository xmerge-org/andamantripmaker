import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionHeadProps = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  /** foam = light type on a dark section, ink = dark type on a light section */
  tone?: "foam" | "ink";
  action?: ReactNode;
  className?: string;
};

export function SectionHead({
  eyebrow,
  title,
  lead,
  tone = "ink",
  action,
  className = "",
}: SectionHeadProps) {
  const isFoam = tone === "foam";

  return (
    <div
      className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${className}`}
    >
      <Reveal className="max-w-3xl">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-coral" />
          <span
            className={`eyebrow ${isFoam ? "text-reef" : "text-coral"}`}
          >
            {eyebrow}
          </span>
        </div>

        <h2
          className={`font-display mt-4 text-[2rem] leading-[1.04] font-light tracking-[-0.02em] sm:text-[2.75rem] lg:text-[3.4rem] ${
            isFoam ? "text-foam" : "text-ink"
          }`}
        >
          {title}
        </h2>

        {lead ? (
          <p
            className={`mt-5 text-[1.0625rem] leading-relaxed ${
              isFoam ? "text-reef/80" : "text-ink-soft"
            }`}
          >
            {lead}
          </p>
        ) : null}
      </Reveal>

      {action ? <Reveal delay={0.1}>{action}</Reveal> : null}
    </div>
  );
}
