"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import type { NavLink } from "@/types"

interface NavbarProps {
  activePage?: string
}

const navLinks: NavLink[] = [
  { href: "/", label: "Início" },
  { href: "/services", label: "Serviços" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/about", label: "Sobre Nós" },
]

export function Navbar({ activePage = "/" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-[5%] lg:px-[10%] transition-all duration-300 ${
        scrolled ? "bg-white py-3 shadow-lg" : "bg-transparent py-6"
      }`}
    >
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/icon/logoWhiteCopia.png"
          alt="Logo Construções Coutinho"
          width={100}
          height={10}
          className={`transition-all duration-300 ${scrolled ? "w-12 h-12" : "w-14 h-14"}`}
          style={{ width: "17vh", height: "10vh" }}
        />
        <span
          className={`font-bold text-lg whitespace-nowrap transition-all duration-300 ${
            scrolled ? "opacity-100 text-[#333]" : "opacity-0 pointer-events-none"
          }`}
        >
          Construções <span className="text-[#fe9445]">Coutinho</span>
        </span>
      </Link>

      {/* Mobile menu button */}
      <button className="lg:hidden z-[1001] p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
        {mobileMenuOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <Menu className={`w-7 h-7 ${scrolled ? "text-[#333]" : "text-white"}`} />
        )}
      </button>

      {/* Navigation links */}
      <ul
        className={`items-center gap-6 ${
          mobileMenuOpen
            ? "fixed inset-0 flex flex-col justify-center items-center bg-[#232323] z-[1000]"
            : "hidden lg:flex"
        }`}
      >
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`font-semibold text-base transition-colors relative ${
                activePage === link.href
                  ? "text-[#fe9445]"
                  : mobileMenuOpen
                    ? "text-white hover:text-[#fe9445]"
                    : scrolled
                      ? "text-[#333] hover:text-[#fe9445]"
                      : "text-white hover:text-[#fe9445]"
              }`}
            >
              {link.label}
              {activePage === link.href && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#fe9445]" />}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-[#fe9445] text-white px-6 py-2.5 rounded-full font-bold hover:bg-[#e88438] hover:scale-105 transition-all inline-block shadow-lg"
          >
            Fale Conosco
          </Link>
        </li>
      </ul>
    </nav>
  )
}
