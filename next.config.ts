import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Plain static files in out/ — no server needed (spec.md > Stack).
  output: "export",
  // Images are pre-compressed by scripts/images.mjs, so Next's optimizer isn't used.
  images: { unoptimized: true },
  // /projects/<slug>/ → out/projects/<slug>/index.html, which static hosts serve reliably.
  trailingSlash: true,
};

export default nextConfig;
