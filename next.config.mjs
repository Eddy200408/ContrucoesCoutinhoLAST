/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Site estático puro - ideal para Cloudflare Pages
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig