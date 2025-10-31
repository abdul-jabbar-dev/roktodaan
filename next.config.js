/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
        pathname: "/public/**",
      },      {
        protocol: "https",
        hostname: "res.cloudinary.com" 
      },
    ],
  },

  /* config options here */
};

module.exports = nextConfig;
