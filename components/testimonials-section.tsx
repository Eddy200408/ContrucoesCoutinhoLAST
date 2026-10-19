"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import type { Testimonial } from "@/types"
import { SectionHeading } from "@/components/section-heading"

// Caminhos corrigidos: a pasta é "Testemunhos" e algumas extensões são em maiúsculas (.JPG)
const testimonials: Testimonial[] = [
  {
    name: "Helder Santos",
    role: "Proprietário Residencial",
    image: "/Testemunhos/Helder.jpg",
    text: "Excelente trabalho da equipa da Construções Coutinho! Construíram a minha casa de sonho em São Vicente com qualidade impecável. Recomendo vivamente!",
    rating: 5,
  },
  {
    name: "Eddy Coutinho",
    role: "Empresário",
    image: "/Testemunhos/Eddy.jpg",
    text: "Profissionalismo e dedicação desde o primeiro contacto. O meu estabelecimento comercial ficou exactamente como planeado. Obrigado pela excelência!",
    rating: 5,
  },
  {
    name: "Rufino Santos",
    role: "Policia",
    image: "/Testemunhos/Rufino.JPG",
    text: "Sou exigente com os detalhes. A Construções Coutinho superou as minhas expectativas na execução do projecto. Parceria de confiança!",
    rating: 5,
  },
  {
    name: "Carla Coutinho",
    role: "Engenheira",
    image: "/Testemunhos/Carla.JPG",
    text: "Já realizei três projectos com a Construções Coutinho. Qualidade consistente, prazos cumpridos e preços justos. São os melhores em Cabo Verde!",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [paused, setPaused] = useState(false)
  const touchStart = useRef<number | null>(null)

  const goTo = useCallback((getIndex: (prev: number) => number) => {
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentIndex(getIndex)
      setIsAnimating(false)
    }, 250)
  }, [])

  const nextTestimonial = useCallback(() => goTo((prev) => (prev + 1) % testimonials.length), [goTo])
  const prevTestimonial = useCallback(
    () => goTo((prev) => (prev - 1 + testimonials.length) % testimonials.length),
    [goTo],
  )

  useEffect(() => {
    if (paused) return
    const interval = setInterval(nextTestimonial, 6000)
    return () => clearInterval(interval)
  }, [paused, nextTestimonial])

  const current = testimonials[currentIndex]

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-[#232323] to-[#1a1a1a] relative overflow-hidden">
      {/* Decoração de fundo */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#fe9445]/10 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#e6b23a]/10 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute inset-0 blueprint-grid opacity-50" aria-hidden="true" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading
          dark
          eyebrow="Testemunhos"
          title={
            <>
              O Que Dizem os Nossos <span className="text-[#fe9445]">Clientes</span>
            </>
          }
          description="A satisfação dos nossos clientes é a nossa maior recompensa. Veja o que dizem sobre o nosso trabalho."
        />

        <div
          className="relative"
          data-reveal
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={(e) => {
            touchStart.current = e.touches[0].clientX
            setPaused(true)
          }}
          onTouchEnd={(e) => {
            if (touchStart.current === null) return
            const dx = e.changedTouches[0].clientX - touchStart.current
            if (dx < -50) nextTestimonial()
            else if (dx > 50) prevTestimonial()
            touchStart.current = null
            setPaused(false)
          }}
        >
          {/* Cartão do testemunho */}
          <div className="relative bg-white/[0.04] backdrop-blur-sm rounded-3xl p-6 sm:p-10 md:p-14 border border-white/10 md:mx-16">
            <Quote className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 md:w-20 md:h-20 text-[#fe9445]/15" aria-hidden="true" />

            <div
              className={`transition-all duration-300 ${isAnimating ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"}`}
              aria-live="polite"
            >
              <div className="flex gap-1 mb-5">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-[#e6b23a] text-[#e6b23a]" />
                ))}
              </div>
              <blockquote className="text-lg md:text-2xl text-gray-200 font-light leading-relaxed mb-8 min-h-[7rem] md:min-h-[6rem]">
                “{current.text}”
              </blockquote>

              <div className="flex items-center gap-4">
                <Image
                  src={current.image || "/placeholder.svg"}
                  alt={current.name}
                  width={64}
                  height={64}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-[#fe9445]"
                />
                <div>
                  <h4 className="text-white font-bold text-base md:text-lg">{current.name}</h4>
                  <p className="text-gray-400 text-sm">{current.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navegação */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="md:absolute md:left-0 md:top-1/2 md:-translate-y-[calc(50%+2.5rem)] z-20 bg-white/10 md:bg-[#fe9445] text-white w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center hover:bg-[#e88438] transition-colors shadow-lg"
              aria-label="Testemunho anterior"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <div className="flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(() => index)}
                  className="p-1.5"
                  aria-label={`Ir para testemunho ${index + 1}`}
                  aria-current={index === currentIndex}
                >
                  <span
                    className={`block h-2.5 rounded-full transition-all duration-300 ${
                      index === currentIndex ? "bg-[#fe9445] w-8" : "bg-white/30 w-2.5 hover:bg-white/50"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="md:absolute md:right-0 md:top-1/2 md:-translate-y-[calc(50%+2.5rem)] z-20 bg-white/10 md:bg-[#fe9445] text-white w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center hover:bg-[#e88438] transition-colors shadow-lg"
              aria-label="Próximo testemunho"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
