import { SITE } from "./site";

export type Enquiry = {
  crossing?: string;
  message?: string;
  dates?: string;
  name?: string;
  phone?: string;
  email?: string;
};

const clean = (value?: string) => value?.trim() ?? "";

/** One message, used by both the WhatsApp handoff and the mail draft. */
export function composeEnquiry(enquiry: Enquiry): string {
  const crossing = clean(enquiry.crossing);
  const message = clean(enquiry.message);
  const lines: string[] = [];

  // A bare message already opens itself; only name the package when there is
  // one, or there would be nothing else to say.
  if (crossing) lines.push(`Package: ${crossing}`);
  else if (message) lines.push(message);
  else lines.push("Trip enquiry from the website");

  if (crossing && message) lines.push("", message);
  if (clean(enquiry.dates)) lines.push(`Travel window: ${clean(enquiry.dates)}`);
  if (clean(enquiry.name)) lines.push(`Name: ${clean(enquiry.name)}`);
  if (clean(enquiry.phone)) lines.push(`Phone: ${clean(enquiry.phone)}`);
  if (clean(enquiry.email)) lines.push(`Email: ${clean(enquiry.email)}`);

  return lines.join("\n");
}

export function whatsappLink(enquiry: Enquiry = {}) {
  return `${SITE.whatsapp.href}?text=${encodeURIComponent(composeEnquiry(enquiry))}`;
}

export function mailtoLink(enquiry: Enquiry) {
  const subject = `Trip enquiry${clean(enquiry.name) ? ` — ${clean(enquiry.name)}` : ""}`;
  return `${SITE.email.href}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    composeEnquiry(enquiry),
  )}`;
}
