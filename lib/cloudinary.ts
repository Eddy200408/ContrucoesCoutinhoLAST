// Integração Cloudinary — todas as imagens do site passam por aqui.
//
// Funcionamento:
// 1. `npm run cloudinary:upload` envia as imagens de /public para o Cloudinary
//    e grava o mapeamento em lib/cloudinary-manifest.json.
// 2. Com NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME definido, cada imagem presente no
//    manifesto é servida pelo CDN do Cloudinary com formato (AVIF/WebP) e
//    qualidade automáticos e na largura certa para cada ecrã.
// 3. Sem configuração (ou imagem ainda não enviada) usa-se o ficheiro local,
//    por isso o site nunca fica sem imagens.

import manifest from "./cloudinary-manifest.json"

type ManifestEntry = { publicId: string; width?: number; height?: number }

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const assets = manifest as Record<string, ManifestEntry>

/** Normaliza um caminho local ("SãoVicente.jpg", "/Galeria/2.jpg") para a chave do manifesto. */
export function toManifestKey(src: string): string {
  let path = src.split("?")[0]
  try {
    path = decodeURI(path)
  } catch {
    // caminho já descodificado
  }
  return path.replace(/^\/+/, "").normalize("NFC")
}

/** Gera o public_id do Cloudinary a partir do caminho relativo a /public. Usado também pelo script de upload. */
export function toPublicId(relativePath: string, folder = "construcoes-coutinho"): string {
  const id = relativePath
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\.([a-z0-9]+)$/i, "_$1")
    .replace(/[^A-Za-z0-9/_-]+/g, "_")
  return `${folder}/${id}`
}

export function isCloudinaryEnabled(): boolean {
  return Boolean(CLOUD_NAME) && Object.keys(assets).length > 0
}

/** Indica se a imagem pode ser apresentada (ex.: ficheiros HEIC só funcionam via Cloudinary). */
export function isImageAvailable(src: string): boolean {
  if (!/\.heic$/i.test(src)) return true
  return Boolean(CLOUD_NAME && assets[toManifestKey(src)])
}

interface CldOptions {
  width?: number
  quality?: number
}

/** Devolve o URL otimizado de uma imagem local (ou o caminho local quando o Cloudinary não está disponível). */
export function cldUrl(src: string, { width, quality }: CldOptions = {}): string {
  if (!src || /^(https?:|data:|blob:)/.test(src)) return src

  const key = toManifestKey(src)
  const entry = assets[key]

  if (CLOUD_NAME && entry) {
    const transforms = ["f_auto", quality ? `q_${quality}` : "q_auto", "c_limit", width ? `w_${width}` : null, "dpr_1.0"]
      .filter(Boolean)
      .join(",")
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${entry.publicId}`
  }

  const local = "/" + key.split("/").map(encodeURIComponent).join("/")
  return width ? `${local}?w=${width}` : local
}
