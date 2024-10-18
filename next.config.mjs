/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: false,
    experimental: {
        instrumentationHook: true
    },
    distDir: "build"
};

export default nextConfig;
