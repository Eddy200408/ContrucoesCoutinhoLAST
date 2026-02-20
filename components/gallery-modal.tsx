"use client"

import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface GalleryModalProps {
  images: string[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function GalleryModal({ images, currentIndex, isOpen, onClose, onPrev, onNext }: GalleryModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center" onClick={onClose}>
      <button
        className="absolute top-5 right-9 text-white text-4xl font-bold hover:text-[#fe9445] transition-colors"
        onClick={onClose}
        aria-label="Fechar"
      >
        <X className="w-10 h-10" />
      </button>

      <Image
        src={images[currentIndex] || "/placeholder.svg"}
        alt={`Imagem ${currentIndex + 1}`}
        width={800}
        height={600}
        className="max-w-[80%] max-h-[80%] object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      <div className="absolute top-1/2 w-full flex justify-between px-3 -translate-y-1/2 pointer-events-none">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
          className="text-white text-3xl pointer-events-auto hover:text-[#fe9445] transition-colors"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          className="text-white text-3xl pointer-events-auto hover:text-[#fe9445] transition-colors"
          aria-label="Próximo"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  )
}
