import type { CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { HeroBanner } from "@/components/hero-banner"
import { StatsSection } from "@/components/stats-section"
import { CTASection } from "@/components/cta-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { SectionHeading } from "@/components/section-heading"
import { MarqueeStrip } from "@/components/marquee-strip"
import { ProcessSection } from "@/components/process-section"
import { BentoGallery } from "@/components/bento-gallery"
import { companyStats, homeGallery, company } from "@/lib/data"
import type { Slide, Service } from "@/types"

// Slides do HeroCarousel (componente alternativo ao HeroBanner, mantido para uso futuro)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const slides: Slide[] = [
  {
    image: "/SãoVicente.jpg",
    small: "INICIO",
    title: "Construções",
    span: "Coutinho",
    description: "Projetos e execução com compromisso, qualidade e segurança para transformar o seu espaço.",
    cta1: { text: "Fale Conosco", href: "/contact" },
    cta2: { text: "Explorar Serviços", href: "/services" },
  },
  {
    image: "/service-slide2.jpg",
    small: "NOSSOS SERVIÇOS",
    title: "Execução &",
    span: "Projetos",
    description: "Oferecemos elaboração de projetos, execução de obras e fornecimento de materiais.",
    cta1: { text: "Ver Serviços", href: "/services" },
    cta2: { text: "Solicitar Orçamento", href: "/contact" },
  },
  {
    image: "/service-slide3.jpg",
    small: "PROJETOS",
    title: "Portfólio de",
    span: "Obras",
    description: "Conheça os nossos projectos recentes e veja como podemos ajudar no seu próximo projecto.",
    cta1: { text: "Ver Projetos", href: "/portfolio" },
    cta2: { text: "Agendar Visita", href: "/contact" },
  },
  {
    image: "/placa.png",
    small: "CONTACTO",
    title: "Pronto para",
    span: "Começar?",
    description: "Entre em contacto connosco e transforme as suas ideias em realidade.",
    cta1: { text: "Contactar Agora", href: "/contact" },
    cta2: { text: "Sobre Nós", href: "/about" },
  },
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

const highlights = ["Projetos residenciais e industriais", "Acompanhamento técnico", "Do projeto à entrega"]

export default function HomePage() {
  return (
    <main id="conteudo" className="bg-[#f6f5f5] text-[#333] font-sans">
      <Navbar activePage="/" />

      {/* <HeroCarousel slides={slides} /> */}
      <HeroBanner />

      <StatsSection stats={companyStats} />

      {/* Secção Sobre */}
      <section id="sobre" className="py-20 md:py-28 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div data-reveal="left">
              <SectionHeading
                align="left"
                eyebrow="Nossa História"
                className="!mb-6"
                title={
                  <>
                    Construindo <span className="text-[#fe9445]">Sonhos</span>
                  </>
                }
              />
              <p className="text-gray-600 mb-4 leading-relaxed">
                A Construções Coutinho nasceu de uma visão clara: construir com qualidade, segurança e atenção aos
                detalhes. Trabalhamos com projetos residenciais e industriais, oferecendo acompanhamento técnico e
                execução completa — do projeto à entrega.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Com décadas de experiência e inúmeras obras entregues, buscamos integrar estética, durabilidade e
                eficiência em cada trabalho.
              </p>
              <ul className="space-y-2.5 mb-8">
                {highlights.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[#232323] font-medium">
                    <CheckCircle2 className="w-5 h-5 text-[#fe9445] shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 bg-[#fe9445] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#e88438] transition-colors shadow-[0_10px_25px_rgba(254,148,69,0.35)]"
              >
                Conhecer Mais
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="relative" data-reveal="right">
              {/* Moldura decorativa estilo planta técnica */}
              <div
                className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-2/3 h-2/3 rounded-2xl border-2 border-dashed border-[#fe9445]/40"
                aria-hidden="true"
              />
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-24 h-24 sm:w-32 sm:h-32 blueprint-grid-light rounded-2xl" aria-hidden="true" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-auto lg:h-[480px]">
                <Image
                  src="/Galeria/18.png"
                  alt="Projeto concluído"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-6 right-4 sm:right-8 bg-[#232323] text-white rounded-2xl px-5 py-4 shadow-2xl flex items-center gap-4">
                <span className="font-display text-4xl font-extrabold text-[#fe9445] leading-none">{company.founded}</span>
                <span className="text-xs uppercase tracking-[0.2em] text-white/70 leading-tight">
                  Ano de
                  <br />
                  fundação
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MarqueeStrip />

      {/* Secção Serviços */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            eyebrow="O Que Fazemos"
            title={
              <>
                Nossos <span className="text-[#fe9445]">Serviços</span>
              </>
            }
            description="Oferecemos soluções completas em construção civil, desde consultaria à elaboração de projectos até a execução da obra."
          />

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <article
                key={index}
                data-reveal
                style={{ "--reveal-delay": `${index * 120}ms` } as CSSProperties}
                className="group relative bg-[#f6f5f5] rounded-2xl overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative h-52 sm:h-56 overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute top-4 right-4 font-display text-5xl font-extrabold text-white/30 leading-none" aria-hidden="true">
                    0{index + 1}
                  </span>
                </div>
                <div className="p-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#fe9445] flex items-center justify-center -mt-14 mb-4 shadow-lg relative z-10 group-hover:rotate-6 transition-transform duration-500">
                    <Image
                      src={service.icon || "/placeholder.svg"}
                      alt=""
                      width={28}
                      height={28}
                      className="brightness-0 invert"
                    />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#232323] mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-5">{service.desc}</p>
                  <Link
                    href="/services"
                    className="text-[#b8520b] font-bold inline-flex items-center gap-1.5 group-hover:gap-3 transition-all"
                  >
                    Saber Mais
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <span
                  className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-[#fe9445] to-[#e6b23a] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
                  aria-hidden="true"
                />
              </article>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Link
              href="/services"
              className="bg-[#fe9445] text-white px-10 py-4 rounded-full font-bold shadow-[0_10px_25px_rgba(254,148,69,0.35)] hover:bg-[#e88438] hover:scale-105 transition-all"
            >
              Ver Todos os Serviços
            </Link>
          </div>
        </div>
      </section>

      <ProcessSection />

      {/* Galeria */}
      <section className="py-20 md:py-28 bg-[#f6f5f5]" id="gallery">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            eyebrow="Galeria"
            title={
              <>
                Nossos <span className="text-[#fe9445]">Projetos</span>
              </>
            }
            description="Veja alguns dos projectos que realizamos com qualidade e dedicação."
          />
          <BentoGallery images={homeGallery} limit={7} moreHref="/portfolio#galeria" />
        </div>
      </section>

      <TestimonialsSection />

      <CTASection
        title="Pronto para sua Transformação?"
        description="Entre em contato conosco hoje e comece sua jornada para a melhor versão do seu projeto."
        primaryButton={{ text: "Agendar Agora", href: "/contact#orcamento" }}
        secondaryButton={{ text: "Fale Conosco", href: "/contact" }}
      />

      <Footer />
      <ScrollToTop />
    </main>
  )
}
