"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Loader } from "@/components/loader"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { HeroCarousel } from "@/components/hero-carousel"
import { StatsSection } from "@/components/stats-section"
import { CTASection } from "@/components/cta-section"
import { GalleryModal } from "@/components/gallery-modal"
import { TestimonialsSection } from "@/components/testimonials-section"
import type { Slide, Stat, Service } from "@/types"

const slides: Slide[] = [
  {
    image: "SãoVicente.jpg",
    small: "INICIO",
    title: "Construções",
    span: "Coutinho",
    description: "Projetos e execução com compromisso, qualidade e segurança para transformar o seu espaço.",
    cta1: { text: "Fale Conosco", href: "/contact" },
    cta2: { text: "Explorar Serviços", href: "/services" },
  },
  {
    image: "service-slide2.jpg",
    small: "NOSSOS SERVIÇOS",
    title: "Execução &",
    span: "Projetos",
    description: "Oferecemos elaboração de projetos, execução de obras e fornecimento de materiais.",
    cta1: { text: "Ver Serviços", href: "/services" },
    cta2: { text: "Solicitar Orçamento", href: "/contact" },
  },
  {
    image: "service-slide3.jpg",
    small: "PROJETOS",
    title: "Portfólio de",
    span: "Obras",
    description: "Conheça os nossos projectos recentes e veja como podemos ajudar no seu próximo projecto.",
    cta1: { text: "Ver Projetos", href: "/portfolio" },
    cta2: { text: "Agendar Visita", href: "/contact" },
  },
  {
    image: "placa.png",
    small: "CONTACTO",
    title: "Pronto para",
    span: "Começar?",
    description: "Entre em contacto connosco e transforme as suas ideias em realidade.",
    cta1: { text: "Contactar Agora", href: "/contact" },
    cta2: { text: "Sobre Nós", href: "/about" },
  },
]

const stats: Stat[] = [
  { icon: "/icon/Projetos.png", number: "5+", title: "Anos de Excelência", sub: "Referência em construção" },
  { icon: "/icon/CC.png", number: "5000+", title: "Clientes Satisfeitos", sub: "Histórias de transformação" },
  { icon: "/icon/Blocos.png", number: "150+", title: "Projectos Concluídos", sub: "Obras de qualidade" },
  { icon: "/icon/tranporte.png", number: "98%", title: "Taxa de Satisfação", sub: "Recomendação entre clientes" },
]

const services: Service[] = [
  {
    image: "/ElaboracaodeProjetos/1.jpg",
    icon: "/icon/Projetos.png",
    title: "Elaboração de Projetos",
    desc: "Projetos arquitetônicos e de engenharia com qualidade e atenção aos detalhes.",
  },
  {
    image: "/CC/2.png",
    icon: "/icon/Blocos.png",
    title: "Execução de Obras",
    desc: "Construção civil com excelência, pontualidade e compromisso com a qualidade.",
  },
  {
    image: "/Blocos/4.jpg",
    icon: "/icon/CC.png",
    title: "Materiais de Construção",
    desc: "Fornecimento de blocos e materiais de construção de alta qualidade.",
  },
]

const galleryImages = [
  
  "/Galeria/2.jpg",
  "/Galeria/3.jpg",
  "/Galeria/4.jpg",
  "/Galeria/5.jpg",
  "/Galeria/6.jpg",
  "/Galeria/7.jpg",
  "/Galeria/8.jpg",
  "/Galeria/9.jpg",
  "/Galeria/10.jpg",
  "/Galeria/12.jpg",
  "/Galeria/13.png",
]

