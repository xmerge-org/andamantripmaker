"use client";

import { useEffect, useState } from "react";
import Topbar from "./Topbar";
import Navbar from "./Navbar";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <Topbar collapsed={scrolled} />
      <Navbar scrolled={scrolled} />
    </header>
  );
};

export default Header;
