const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development"
  });
  
  module.exports = withPWA({
    images: {
      domains: ['www.google.com'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'www.google.com',
          pathname: '/s2/favicons/**',
        },
      ],
      unoptimized: true, // Disable image optimization for better Netlify compatibility
    },
    // Configure Turbopack
    experimental: {
      turbo: {
        rules: {
          // Add any custom Turbopack rules here if needed
        }
      }
    },
    // Add proper rewrites if needed
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: '/api/:path*',
        },
      ];
    },
  });
  