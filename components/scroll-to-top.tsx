"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronUp } from "lucide-react"

const RADIUS = 22
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function ScrollToTop() {
  const [showButton, setShowButton] = useState(false)
  const circleRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? window.scrollY / max : 0
      setShowButton(window.scrollY > 600)
      if (circleRef.current) circleRef.current.style.strokeDashoffset = `${CIRCUMFERENCE * (1 - progress)}`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-[84px] right-4 md:bottom-8 md:right-8 w-12 h-12 md:w-[52px] md:h-[52px] bg-[#232323] text-white rounded-full flex items-center justify-center cursor-pointer z-[998] shadow-xl transition-all duration-300 hover:bg-[#fe9445] ${
        showButton ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-4"
      }`}
      title="Voltar ao topo"
      aria-label="Voltar ao topo"
    >
      {/* Anel com o progresso de leitura */}
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 52 52" aria-hidden="true">
        <circle cx="26" cy="26" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
        <circle
          ref={circleRef}
          cx="26"
          cy="26"
          r={RADIUS}
          fill="none"
          stroke="#fe9445"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
        />
      </svg>
      <ChevronUp className="relative w-6 h-6" />
    </button>
  )
}
