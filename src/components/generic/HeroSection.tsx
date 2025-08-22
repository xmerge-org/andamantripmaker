"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CoverImages from "@/utility/json/cover-packages.json";
import mapPlane from "@/assets/map-plane.png";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen w-full">
      <Swiper
        modules={[Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
        className="h-screen w-full"
      >
        {CoverImages.map((data, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-screen w-full flex items-center justify-center">
              <Image
                src={data.img}
                alt={data.alt}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10"></div>
              <div className="relative z-30 text-center text-white max-w-4xl mx-auto px-4">
                <div className="flex items-center justify-center mt-10">
                  <Image
                    src={mapPlane}
                    alt="plane"
                    width={360}
                    height={360}
                    className="object-contain animate-bounce-slow"
                  />
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  {data.title}
                  <br />
                  <span className="text-transparent bg-gradient-to-r from-red-700 to-orange-400 bg-clip-text">
                    {data.span}
                  </span>
                </h1>

                <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
                  {data.description}
                </p>
                <Button
                  size="lg"
                  className="bg-orange-700 hover:bg-coral/90 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  See More
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
