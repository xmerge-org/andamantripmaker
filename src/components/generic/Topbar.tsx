"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { SITE } from "@/utility/site";
import { cn } from "@/lib/utils";

const Topbar = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <div
      className={cn(
        "hidden overflow-hidden bg-ink text-foam/70 transition-[max-height,opacity] duration-500 ease-liquid md:block",
        collapsed ? "max-h-0 opacity-0" : "max-h-12 opacity-100",
      )}
    >
      <div className="shell flex h-10 items-center justify-between gap-6 font-mono text-[0.6875rem] tracking-wide">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <Clock className="size-3.5 text-ember" />
            {SITE.hours}
          </span>
          <a
            href={SITE.phone.href}
            className="flex items-center gap-2 transition-colors hover:text-ember"
          >
            <Phone className="size-3.5 text-ember" />
            {SITE.phone.display}
          </a>
          <a
            href={SITE.email.href}
            className="flex items-center gap-2 transition-colors hover:text-ember"
          >
            <Mail className="size-3.5 text-ember" />
            {SITE.email.display}
          </a>
        </div>

        <span className="flex items-center gap-2 text-foam/50">
          <MapPin className="size-3.5 text-reef" />
          {SITE.base}
        </span>
      </div>
    </div>
  );
};

export default Topbar;
