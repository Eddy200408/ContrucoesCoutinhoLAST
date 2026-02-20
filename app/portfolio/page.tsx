"use client"

import { useState, useEffect } from "react"
import { Loader } from "@/components/loader"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { PageHeader } from "@/components/page-header"
import { ProjectGallery } from "@/components/project-gallery"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import { CTASection } from "@/components/cta-section"
import type { Project, BeforeAfter } from "@/types"

const projects: Project[] = [
  {
    id: 1,
    title: "Residência Familiar em Mindelo",
    category: "Residencial",
    description:
      "Construção completa de moradia de dois pisos com acabamentos de alta qualidade. Projecto incluiu design arquitectónico personalizado, estrutura em betão armado e acabamentos premium.",
    images: [
      "/img/Foto/IMG-20241004-WA0001.jpg",
      "/img/Foto/IMG-20241004-WA0002.jpg",
      "/img/Foto/IMG-20241004-WA0003.jpg",
    ],
    location: "Mindelo, São Vicente",
    year: "2024",
  },
  {
    id: 2,
    title: "Edifício Comercial Centro",
    category: "Comercial",
    description:
      "Construção de edifício comercial moderno com múltiplas lojas e escritórios. Estrutura sólida com design contemporâneo.",
    images: [
      "/img/Foto/IMG-20241004-WA0010.jpg",
      "/img/Foto/IMG-20241004-WA0011.jpg",
      "/img/Foto/IMG-20241004-WA0012.jpg",
    ],
    location: "São Vicente",
    year: "2024",
  },
  {
    id: 3,
    title: "Moradia Moderna",
    category: "Residencial",
    description:
      "Projecto residencial com arquitectura moderna, amplas áreas sociais e acabamentos de luxo. Inclui piscina e área de lazer.",
    images: ["/img/Galeria/1.jpg", "/img/Galeria/2.jpg", "/img/Galeria/3.jpg"],
    location: "São Vicente",
    year: "2023",
  },
  {
    id: 4,
    title: "Remodelação Completa",
    category: "Remodelação",
    description:
      "Remodelação total de habitação antiga, incluindo reforço estrutural, nova instalação eléctrica e acabamentos modernos.",
    images: [
      "/portfolio/Remodelacao/1.jpg",
      "/portfolio/Remodelacao/2.jpg",
      "/portfolio/Remodelacao/3.jpg",
    ],
    location: "Mindelo",
    year: "2024",
  },
  {
    id: 5,
    title: "Projecto Elaboração Técnica",
    category: "Projectos",
    description:
      "Elaboração de projecto arquitectónico completo com plantas, alçados e detalhes construtivos para aprovação camarária.",
    images: [
      "/img/Elaboracao de Projetos/1.jpg",
      "/img/Elaboracao de Projetos/2.jpg",
      "/img/Elaboracao de Projetos/3.jpg",
    ],
    location: "São Vicente",
    year: "2024",
  },
  {
    id: 6,
    title: "Habitação Unifamiliar",
    category: "Residencial",
    description:
      "Construção de habitação unifamiliar térrea com garagem integrada e jardim. Design funcional e eficiente.",
    images: ["/img/Galeria/4.jpg", "/img/Galeria/5.jpg", "/img/Galeria/6.jpg"],
    location: "São Vicente",
    year: "2023",
  },
  {
    id: 7,
    title: "Estrutura em Blocos",
    category: "Estrutural",
    description:
      "Execução de estrutura em blocos de cimento com armação em betão. Trabalho de alta precisão e qualidade.",
    images: ["/img/Blocos/1.jpg", "/img/Blocos/2.jpg", "/img/Blocos/4.jpg"],
    location: "Mindelo",
    year: "2024",
  },
  {
    id: 8,
    title: "Acabamentos Interiores",
    category: "Acabamentos",
    description:
      "Trabalhos de acabamentos interiores incluindo pintura, revestimentos cerâmicos e instalação de carpintaria.",
    images: [
      "/img/Foto/IMG-20241004-WA0020.jpg",
      "/img/Foto/IMG-20241004-WA0021.jpg",
      "/img/Foto/IMG-20241004-WA0022.jpg",
    ],
    location: "São Vicente",
    year: "2024",
  },
  {
    id: 9,
    title: "Obra de Grande Porte",
    category: "Comercial",
    description:
      "Construção de edifício de grande porte com múltiplos andares. Projecto complexo com coordenação de várias especialidades.",
    images: ["/img/Galeria/7.jpg", "/img/Galeria/8.jpg", "/img/Galeria/9.jpg"],
    location: "São Vicente",
    year: "2023",
  },
]

const beforeAfterItems: BeforeAfter[] = [
  {
    id: 1,
    title: "Renovação de Fachada",
    description: "Transformação completa da fachada com novo reboco, pintura e detalhes arquitectónicos modernos.",
    before: "portfolio/AB/1.jpg",
    after: "/portfolio/AB/2.jpg",
    category: "Remodelação",
  },
  {
    id: 2,
    title: "Construção Nova Residência",
    description:
      "De terreno vazio a casa de sonho. Acompanhamento completo desde a fundação até aos acabamentos finais.",
    before: "/portfolio/AAB/1.png",
    after: "/portfolio/AAB/2.png",
    category: "Construção",
  },
  {
    id: 3,
    title: "Ampliação Residencial",
    description:
      "Ampliação de moradia existente com novo piso e acabamentos de alta qualidade mantendo a harmonia arquitectónica.",
    before: "/portfolio/ARAB/1.png",
    after: "/portfolio/ARAB/2.png",
    category: "Ampliação",
  },
]

export default function PortfolioPage() {
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
      <Navbar activePage="/portfolio" />

      <PageHeader
        title="Nosso Portfólio"
        subtitle="Conheça os projectos que já realizamos e veja a qualidade do nosso trabalho"
        backgroundImage="/Portfolio/OR.jpg"
      />

      {/* Projects Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#fe9445] font-bold tracking-wider text-sm">GALERIA DE PROJECTOS</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Projectos <span className="text-[#fe9445]">Realizados</span>
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Cada projecto é único e reflecte o nosso compromisso com a qualidade e satisfação do cliente.
            </p>
          </div>

          <ProjectGallery projects={projects} />
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#fe9445] font-bold tracking-wider text-sm">TRANSFORMAÇÕES</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Antes e <span className="text-[#fe9445]">Depois</span>
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Veja a transformação que podemos fazer no seu espaço. Deslize para comparar o antes e depois.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beforeAfterItems.map((item) => (
              <BeforeAfterSlider key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#232323]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#fe9445]">150+</div>
              <div className="text-white/70 mt-2">Projectos Concluídos</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#fe9445]">15+</div>
              <div className="text-white/70 mt-2">Anos de Experiência</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#fe9445]">98%</div>
              <div className="text-white/70 mt-2">Clientes Satisfeitos</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-[#fe9445]">50+</div>
              <div className="text-white/70 mt-2">Profissionais</div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Tem um Projecto em Mente?"
        description="Entre em contacto connosco e transforme as suas ideias em realidade. Orçamento gratuito e sem compromisso."
        primaryButton={{ text: "Solicitar Orçamento", href: "/contact" }}
        secondaryButton={{ text: "Fale Conosco", href: "/contact" }}
      />

      <Footer />
      <ScrollToTop />
    </main>
  )
}
