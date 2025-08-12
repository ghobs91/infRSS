const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development"
  });
  
  module.exports = withPWA({
    // your existing config
    images: {
      domains: ['www.google.com'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'www.google.com',
          pathname: '/s2/favicons/**',
        },
      ],
    },
    // Ensure API routes are properly handled
    experimental: {
      appDir: true,
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
  