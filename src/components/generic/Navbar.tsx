"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Logo from "@/assets/logo/ATM-logo.png";
import { NAV, SITE } from "@/utility/site";
import { cn } from "@/lib/utils";

const Navbar = ({ scrolled }: { scrolled: boolean }) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;

    const sections = NAV.map((item) =>
      document.getElementById(item.href.slice(1)),
    ).filter((node): node is HTMLElement => Boolean(node));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.3, 0.6, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  // Keep the bar legible behind an open mobile sheet.
  const solid = scrolled || open;

  return (
    <nav
      className={cn(
        "transition-colors duration-500 ease-liquid",
        solid || !isHome
          ? "border-b border-foam/10 bg-ink/90 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="shell">
        <div className="flex items-center justify-between gap-6 py-3.5">
          <Link
            href={isHome ? "#home" : "/#home"}
            className="group flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember"
          >
            <span className="relative size-10 shrink-0 overflow-hidden rounded-full bg-foam ring-1 ring-foam/25 transition-transform duration-500 ease-liquid group-hover:scale-105">
              <Image
                src={Logo}
                alt=""
                fill
                sizes="40px"
                priority
                className="object-cover object-top"
              />
            </span>
            <span className="leading-none">
              <span className="font-display block text-[1.0625rem] font-normal tracking-tight text-foam">
                Andaman Trip Maker
              </span>
<span className="eyebrow mt-1 block text-[0.5rem] text-foam/70">
  {SITE.tagline}
</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={isHome ? item.href : `/${item.href}`}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors duration-300",
                  active === item.href
                    ? "text-foam"
                    : "text-foam/60 hover:text-foam",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-4 -bottom-px h-px bg-coral transition-transform duration-300 ease-liquid",
                    active === item.href ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={SITE.phone.href}
              className="hidden items-center gap-2 font-mono text-xs text-foam/70 transition-colors hover:text-ember xl:flex"
            >
              <Phone className="size-3.5" />
              {SITE.phone.display}
            </a>

            <a
              href={isHome ? "#contact" : "/#contact"}
              className="hidden items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-foam transition-all duration-300 ease-liquid hover:-translate-y-0.5 hover:bg-[#f0603a] hover:shadow-ember focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember sm:inline-flex"
            >
              Enquire
              <ArrowUpRight className="size-4" />
            </a>

            <button
              onClick={() => setOpen((prev) => !prev)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-10 place-items-center rounded-full border border-foam/20 text-foam transition-colors hover:border-reef/50 hover:bg-foam/10 md:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div className="border-t border-foam/10 md:hidden">
          <div className="shell flex flex-col py-3">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={isHome ? item.href : `/${item.href}`}
                onClick={() => setOpen(false)}
                className="border-b border-foam/8 py-3.5 text-[0.9375rem] text-foam/80 transition-colors last:border-0 hover:text-ember"
              >
                {item.label}
              </a>
            ))}
            <div className="flex gap-3 py-4">
              <a
                href={isHome ? "#contact" : "/#contact"}
                onClick={() => setOpen(false)}
                className="flex-1 rounded-full bg-coral px-4 py-3 text-center text-sm font-semibold text-foam"
              >
                Enquire
              </a>
              <a
                href={SITE.phone.href}
                className="flex items-center justify-center gap-2 rounded-full border border-foam/25 px-4 py-3 font-mono text-xs text-foam/80"
              >
                <Phone className="size-4" />
                Call
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
