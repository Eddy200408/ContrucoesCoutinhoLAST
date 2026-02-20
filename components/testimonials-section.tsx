"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import type { Testimonial } from "@/types"

const testimonials: Testimonial[] = [
  {
    name: "Helder Santos",
    role: "Proprietária Residencial",
    image: "/testemunhos/Helder.jpg",
    text: "Excelente trabalho da equipa da Construções Coutinho! Construíram a minha casa de sonho em São Vicente com qualidade impecável. Recomendo vivamente!",
    rating: 5,
  },
  {
    name: "Eddy Coutinho",
    role: "Empresário",
    image: "/testemunhos/Eddy.jpg",
    text: "Profissionalismo e dedicação desde o primeiro contacto. O meu estabelecimento comercial ficou exactamente como planeado. Obrigado pela excelência!",
    rating: 5,
  },
  {
    name: "Rufino Santos",
    role: "Policia",
    image: "/testemunhos/Rufino.jpg",
    text: "Como arquitecta, sou exigente com os detalhes. A Construções Coutinho superou as minhas expectativas na execução do projecto. Parceria de confiança!",
    rating: 5,
  },
  {
    name: "Carla Coutinho",
    role: "Engenheira",
    image: "/testemunhos/Carla.jpg",
    text: "Já realizei três projectos com a Construções Coutinho. Qualidade consistente, prazos cumpridos e preços justos. São os melhores em Cabo Verde!",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevTestimonial = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-gradient-to-br from-[#232323] to-[#1a1a1a] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#fe9445]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#e6b23a]/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="text-[#fe9445] font-bold tracking-wider text-sm">TESTEMUNHOS</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            O Que Dizem os Nossos <span className="text-[#fe9445]">Clientes</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            A satisfação dos nossos clientes é a nossa maior recompensa. Veja o que dizem sobre o nosso trabalho.
          </p>
        </div>

        <div className="relative">
          {/* Navigation buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-20 bg-[#fe9445] text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#e88438] transition-colors shadow-lg"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-20 bg-[#fe9445] text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#e88438] transition-colors shadow-lg"
            aria-label="Próximo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Testimonial card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 mx-8 lg:mx-16">
            <Quote className="w-12 h-12 text-[#fe9445]/30 mb-6" />

            <div
              className={`transition-all duration-500 ${isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
            >
              <p className="text-lg md:text-xl text-gray-300 italic leading-relaxed mb-8">
                "{testimonials[currentIndex].text}"
              </p>

              <div className="flex items-center gap-4">
                <Image
                  src={testimonials[currentIndex].image || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#fe9445]"
                />
                <div>
                  <h4 className="text-white font-bold text-lg">{testimonials[currentIndex].name}</h4>
                  <p className="text-gray-400 text-sm">{testimonials[currentIndex].role}</p>
                  <div className="flex gap-1 mt-1">
                    {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#e6b23a] text-[#e6b23a]" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? "bg-[#fe9445] w-8" : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Ir para testemunho ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
