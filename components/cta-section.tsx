import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Crane } from "@/components/crane"

interface CTASectionProps {
  title: string
  description: string
  primaryButton: { text: string; href: string }
  secondaryButton: { text: string; href: string }
}

export function CTASection({ title, description, primaryButton, secondaryButton }: CTASectionProps) {
  return (
    <section className="relative py-20 md:py-28 px-4 sm:px-6 overflow-hidden">
      {/* Fundo */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fe9445] via-[#e6b23a] to-[#fe9445]" />
      {/* Nomes de ficheiro sem acentos/espaços: o Cloudflare não publica "SãoVicente.jpg" */}
      <Image src="/sao-vicente.jpg" alt="" fill sizes="100vw" quality={50} className="object-cover opacity-10 mix-blend-multiply" />
      <div className="absolute inset-0 blueprint-grid-light opacity-50" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-2 hazard-stripes opacity-80" aria-hidden="true" />

      {/* Grua decorativa */}
      <Crane
        className="absolute -right-10 bottom-0 w-[200px] md:w-[300px] opacity-20 md:opacity-25 hidden sm:block"
        color="#232323"
        loadColor="#ffffff"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center" data-reveal>
        <h2 className="font-display text-[2.1rem] md:text-6xl font-extrabold text-white mb-5 leading-[1.05] tracking-tight">
          {title}
        </h2>
        <p className="text-white/90 text-base md:text-lg mb-9 max-w-2xl mx-auto">{description}</p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link
            href={primaryButton.href}
            className="group inline-flex items-center justify-center gap-2 bg-[#232323] text-white px-10 py-4 rounded-full font-bold hover:bg-[#141414] transition-colors shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
          >
            {primaryButton.text}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href={secondaryButton.href}
            className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm text-white px-10 py-4 rounded-full font-bold border-2 border-white hover:bg-white hover:text-[#fe9445] transition-colors"
          >
            {secondaryButton.text}
          </Link>
        </div>
      </div>
    </section>
  )
}
