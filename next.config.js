/** @type {import('next').NextConfig} */
const nextConfig = {
  // External packages for server components (Next.js 15)
  serverExternalPackages: ['playwright'],
  // Enable compression
  compress: true,
  // Configure headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  // Configure API routes
  async rewrites() {
    return [
      {
        source: '/api/scan',
        destination: '/api/scan',
      },
    ];
  },
};

module.exports = nextConfig;
