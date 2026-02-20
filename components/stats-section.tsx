"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import type { Stat } from "@/types"

interface StatsSectionProps {
  stats: Stat[]
}

export function StatsSection({ stats }: StatsSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#fe9445] to-[#e6b23a] flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Image
                  src={stat.icon || "/placeholder.svg"}
                  alt=""
                  width={40}
                  height={40}
                  className="brightness-0 invert"
                />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-[#fe9445] mb-2">{stat.number}</div>
              <div className="font-bold text-[#232323] mb-1">{stat.title}</div>
              <div className="text-gray-500 text-sm">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
