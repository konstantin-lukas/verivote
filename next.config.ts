import type { NextConfig } from "next";

import { version } from "./package.json";

const nextConfig: NextConfig = {
    output: "standalone",
    eslint: {
        ignoreDuringBuilds: true,
    },
    publicRuntimeConfig: {
        version,
    },
};
export default nextConfig;
