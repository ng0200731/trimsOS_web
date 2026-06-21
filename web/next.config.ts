import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export → plain HTML/CSS/JS in `out/` for hosts that don't run Node
  // (e.g. InfinityFree PHP hosting). Upload the contents of `out/` to htdocs.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
