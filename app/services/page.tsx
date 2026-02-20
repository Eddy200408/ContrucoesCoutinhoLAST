"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Loader } from "@/components/loader"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { PageHeader } from "@/components/page-header"
import { CTASection } from "@/components/cta-section"
import type { ServiceCategory } from "@/types"

const serviceCategories: ServiceCategory[] = [
  {
    title: "Elaboração de Projetos",
    services: [
      {
        image: "/ElaboracaodeProjetos/1.jpg",
        icon: "/icon/Projetos.png",
        title: "Arquitetura",
        desc: "Projetos arquitetónicos.",
      },
      {
        image: "/ElaboracaodeProjetos/3.jpg",
        icon: "/icon/CC.png",
        title: "Estabilidade",
        desc: "Cálculos estruturais e soluções que garantem segurança e conformidade normativa.",
      },
      {
        image: "/ElaboracaodeProjetos/2.jpg",
        icon: "/icon/Blocos.png",
        title: "Rede Hidrosanitária",
        desc: "Instalações hidráulicas dimensionadas para eficiência e durabilidade.",
      },
      {
        image: "/ElaboracaodeProjetos/3.jpg",
        icon: "/icon/tranporte.png",
        title: "Rede Elétrica",
        desc: "Projectos e execução de redes eléctricas com e eficiência energética.",
      },
      {
        image: "/ElaboracaodeProjetos/s1.png",
        icon: "/icon/Projetos.png",
        title: "Fiscalização",
        desc: "Acompanhamento técnico no processo construtivo.",
      },
      {
        image: "/ElaboracaodeProjetos/4.png",
        icon: "/icon/CC.png",
        title: "Avaliação Imobiliária",
        desc: "Laudos e avaliações profissionais para compra, venda ou financiamento.",
      },
    ],
  },
  {
    title: "Execução de Obras de Construção Civil",
    services: [
      {
        image: "/ElaboracaodeProjetos/OR.jpg",
        icon: "/icon/CC.png",
        title: "Obras Residenciais",
        desc: "Construção e remodelação de residências com gestão completa de obra.",
      },
      {
        image: "/ElaboracaodeProjetos/OC.jpeg",
        icon: "/icon/CC.png",
        title: "Obras Comerciais",
        desc: "Projetos comerciais adaptados às necessidades de operação e segurança.",
      },
      
    ],
  },
  {
    title: "Produção e Venda de Blocos",
    services: [
      {
        image: "/Blocos/1.jpg",
        icon: "/icon/Blocos.png",
        title: "Blocos Maciços",
        desc: "Produção de blocos maciços com controle de qualidade e logística.",
      },
      {
        image: "/Blocos/2.jpg",
        icon: "/icon/Blocos.png",
        title: "Blocos Vazados",
        desc: "Blocos vazados para alvenarias eficientes e económicas.",
      },
    ],
  },
]

export default function ServicesPage() {
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
      <Navbar activePage="/services" />

      <PageHeader
        title="Nossos Serviços"
        subtitle="Oferecemos soluções completas em construção civil, do projeto à execução da obra."
        backgroundImage="s2.png"
      />

      {/* Services Categories */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {serviceCategories.map((category, catIndex) => (
            <div key={catIndex} className="mb-20">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-1 h-12 bg-gradient-to-b from-[#fe9445] to-[#e6b23a] rounded-full" />
                <h3 className="text-2xl md:text-3xl font-bold text-[#232323]">{category.title}</h3>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.services.map((service, index) => (
                  <article
                    key={index}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="h-52 overflow-hidden relative">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-6">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#fe9445] to-[#e6b23a] flex items-center justify-center -mt-12 mb-4 shadow-lg relative z-10">
                        <Image
                          src={service.icon || "/placeholder.svg"}
                          alt=""
                          width={28}
                          height={28}
                          className="brightness-0 invert"
                        />
                      </div>
                      <h4 className="text-xl font-bold text-[#232323] mb-3">{service.title}</h4>
                      <p className="text-gray-600 mb-4 leading-relaxed">{service.desc}</p>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-[#fe9445] font-bold hover:gap-3 transition-all"
                      >
                        Solicitar Orçamento
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title="Precisa de um Orçamento?"
        description="Entre em contacto connosco para solicitar um orçamento gratuito e sem compromisso."
        primaryButton={{ text: "Solicitar Orçamento", href: "/contact" }}
        secondaryButton={{ text: "Ver Portfólio", href: "/portfolio" }}
      />

      <Footer />
      <ScrollToTop />
    </main>
  )
}
