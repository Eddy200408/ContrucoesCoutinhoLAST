"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Loader } from "@/components/loader"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { PageHeader } from "@/components/page-header"
import { StatsSection } from "@/components/stats-section"
import { CTASection } from "@/components/cta-section"
import { CheckCircle } from "lucide-react"
import type { Stat, Feature } from "@/types"

const stats: Stat[] = [
  { icon: "/icon/Projetos.png", number: "5+", title: "Anos de Excelência", sub: "Referência em construção" },
  { icon: "/icon/CC.png", number: "5000+", title: "Clientes Satisfeitos", sub: "Histórias de transformação" },
  { icon: "/icon/Blocos.png", number: "150+", title: "Projectos Concluídos", sub: "Obras de qualidade" },
  { icon: "/icon/tranporte.png", number: "98%", title: "Taxa de Satisfação", sub: "Recomendação entre clientes" },
]

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

export default function AboutPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <Loader isLoading={loading} />
  }

  return (
    <main className="bg-[#f6f5f5] text-[#333]">
      <Navbar activePage="/about" />

      <PageHeader
        title="Sobre Nós"
        subtitle="Conheça a história e os valores da Construções Coutinho"
        backgroundImage="/ElaboracaodeProjetos/4.png"
      />

      {/* About Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#fe9445] font-bold tracking-wider text-sm">NOSSA HISTÓRIA</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#232323] mt-2 mb-6 leading-tight">
                Construções <span className="text-[#fe9445]">Coutinho</span>
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                A Construções Coutinho é uma empresa especializada no sector da construção civil, dedicada a transformar
                projectos em realidade com qualidade, eficiência e compromisso.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Com mais de 5 anos de experiência no mercado de Cabo Verde, oferecemos soluções inovadoras para obras
                residenciais, comerciais e industriais, garantindo a satisfação dos nossos clientes em cada projecto.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {values.map((value, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#fe9445]" />
                    <span className="text-gray-700 text-sm">{value}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#fe9445] text-white px-8 py-3 rounded-full font-bold hover:bg-[#e88438] transition-colors shadow-lg"
              >
                Fale Conosco
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/About/CarlosCoutinho.png"
                  alt="Carlos Coutinho"
                  width={600}
                  height={500}
                  className="w-full h-[500px] object-cover"
                />
              </div>
              {/*<div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-[#fe9445] to-[#e6b23a] text-white py-8 px-10 rounded-2xl shadow-xl">
                <div className="text-5xl font-bold leading-none">15+</div>
                <div className="text-sm font-bold tracking-wider mt-2">ANOS DE</div>
                <div className="text-sm font-bold tracking-wider">EXPERIÊNCIA</div>
              </div>*/}
            </div>
          </div>
        </div>
      </section>

      <StatsSection stats={stats} />

      {/* Mission, Vision, Values Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#fe9445] font-bold tracking-wider text-sm">NOSSOS PILARES</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Missão, Visão e <span className="text-[#fe9445]">Compromisso</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-[#f6f5f5] rounded-2xl p-8 text-center hover:shadow-xl transition-shadow">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#fe9445] to-[#e6b23a] flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Image
                    src={feature.icon || "/placeholder.svg"}
                    alt={feature.title}
                    width={40}
                    height={40}
                    className="brightness-0 invert"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#232323] mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team/Company Image Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <Image
                  src="/About/1.png"
                  alt="Projecto 1"
                  width={300}
                  height={250}
                  className="rounded-2xl shadow-lg w-full h-[200px] object-cover"
                />
                <Image
                  src="/About/2.jpg"
                  alt="Projecto 2"
                  width={300}
                  height={250}
                  className="rounded-2xl shadow-lg w-full h-[200px] object-cover mt-8"
                />
                <Image
                  src="/About/3.jpeg"
                  alt="Projecto 3"
                  width={300}
                  height={250}
                  className="rounded-2xl shadow-lg w-full h-[200px] object-cover"
                />
                <Image
                  src="/About/4.jpg"
                  alt="Projecto 4"
                  width={300}
                  height={250}
                  className="rounded-2xl shadow-lg w-full h-[200px] object-cover mt-8"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="text-[#fe9445] font-bold tracking-wider text-sm">POR QUE NOS ESCOLHER</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#232323] mt-2 mb-6 leading-tight">
                Qualidade e Dedicação em Cada <span className="text-[#fe9445]">Projecto</span>
              </h2>
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
                className="inline-flex items-center gap-2 border-2 border-[#fe9445] text-[#fe9445] px-8 py-3 rounded-full font-bold hover:bg-[#fe9445] hover:text-white transition-colors"
              >
                Ver Nosso Portfólio
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Pronto para Começar o Seu Projecto?"
        description="Entre em contacto connosco e transforme as suas ideias em realidade."
        primaryButton={{ text: "Solicitar Orçamento", href: "/contact" }}
        secondaryButton={{ text: "Fale Conosco", href: "/contact" }}
      />

      <Footer />
      <ScrollToTop />
    </main>
  )
}
