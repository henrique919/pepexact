import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@pepexact/engine"],
  // Prefer this monorepo over a lockfile in the user home directory.
  outputFileTracingRoot: path.join(__dirname, "../.."),
};

export default nextConfig;
