/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: config => {
    config.module.rules.push({
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: ['@svgr/webpack'],
    })
    return config
  }
}

module.exports = nextConfig
