"use client"

import Image from "next/image"

interface LoaderProps {
  isLoading: boolean
}

export function Loader({ isLoading }: LoaderProps) {
  if (!isLoading) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] transition-opacity duration-500">
      {/* Overlay escuro separado para garantir */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      
      {/* Conteúdo do loader com z-index maior para ficar acima do overlay */}
      <div className="relative z-10 flex flex-col items-center gap-5">
        <Image
          src="/icon/picareta.png"
          alt="Picareta"
          width={80}
          height={80}
          className="animate-[martelar_0.8s_ease-in-out_infinite]"
          style={{
            filter: "invert(47%) sepia(93%) saturate(1360%) hue-rotate(-15deg) brightness(101%) contrast(101%)",
          }}
        />
        <p className="text-white text-lg font-bold">Loading</p>
      </div>
    </div>
  )
}