"use client"

import { useEffect, useRef, useState } from "react"

interface CountUpProps {
  /** Valor como aparece no site, ex.: "150+", "98%", "5+" */
  value: string
  duration?: number
  className?: string
}

/** Anima o número de 0 até ao valor final quando entra no ecrã. */
export function CountUp({ value, duration = 1800, className }: CountUpProps) {
  const match = value.match(/^(\D*)(\d+)(.*)$/)
  const target = match ? Number.parseInt(match[2], 10) : 0
  const [current, setCurrent] = useState(target)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !match) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    setCurrent(0)
    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - t, 3)
          setCurrent(Math.round(target * eased))
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration])

  if (!match) return <span className={className}>{value}</span>

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">
        {match[1]}
        {current}
        {match[3]}
      </span>
    </span>
  )
}
