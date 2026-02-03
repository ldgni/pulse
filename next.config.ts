import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://crests.football-data.org/**")],
  },
};

export default nextConfig;
