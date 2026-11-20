"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useInView } from "framer-motion";
import { Mail, MapPin, MessageCircle, Phone, Check } from "lucide-react";
import { SectionHead } from "./SectionHead";
import { Reveal } from "./Reveal";
import { Bathymetry } from "./Bathymetry";
import { SITE } from "@/utility/site";
import { mailtoLink, whatsappLink } from "@/utility/enquiry";

// The WebGL map is the heaviest thing on the page and sits below the fold,
// so it is only pulled in once the section is nearly on screen.
const AndamanChart = dynamic(() => import("./AndamanChart"), { ssr: false });

const FIELD =
  "w-full rounded-lg border bg-foam/[0.04] px-4 py-3 text-foam placeholder:text-foam/35 transition-colors duration-200 focus:outline-none";

const DEFAULT_MESSAGE = "Hi — I would like help planning an Andaman trip.";

const OK = "border-foam/15 focus:border-reef";
const BAD = "border-crimson/70 focus:border-crimson";

type Form = {
  name: string;
  email: string;
  phone: string;
  dates: string;
  message: string;
};

type Errors = Partial<Record<keyof Form, string>>;

const EMPTY: Form = { name: "", email: "", phone: "", dates: "", message: "" };

function validate(form: Form): Errors {
  const errors: Errors = {};
  if (form.name.trim().length < 2) errors.name = "Tell us who to address.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
    errors.email = "That email address does not look complete.";
  if (form.message.trim().length < 12)
    errors.message = "A line or two about the trip helps us quote properly.";
  return errors;
}

