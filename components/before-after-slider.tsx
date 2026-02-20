"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import type { BeforeAfter } from "@/types"

interface BeforeAfterSliderProps {
  item: BeforeAfter
}

export function BeforeAfterSlider({ item }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX)
  }

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false)
    window.addEventListener("mouseup", handleGlobalMouseUp)
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp)
  }, [])

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
      <div
        ref={containerRef}
        className="relative h-[300px] md:h-[400px] cursor-col-resize select-none"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* After Image (Background) */}
        <div className="absolute inset-0">
          <Image src={item.after || "/placeholder.svg"} alt={`${item.title} - Depois`} fill className="object-cover" />
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            DEPOIS
          </div>
        </div>

        {/* Before Image (Clipped) */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
          <Image src={item.before || "/placeholder.svg"} alt={`${item.title} - Antes`} fill className="object-cover" />
          <div className="absolute top-4 left-4 bg-[#fe9445] text-white px-3 py-1 rounded-full text-sm font-bold">
            ANTES
          </div>
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-10"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
            <div className="flex gap-0.5">
              <div className="w-0.5 h-4 bg-[#fe9445] rounded-full" />
              <div className="w-0.5 h-4 bg-[#fe9445] rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <span className="text-[#fe9445] text-sm font-bold tracking-wider">{item.category}</span>
        <h3 className="text-xl font-bold text-[#232323] mt-1">{item.title}</h3>
        <p className="text-gray-600 mt-2">{item.description}</p>
      </div>
    </div>
  )
}
