/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      "@": path.resolve(__dirname, "src/"),
    };
    return config;
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
