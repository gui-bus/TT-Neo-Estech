import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/chamados",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;