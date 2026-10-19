"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowRight, ChevronDown, ShieldCheck, HardHat } from "lucide-react"
import { Crane } from "@/components/crane"
import { CountUp } from "@/components/count-up"
import { company } from "@/lib/data"

const images = ["/service-slide2 - Cópia.jpg", "/service-slide3.jpg", "/service-slide1.png", "/18.png"]

const heroStats = [
  { value: "5+", label: "Anos" },
  { value: "150+", label: "Obras" },
  { value: "98%", label: "Satisfação" },
]

export function HeroBanner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  // Quantas imagens já foram montadas — carrega-se só a atual e a seguinte (poupa dados móveis)
  const [mountedCount, setMountedCount] = useState(2)

  useEffect(() => {
    setMountedCount((count) => Math.max(count, currentImageIndex + 2))
  }, [currentImageIndex])

  useEffect(() => {
    if (paused) return
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [paused])

  // Pausa a troca de imagens quando o separador não está visível (poupa bateria/dados no telemóvel)
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden)
    document.addEventListener("visibilitychange", onVisibility)
    return () => document.removeEventListener("visibilitychange", onVisibility)
  }, [])

  return (
    <section className="hero-section relative w-full min-h-[100svh] flex flex-col overflow-hidden bg-[#141414] pb-[60px] md:pb-0">
      {/* Imagens de fundo com transição suave e zoom lento */}
      <div className="absolute inset-0" aria-hidden="true">
        {images.map((src, i) => {
          const active = i === currentImageIndex
          if (i >= mountedCount) return null
          return (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${active ? "opacity-100" : "opacity-0"}`}
            >
              <Image
                src={src}
                alt=""
                fill
                priority={i === 0}
                fetchPriority={i === 0 ? "high" : "low"}
                sizes="100vw"
                quality={70}
                className={`object-cover object-[70%_center] md:object-right ${active ? "animate-ken-burns" : ""}`}
              />
            </div>
          )
        })}
      </div>

      {/* Gradiente — vertical no telemóvel, lateral no desktop */}
      <div
        className="absolute inset-0 z-[1] md:hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(20,20,20,0.55) 0%, rgba(20,20,20,0.75) 45%, rgba(20,20,20,0.96) 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-[1] hidden md:block"
        style={{
          background:
            "linear-gradient(to right, rgba(20,20,20,0.97) 0%, rgba(20,20,20,0.92) 25%, rgba(20,20,20,0.75) 50%, rgba(20,20,20,0.3) 75%, rgba(20,20,20,0.05) 100%)",
        }}
      />
      {/* Grelha de planta técnica */}
      <div className="absolute inset-0 z-[1] blueprint-grid opacity-40 md:opacity-60 [mask-image:linear-gradient(to_right,black,transparent_70%)]" />

      {/* Grua animada (desktop) */}
      <Crane className="hidden xl:block absolute z-[1] right-[6%] top-[14%] w-[300px] opacity-25" />

      {/* Conteúdo */}
      <div className="relative z-[2] flex-1 flex items-end md:items-center px-5 sm:px-[6%] lg:pl-[8%] pt-28 pb-10 md:py-32">
        <div className="max-w-[680px] text-white">
          <div className="flex items-center gap-4 mb-6 md:mb-8 animate-rise-in">
            <span className="block w-10 h-0.5 bg-[#fe9445]" />
            <span className="text-[11px] md:text-xs font-semibold tracking-[4px] text-[#fe9445] uppercase">
              Desde {company.founded} · Cabo Verde
            </span>
          </div>

          <h1 className="font-display text-[clamp(2.9rem,11vw,6rem)] font-extrabold leading-[0.92] mb-6 md:mb-7 tracking-[-0.02em] uppercase">
            <span className="block animate-rise-in [animation-delay:120ms]">Construções</span>
            <span className="block text-[#fe9445] italic font-normal normal-case tracking-[-0.01em] animate-rise-in [animation-delay:260ms]">
              Coutinho
            </span>
          </h1>

          <p className="text-base md:text-[1.15rem] leading-[1.7] max-w-[480px] mb-8 md:mb-10 text-white/75 font-light animate-rise-in [animation-delay:400ms]">
            Construindo sonhos,
            <br />
            Transformando Espaços
          </p>

          <div className="grid grid-cols-1 min-[400px]:grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-4 animate-rise-in [animation-delay:540ms]">
            <Link
              href="/contact#orcamento"
              className="group inline-flex items-center justify-center gap-2 bg-[#fe9445] text-white px-7 py-4 rounded-xl text-sm font-bold tracking-wide border-2 border-[#fe9445] shadow-[0_8px_30px_rgba(254,148,69,0.4)] hover:bg-[#e88438] hover:border-[#e88438] hover:-translate-y-0.5 transition-all"
            >
              Solicitar Orçamento
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm text-white px-7 py-4 rounded-xl text-sm font-medium tracking-wide border border-white/25 hover:border-[#fe9445] hover:text-[#fe9445] hover:bg-[#fe9445]/[0.06] transition-all"
            >
              Ver Projectos
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/55 animate-rise-in [animation-delay:680ms]">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#fe9445]" /> Orçamento sem compromisso
            </span>
            <span className="inline-flex items-center gap-2">
              <HardHat className="w-4 h-4 text-[#fe9445]" /> Equipa qualificada
            </span>
          </div>
        </div>
      </div>

      {/* Barra de estatísticas — largura total no telemóvel, canto inferior direito no desktop */}
      <div className="relative z-[2] grid grid-cols-3 md:absolute md:bottom-0 md:right-0 md:flex">
        {heroStats.map((stat, i) => (
          <div
            key={stat.label}
            className={`px-3 py-5 md:px-10 md:py-7 text-center backdrop-blur-[16px] transition-colors hover:bg-[#fe9445]/15 ${
              i > 0 ? "border-l border-white/[0.08]" : ""
            }`}
            style={{ background: "rgba(20,20,20,0.6)" }}
          >
            <CountUp
              value={stat.value}
              className="block font-display text-2xl md:text-[1.9rem] font-extrabold text-[#fe9445] leading-none mb-1"
            />
            <span className="text-[0.65rem] md:text-[0.7rem] text-white/55 font-medium tracking-[2px] uppercase">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Indicadores das imagens */}
      <div className="absolute z-[2] right-5 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImageIndex(i)}
            aria-label={`Mostrar imagem ${i + 1}`}
            className={`w-1.5 rounded-full transition-all duration-500 ${
              i === currentImageIndex ? "h-8 bg-[#fe9445]" : "h-3 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Indicador de scroll */}
      <a
        href="#sobre"
        className="hidden md:flex absolute bottom-8 left-[8%] z-[2] flex-col items-center gap-2 text-white/40 hover:text-[#fe9445] transition-colors"
        aria-label="Scroll para baixo"
      >
        <span className="text-[10px] tracking-[3px] uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-float" />
      </a>
    </section>
  )
}
