import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
 images: {
    remotePatterns: [new URL('https://randomuser.me/api/**')],
  },
};

export default nextConfig;
