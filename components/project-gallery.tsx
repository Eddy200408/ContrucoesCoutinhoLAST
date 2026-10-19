"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Images, Expand, ArrowRight } from "lucide-react"
import type { Project } from "@/types"
import { Lightbox } from "@/components/lightbox"

interface ProjectGalleryProps {
  projects: Project[]
}

export function ProjectGallery({ projects }: ProjectGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [imageIndex, setImageIndex] = useState(0)
  const [filter, setFilter] = useState<string>("all")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category)))]

  const filteredProjects = filter === "all" ? projects : projects.filter((p) => p.category === filter)

  const openProject = (project: Project) => {
    setSelectedProject(project)
    setImageIndex(0)
  }

  const closeProject = () => setSelectedProject(null)

  // Bloqueio de scroll enquanto o modal do projecto está aberto
  useEffect(() => {
    if (!selectedProject) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previous
    }
  }, [selectedProject])

  // Teclado (o visualizador em ecrã inteiro tem os seus próprios atalhos)
  useEffect(() => {
    if (!selectedProject || lightboxOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProject()
      if (e.key === "ArrowRight") scrollToImage(imageIndex + 1)
      if (e.key === "ArrowLeft") scrollToImage(imageIndex - 1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  // Carrossel com deslizar nativo (scroll-snap) — fluido no telemóvel
  const scrollToImage = (index: number) => {
    if (!selectedProject || !trackRef.current) return
    const total = selectedProject.images.length
    const next = (index + total) % total
    trackRef.current.scrollTo({ left: next * trackRef.current.clientWidth, behavior: "smooth" })
    setImageIndex(next)
  }

  const onTrackScroll = () => {
    const track = trackRef.current
    if (!track) return
    const index = Math.round(track.scrollLeft / track.clientWidth)
    if (index !== imageIndex) setImageIndex(index)
  }

  return (
    <>
      {/* Filtros */}
      <div className="-mx-4 px-4 mb-10 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 sm:gap-3 w-max sm:w-auto sm:flex-wrap sm:justify-center mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={`px-5 sm:px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                filter === cat
                  ? "bg-[#fe9445] text-white shadow-[0_8px_20px_rgba(254,148,69,0.35)]"
                  : "bg-white text-[#333] hover:bg-[#fe9445]/10 border border-gray-200"
              }`}
            >
              {cat === "all" ? "Todos" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grelha de projectos */}
      <div key={filter} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {filteredProjects.map((project, i) => (
          <article
            key={project.id}
            data-reveal
            style={{ "--reveal-delay": `${(i % 3) * 100}ms` } as CSSProperties}
            className="group bg-white rounded-2xl overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-1.5"
          >
            <button
              type="button"
              onClick={() => openProject(project)}
              className="block w-full text-left"
              aria-label={`Ver projecto: ${project.title}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#232323]">
                <Image
                  src={project.images[0] || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[11px] font-bold tracking-wider uppercase text-[#232323]">
                  {project.category}
                </span>
                <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/50 backdrop-blur px-2.5 py-1 text-xs font-semibold text-white">
                  <Images className="w-3.5 h-3.5" /> {project.images.length}
                </span>
                <span className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white font-bold md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500">
                  Ver Projecto
                  <span className="w-9 h-9 rounded-full bg-[#fe9445] flex items-center justify-center">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-bold text-[#232323] group-hover:text-[#fe9445] transition-colors">
                  {project.title}
                </h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-gray-500 text-sm">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-[#fe9445]" /> {project.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-[#fe9445]" /> {project.year}
                  </span>
                </div>
              </div>
            </button>
          </article>
        ))}
      </div>

      {/* Modal do projecto — folha inferior no telemóvel, janela central no desktop */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[1001] flex items-end md:items-center justify-center md:p-6 animate-fade-in"
          onClick={closeProject}
          role="dialog"
          aria-modal="true"
          aria-label={selectedProject.title}
        >
          <div
            className="relative bg-white w-full md:max-w-5xl max-h-[92svh] md:max-h-[90vh] overflow-y-auto rounded-t-3xl md:rounded-3xl animate-[rise-in_0.5s_cubic-bezier(0.22,1,0.36,1)_both]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeProject}
              className="absolute top-3 right-3 z-20 w-11 h-11 rounded-full bg-black/50 backdrop-blur text-white flex items-center justify-center hover:bg-[#fe9445] transition-colors"
              aria-label="Fechar"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative">
              <div
                ref={trackRef}
                onScroll={onTrackScroll}
                className="flex overflow-x-auto snap-x-mandatory scrollbar-hide aspect-[4/3] md:aspect-auto md:h-[55vh] bg-[#141414]"
              >
                {selectedProject.images.map((src, idx) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => {
                      setImageIndex(idx)
                      setLightboxOpen(true)
                    }}
                    className="relative shrink-0 w-full h-full snap-center cursor-zoom-in"
                    aria-label={`Ampliar imagem ${idx + 1}`}
                  >
                    <Image
                      src={src || "/placeholder.svg"}
                      alt={`${selectedProject.title} — imagem ${idx + 1}`}
                      fill
                      sizes="(min-width: 1024px) 1024px, 100vw"
                      priority={idx === 0}
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-black/55 backdrop-blur px-3 py-1.5 text-xs font-semibold text-white pointer-events-none">
                <Expand className="w-3.5 h-3.5" /> Toque para ampliar
              </span>

              {selectedProject.images.length > 1 && (
                <>
                  <button
                    onClick={() => scrollToImage(imageIndex - 1)}
                    className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white w-12 h-12 rounded-full items-center justify-center hover:bg-[#fe9445] transition-colors"
                    aria-label="Imagem anterior"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => scrollToImage(imageIndex + 1)}
                    className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white w-12 h-12 rounded-full items-center justify-center hover:bg-[#fe9445] transition-colors"
                    aria-label="Imagem seguinte"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Indicadores */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {selectedProject.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToImage(idx)}
                    aria-label={`Ir para imagem ${idx + 1}`}
                    className="p-1"
                  >
                    <span
                      className={`block h-2 rounded-full transition-all ${idx === imageIndex ? "bg-white w-6" : "bg-white/50 w-2"}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 md:p-8 pb-[max(env(safe-area-inset-bottom),24px)]">
              <span className="text-[#fe9445] font-bold tracking-[0.15em] text-xs uppercase">{selectedProject.category}</span>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-[#232323] mt-2">{selectedProject.title}</h2>
              <p className="text-gray-600 mt-4 leading-relaxed">{selectedProject.description}</p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 text-gray-500">
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#fe9445]" /> {selectedProject.location}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#fe9445]" /> {selectedProject.year}
                </span>
              </div>
              <Link
                href="/contact#orcamento"
                className="mt-7 inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-[#fe9445] text-white px-7 py-3.5 rounded-xl font-bold hover:bg-[#e88438] transition-colors"
              >
                Quero um projecto assim <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {selectedProject && (
        <Lightbox
          images={selectedProject.images.map((src, i) => ({
            src,
            alt: `${selectedProject.title} — imagem ${i + 1}`,
            category: selectedProject.category,
          }))}
          index={imageIndex}
          open={lightboxOpen}
          onClose={() => {
            setLightboxOpen(false)
            requestAnimationFrame(() => scrollToImage(imageIndex))
          }}
          onNavigate={setImageIndex}
        />
      )}
    </>
  )
}
