/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'example.com', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3002',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
