"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Phone, FileText } from "lucide-react"
import { company } from "@/lib/data"
import { WhatsAppIcon } from "@/components/icons"

export { WhatsAppIcon }

const whatsappHref = company.whatsappMessage("Olá! Gostaria de mais informações sobre os serviços da Construções Coutinho.")

/**
 * Ações rápidas de contacto:
 * - Mobile: barra fixa no fundo do ecrã (Ligar · WhatsApp · Orçamento) — o polegar chega facilmente
 * - Desktop: botão flutuante do WhatsApp
 */
export function FloatingActions() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop — botão WhatsApp */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="hidden md:flex fixed bottom-8 left-8 z-[999] w-14 h-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] hover:scale-110 transition-transform group"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-[ring_2s_ease-out_infinite]" aria-hidden="true" />
        <WhatsAppIcon className="relative w-7 h-7" />
        <span className="absolute left-full ml-3 whitespace-nowrap rounded-lg bg-[#232323] px-3 py-1.5 text-sm font-semibold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none">
          Fale connosco
        </span>
      </a>

      {/* Mobile — barra de ações */}
      <nav
        aria-label="Contacto rápido"
        className="md:hidden fixed inset-x-0 bottom-0 z-[999] border-t border-white/10 bg-[#1a1a1a]/95 backdrop-blur-lg pb-safe"
      >
        <div className="grid grid-cols-3">
          <a
            href={company.phoneHref}
            className="flex flex-col items-center justify-center gap-1 py-2.5 text-white/80 active:bg-white/5"
          >
            <Phone className="w-5 h-5" />
            <span className="text-[11px] font-semibold">Ligar</span>
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 py-2.5 text-[#25D366] active:bg-white/5"
          >
            <WhatsAppIcon className="w-5 h-5" />
            <span className="text-[11px] font-semibold text-white/80">WhatsApp</span>
          </a>
          <Link
            href="/contact#orcamento"
            className={`flex flex-col items-center justify-center gap-1 py-2.5 font-semibold ${
              pathname === "/contact" ? "text-[#fe9445]" : "bg-[#fe9445] text-white"
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="text-[11px]">Orçamento</span>
          </Link>
        </div>
      </nav>
      {/* Espaço para a barra não tapar o fim do rodapé */}
      <div className="md:hidden h-[60px] bg-[#141414]" aria-hidden="true" />
    </>
  )
}
