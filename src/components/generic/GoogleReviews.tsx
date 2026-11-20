"use client";

import { Quote } from "lucide-react";
import { SectionHead } from "./SectionHead";
import { Reveal } from "./Reveal";

const WIDGET_SRC = "https://431d611b6243482082804f61bd8fceb9.elf.site";

export default function GoogleReviews() {
  return (
    <section id="reviews" className="relative overflow-hidden bg-foam py-24 sm:py-28">
      <div className="shell relative">
        <SectionHead
          eyebrow="Verbatim"
          title={
            <>
              What people say once they are{" "}
              <span className="italic text-coral">back on the mainland</span>.
            </>
          }
          lead="Google reviews, embedded exactly as written. We did not hand-pick the flattering ones."
        />

        <Reveal delay={0.1} className="mt-12">
          {/* Elfsight appends two things we do not want on screen: its own
              "What Our Customers Say" title at the very top of the document,
              and a "Free Google Reviews Widget" link under the Load More
              button. The title ends 32px in, so the frame is lifted 40 and the
              cut is placed on the grid's own bottom edge — which also leaves
              Load More out, since it would load reviews into a region we
              cannot show. Scrolling is off, so the badge cannot be dragged
              into view. Re-measure if the review count changes; the widget
              lays out by container width (350/704/960/1280): title bottom 32
              everywhere, grid bottom 906/900/854/900, badge top 980/974/928/974. */}
          <div className="relative h-[866px] overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-elegant md:h-[814px] xl:h-[860px]">
            <iframe
              src={WIDGET_SRC}
              title="Andaman Trip Maker Google reviews"
              loading="lazy"
              scrolling="no"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
              className="absolute inset-x-0 -top-10 h-[906px] w-full border-0 md:h-[854px] xl:h-[900px]"
            />
            {/* At md the cut lands mid-row, so the fade reads as "the wall
                continues" rather than a clip. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-b from-transparent to-white"
            />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-5 flex flex-wrap items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-soft">
            <Quote className="size-3.5 text-coral" />
            Live widget from our Google Business profile
            <span className="text-ink/25">/</span>
            <a
              href="#contact"
              className="text-sea underline decoration-sea/40 underline-offset-4 transition-colors hover:text-coral hover:decoration-coral"
            >
              Ask a past traveller a question
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
