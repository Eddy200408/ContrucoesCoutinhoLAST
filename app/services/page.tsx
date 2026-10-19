import type { Metadata } from "next"
import type { CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Plus } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { PageHeader } from "@/components/page-header"
import { CTASection } from "@/components/cta-section"
import { SectionHeading } from "@/components/section-heading"
import { MarqueeStrip } from "@/components/marquee-strip"
import { company } from "@/lib/data"
import type { ServiceCategory, FaqItem } from "@/types"

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Elaboração de projectos (arquitectura, estabilidade, redes eléctrica e hidrosanitária), fiscalização, avaliação imobiliária e execução de obras residenciais e comerciais em Cabo Verde.",
  alternates: { canonical: "/services" },
}

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
        icon: "/icon/estabilidade.png",
        title: "Estabilidade",
        desc: "Cálculos estruturais e soluções que garantem segurança e conformidade normativa.",
      },
      {
        image: "/ElaboracaodeProjetos/2.jpg",
        icon: "/icon/sanitaria.png",
        title: "Rede Hidrosanitária",
        desc: "Instalações hidráulicas dimensionadas para eficiência e durabilidade.",
      },
      {
        image: "/ElaboracaodeProjetos/3.jpg",
        icon: "/icon/luz.png",
        title: "Rede Elétrica",
        desc: "Projectos e execução de redes eléctricas com segurança e eficiência energética.",
      },
      {
        image: "/ElaboracaodeProjetos/s1.png",
        icon: "/icon/fiscal.png",
        title: "Fiscalização",
        desc: "Acompanhamento técnico no processo construtivo.",
      },
      {
        image: "/ElaboracaodeProjetos/4.png",
        icon: "/icon/house.png",
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
        icon: "/icon/residencial.png",
        title: "Obras Residenciais",
        desc: "Construção e remodelação de residências com gestão completa de obra.",
      },
      {
        image: "/ElaboracaodeProjetos/OC.jpeg",
        icon: "/icon/comercial.png",
        title: "Obras Comerciais",
        desc: "Projetos comerciais adaptados às necessidades de operação e segurança.",
      },
    ],
  } /*
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
  },*/,
]

const faqs: FaqItem[] = [
  {
    question: "O orçamento é gratuito?",
    answer:
      "Sim. Depois de conhecermos o seu projecto (e, quando necessário, visitarmos o local), enviamos um orçamento detalhado, gratuito e sem compromisso.",
  },
  {
    question: "Em que zonas trabalham?",
    answer: `Estamos sediados em ${company.address.street}, ${company.address.city}. Contacte-nos para avaliarmos obras noutras ilhas de Cabo Verde.`,
  },
  {
    question: "Tratam do projecto e da obra ou apenas de uma parte?",
    answer:
      "Fazemos as duas coisas. Pode contratar apenas a elaboração do projecto (arquitectura, estabilidade, redes), apenas a execução da obra, ou o processo completo — do projecto à entrega.",
  },
  {
    question: "Quanto tempo demora uma obra?",
    answer:
      "Depende da dimensão e complexidade. No orçamento indicamos um prazo estimado para cada fase e acompanhamos o cumprimento desse prazo durante toda a obra.",
  },
  {
    question: "Dão apoio depois da obra concluída?",
    answer: "Sim. O suporte pós-obra faz parte do nosso compromisso, para garantir a sua tranquilidade depois da entrega.",
  },
  {
    question: "Como posso pedir um orçamento?",
    answer: `Pelo formulário da página de contacto, por WhatsApp ou pelo telefone ${company.phone}. Respondemos o mais rapidamente possível.`,
  },
]

const slug = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
}

