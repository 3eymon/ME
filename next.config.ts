import type { NextConfig } from "next";

const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [new URL("https://api.xseyed.ir/uploads/**"),new URL("http://localhost:8080/uploads/**")],
  },
};

export default nextConfig;
