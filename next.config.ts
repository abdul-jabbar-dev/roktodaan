import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  
  basePath: '/roktodaan',       // repo name
  assetPrefix: '/roktodaan',   
 images: {
    remotePatterns: [new URL('https://randomuser.me/api/**')],
  },
};

export default nextConfig;
