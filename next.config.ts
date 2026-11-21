import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // reactStrictMode: true,
  // swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      {
        protocol: "https",
        hostname: "www.freeiconspng.com",
      },
    ],
  },
};

export default nextConfig;
