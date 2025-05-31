import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['ejemplo.com', 'cdn.ejemplo.com'],
    // O usar remotePatterns para mayor seguridad y flexibilidad
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
