import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/skills", destination: "/stack", permanent: true }];
  },
  images: {
    // Project screenshots uploaded to Vercel Blob.
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
  experimental: {
    serverActions: {
      // Admin screenshot uploads are compressed in the browser first; this
      // matches Vercel's 4.5 MB request limit with some headroom.
      bodySizeLimit: "4mb",
    },
  },
};

export default nextConfig;
