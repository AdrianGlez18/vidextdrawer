/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'i.ibb.co',
          }
        ]
      },
      eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
