import path from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Site estático puro - ideal para Cloudflare Pages
  // Fixa a raiz do projeto: sem isto o Turbopack pode procurar dependências
  // (ex.: tailwindcss) na pasta acima ("PROJETOS WEB") e falhar no `npm run dev`
  turbopack: {
    root: projectRoot,
  },
  outputFileTracingRoot: projectRoot,
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
    // Qualidades usadas nos componentes (obrigatório declarar no Next 16)
    qualities: [50, 70, 75, 85],
  },
}

export default nextConfig
