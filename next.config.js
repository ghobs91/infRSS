// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development"
  });
  
  module.exports = withPWA({
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'www.google.com',
          pathname: '/s2/favicons/**',
        },
      ],
      unoptimized: true,
    },
    // Add empty turbopack config to silence Next.js 16 warning
    turbopack: {},
  });
  