import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // Run lint in a dedicated step/script to avoid duplicate output during build.
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // CSP — works with Clerk, PostHog, and Next.js dev mode out of the box.
          // Tighten for production: remove 'unsafe-eval', use nonces for scripts.
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.com https://*.posthog.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self' https:",
              "worker-src 'self' blob:",
              "frame-src 'self' https://*.clerk.com",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
