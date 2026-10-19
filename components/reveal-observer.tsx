"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/**
 * Observa todos os elementos com o atributo `data-reveal` e adiciona a classe
 * `is-visible` quando entram no ecrã. Montado uma vez no layout; volta a
 * procurar elementos a cada mudança de página.
 */
export function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    const root = document.documentElement
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"))

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"))
      return
    }

    // Elementos já visíveis ficam revelados de imediato (sem "piscar")
    const viewportHeight = window.innerHeight
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect()
      if (rect.top < viewportHeight * 0.9 && rect.bottom > 0) el.classList.add("is-visible")
    })
    root.classList.add("reveal-ready")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    )

    elements.filter((el) => !el.classList.contains("is-visible")).forEach((el) => observer.observe(el))

    // Conteúdo adicionado depois (ex.: "Ver mais" na galeria)
    const mutations = new MutationObserver((records) => {
      records.forEach((record) =>
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return
          const added = node.matches("[data-reveal]") ? [node] : []
          added.push(...Array.from(node.querySelectorAll<HTMLElement>("[data-reveal]")))
          added.forEach((el) => observer.observe(el))
        }),
      )
    })
    mutations.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutations.disconnect()
    }
  }, [pathname])

  return null
}
