"use client"

import { useMemo, useState, type CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"
import { Expand, ArrowRight, Images } from "lucide-react"
import type { GalleryImage } from "@/types"
import { Lightbox } from "@/components/lightbox"

interface BentoGalleryProps {
  images: GalleryImage[]
  /** Nº máximo de imagens na grelha (o resto fica acessível no visualizador) */
  limit?: number
  /** Mostra filtros por categoria */
  showFilters?: boolean
  /** Paginação "Carregar mais" */
  pageSize?: number
  /** Link "ver todas" no último bloco */
  moreHref?: string
}

// Padrão que se repete a cada 10 fotos — cria um mosaico variado sem buracos (grid-flow-dense)
const PATTERN = [
  { span: "col-span-2 row-span-2", sizes: "(min-width: 768px) 50vw, 100vw" },
  { span: "", sizes: "(min-width: 768px) 25vw, 50vw" },
  { span: "row-span-2", sizes: "(min-width: 768px) 25vw, 50vw" },
  { span: "", sizes: "(min-width: 768px) 25vw, 50vw" },
  { span: "col-span-2 md:col-span-1", sizes: "(min-width: 768px) 25vw, 100vw" },
  { span: "", sizes: "(min-width: 768px) 25vw, 50vw" },
  { span: "md:col-span-2", sizes: "(min-width: 768px) 50vw, 50vw" },
  { span: "row-span-2", sizes: "(min-width: 768px) 25vw, 50vw" },
  { span: "", sizes: "(min-width: 768px) 25vw, 50vw" },
  { span: "", sizes: "(min-width: 768px) 25vw, 50vw" },
]

export function BentoGallery({ images, limit, showFilters = false, pageSize, moreHref }: BentoGalleryProps) {
  const [filter, setFilter] = useState("Todos")
  const [visibleCount, setVisibleCount] = useState(pageSize ?? limit ?? images.length)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const categories = useMemo(() => {
    const counts = new Map<string, number>()
    images.forEach((img) => img.category && counts.set(img.category, (counts.get(img.category) ?? 0) + 1))
    return [{ name: "Todos", count: images.length }, ...Array.from(counts, ([name, count]) => ({ name, count }))]
  }, [images])

  const filtered = useMemo(
    () => (filter === "Todos" ? images : images.filter((img) => img.category === filter)),
    [images, filter],
  )

  const shown = filtered.slice(0, limit ?? visibleCount)
  const hiddenCount = filtered.length - shown.length

  const changeFilter = (name: string) => {
    setFilter(name)
    setVisibleCount(pageSize ?? limit ?? images.length)
  }

  return (
    <>
      {showFilters && categories.length > 2 && (
        <div className="-mx-4 px-4 mb-8 overflow-x-auto scrollbar-hide" role="tablist" aria-label="Filtrar galeria">
          <div className="flex gap-2 w-max sm:w-auto sm:flex-wrap sm:justify-center mx-auto">
            {categories.map((cat) => {
              const active = filter === cat.name
              return (
                <button
                  key={cat.name}
                  role="tab"
                  aria-selected={active}
                  onClick={() => changeFilter(cat.name)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                    active
                      ? "bg-[#232323] text-white shadow-lg"
                      : "bg-white text-[#333] border border-gray-200 hover:border-[#fe9445] hover:text-[#fe9445]"
                  }`}
                >
                  {cat.name}
                  <span
                    className={`text-[11px] rounded-full px-1.5 py-0.5 ${active ? "bg-[#fe9445] text-[#232323]" : "bg-gray-100 text-gray-700"}`}
                  >
                    {cat.count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      <div
        key={filter}
        className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] sm:auto-rows-[190px] lg:auto-rows-[220px] grid-flow-dense gap-2.5 md:gap-4"
      >
        {shown.map((img, i) => {
          const layout = PATTERN[i % PATTERN.length]
          const isLast = Boolean(limit) && i === shown.length - 1 && (hiddenCount > 0 || moreHref)
          return (
            <button
              key={img.src + i}
              type="button"
              data-reveal="zoom"
              style={{ "--reveal-delay": `${(i % 10) * 60}ms` } as CSSProperties}
              onClick={() => setLightboxIndex(filtered.indexOf(img))}
              className={`group relative overflow-hidden rounded-xl md:rounded-2xl bg-[#232323] text-left focus-visible:outline-offset-2 ${layout.span}`}
              aria-label={`Ampliar: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={layout.sizes}
                quality={70}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />

              {/* Cantos de enquadramento (marca de obra) */}
              <span className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#fe9445] opacity-0 -translate-x-1 -translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500" />
              <span className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#fe9445] opacity-0 translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500" />

              <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 flex items-end justify-between gap-2 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500">
                <div className="min-w-0">
                  {img.category && (
                    <span className="block text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase text-[#fe9445]">
                      {img.category}
                    </span>
                  )}
                  <span className="block text-white text-xs md:text-sm font-semibold leading-snug line-clamp-2">{img.alt}</span>
                </div>
                <span className="hidden md:flex shrink-0 w-9 h-9 rounded-full bg-[#fe9445] text-white items-center justify-center">
                  <Expand className="w-4 h-4" />
                </span>
              </div>

              {isLast && hiddenCount > 0 && (
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-[#141414]/75 backdrop-blur-[2px] text-white">
                  <Images className="w-6 h-6 text-[#fe9445]" />
                  <span className="font-display text-2xl md:text-3xl font-extrabold">+{hiddenCount}</span>
                  <span className="text-xs text-white/70">fotos</span>
                </span>
              )}
            </button>
          )
        })}
      </div>

      {!limit && pageSize && hiddenCount > 0 && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisibleCount((c) => c + pageSize)}
            className="group inline-flex items-center gap-3 border-2 border-[#232323] text-[#232323] px-8 py-3.5 rounded-full font-bold hover:bg-[#232323] hover:text-white transition-all"
          >
            Carregar mais fotos
            <span className="text-xs font-semibold rounded-full bg-[#fe9445] text-[#232323] px-2 py-0.5">{hiddenCount}</span>
          </button>
        </div>
      )}

      {moreHref && (
        <div className="flex justify-center mt-10">
          <Link
            href={moreHref}
            className="group inline-flex items-center gap-2 border-2 border-[#fe9445] text-[#fe9445] px-8 sm:px-10 py-4 rounded-full font-bold hover:bg-[#fe9445] hover:text-white transition-all"
          >
            Ver Portfólio Completo
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      )}

      <Lightbox
        images={filtered}
        index={lightboxIndex ?? 0}
        open={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </>
  )
}
