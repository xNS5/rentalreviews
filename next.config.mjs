/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    experimental: {
        instrumentationHook: true
    },
    images: {
        remotePatterns: [
            {
                hostname: "**.githubusercontent.com",
            },
            {
                hostname: "**.fbcdn.net"
            }
        ]
    }
};

export default nextConfig;
