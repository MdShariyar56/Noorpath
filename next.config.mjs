
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const target = process.env.BACKEND_URL;
    // নিজের পিসিতে BACKEND_URL না থাকলে কিছু ঘোরানো হয় না
    if (!target) return [];
    return [{ source: "/api/:path*", destination: `${target}/api/:path*` }];
  },
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imglink.cc",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;