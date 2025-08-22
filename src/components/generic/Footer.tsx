"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="relative w-full bg-navy text-white overflow-hidden pt-8">
      {/* Waves */}
      <div className="absolute inset-x-0 bottom-0 h-96 overflow-hidden">
        <svg
          className="absolute bottom-0 w-[200%] h-96 animate-wave"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,49 C150,150 350,0 600,49 C850,100 1050,0 1200,49 L1200,120 L0,120 Z"
            fill="#3b82f6" // primary blue wave
            fillOpacity="0.6"
          />
        </svg>

        <svg
          className="absolute bottom-0 w-[200%] h-96 animate-wave-slow"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,49 C150,150 350,0 600,49 C850,100 1050,0 1200,49 L1200,120 L0,120 Z"
            fill="#2563eb" // darker blue wave
            fillOpacity="0.8"
          />
        </svg>
      </div>

      {/* Floating Ship */}
      <motion.div
        initial={{ x: "-20%" }}
        animate={{ x: "120%" }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-40 left-0"
      >
        {/* <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="https://www.freeiconspng.com/uploads/ship-travel-cruise-tourism-travel-icon-png-ship-png-ship-icon-29.png"
            alt="Ship"
            width={100}
            height={100}
            className="drop-shadow-lg"
          />
        </motion.div> */}
      </motion.div>

      <div className="relative container mx-auto px-6 pt-20 pb-6 text-center z-10">
        <h2 className="text-2xl font-medium mb-4">Explore the world with curated travel experiences <br/> and unforgettable adventures.</h2>
        <p className="text-sm text-gray-300 mb-4">
          Contact us | Privacy Policy | Terms & Conditions
        </p>
        <p className="text-sm text-white">© {new Date().getFullYear()} Andaman Trip Maker</p>
        <p className="opacity-75 text-xs">Made with 🤍 by Xmerge</p>
      </div>
    </footer>
  );
};

export default Footer;
