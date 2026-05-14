import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep file tracing / chunk graph rooted on this app (not the parent repo folder).
  // A stray package-lock.json at the repo root used to make Next infer the wrong root
  // and could contribute to runtime errors like "__webpack_modules__[moduleId] is not a function".
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
