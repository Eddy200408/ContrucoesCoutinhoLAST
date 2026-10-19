import type { Metadata } from "next"
import type { CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { PageHeader } from "@/components/page-header"
import { StatsSection } from "@/components/stats-section"
import { CTASection } from "@/components/cta-section"
import { SectionHeading } from "@/components/section-heading"
import { ProcessSection } from "@/components/process-section"
import { companyStats } from "@/lib/data"
import type { Feature } from "@/types"

export const metadata: Metadata = {
  title: "Sobre Nós",
  description:
    "Conheça a história, a missão e os valores da Construções Coutinho — construção civil com qualidade, segurança e compromisso em Cabo Verde.",
  alternates: { canonical: "/about" },
}

const features: Feature[] = [
  {
    icon: "/icon/missao.png",
    title: "Missão",
    description: "Construir com excelência, oferecendo soluções seguras e sustentáveis para nossos clientes.",
  },
  {
    icon: "/icon/visao.png",
    title: "Visão",
    description: "Ser referência em construção civil em Cabo Verde, reconhecida pela qualidade e inovação.",
  },
  {
    icon: "/icon/compromisso.png",
    title: "Compromissos",
    description: "Responsabilidade, transparência e suporte pós-obra para garantir sua tranquilidade.",
  },
]

const values = [
  "Qualidade em cada detalhe",
  "Compromisso com prazos",
  "Transparência total",
  "Equipa qualificada",
  "Materiais de primeira",
  "Suporte pós-obra",
]

const teamImages = [
  { src: "/About/1.png", alt: "Projecto 1" },
  { src: "/About/2.jpg", alt: "Projecto 2" },
  { src: "/About/3.jpeg", alt: "Projecto 3" },
  { src: "/About/4.jpg", alt: "Projecto 4" },
]

export default function AboutPage() {
  return (
    <main id="conteudo" className="bg-[#f6f5f5] text-[#333]">
      <Navbar activePage="/about" />

      <PageHeader
        title="Sobre Nós"
        subtitle="Conheça a história e os valores da Construções Coutinho"
        backgroundImage="/ElaboracaodeProjetos/4.png"
      />

      {/* Sobre */}
      <section className="py-20 md:py-28 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">
            <div data-reveal="left">
              <SectionHeading
                align="left"
                eyebrow="Nossa História"
                className="!mb-6"
                title={
                  <>
                    Construções <span className="text-[#fe9445]">Coutinho</span>
                  </>
                }
              />
              <p className="text-gray-600 mb-4 leading-relaxed">
                A Construções Coutinho é uma empresa especializada no sector da construção civil, dedicada a transformar
                projectos em realidade com qualidade, eficiência e compromisso.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Com mais de 5 anos de experiência no mercado de Cabo Verde, oferecemos soluções inovadoras para obras
                residenciais, comerciais e industriais, garantindo a satisfação dos nossos clientes em cada projecto.
              </p>

              <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-3 mb-8">
                {values.map((value, index) => (
                  <div key={index} className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 shadow-sm">
                    <CheckCircle className="w-5 h-5 text-[#fe9445] shrink-0" />
                    <span className="text-gray-700 text-sm font-medium">{value}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-[#fe9445] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#e88438] transition-colors shadow-[0_10px_25px_rgba(254,148,69,0.35)]"
              >
                Fale Conosco
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="relative" data-reveal="right">
              <div
                className="absolute -top-5 -left-5 w-2/3 h-2/3 rounded-2xl border-2 border-dashed border-[#fe9445]/40"
                aria-hidden="true"
              />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto lg:h-[520px]">
                <Image
                  src="/About/CarlosCoutinho.png"
                  alt="Carlos Coutinho"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/75 to-transparent">
                  <p className="font-display text-white text-xl font-bold">Carlos Coutinho</p>
                  <p className="text-white/70 text-sm">Construções Coutinho</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsSection stats={companyStats} />

      {/* Missão, Visão e Compromisso */}
      <section className="py-20 md:py-28 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Nossos Pilares"
            title={
              <>
                Missão, Visão e <span className="text-[#fe9445]">Compromisso</span>
              </>
            }
          />

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                data-reveal
                style={{ "--reveal-delay": `${index * 120}ms` } as CSSProperties}
                className="group relative bg-[#f6f5f5] rounded-2xl p-8 text-center overflow-hidden hover:bg-[#232323] transition-colors duration-500"
              >
                <span
                  className="absolute top-4 right-5 font-display text-6xl font-extrabold text-black/5 group-hover:text-white/5 transition-colors"
                  aria-hidden="true"
                >
                  0{index + 1}
                </span>
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#fe9445] to-[#e6b23a] flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:-translate-y-1 group-hover:rotate-6 transition-transform duration-500">
                  <Image
                    src={feature.icon || "/placeholder.svg"}
                    alt=""
                    width={40}
                    height={40}
                    className="brightness-0 invert"
                  />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#232323] group-hover:text-white mb-4 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 group-hover:text-white/70 leading-relaxed transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Porque nos escolher */}
      <section className="py-20 md:py-28 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {teamImages.map((img, i) => (
                  <div
                    key={img.src}
                    data-reveal="build"
                    style={{ "--reveal-delay": `${i * 150}ms` } as CSSProperties}
                    className={`relative h-[170px] sm:h-[220px] rounded-2xl overflow-hidden shadow-lg ${i % 2 ? "mt-8" : ""}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2" data-reveal="right">
              <SectionHeading
                align="left"
                eyebrow="Por Que Nos Escolher"
                className="!mb-6"
                title={
                  <>
                    Qualidade e Dedicação em Cada <span className="text-[#fe9445]">Projecto</span>
                  </>
                }
              />
              <p className="text-gray-600 mb-4 leading-relaxed">
                Na Construções Coutinho, cada projecto é tratado com a máxima atenção e profissionalismo. Nossa equipa
                altamente qualificada trabalha incansavelmente para superar as expectativas dos nossos clientes.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Utilizamos materiais de primeira qualidade e técnicas modernas de construção para garantir a
                durabilidade e segurança de cada obra. Nosso compromisso é entregar projectos que fazem a diferença.
              </p>
              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-2 border-2 border-[#fe9445] text-[#fe9445] px-8 py-3 rounded-full font-bold hover:bg-[#fe9445] hover:text-white transition-colors"
              >
                Ver Nosso Portfólio
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ProcessSection />

      <CTASection
        title="Pronto para Começar o Seu Projecto?"
        description="Entre em contacto connosco e transforme as suas ideias em realidade."
        primaryButton={{ text: "Solicitar Orçamento", href: "/contact#orcamento" }}
        secondaryButton={{ text: "Fale Conosco", href: "/contact" }}
      />

      <Footer />
      <ScrollToTop />
    </main>
  )
}
