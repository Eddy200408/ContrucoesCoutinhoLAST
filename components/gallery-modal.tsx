"use client"

import { Lightbox } from "@/components/lightbox"

interface GalleryModalProps {
  images: string[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  /** Opcional: saltar diretamente para uma imagem (miniaturas) */
  onSelect?: (index: number) => void
}

/**
 * Mantém a API original do modal da galeria, agora com o novo visualizador
 * (gestos de deslizar, zoom, miniaturas e teclado).
 */
export function GalleryModal({ images, currentIndex, isOpen, onClose, onPrev, onNext, onSelect }: GalleryModalProps) {
  const total = images.length

  const navigate = (index: number) => {
    if (index === (currentIndex + 1) % total) onNext()
    else if (index === (currentIndex - 1 + total) % total) onPrev()
    else if (onSelect) onSelect(index)
    else {
      const steps = (index - currentIndex + total) % total
      for (let i = 0; i < steps; i++) onNext()
    }
  }

  return (
    <Lightbox
      images={images.map((src, i) => ({ src, alt: `Imagem ${i + 1}` }))}
      index={currentIndex}
      open={isOpen}
      onClose={onClose}
      onNavigate={navigate}
    />
  )
}
