"use client";
import Image from "next/image";
import { Users, Globe2 } from "lucide-react";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
}

const Counter = ({ from = 0, to, duration = 2 }: CounterProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!inView) return;
    let start = from;
    const increment = (to - from) / (duration * 60);
    const interval = setInterval(() => {
      start += increment;
      if ((increment > 0 && start >= to) || (increment < 0 && start <= to)) {
        setValue(to);
        clearInterval(interval);
      } else {
        setValue(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, [inView, from, to, duration]);

  return (
    <span ref={ref}>
      {value}+
    </span>
  );
};

const AboutUs = () => {
  return (
    <section className="py-16 bg-gray-50" id="aboutus">
        <div className="container mx-auto px-6 mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-coral mb-2">
          About Us
        </h1>
        <p className="text-gray-600 text-lg">
          Your Trusted Partner for Andaman Adventures
        </p>
      </div>
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Image + Stats */}
        <div className="relative">
          <Image
            src='https://ik.imagekit.io/v24zntfh1/Andaman%20Trip%20Maker/about-us-woman-using-smartphone.png'
            alt="About Andaman Tripmaker"
            className="rounded-2xl shadow-lg"
            width={500}
            height={400}
            content="cover"
          />

          {/* Floating Cards */}
          <div className="absolute top-6 left-6 bg-white shadow-lg rounded-xl px-4 py-3 flex items-center gap-3">
            <Globe2 className="w-6 h-6 text-coral" />
            <div>
              <p className="text-gray-500 text-sm">Destinations</p>
              <p className="font-bold text-lg">
                <Counter from={0} to={25} /> 
              </p>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 bg-white shadow-lg rounded-xl px-4 py-3 flex items-center gap-3">
            <Users className="w-6 h-6 text-coral" />
            <div>
              <p className="text-gray-500 text-sm">Happy Travelers</p>
              <p className="font-bold text-lg">
                <Counter from={0} to={10000} />
              </p>
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
            Discover the Magic of Andaman with{" "}
            <span className="text-coral">Andaman Tripmaker</span>
          </h2>
          <p className="text-gray-600 mb-6">
            At Andaman Tripmaker, we believe every journey should be filled with 
            stories, laughter, and unforgettable memories. With years of experience 
            in curating customized holiday packages, we&apos;ve helped thousands of 
            travelers explore the pristine beaches, lush islands, and vibrant culture 
            of the Andaman & Nicobar Islands. 
          </p>
          <p className="text-gray-600 mb-6">
            Whether you&apos;re looking for adventure, romance, or a family getaway — 
            we ensure your trip is seamless, safe, and tailored to your dreams.
          </p>

          <button className="bg-orange-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-coral/90 transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
