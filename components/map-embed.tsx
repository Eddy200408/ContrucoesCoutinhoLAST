"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin } from "lucide-react"

interface MapEmbedProps {
  src: string
  title: string
}

/**
 * O Google Maps pesa mais de 1 MB. Só é carregado quando o utilizador se aproxima
 * do mapa — a página de contacto abre muito mais depressa no telemóvel.
 */
export function MapEmbed({ src, title }: MapEmbedProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || !("IntersectionObserver" in window)) {
      setLoad(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: "300px 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="absolute inset-0">
      {load ? (
        <iframe
          title={title}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={src}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 blueprint-grid-light text-gray-500">
          <MapPin className="w-8 h-8 text-[#fe9445] animate-float" />
          <span className="text-sm font-semibold">A carregar o mapa…</span>
        </div>
      )}
    </div>
  )
}
