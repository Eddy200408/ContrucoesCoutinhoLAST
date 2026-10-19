import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Phone } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Crane } from "@/components/crane"
import { company } from "@/lib/data"

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false },
}

export default function NotFound() {
  return (
    <main id="conteudo" className="bg-[#141414] text-white">
      <Navbar />
      <section className="relative min-h-[100svh] flex items-center justify-center px-5 pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 blueprint-grid" aria-hidden="true" />
        <div className="absolute top-20 inset-x-0 h-2 hazard-stripes hazard-stripes-animated opacity-80" aria-hidden="true" />

        <div className="relative grid md:grid-cols-[auto_1fr] items-center gap-8 md:gap-14 max-w-4xl">
          <Crane className="w-[200px] md:w-[300px] mx-auto" />
          <div className="text-center md:text-left">
            <p className="font-display text-[5rem] md:text-[8rem] font-extrabold leading-none text-[#fe9445]">404</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold mt-2">Esta página ainda está em obras</h1>
            <p className="text-white/60 mt-4 max-w-md mx-auto md:mx-0">
              A página que procura não existe ou foi mudada de lugar. Volte ao início ou fale connosco.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center md:justify-start">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-[#fe9445] text-white px-7 py-3.5 rounded-full font-bold hover:bg-[#e88438] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Voltar ao início
              </Link>
              <a
                href={company.phoneHref}
                className="inline-flex items-center justify-center gap-2 border border-white/25 px-7 py-3.5 rounded-full font-bold hover:border-[#fe9445] hover:text-[#fe9445] transition-colors"
              >
                <Phone className="w-4 h-4" /> {company.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
