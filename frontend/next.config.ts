import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        unoptimized:true,
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "8000",
                pathname: "/media/**",
            },
            {
                protocol: "http",
                hostname: "backend",
                port: "8000",
                pathname: "/media/**",
            },
            {
                protocol: "https",
                hostname: "localhost",
                port: "8000",
                pathname: "/media/**",
            },
            {
                protocol: "https",
                hostname: "backend",
                port: "8000",
                pathname: "/media/**",
            },
        ],
    },
};

export default nextConfig;