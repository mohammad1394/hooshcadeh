import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /**
     * Proxy API requests to the Django backend during development.
     * In production, Nginx or similar handles this routing.
     */
    async rewrites() {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        return [
            {
                source: "/api/:path*",
                destination: `${apiUrl}/api/:path*`,
            },
            {
                source: "/media/:path*",
                destination: `${apiUrl}/media/:path*`,
            },
        ];
    },

    /** Allow backend media images to be loaded via next/image */
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "8000",
                pathname: "/media/**",
            },
        ],
    },
};

export default nextConfig;
