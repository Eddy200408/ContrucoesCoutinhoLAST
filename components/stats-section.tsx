"use client"

import type { CSSProperties } from "react"
import Image from "next/image"
import type { Stat } from "@/types"
import { CountUp } from "@/components/count-up"

interface StatsSectionProps {
  stats: Stat[]
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="relative bg-white py-14 md:py-20 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 blueprint-grid-light opacity-60" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              data-reveal
              style={{ "--reveal-delay": `${index * 120}ms` } as CSSProperties}
              className="group relative text-center rounded-2xl bg-white border border-gray-100 p-5 sm:p-6 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(254,148,69,0.35)] transition-all duration-500"
            >
              <span
                className="absolute inset-x-6 top-0 h-1 rounded-b-full bg-gradient-to-r from-[#fe9445] to-[#e6b23a] scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                aria-hidden="true"
              />
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#fe9445] to-[#e6b23a] flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:rotate-6 transition-transform duration-500">
                <Image
                  src={stat.icon || "/placeholder.svg"}
                  alt=""
                  width={40}
                  height={40}
                  className="w-7 h-7 sm:w-10 sm:h-10 brightness-0 invert"
                />
              </div>
              <CountUp value={stat.number} className="block font-display text-4xl md:text-5xl font-extrabold text-[#fe9445] mb-2" />
              <div className="font-bold text-[#232323] text-sm sm:text-base mb-1">{stat.title}</div>
              <div className="text-gray-500 text-xs sm:text-sm">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
