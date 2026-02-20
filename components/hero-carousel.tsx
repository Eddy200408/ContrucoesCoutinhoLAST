"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Slide } from "@/types"

interface HeroCarouselProps {
  slides: Slide[]
  autoPlayInterval?: number
}

export function HeroCarousel({ slides, autoPlayInterval = 5000 }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, autoPlayInterval)
    return () => clearInterval(interval)
  }, [slides.length, autoPlayInterval])

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/65 to-black/75" />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-8">
            <small className="text-[#fe9445] tracking-widest font-bold">{slide.small}</small>
            <h1 className="text-4xl md:text-6xl font-light my-3 leading-tight">
              {slide.title} <span className="text-[#fe9445]">{slide.span}</span>
            </h1>
            <p className="max-w-[70%] text-lg text-white/90 my-6">{slide.description}</p>
            <div className="flex gap-4 flex-wrap justify-center">
              <Link
                href={slide.cta1.href}
                className="bg-[#fe9445] text-white px-6 py-3 rounded-full font-bold border-2 border-[#fe9445] hover:-translate-y-0.5 transition-transform"
              >
                {slide.cta1.text}
              </Link>
              <Link
                href={slide.cta2.href}
                className="bg-transparent text-white px-6 py-3 rounded-full font-bold border-2 border-white/80 hover:bg-white/5 transition-colors"
              >
                {slide.cta2.text}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 bg-black/35 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-black/50 transition-colors"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 bg-black/35 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-black/50 transition-colors"
        aria-label="Próximo"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === currentSlide ? "bg-[#fe9445] shadow-[0_0_0_4px_rgba(254,148,69,0.12)]" : "bg-white/45"
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
