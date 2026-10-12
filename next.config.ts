import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "8mb",
    },
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "srqupburcgonbsbgenbn.supabase.co", pathname: "/storage/v1/object/public/site-images/**" }],
  },
};

export default nextConfig;
