"use client"

import type { CSSProperties } from "react"
import Image from "next/image"

interface LoaderProps {
  isLoading: boolean
  /** Quando true, o loader desvanece antes de ser removido */
  fading?: boolean
}

const BRICKS = [
  // fila de baixo
  { x: 0, y: 2, d: 0 },
  { x: 1, y: 2, d: 1 },
  { x: 2, y: 2, d: 2 },
  // fila do meio (desfasada, como uma parede real)
  { x: 0.5, y: 1, d: 3 },
  { x: 1.5, y: 1, d: 4 },
  // topo
  { x: 1, y: 0, d: 5 },
]

export function Loader({ isLoading, fading = false }: LoaderProps) {
  if (!isLoading) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 flex items-center justify-center z-[9999] transition-opacity duration-500 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Overlay escuro com grelha de planta técnica */}
      <div className="absolute inset-0 bg-[#141414]/95 backdrop-blur-md" />
      <div className="absolute inset-0 blueprint-grid opacity-60" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="relative w-[132px] h-[120px]">
          {/* Picareta a martelar */}
          <div className="absolute -top-2 right-0 origin-bottom-left">
            <Image
              src="/icon/picareta.png"
              alt=""
              width={64}
              height={64}
              priority
              className="animate-[martelar_0.8s_ease-in-out_infinite]"
              style={{
                filter: "invert(47%) sepia(93%) saturate(1360%) hue-rotate(-15deg) brightness(101%) contrast(101%)",
              }}
            />
            {/* Faíscas */}
            {[
              { sx: "14px", sy: "-10px", delay: "0s" },
              { sx: "-12px", sy: "-14px", delay: "0.2s" },
              { sx: "6px", sy: "-18px", delay: "0.4s" },
            ].map((s, i) => (
              <span
                key={i}
                className="absolute left-1 bottom-1 w-1.5 h-1.5 rounded-full bg-[#e6b23a]"
                style={
                  {
                    "--sx": s.sx,
                    "--sy": s.sy,
                    animation: `spark 0.8s ease-out ${s.delay} infinite`,
                  } as CSSProperties
                }
              />
            ))}
          </div>

          {/* Parede de tijolos a ser construída */}
          <div className="absolute bottom-0 left-0 w-[96px] h-[60px]">
            {BRICKS.map((b, i) => (
              <span
                key={i}
                className="absolute w-[30px] h-[18px] rounded-[3px] bg-gradient-to-br from-[#fe9445] to-[#c96a24] shadow-[inset_0_-2px_0_rgba(0,0,0,0.25)]"
                style={{
                  left: `${b.x * 32}px`,
                  top: `${b.y * 20 + 2}px`,
                  animation: `brick-drop 0.5s cubic-bezier(0.22,1,0.36,1) ${b.d * 0.16}s both`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="font-display text-white text-xl font-bold tracking-[0.2em] uppercase">
            Construções <span className="text-[#fe9445]">Coutinho</span>
          </p>
          <p className="text-white/50 text-xs tracking-[0.3em] uppercase mt-2">A preparar a obra…</p>
        </div>

        <div className="w-48 h-1.5 rounded-full overflow-hidden bg-white/10">
          <div className="h-full hazard-stripes hazard-stripes-animated origin-left animate-[progress-fill_1.2s_ease-out_both]" />
        </div>
      </div>
    </div>
  )
}
