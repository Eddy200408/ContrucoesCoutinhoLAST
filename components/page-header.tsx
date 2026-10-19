import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface PageHeaderProps {
  title: string
  subtitle?: string
  backgroundImage?: string
}

export function PageHeader({ title, subtitle, backgroundImage = "/sao-vicente.jpg" }: PageHeaderProps) {
  const words = title.split(" ")
  return (
    <header className="relative h-[52svh] min-h-[380px] md:h-[56vh] md:min-h-[440px] flex items-end md:items-center justify-center overflow-hidden bg-[#141414]">
      <Image
        src={backgroundImage || "/placeholder.svg"}
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={70}
        className="object-cover animate-ken-burns"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/85" />
      <div className="absolute inset-0 blueprint-grid opacity-50" aria-hidden="true" />

      <div className="relative z-10 text-center text-white px-5 pb-12 md:pb-0 pt-24">
        <nav aria-label="Navegação estrutural" className="mb-4 animate-rise-in">
          <ol className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.15em] uppercase text-white/60">
            <li>
              <Link href="/" className="hover:text-[#fe9445] transition-colors">
                Início
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="w-3.5 h-3.5" />
            </li>
            <li className="text-[#fe9445]" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>
        <h1 className="font-display text-[2.6rem] leading-[1] sm:text-5xl md:text-7xl font-extrabold mb-4 tracking-tight animate-rise-in [animation-delay:120ms]">
          {words.slice(0, -1).join(" ")} <span className="text-[#fe9445]">{words.slice(-1)}</span>
        </h1>
        {subtitle && (
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto animate-rise-in [animation-delay:240ms]">{subtitle}</p>
        )}
      </div>

      <div className="absolute bottom-0 inset-x-0 h-1.5 hazard-stripes" aria-hidden="true" />
    </header>
  )
}
