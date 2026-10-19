"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { MoveHorizontal } from "lucide-react"
import type { BeforeAfter } from "@/types"

interface BeforeAfterSliderProps {
  item: BeforeAfter
}

export function BeforeAfterSlider({ item }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [touched, setTouched] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  // Eventos de ponteiro unificam rato e toque; "touch-action: pan-y" deixa a página
  // continuar a fazer scroll vertical enquanto se arrasta na horizontal
  const handlePointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    setIsDragging(true)
    setTouched(true)
    handleMove(e.clientX)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) handleMove(e.clientX)
  }

  useEffect(() => {
    const handleGlobalUp = () => setIsDragging(false)
    window.addEventListener("pointerup", handleGlobalUp)
    return () => window.removeEventListener("pointerup", handleGlobalUp)
  }, [])

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)]" data-reveal>
      <div
        ref={containerRef}
        className="relative aspect-[4/3] cursor-col-resize select-none touch-pan-y"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={() => setIsDragging(false)}
      >
        {/* Depois (fundo) */}
        <div className="absolute inset-0">
          <Image
            src={item.after || "/placeholder.svg"}
            alt={`${item.title} - Depois`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
            draggable={false}
          />
          <div className="absolute top-3 right-3 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider shadow">
            DEPOIS
          </div>
        </div>

        {/* Antes (recortado) */}
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
          <Image
            src={item.before || "/placeholder.svg"}
            alt={`${item.title} - Antes`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
            draggable={false}
          />
          <div className="absolute top-3 left-3 bg-[#fe9445] text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider shadow">
            ANTES
          </div>
        </div>

        {/* Pega do slider */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white z-10 shadow-[0_0_12px_rgba(0,0,0,0.4)] pointer-events-none"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        >
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-[#fe9445] transition-transform ${
              isDragging ? "scale-110" : ""
            } ${touched ? "" : "animate-[crane-swing_2.2s_ease-in-out_infinite]"}`}
          >
            <MoveHorizontal className="w-5 h-5" />
          </div>
        </div>

        {/* Controlo acessível (teclado e leitores de ecrã) */}
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(sliderPosition)}
          onChange={(e) => {
            setTouched(true)
            setSliderPosition(Number(e.target.value))
          }}
          aria-label={`Comparar antes e depois: ${item.title}`}
          className="absolute inset-0 w-full h-full opacity-0 pointer-events-none focus-visible:pointer-events-auto"
        />
      </div>

      <div className="p-5 md:p-6">
        <span className="text-[#fe9445] text-xs font-bold tracking-[0.15em] uppercase">{item.category}</span>
        <h3 className="font-display text-xl md:text-2xl font-bold text-[#232323] mt-1">{item.title}</h3>
        <p className="text-gray-600 mt-2 text-sm md:text-base">{item.description}</p>
      </div>
    </div>
  )
}
