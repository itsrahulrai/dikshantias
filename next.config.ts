import type { NextConfig } from "next";
const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },

    ]
  },
  typescript: {
    ignoreBuildErrors: !isDev ? true : false,
  },
  eslint: {
    ignoreDuringBuilds: !isDev ? true : false,
  },
  productionBrowserSourceMaps: true,
};

export default nextConfig;
