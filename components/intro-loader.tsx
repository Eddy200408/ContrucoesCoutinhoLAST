"use client"

import { useEffect, useState } from "react"
import { Loader } from "@/components/loader"

const SESSION_KEY = "cc-intro-seen"

/**
 * Mostra o loader apenas na primeira visita da sessão, por cima do conteúdo
 * (que já está renderizado por baixo). Antes, cada página escondia todo o
 * conteúdo durante 1–1,5 s, o que atrasava o carregamento e prejudicava o SEO.
 */
export function IntroLoader() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1"
      sessionStorage.setItem(SESSION_KEY, "1")
    } catch {
      // armazenamento indisponível (modo privado) — segue normalmente
    }

    if (seen) {
      setVisible(false)
      return
    }

    const started = performance.now()
    let hideTimer: ReturnType<typeof setTimeout>
    let removeTimer: ReturnType<typeof setTimeout>

    let hiding = false
    const hide = () => {
      if (hiding) return
      hiding = true
      const elapsed = performance.now() - started
      hideTimer = setTimeout(() => {
        setFading(true)
        removeTimer = setTimeout(() => setVisible(false), 500)
      }, Math.max(0, 900 - elapsed))
    }

    // Esconde quando a página carrega, com um máximo de 2,5 s
    const maxTimer = setTimeout(hide, 2500)
    if (document.readyState === "complete") hide()
    else window.addEventListener("load", hide, { once: true })

    return () => {
      clearTimeout(maxTimer)
      clearTimeout(hideTimer)
      clearTimeout(removeTimer)
      window.removeEventListener("load", hide)
    }
  }, [])

  return <Loader isLoading={visible} fading={fading} />
}