export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalIndex, setModalIndex] = useState(0)
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const scrollGallery = (direction: "left" | "right") => {
    if (galleryRef.current) {
      const scrollAmount = galleryRef.current.clientWidth / 3
      galleryRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const openModal = (index: number) => {
    setModalIndex(index)
    setModalOpen(true)
  }

  if (loading) {
    return <Loader isLoading={loading} />
  }

  return (
    <main className="bg-[#f6f5f5] text-[#333] font-sans">
      <Navbar activePage="/" />

      <HeroCarousel slides={slides} />

      <TestimonialsSection />

      <StatsSection stats={stats} />

      {/* About Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#fe9445] font-bold tracking-wider text-sm">NOSSA HISTÓRIA</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#232323] mt-2 mb-6 leading-tight">
                Construindo <span className="text-[#fe9445]">Sonhos</span>
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                A Construções Coutinho nasceu de uma visão clara: construir com qualidade, segurança e atenção aos
                detalhes. Trabalhamos com projetos residenciais e industriais, oferecendo acompanhamento técnico e
                execução completa — do projeto à entrega.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Com décadas de experiência e inúmeras obras entregues, buscamos integrar estética, durabilidade e
                eficiência em cada trabalho.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-[#fe9445] text-white px-8 py-3 rounded-full font-bold hover:bg-[#e88438] transition-colors shadow-lg"
              >
                Conhecer Mais
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/ElaboracaodeProjetos/4.png"
                  alt="Projeto concluído"
                  width={600}
                  height={450}
                  className="w-full h-[450px] object-cover"
                />
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
           { /*<span className="text-[#fe9445] font-bold tracking-wider text-sm">O QUE FAZEMOS</span>*/}
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Nossos <span className="text-[#fe9445]">Serviços</span>
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Oferecemos soluções completas em construção civil, desde consultaria à elaboração de projectos até a execução da obra.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <article
                key={index}
                className="group bg-[#f6f5f5] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="h-52 overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    width={400}
                    height={208}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="w-14 h-14 rounded-full bg-[#fe9445] flex items-center justify-center -mt-12 mb-4 shadow-lg relative z-10">
                    <Image
                      src={service.icon || "/placeholder.svg"}
                      alt=""
                      width={28}
                      height={28}
                      className="brightness-0 invert"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#232323] mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.desc}</p>
                  <Link
                    href="/services"
                    className="text-[#fe9445] font-bold hover:underline inline-flex items-center gap-1"
                  >
                    Saber Mais
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Link
              href="/services"
              className="bg-[#fe9445] text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-[#e88438] hover:scale-105 transition-all"
            >
              Ver Todos os Serviços
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-[#f6f5f5]" id="gallery">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[#fe9445] font-bold tracking-wider text-sm">GALERIA</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Nossos <span className="text-[#fe9445]">Projetos</span>
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Veja alguns dos projectos que realizamos com qualidade e dedicação.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => scrollGallery("left")}
              className="bg-white p-3 rounded-full shadow-lg hover:bg-[#fe9445] hover:text-white transition-colors"
            >
              <Image src="/icon/back.jpg" alt="Anterior" width={24} height={24} />
            </button>

            <div
              ref={galleryRef}
              className="flex overflow-x-auto scroll-smooth scrollbar-hide gap-4"
              style={{ width: "calc(100% - 120px)" }}
            >
              {galleryImages.map((img, index) => (
                <div key={index} className="flex-none w-[300px] cursor-pointer group" onClick={() => openModal(index)}>
                  <div className="relative h-[220px] rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`Projeto ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <span className="text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        Ver Imagem
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollGallery("right")}
              className="bg-white p-3 rounded-full shadow-lg hover:bg-[#fe9445] hover:text-white transition-colors"
            >
              <Image src="/icon/next.webp" alt="Próximo" width={24} height={24} />
            </button>
          </div>

          <div className="flex justify-center mt-10">
            <Link
              href="/portfolio"
              className="border-2 border-[#fe9445] text-[#fe9445] px-10 py-4 rounded-full font-bold hover:bg-[#fe9445] hover:text-white transition-all"
            >
              Ver Portfólio Completo
            </Link>
          </div>
        </div>
      </section>

      <GalleryModal
        images={galleryImages}
        currentIndex={modalIndex}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onPrev={() => setModalIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
        onNext={() => setModalIndex((prev) => (prev + 1) % galleryImages.length)}
      />

      <CTASection
        title="Pronto para sua Transformação?"
        description="Entre em contato conosco hoje e comece sua jornada para a melhor versão do seu projeto."
        primaryButton={{ text: "Agendar Agora", href: "/contact" }}
        secondaryButton={{ text: "Fale Conosco", href: "/contact" }}
      />

      <Footer />
      <ScrollToTop />
    </main>
  )
}
