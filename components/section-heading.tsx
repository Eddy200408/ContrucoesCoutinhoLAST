import type React from "react"

interface SectionHeadingProps {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: "center" | "left"
  dark?: boolean
  className?: string
}

/** Título de secção com etiqueta, destaque laranja e uma "fita métrica" que se desenha ao entrar no ecrã. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center"
  return (
    <div data-reveal className={`${centered ? "text-center mx-auto" : ""} max-w-2xl mb-10 md:mb-14 ${className}`}>
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-2 text-[#fe9445] font-bold tracking-[0.2em] text-xs uppercase ${
            centered ? "justify-center" : ""
          }`}
        >
          <span className="w-6 h-px bg-[#fe9445]" aria-hidden="true" />
          {eyebrow}
          {centered && <span className="w-6 h-px bg-[#fe9445]" aria-hidden="true" />}
        </span>
      )}
      <h2
        className={`font-display text-[2rem] leading-[1.05] md:text-5xl font-extrabold mt-3 tracking-tight ${
          dark ? "text-white" : "text-[#232323]"
        }`}
      >
        {title}
      </h2>
      <div className={`ruler w-28 mt-5 ${centered ? "mx-auto" : ""}`} aria-hidden="true" />
      {description && (
        <p className={`mt-5 text-base md:text-lg leading-relaxed ${dark ? "text-white/60" : "text-gray-600"}`}>
          {description}
        </p>
      )}
    </div>
  )
}
