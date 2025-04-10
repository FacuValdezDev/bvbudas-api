/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Cambiado a false para evitar renderizados dobles
  swcMinify: true,
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Configuración para Docker
  output: 'standalone',
  // Optimizaciones para mejorar el rendimiento
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  // Transpilación de módulos específicos
  transpilePackages: ['react-chartjs-2', 'chart.js'],
}

export default nextConfig
