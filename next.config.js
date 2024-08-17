/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn.apik.me',
            }
        ]
    },
    reactStrictMode: true,
    swcMinify: true
};

module.exports = nextConfig;
