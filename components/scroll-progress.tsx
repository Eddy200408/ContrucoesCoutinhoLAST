"use client"

import { useEffect, useRef } from "react"

/** Barra de progresso de leitura no topo, com padrão de fita de obra. */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? window.scrollY / max : 0
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[1002] h-1 pointer-events-none">
      <div ref={barRef} className="h-full origin-left hazard-stripes will-change-transform" style={{ transform: "scaleX(0)" }} />
    </div>
  )
}
