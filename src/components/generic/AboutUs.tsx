"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView, useReducedMotion } from "framer-motion";
import { Compass, Users } from "lucide-react";
import { Bathymetry } from "./Bathymetry";
import { Reveal } from "./Reveal";

function useCountTo(target: number, active: boolean, duration = 1700) {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setValue(target);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - t, 4))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, duration, reduced, target]);

  return value;
}

function Annotation({
  icon: Icon,
  label,
  target,
  suffix,
  position,
}: {
  icon: typeof Compass;
  label: string;
  target: number;
  suffix?: string;
  position: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { once: true, amount: 0.6 });
  const [skipped, setSkipped] = useState(false);

  // A deep link or a fast jump can carry the card past the viewport without it
  // ever intersecting, which would leave the count sitting at zero.
  useEffect(() => {
    const el = ref.current;
    if (el && el.getBoundingClientRect().bottom < 0) setSkipped(true);
  }, []);

  const value = useCountTo(target, active || skipped);

  return (
    <div
      ref={ref}
      className={`absolute ${position} flex items-center gap-3 rounded-xl border border-ink/8 bg-foam px-4 py-3 shadow-elegant`}
    >
      <span className="grid size-9 place-items-center rounded-full bg-coral/12 text-coral">
        <Icon className="size-4.5" />
      </span>
      <span className="leading-tight">
        <span className="eyebrow block text-[0.5rem] text-ink-soft">
          {label}
        </span>
        <span className="font-display block text-xl text-ink tabular-nums">
          {value.toLocaleString("en-IN")}
          {suffix}
        </span>
      </span>
    </div>
  );
}

const HANDLED = [
  {
    title: "Ferry seats and permits",
    body: "Inter-island crossings and entry clearances sit inside the quote. You never chase them at a counter.",
  },
  {
    title: "Guides on staff",
    body: "Naturalists for the Baratang caves and Chidiya Tapu trails, PADI instructors for the dive weeks.",
  },
  {
    title: "Meals and transfers",
    body: "Listed in the package price, not added at the desk on the second morning.",
  },
  {
    title: "Beachfront inventory",
    body: "Cottages and rooms on the sand at Havelock and Neil, where that is the entire point of the trip.",
  },
];

export default function AboutUs() {
  return (
    <section
      id="aboutus"
      className="relative overflow-hidden bg-foam py-24 sm:py-28"
    >
      <Bathymetry
        seed={7}
        rings={6}
        step={110}
        amplitude={28}
        strokeClassName="text-lagoon/15"
        className="opacity-80"
      />

      <div className="shell relative grid items-center gap-16 lg:grid-cols-2">
        <Reveal className="relative">
          <figure className="relative overflow-hidden rounded-[1.25rem] shadow-elegant ring-1 ring-ink/10">
            <Image
              src="/img/about-chart.jpg"
              alt="A hand-charted island crossing plan and compass laid on a boat deck at sunset"
              width={1400}
              height={933}
              sizes="(min-width: 1024px) 44vw, 92vw"
              className="aspect-[3/2] w-full object-cover"
            />
            <figcaption className="flex items-center justify-between gap-4 border-t border-ink/10 bg-foam px-4 py-2.5 font-mono text-[0.625rem] tracking-wide text-ink-soft">
              <span>Plate I · Route chart, Phoenix Bay</span>
              <span className="text-coral">11.62° N</span>
            </figcaption>
          </figure>

          <Annotation
            icon={Compass}
            label="Destinations"
            target={25}
            suffix="+"
            position="-left-3 top-8 sm:-left-6"
          />
          <Annotation
            icon={Users}
            label="Happy travellers"
            target={10000}
            suffix="+"
            position="-right-3 bottom-24 sm:-right-6"
          />
        </Reveal>

        <div>
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-coral" />
              <span className="eyebrow text-coral">The operators</span>
            </div>

            <h2 className="font-display mt-4 text-[2rem] leading-[1.06] font-light tracking-[-0.02em] text-ink sm:text-[2.625rem]">
              We have run these crossings long enough to know{" "}
              <span className="italic text-coral">
                which ferries fill first
              </span>
              .
            </h2>

            <p className="mt-6 leading-relaxed text-ink-soft">
              Andaman Trip Maker is a Port Blair operator. The people who plan
              your week are the people who call the boat office when the sea
              turns, who know which jetty queues by nine, and who have stood on
              Radhanagar at 5.40pm often enough to set a watch by it.
            </p>

            <p className="mt-4 leading-relaxed text-ink-soft">
              More than ten thousand travellers have moved through this chain
              with us — honeymooners, families with small children, divers
              chasing a first open-water ticket. Every itinerary we send is
              priced against the real ferry timetable, not a guess at it.
            </p>
          </Reveal>

          <dl className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {HANDLED.map((item, index) => (
              <Reveal key={item.title} delay={0.06 * index}>
                <div className="border-t border-ink/12 pt-4">
                  <dt className="font-display text-[1.0625rem] text-ink">
                    {item.title}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    {item.body}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={0.1}>
            <a
              href="#contact"
              className="mt-10 inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold text-ink transition-colors duration-300 hover:border-coral hover:bg-coral hover:text-foam"
            >
              Ask us about your dates
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
