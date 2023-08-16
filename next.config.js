const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        domains: ['res.cloudinary.com']
    },
    reactStrictMode: true,
    swcMinify: true
};

module.exports = withContentlayer(nextConfig);
