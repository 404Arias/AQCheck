import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: false,
  generateEtags: false,
  async redirects() {
    return []
  },
  async rewrites() {
    return []
  },
};

export default nextConfig;