export default function ContactUs({
  prefill,
}: {
  prefill: { message: string; nonce: number };
}) {
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [handedOff, setHandedOff] = useState(false);
  const chartBox = useRef<HTMLDivElement>(null);
  const chartInView = useInView(chartBox, { once: true, margin: "320px" });

  useEffect(() => {
    if (!prefill.nonce) return;
    setForm((prev) => ({ ...prev, message: prefill.message }));
    setHandedOff(false);
  }, [prefill.nonce, prefill.message]);

  function set<K extends keyof Form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    window.location.href = whatsappLink(form);
    setHandedOff(true);
  }

  const emailHref = mailtoLink(form);
  const whatsappHref = whatsappLink(
    form.message.trim() ? form : { message: DEFAULT_MESSAGE },
  );

  return (
    <section id="contact" className="relative overflow-hidden bg-ink pb-24 pt-24 sm:pt-28">
      <Bathymetry
        seed={11}
        rings={7}
        step={120}
        amplitude={30}
        strokeClassName="text-sea/35"
      />

      <div className="shell relative">
        <SectionHead
          tone="foam"
          eyebrow="Plan a package"
          title={
            <>
              Send the dates. We send the{" "}
              <span className="italic text-ember">quote</span>.
            </>
          }
          lead="A planner reads this personally — no auto-responder, no call centre."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <form
              onSubmit={submit}
              noValidate
              className="rounded-2xl border border-foam/10 bg-deep/50 p-6 backdrop-blur-sm sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  id="c-name"
                  label="Name"
                  error={errors.name}
                  value={form.name}
                  onChange={(v) => set("name", v)}
                  placeholder="Aarti Menon"
                  autoComplete="name"
                />
                <Field
                  id="c-email"
                  label="Email"
                  type="email"
                  error={errors.email}
                  value={form.email}
                  onChange={(v) => set("email", v)}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
                <Field
                  id="c-phone"
                  label="Phone"
                  type="tel"
                  optional
                  error={errors.phone}
                  value={form.phone}
                  onChange={(v) => set("phone", v)}
                  placeholder="+91 ..."
                  autoComplete="tel"
                />
                <Field
                  id="c-dates"
                  label="Travel window"
                  optional
                  error={errors.dates}
                  value={form.dates}
                  onChange={(v) => set("dates", v)}
                  placeholder="Mid-December, 6 nights"
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="c-message"
                  className="eyebrow mb-2 block text-reef"
                >
                  What you have in mind
                </label>
                <textarea
                  id="c-message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "c-message-error" : undefined}
                  placeholder="Who is travelling, what matters most, and anything already booked."
                  className={`${FIELD} resize-y ${errors.message ? BAD : OK}`}
                />
                {errors.message && (
                  <p id="c-message-error" className="mt-1.5 text-xs text-crimson">
                    {errors.message}
                  </p>
                )}
              </div>

              <p className="mt-6 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-foam/40">
                Opens WhatsApp with this drafted · nothing is sent until you hit send
              </p>

              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-coral px-6 py-3.5 text-sm font-semibold text-foam transition-colors duration-300 hover:bg-ember hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-reef"
                >
                  <MessageCircle className="size-4" />
                  Send on WhatsApp
                </button>
                <a
                  href={emailHref}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-foam/20 px-6 py-3.5 text-sm font-semibold text-foam transition-colors duration-300 hover:border-reef hover:text-reef"
                >
                  <Mail className="size-4" />
                  Email instead
                </a>
              </div>

              {handedOff && (
                <p className="mt-4 flex items-start gap-2 rounded-lg border border-reef/30 bg-reef/10 px-4 py-3 text-sm text-reef">
                  <Check className="mt-0.5 size-4 shrink-0" />
                  WhatsApp should be open with your details typed in. If nothing
                  happened, the email button drafts the same message — or call the
                  desk and we will take it from there.
                </p>
              )}
            </form>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-6">
            <dl className="overflow-hidden rounded-2xl border border-foam/10">
              <Row
                icon={Phone}
                term="Call the desk"
                value={SITE.phone.display}
                href={SITE.phone.href}
                note={SITE.hours}
              />
              <Row
                icon={MessageCircle}
                term="WhatsApp"
                value={SITE.phone.display}
                href={whatsappHref}
                note="Fastest for dates and head count"
                external
              />
              <Row
                icon={Mail}
                term="Email"
                value={SITE.email.display}
                href={SITE.email.href}
                note="For itineraries and documents"
              />
              <Row
                icon={MapPin}
                term="Office"
                value={SITE.base}
                note={`Peak season ${SITE.season} · ${SITE.coords}`}
                last
              />
            </dl>

            <div
              ref={chartBox}
              aria-label="Chart of the Andaman chain — Phoenix Bay, Port Blair, with the crossings out to Ross Island, Havelock, Neil and Baratang"
              className="flex-1 overflow-hidden rounded-2xl border border-foam/15 bg-sand shadow-elegant"
            >
              {chartInView ? <AndamanChart /> : null}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  optional,
  type = "text",
  placeholder,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  optional?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-2 flex items-baseline gap-2 text-reef">
        {label}
        {optional && <span className="text-[0.5625rem] text-foam/35">Optional</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${FIELD} ${error ? BAD : OK}`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-crimson">
          {error}
        </p>
      )}
    </div>
  );
}

function Row({
  icon: Icon,
  term,
  value,
  href,
  note,
  external,
  last,
}: {
  icon: typeof Mail;
  term: string;
  value: string;
  href?: string;
  note?: string;
  external?: boolean;
  last?: boolean;
}) {
  const body = (
    <>
      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-reef/12 text-reef">
        <Icon className="size-4" />
      </span>
      <span className="min-w-0">
        <span className="eyebrow block text-[0.5625rem] text-foam/40">{term}</span>
        <span className="font-display mt-1 block truncate text-[1.0625rem] text-foam">
          {value}
        </span>
        {note && (
          <span className="mt-0.5 block text-xs text-foam/45">{note}</span>
        )}
      </span>
    </>
  );

  return (
    <div
      className={`bg-foam/[0.03] px-5 py-4 transition-colors duration-300 hover:bg-foam/[0.06] ${
        last ? "" : "border-b border-foam/10"
      }`}
    >
      {href ? (
        <a
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : null)}
          className="flex gap-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-reef"
        >
          {body}
        </a>
      ) : (
        <div className="flex gap-4">{body}</div>
      )}
    </div>
  );
}
