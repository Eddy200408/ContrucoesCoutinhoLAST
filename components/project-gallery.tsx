"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, MapPin, Calendar } from "lucide-react"
import type { Project } from "@/types"

interface ProjectGalleryProps {
  projects: Project[]
}

export function ProjectGallery({ projects }: ProjectGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [imageIndex, setImageIndex] = useState(0)
  const [filter, setFilter] = useState<string>("all")

  const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category)))]

  const filteredProjects = filter === "all" ? projects : projects.filter((p) => p.category === filter)

  const openProject = (project: Project) => {
    setSelectedProject(project)
    setImageIndex(0)
  }

  return (
    <>
      {/* Filter buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              filter === cat
                ? "bg-[#fe9445] text-white shadow-lg"
                : "bg-white text-[#333] hover:bg-[#fe9445]/10 border border-gray-200"
            }`}
          >
            {cat === "all" ? "Todos" : cat}
          </button>
        ))}
      </div>

      {/* Projects grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            onClick={() => openProject(project)}
            className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src={project.images[0] || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-bold">Ver Projecto</span>
              </div>
            </div>
            <div className="p-5">
              <span className="text-[#fe9445] text-sm font-bold tracking-wider">{project.category}</span>
              <h3 className="text-lg font-bold text-[#232323] mt-1">{project.title}</h3>
              <div className="flex items-center gap-4 mt-3 text-gray-500 text-sm">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {project.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {project.year}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/90 z-[1001] flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <button
            onClick={() => setSelectedProject(null)}
            className="absolute top-6 right-6 text-white hover:text-[#fe9445] transition-colors"
            aria-label="Fechar"
          >
            <X className="w-8 h-8" />
          </button>

          <div
            className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[50vh]">
              <Image
                src={selectedProject.images[imageIndex] || "/placeholder.svg"}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />

              {selectedProject.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setImageIndex(
                        (prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length,
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setImageIndex((prev) => (prev + 1) % selectedProject.images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Image indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {selectedProject.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === imageIndex ? "bg-white w-6" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="p-8">
              <span className="text-[#fe9445] font-bold tracking-wider text-sm">{selectedProject.category}</span>
              <h2 className="text-2xl font-bold text-[#232323] mt-2">{selectedProject.title}</h2>
              <p className="text-gray-600 mt-4 leading-relaxed">{selectedProject.description}</p>
              <div className="flex items-center gap-6 mt-6 text-gray-500">
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#fe9445]" /> {selectedProject.location}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#fe9445]" /> {selectedProject.year}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
