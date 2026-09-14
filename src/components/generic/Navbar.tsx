"use client";
import { Search, User, Menu, X, ExternalLink } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Logo from "@/assets/logo/ATM-logo.png";
import Image from "next/image";

const DashboardLink = "https://www.aasvana.com/login";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`fixed left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md text-gray-900"
          : "bg-white/20 backdrop-blur-md text-white top-0 md:top-[40px]"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between rounded-2xl px-4 py-3">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src={Logo}
              alt="Andaman Tripmaker"
              className="w-10 h-10 rounded-full object-cover border-2 border-white"
            />
            <span className="text-md md:text-xl font-medium">
              Andaman Tripmaker
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="hover:text-coral transition-colors">
              Home
            </a>
            <a href="#aboutus" className="hover:text-coral transition-colors">
              About
            </a>
            <a href="#packages" className="hover:text-coral transition-colors">
              Packages
            </a>
            <a href="#" className="hover:text-coral transition-colors">
              Blog
            </a>
            <a href="#contact" className="hover:text-coral transition-colors">
              Contact
            </a>
            <a
              href={DashboardLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-coral transition-colors"
            >
              Dashboard
            </a>
          </nav>

          {/* Icons + Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <Search className="w-5 h-5 hover:text-coral transition-colors cursor-pointer" />
            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="p-1 hover:text-coral transition-colors cursor-pointer"
                aria-label="Profile menu"
              >
                <User className="w-5 h-5" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 z-[60] bg-white shadow-lg rounded-md py-1 text-gray-900">
                  <a
                    href={DashboardLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => setProfileOpen(false)}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Dashboard
                  </a>
                </div>
              )}
            </div>
            <button
              className="md:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Toggle Menu"
            >
              {open ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className={`md:hidden flex flex-col items-center gap-4 py-4 transition-all duration-300 ${
            scrolled ? "bg-white text-gray-900" : "bg-white/20 backdrop-blur-md text-white"
          }`}
        >
          <a href="#" className="hover:text-coral transition-colors">
            Home
          </a>
          <a href="#" className="hover:text-coral transition-colors">
            About
          </a>
          <a href="#packages" className="hover:text-coral transition-colors">
            Packages
          </a>
          <a href="#" className="hover:text-coral transition-colors">
            Blog
          </a>
          <a href="#contact" className="hover:text-coral transition-colors">
            Contact
          </a>
          <a
            href={DashboardLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-coral transition-colors"
          >
            Dashboard
          </a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
