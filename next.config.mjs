/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Gera pasta /out com arquivos estáticos
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig