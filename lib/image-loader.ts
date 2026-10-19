"use client"

// Loader global do next/image (configurado em next.config.mjs).
// Gera um srcset responsivo servido pelo Cloudinary.
import { cldUrl } from "./cloudinary"

export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  return cldUrl(src, { width, quality })
}
