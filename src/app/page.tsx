"use client";

import { useCallback, useState } from "react";
import { MotionConfig } from "framer-motion";
import Header from "@/components/generic/Header";
import HeroSection from "@/components/generic/HeroSection";
import Crossing from "@/components/generic/Crossing";
import AboutUs from "@/components/generic/AboutUs";
import TravelPackages, { type Package } from "@/components/generic/TravelPackages";
import Practical from "@/components/generic/Practical";
import GoogleReviews from "@/components/generic/GoogleReviews";
import ContactUs from "@/components/generic/ContactUs";
import Footer from "@/components/generic/Footer";
import VoyageProgress from "@/components/generic/VoyageProgress";

const HomePage = () => {
  const [prefill, setPrefill] = useState({ message: "", nonce: 0 });

  const enquire = useCallback((pkg: Package) => {
    setPrefill({
      nonce: Date.now(),
      message: `I am looking at "${pkg.title}" (${pkg.duration}, ${pkg.people}) listed at ${pkg.price}. What I need help with:`,
    });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    document.getElementById("contact")?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[60] focus:rounded-full focus:bg-coral focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-foam"
      >
        Skip to content
      </a>

      <Header />

      <main id="main" className="min-h-screen">
        <HeroSection />
        <Crossing />
        <AboutUs />
        <TravelPackages onEnquire={enquire} />
        <Practical />
        <GoogleReviews />
        <ContactUs prefill={prefill} />
      </main>

      <Footer />
      <VoyageProgress />
    </MotionConfig>
  );
};

export default HomePage;
