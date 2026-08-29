import type { NextConfig } from "next";

const wordpressHostname = process.env.WORDPRESS_HOSTNAME;
const wordpressUrl = process.env.WORDPRESS_URL;

const nextConfig: NextConfig = {
  // Standalone is for Docker/Railway; Vercel handles its own tracing/standalone
  ...(process.env.VERCEL ? {} : { output: "standalone" as const }),
  images: {
    remotePatterns: wordpressHostname
      ? [
          {
            protocol: "https",
            hostname: wordpressHostname,
            port: "",
            pathname: "/**",
          },
        ]
      : [],
  },
  async redirects() {
    const pageRedirects = [
      {
        source: "/pages/write-for-us",
        destination: "/write-for-us",
        permanent: true,
      },
      {
        source: "/pages/privacy-policy",
        destination: "/privacy-policy",
        permanent: true,
      },
    ];
    if (!wordpressUrl) {
      return pageRedirects;
    }
    return [
      ...pageRedirects,
      {
        source: "/admin",
        destination: `${wordpressUrl}/wp-admin`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
