import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static site: no server, no database. Check-ins stay on the family's phone.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
