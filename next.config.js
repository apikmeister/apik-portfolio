/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com']
    },
    reactStrictMode: true,
    swcMinify: true
};

module.exports = nextConfig;
