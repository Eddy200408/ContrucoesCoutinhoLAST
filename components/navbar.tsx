"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Phone, Mail, ArrowRight, Facebook, Instagram } from "lucide-react"
import type { NavLink } from "@/types"
import { company } from "@/lib/data"

interface NavbarProps {
  activePage?: string
}

const navLinks: NavLink[] = [
  { href: "/", label: "Início" },
  { href: "/services", label: "Serviços" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/about", label: "Sobre Nós" },
]

export function Navbar({ activePage }: NavbarProps) {
  const pathname = usePathname()
  const current = activePage ?? pathname
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Bloqueia o scroll da página e permite fechar com Esc enquanto o menu está aberto
  useEffect(() => {
    if (!mobileMenuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileMenuOpen(false)
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener("keydown", onKey)
    }
  }, [mobileMenuOpen])

  // Fecha o menu ao mudar de página
  useEffect(() => setMobileMenuOpen(false), [pathname])

  const solid = scrolled && !mobileMenuOpen

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
        solid ? "bg-white/90 backdrop-blur-xl py-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)]" : "bg-transparent py-3 md:py-5"
      }`}
    >
      <div className="flex items-center justify-between px-4 sm:px-[5%] lg:px-[8%]">
        <Link href="/" className="relative z-[1001] flex items-center gap-3" aria-label="Construções Coutinho — Início">
          <span className="relative block h-11 w-[88px] md:h-14 md:w-[112px]">
            <Image
              src="/icon/logoWhiteCopia.png"
              alt="Logo Construções Coutinho"
              fill
              priority
              sizes="112px"
              className={`object-contain object-left transition-opacity duration-300 ${solid ? "opacity-0" : "opacity-100"}`}
            />
            <Image
              src="/icon/LogoBlack.png"
              alt=""
              fill
              sizes="112px"
              className={`object-contain object-left transition-opacity duration-300 ${solid ? "opacity-100" : "opacity-0"}`}
            />
          </span>
          <span
            className={`font-display font-bold text-lg whitespace-nowrap transition-all duration-300 hidden sm:inline ${
              solid ? "opacity-100 text-[#333] translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"
            }`}
          >
            Construções <span className="text-[#fe9445]">Coutinho</span>
          </span>
        </Link>

        {/* Links desktop */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = current === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative py-2 font-semibold text-[15px] transition-colors ${
                    active ? "text-[#fe9445]" : solid ? "text-[#333] hover:text-[#fe9445]" : "text-white hover:text-[#fe9445]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-0.5 w-full origin-left bg-[#fe9445] transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </li>
            )
          })}
          <li>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#fe9445] text-white px-6 py-2.5 rounded-full font-bold hover:bg-[#e88438] hover:scale-105 transition-all shadow-[0_6px_20px_rgba(254,148,69,0.4)]"
            >
              Fale Conosco
            </Link>
          </li>
        </ul>

        {/* Botão do menu mobile */}
        <button
          className={`lg:hidden relative z-[1001] w-11 h-11 -mr-1 flex items-center justify-center rounded-full transition-colors ${
            mobileMenuOpen ? "bg-white/10 text-white" : solid ? "text-[#333]" : "text-white bg-black/20 backdrop-blur-sm"
          }`}
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menu mobile em ecrã inteiro */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed inset-0 z-[1000] bg-[#141414] transition-[opacity,visibility] duration-300 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="absolute inset-0 blueprint-grid opacity-70" aria-hidden="true" />
        <div className="absolute top-0 inset-x-0 h-1.5 hazard-stripes" aria-hidden="true" />

        <div className="relative h-full flex flex-col px-6 pt-24 pb-8 overflow-y-auto">
          <ul className="flex flex-col gap-1">
            {[...navLinks, { href: "/contact", label: "Contacto" }].map((link, i) => {
              const active = current === link.href
              return (
                <li
                  key={link.href}
                  className={`transition-all duration-500 ${mobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}
                  style={{ transitionDelay: mobileMenuOpen ? `${80 + i * 60}ms` : "0ms" }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between py-3.5 border-b border-white/10 font-display text-3xl font-bold ${
                      active ? "text-[#fe9445]" : "text-white active:text-[#fe9445]"
                    }`}
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="text-xs font-sans font-semibold text-white/30">0{i + 1}</span>
                      {link.label}
                    </span>
                    <ArrowRight className="w-5 h-5 opacity-40" />
                  </Link>
                </li>
              )
            })}
          </ul>

          <div
            className={`mt-auto pt-10 space-y-3 transition-all duration-500 delay-300 ${
              mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Link
              href="/contact#orcamento"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-[#fe9445] text-white py-4 rounded-xl font-bold"
            >
              Pedir Orçamento Grátis
            </Link>
            <a href={company.phoneHref} className="flex items-center gap-3 text-white/70 py-1">
              <Phone className="w-4 h-4 text-[#fe9445]" /> {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="flex items-center gap-3 text-white/70 py-1 break-all">
              <Mail className="w-4 h-4 text-[#fe9445] shrink-0" /> {company.email}
            </a>
            <div className="flex gap-3 pt-2">
              <a
                href={company.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={company.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
