'use client';
import Footer from "@/components/generic/Footer";
import Header from "../components/generic/Header";
import HeroSection from "../components/generic/HeroSection";
import TravelPackages from "../components/generic/TravelPackages";
import ContactUs from "@/components/generic/ContactUs";
import GoogleReviews from "@/components/generic/GoogleReviews";
import AboutUs from "@/components/generic/AboutUs";


const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <AboutUs />
      <TravelPackages />
      <GoogleReviews />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default HomePage;