export default function ServicesPage() {
  return (
    <main id="conteudo" className="bg-[#f6f5f5] text-[#333]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Navbar activePage="/services" />

      <PageHeader
        title="Nossos Serviços"
        subtitle="Oferecemos soluções completas em construção civil, do projeto à execução da obra."
        backgroundImage="/s2.png"
      />

      {/* Atalhos para as categorias */}
      <div className="sticky top-[60px] md:top-[72px] z-30 bg-white/90 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 py-3 w-max">
            {serviceCategories.map((category) => (
              <a
                key={category.title}
                href={`#${slug(category.title)}`}
                className="px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap bg-[#f6f5f5] hover:bg-[#fe9445] hover:text-white transition-colors"
              >
                {category.title}
              </a>
            ))}
            <a
              href="#faq"
              className="px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap bg-[#f6f5f5] hover:bg-[#fe9445] hover:text-white transition-colors"
            >
              Perguntas Frequentes
            </a>
          </div>
        </div>
      </div>

      {/* Categorias de serviços */}
      <section className="py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {serviceCategories.map((category, catIndex) => (
            <div key={catIndex} id={slug(category.title)} className="mb-16 md:mb-24 last:mb-0 scroll-mt-36">
              <div className="flex items-center gap-4 mb-8 md:mb-10" data-reveal="left">
                <span className="font-display text-5xl md:text-6xl font-extrabold text-[#fe9445]/20 leading-none" aria-hidden="true">
                  0{catIndex + 1}
                </span>
                <div>
                  <h2 className="font-display text-2xl md:text-4xl font-extrabold text-[#232323] leading-tight">
                    {category.title}
                  </h2>
                  <div className="ruler w-24 mt-3" aria-hidden="true" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
                {category.services.map((service, index) => (
                  <article
                    key={index}
                    data-reveal
                    style={{ "--reveal-delay": `${(index % 3) * 100}ms` } as CSSProperties}
                    className="group relative bg-white rounded-2xl overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="h-48 sm:h-52 overflow-hidden relative">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-6">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#fe9445] to-[#e6b23a] flex items-center justify-center -mt-13 mb-4 shadow-lg relative z-10 group-hover:rotate-6 transition-transform duration-500">
                        <Image
                          src={service.icon || "/placeholder.svg"}
                          alt=""
                          width={28}
                          height={28}
                          className="brightness-0 invert"
                        />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-[#232323] mb-3">{service.title}</h3>
                      <p className="text-gray-600 mb-5 leading-relaxed">{service.desc}</p>
                      <Link
                        href="/contact#orcamento"
                        className="inline-flex items-center gap-2 text-[#b8520b] font-bold hover:gap-3 transition-all"
                      >
                        Solicitar Orçamento
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
            </div>
          ))}
        </div>
      </section>

      <MarqueeStrip />

      {/* Perguntas frequentes (nova) */}
      <section id="faq" className="py-20 md:py-28 px-4 sm:px-6 bg-white scroll-mt-28">
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            eyebrow="Dúvidas"
            title={
              <>
                Perguntas <span className="text-[#fe9445]">Frequentes</span>
              </>
            }
            description="As respostas às questões que mais nos colocam antes de começar uma obra."
          />
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={faq.question}
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}
                className="group rounded-2xl bg-[#f6f5f5] border border-transparent open:border-[#fe9445]/30 open:bg-white open:shadow-[0_15px_40px_-20px_rgba(254,148,69,0.5)] transition-all"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 md:p-6 font-display text-lg md:text-xl font-bold text-[#232323] [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="shrink-0 w-9 h-9 rounded-full bg-white group-open:bg-[#fe9445] group-open:text-white flex items-center justify-center transition-all group-open:rotate-45 shadow-sm">
                    <Plus className="w-5 h-5" />
                  </span>
                </summary>
                <p className="px-5 md:px-6 pb-6 -mt-1 text-gray-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Precisa de um Orçamento?"
        description="Entre em contacto connosco para solicitar um orçamento gratuito e sem compromisso."
        primaryButton={{ text: "Solicitar Orçamento", href: "/contact#orcamento" }}
        secondaryButton={{ text: "Ver Portfólio", href: "/portfolio" }}
      />

      <Footer />
      <ScrollToTop />
    </main>
  )
}
