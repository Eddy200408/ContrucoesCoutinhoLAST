"use client"

import { useState, useEffect } from "react"
import { ChevronUp } from "lucide-react"

export function ScrollToTop() {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout

    const handleActivity = () => {
      setShowButton(false)
      clearTimeout(inactivityTimer)
      inactivityTimer = setTimeout(() => {
        if (window.scrollY > 0) {
          setShowButton(true)
        }
      }, 2000)
    }

    window.addEventListener("scroll", handleActivity)
    window.addEventListener("keydown", handleActivity)

    return () => {
      window.removeEventListener("scroll", handleActivity)
      window.removeEventListener("keydown", handleActivity)
      clearTimeout(inactivityTimer)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-10 right-10 w-[50px] h-[50px] bg-[#fe9445] text-white rounded-[25%] flex items-center justify-center cursor-pointer z-[1000] transition-all duration-300 ${
        showButton ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      title="Voltar ao topo"
      aria-label="Voltar ao topo"
    >
      <ChevronUp className="w-7 h-7" />
    </button>
  )
}
