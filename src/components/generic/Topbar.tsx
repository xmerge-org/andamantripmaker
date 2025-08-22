"use client";

import { useEffect, useState } from "react";
import { Phone, MapPin, Mail, Facebook, Instagram, Twitter, Clock4 } from "lucide-react";

const Topbar = () => {
  const [showTopbar, setShowTopbar] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setShowTopbar(false);
      } else {
        setShowTopbar(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 h-[40px] hidden md:block
                  bg-gray-900 text-white transition-transform duration-300
                  ${showTopbar ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-wrap items-center justify-between text-sm">
          {/* Left Info */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock4 className="w-4 h-4 text-coral" />
              <span>Mon-Sat: 10am to 8pm</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-coral" />
              <span>+918583010020</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-coral" />
              <span>info@andamantripmaker.in</span>
            </div>
          </div>

          {/* Right Social */}
          <div className="flex items-center gap-3">
            <Facebook className="w-4 h-4 hover:text-coral cursor-pointer" />
            <Instagram className="w-4 h-4 hover:text-coral cursor-pointer" />
            <Twitter className="w-4 h-4 hover:text-coral cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
