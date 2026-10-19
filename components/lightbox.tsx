"use client"

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Share2 } from "lucide-react"
import type { GalleryImage } from "@/types"
import { cldUrl } from "@/lib/cloudinary"

interface LightboxProps {
  images: GalleryImage[]
  index: number
  open: boolean
  onClose: () => void
  onNavigate: (index: number) => void
}

const SWIPE_THRESHOLD = 60

/**
 * Visualizador de imagens em ecrã inteiro, pensado primeiro para o telemóvel:
 * deslizar para os lados muda de foto, deslizar para baixo fecha, duplo toque faz zoom.
 * No desktop: setas, teclado (← → Esc), miniaturas e roda do rato para zoom.
 */
export function Lightbox({ images, index, open, onClose, onNavigate }: LightboxProps) {
  const [mounted, setMounted] = useState(false)
  const [zoomed, setZoomed] = useState(false)
  const [drag, setDrag] = useState({ x: 0, y: 0, active: false })
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [chromeVisible, setChromeVisible] = useState(true)
  const start = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null)
  const lastTap = useRef(0)
  const closeRef = useRef<HTMLButtonElement>(null)
  const thumbsRef = useRef<HTMLDivElement>(null)

  const total = images.length
  const current = images[index]

  const go = useCallback(
    (delta: number) => {
      if (total < 2) return
      setZoomed(false)
      onNavigate((index + delta + total) % total)
    },
    [index, total, onNavigate],
  )

  useEffect(() => setMounted(true), [])

  // Teclado, bloqueio de scroll e foco
  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      else if (e.key === "ArrowRight") go(1)
      else if (e.key === "ArrowLeft") go(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus?.()
    }
  }, [open, go, onClose])

  // Mantém a miniatura ativa visível
  useEffect(() => {
    if (!open) return
    setZoomed(false)
    const thumb = thumbsRef.current?.querySelector<HTMLElement>(`[data-index="${index}"]`)
    thumb?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
  }, [index, open])

  // Pré-carrega as imagens vizinhas para uma navegação instantânea
  useEffect(() => {
    if (!open || total < 2) return
    const width = Math.min(1920, Math.ceil(window.innerWidth * (window.devicePixelRatio || 1)))
    ;[1, -1].forEach((d) => {
      const img = new window.Image()
      img.src = cldUrl(images[(index + d + total) % total].src, { width })
    })
  }, [index, open, images, total])

  // Ao sair do zoom, a imagem volta ao centro
  useEffect(() => {
    if (!zoomed) setPan({ x: 0, y: 0 })
  }, [zoomed])

  const onPointerDown = (e: ReactPointerEvent) => {
    e.currentTarget.setPointerCapture?.(e.pointerId)
    start.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y }
    setDrag({ x: 0, y: 0, active: true })
  }

  const onPointerMove = (e: ReactPointerEvent) => {
    if (!start.current) return
    const dx = e.clientX - start.current.x
    const dy = e.clientY - start.current.y
    // Com zoom, arrastar move a imagem
    if (zoomed) {
      setPan({ x: start.current.panX + dx, y: start.current.panY + dy })
      return
    }
    // Bloqueia num eixo: horizontal = navegar, vertical (para baixo) = fechar
    if (Math.abs(dx) > Math.abs(dy)) setDrag({ x: dx, y: 0, active: true })
    else setDrag({ x: 0, y: Math.max(0, dy), active: true })
  }

  const onPointerUp = (e: ReactPointerEvent) => {
    if (!start.current) return
    const dx = e.clientX - start.current.x
    const dy = e.clientY - start.current.y
    const moved = Math.abs(dx) > 8 || Math.abs(dy) > 8
    start.current = null
    setDrag({ x: 0, y: 0, active: false })

    if (!moved) {
      // Toque simples alterna os controlos; duplo toque faz zoom
      const now = Date.now()
      if (now - lastTap.current < 300) {
        setZoomed((z) => !z)
        lastTap.current = 0
      } else {
        lastTap.current = now
        setTimeout(() => {
          if (lastTap.current === now) setChromeVisible((v) => !v)
        }, 300)
      }
      return
    }
    if (zoomed) return
    if (dx < -SWIPE_THRESHOLD) go(1)
    else if (dx > SWIPE_THRESHOLD) go(-1)
    else if (dy > SWIPE_THRESHOLD * 1.5) onClose()
  }

  const share = async () => {
    const url = window.location.href
    try {
      if (navigator.share) await navigator.share({ title: "Construções Coutinho", text: current?.alt, url })
      else await navigator.clipboard.writeText(url)
    } catch {
      // partilha cancelada
    }
  }

  if (!mounted || !open || !current) return null

  const dragOpacity = drag.y ? Math.max(0.3, 1 - drag.y / 400) : 1

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Galeria — imagem ${index + 1} de ${total}`}
      className="fixed inset-0 z-[10000] flex flex-col bg-[#0b0b0b]/95 backdrop-blur-xl animate-fade-in select-none"
      style={{ backgroundColor: `rgba(11,11,11,${0.95 * dragOpacity})` }}
    >
      {/* Barra superior */}
      <div
        className={`relative z-20 flex items-center justify-between gap-3 px-3 sm:px-6 pt-[max(env(safe-area-inset-top),12px)] pb-3 text-white transition-opacity duration-300 ${
          chromeVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="font-display text-lg font-bold tabular-nums">
            <span className="text-[#fe9445]">{String(index + 1).padStart(2, "0")}</span>
            <span className="text-white/40"> / {String(total).padStart(2, "0")}</span>
          </span>
          {current.category && (
            <span className="hidden sm:inline-block rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-white/70">
              {current.category}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoomed((z) => !z)}
            className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
            aria-label={zoomed ? "Reduzir" : "Ampliar"}
          >
            {zoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
          </button>
          <button
            onClick={share}
            className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
            aria-label="Partilhar"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <button
            ref={closeRef}
            onClick={onClose}
            className="w-11 h-11 rounded-full flex items-center justify-center bg-white/10 hover:bg-[#fe9445] transition-colors"
            aria-label="Fechar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Imagem */}
      <div
        className={`relative flex-1 min-h-0 touch-none ${zoomed ? "cursor-move" : "cursor-grab active:cursor-grabbing"}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          start.current = null
          setDrag({ x: 0, y: 0, active: false })
        }}
        onWheel={(e) => {
          // Gesto de "pinça" no trackpad / Ctrl + roda do rato
          if (e.ctrlKey) setZoomed(e.deltaY < 0)
        }}
      >
        <div
          key={index}
          className="absolute inset-0 animate-zoom-in"
          style={{
            transform: zoomed
              ? `translate(${pan.x}px, ${pan.y}px) scale(2)`
              : `translate(${drag.x}px, ${drag.y}px) scale(${drag.y ? 1 - drag.y / 1600 : 1})`,
            transition: drag.active ? "none" : "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <Image
            src={current.src}
            alt={current.alt}
            fill
            sizes="100vw"
            quality={85}
            priority
            draggable={false}
            className="object-contain p-2 sm:p-6 md:p-10"
          />
        </div>

        {total > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                go(-1)
              }}
              onPointerDown={(e) => e.stopPropagation()}
              onPointerUp={(e) => e.stopPropagation()}
              className={`hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full items-center justify-center bg-white/10 text-white backdrop-blur hover:bg-[#fe9445] transition-all ${
                chromeVisible ? "opacity-100" : "opacity-0"
              }`}
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                go(1)
              }}
              onPointerDown={(e) => e.stopPropagation()}
              onPointerUp={(e) => e.stopPropagation()}
              className={`hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full items-center justify-center bg-white/10 text-white backdrop-blur hover:bg-[#fe9445] transition-all ${
                chromeVisible ? "opacity-100" : "opacity-0"
              }`}
              aria-label="Imagem seguinte"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Legenda + miniaturas */}
      <div
        className={`relative z-20 pb-[max(env(safe-area-inset-bottom),12px)] transition-opacity duration-300 ${
          chromeVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <p className="text-center text-white/80 text-sm px-6 mb-3 line-clamp-1">{current.alt}</p>
        {total > 1 && (
          <div ref={thumbsRef} className="flex gap-2 overflow-x-auto scrollbar-hide px-4 pb-1 snap-x-mandatory justify-start sm:justify-center">
            {images.map((img, i) => (
              <button
                key={img.src + i}
                data-index={i}
                onClick={() => onNavigate(i)}
                aria-label={`Ver imagem ${i + 1}`}
                aria-current={i === index}
                className={`relative shrink-0 snap-center w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                  i === index ? "ring-2 ring-[#fe9445] opacity-100 scale-100" : "opacity-40 hover:opacity-80 scale-95"
                }`}
              >
                <Image src={img.src} alt="" fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
        <p className="sm:hidden text-center text-[11px] text-white/35 mt-2">Deslize para navegar · duplo toque para ampliar</p>
      </div>
    </div>,
    document.body,
  )
}
