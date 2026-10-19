import type { MetadataRoute } from "next"

export const dynamic = "force-static"

// Permite "Adicionar ao ecrã principal" no telemóvel com nome e ícone da empresa
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Construções Coutinho",
    short_name: "C. Coutinho",
    description: "Construção civil em Mindelo, São Vicente — Cabo Verde",
    start_url: "/",
    display: "standalone",
    background_color: "#141414",
    theme_color: "#fe9445",
    lang: "pt-CV",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  }
}
