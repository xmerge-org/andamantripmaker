"use client";

import { useState } from "react";
import { MapPin, Calendar, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import packages from "@/utility/json/packages.json";

const TravelPackages = () => {
  const [visibleCount, setVisibleCount] = useState(6);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-sand" id="packages">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
            Popular Travel Packages
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover amazing destinations around the world with our carefully
            crafted travel packages
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.slice(0, visibleCount).map((pkg) => (
            <Card
              key={pkg.id}
              className="group overflow-hidden hover:shadow-elegant transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  width={400}
                  height={250}
                />
                <div className="absolute top-4 right-4 bg-coral text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Save{" "}
                  {(
                    ((parseFloat(pkg.originalPrice.replace("₹", "")) -
                      parseFloat(pkg.price.replace("₹", ""))) /
                      parseFloat(pkg.originalPrice.replace("₹", ""))) *
                    100
                  ).toFixed(0)}
                  %
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{pkg.location}</span>
                </div>

                <h3 className="text-2xl font-bold text-navy mb-3">
                  {pkg.title}
                </h3>
                <p className="text-muted-foreground mb-4">{pkg.description}</p>

                <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{pkg.people}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-primary">
                      {pkg.price}
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      {pkg.originalPrice}
                    </span>
                  </div>
                  <Button className="bg-orange-600 hover:shadow-md hover:bg-orange-700 text-white">
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Show More Button */}
        {visibleCount < packages.length && (
          <div className="text-center mt-10">
            <Button
              variant="outline"
              onClick={handleShowMore}
              className="rounded-full px-8 py-2 text-lg border-primary text-primary hover:bg-primary hover:text-white transition"
            >
              Show More
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TravelPackages;
