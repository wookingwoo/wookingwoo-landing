/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // WSL 환경에서 hot reloading을 위한 설정
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
