"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export function HeroBanner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = [
    "service-slide2 - Cópia.jpg",
    "service-slide3.jpg",
    "service-slide1.png",
    "18.png",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      className="hero-section relative w-full min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: `url('${images[currentImageIndex]}')`,
        backgroundSize: "cover",
        backgroundPosition: "center right",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      {/* Gradient overlay - dark left, transparent right */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to right, rgba(20,20,20,0.97) 0%, rgba(20,20,20,0.92) 25%, rgba(20,20,20,0.75) 50%, rgba(20,20,20,0.3) 75%, rgba(20,20,20,0.05) 100%)",
        }}
      />

      {/* Accent line left edge 
      <div
        className="absolute left-0 top-0 w-[5px] h-full z-[3]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, #fe9445 30%, #fe9445 70%, transparent 100%)",
        }}
      />*/}

      {/* Content */}
      <div className="relative z-[2] pl-[8%] pr-8 max-w-[680px] text-white">
        {/* Tag */}
        <div className="flex items-center gap-4 mb-8">
          <span className="block w-10 h-0.5 bg-[#fe9445]" />
          <span className="text-xs font-semibold tracking-[4px] text-[#fe9445] uppercase">
            DESDE 2021
          </span>
        </div>

        <h1 className="text-[clamp(3rem,7vw,5.5rem)] font-black leading-[0.95] mb-7 -tracking-[2px]">
          Construcoes
          <br />
          <span className="text-[#fe9445] italic font-light -tracking-[1px]">
            Coutinho
          </span>
        </h1>

        <p className="text-[1.05rem] leading-[1.8] max-w-[480px] mb-10 text-white/65 font-light">
          Construindo sonhos, 
          <br />
          Transformando Espaços
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-[#fe9445] text-white px-8 py-4 rounded-lg text-sm font-bold tracking-wide border-2 border-[#fe9445] shadow-[0_4px_24px_rgba(254,148,69,0.35)] hover:bg-[#e88438] hover:border-[#e88438] hover:-translate-y-0.5 transition-all"
          >
            Solicitar Orcamento
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 rounded-lg text-sm font-medium tracking-wide border border-white/25 hover:border-[#fe9445] hover:text-[#fe9445] hover:bg-[#fe9445]/[0.06] transition-all"
          >
            Ver Projectos
          </Link>
        </div>
      </div>

      {/* Stats bar at bottom right */}
      <div className="absolute bottom-0 right-0 z-[2] flex">
        {[
          { value: "5+", label: "Anos" },
          { value: "150+", label: "Obras" },
          { value: "98%", label: "Satisfacao" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className={`px-10 py-7 text-center backdrop-blur-[16px] transition-colors hover:bg-[#fe9445]/15 ${
              i > 0 ? "border-l border-white/[0.08]" : ""
            }`}
            style={{ background: "rgba(20,20,20,0.6)" }}
          >
            <strong className="block text-[1.75rem] font-black text-[#fe9445] leading-none mb-1">
              {stat.value}
            </strong>
            <span className="text-[0.7rem] text-white/50 font-medium tracking-[2px] uppercase">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-[8%] z-[2] text-white/40 hover:text-[#fe9445] transition-colors"
        aria-label="Scroll para baixo"
        style={{ animation: "heroFloat 2.5s ease-in-out infinite" }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </a>
    </section>
  )
}
