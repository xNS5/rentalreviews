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
            }
        ]
    }
};

export default nextConfig;
