/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Necessário para OpenNext/Cloudflare
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig