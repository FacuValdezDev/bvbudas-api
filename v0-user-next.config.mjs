/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Configuration for Docker
  output: 'standalone',
  // Disable experimental features that might cause issues
  experimental: {
    optimizeCss: false,
    scrollRestoration: true,
  }
}

export default nextConfig
