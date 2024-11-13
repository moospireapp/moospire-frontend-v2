/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ];
  },

  images: {
    domains: ["https://flagsapi.com", "https://images.unsplash.com"],
    unoptimized: true,
  },
};

export default nextConfig;
