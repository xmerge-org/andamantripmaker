'use client';
import Footer from "@/components/generic/Footer";
import Header from "../components/generic/Header";
import HeroSection from "../components/generic/HeroSection";
import TravelPackages from "../components/generic/TravelPackages";
import ContactUs from "@/components/generic/ContactUs";


const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <TravelPackages />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default HomePage;