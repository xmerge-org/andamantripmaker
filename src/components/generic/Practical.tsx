"use client";

import { CloudRain, FileCheck, Leaf, Plane, Ship, Signal } from "lucide-react";
import { SectionHead } from "./SectionHead";
import { Reveal } from "./Reveal";

const NOTES = [
  {
    icon: Plane,
    title: "There is one runway",
    body: "Veer Savarkar at Port Blair is the only airport in the chain. Direct from Chennai and Kolkata; everywhere else connects through one of them.",
  },
  {
    icon: Ship,
    title: "The boats are the bottleneck",
    body: "Catamaran seats to Havelock and Neil sell out weeks ahead in season. We hold them with the itinerary, not the morning you travel.",
  },
  {
    icon: FileCheck,
    title: "Passes and photo ID",
    body: "Protected-area clearances come with the booking. Carry government ID for every traveller, children included — the checks are at the jetty.",
  },
  {
    icon: CloudRain,
    title: "The window is October to May",
    body: "The south-west monsoon does not close the islands, but it cancels crossings often enough that we never schedule dives inside it.",
  },
  {
    icon: Leaf,
    title: "A plastic-free territory",
    body: "Single-use plastic is confiscated on arrival at the airport. Bring a refill bottle and reef-safe sunscreen instead of buying it there.",
  },
  {
    icon: Signal,
    title: "Signal thins out fast",
    body: "Postpaid SIMs from the mainland work in the main towns and drop along the trunk road. ATMs are scarce once you leave Port Blair.",
  },
];

export default function Practical() {
  return (
    <section
      id="practical"
      className="relative overflow-hidden bg-deep py-24 sm:py-28"
    >
      <span
        aria-hidden
        className="rule-sunset absolute inset-x-0 top-0 h-px opacity-60"
      />
      <div className="shell relative">
        <SectionHead
          tone="foam"
          eyebrow="Before you sail"
          title={
            <>
              Six things we settle{" "}
              <span className="italic text-ember">before</span> you leave the
              mainland.
            </>
          }
          lead="The Andamans reward planning and punish improvisation. None of this is in the brochure."
        />

        <dl className="mt-14 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {NOTES.map((note, index) => (
            <Reveal key={note.title} delay={Math.min(index, 5) * 0.06}>
              <div className="border-t border-foam/15 pt-5">
                <dt className="flex items-center gap-3">
                  <note.icon className="size-4.5 shrink-0 text-reef" />
                  <span className="font-display text-[1.1875rem] text-foam">
                    {note.title}
                  </span>
                </dt>
                <dd className="mt-2.5 text-sm leading-relaxed text-foam/60">
                  {note.body}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
