import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [new URL("https://crests.football-data.org/**")],
  },
};

export default nextConfig;
