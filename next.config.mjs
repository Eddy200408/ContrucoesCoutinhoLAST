/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Site estático puro - ideal para Cloudflare Pages
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // As imagens são otimizadas pelo Cloudinary (ver lib/cloudinary.ts).
    // Sem Cloudinary configurado, o loader devolve os ficheiros locais de /public.
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1600, 1920],
    imageSizes: [32, 64, 96, 128, 256, 384],
  },
}

export default nextConfig
