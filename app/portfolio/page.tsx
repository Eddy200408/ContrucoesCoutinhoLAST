import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { PageHeader } from "@/components/page-header"
import { ProjectGallery } from "@/components/project-gallery"
import { BeforeAfterSlider } from "@/components/before-after-slider"
import { CTASection } from "@/components/cta-section"
import { SectionHeading } from "@/components/section-heading"
import { BentoGallery } from "@/components/bento-gallery"
import { CountUp } from "@/components/count-up"
import { projects, beforeAfterItems, worksGallery } from "@/lib/data"
import { isImageAvailable } from "@/lib/cloudinary"

export const metadata: Metadata = {
  title: "Portfólio",
  description:
    "Conheça os projectos e obras realizados pela Construções Coutinho em São Vicente, Cabo Verde: moradias, remodelações, edifícios comerciais e muito mais.",
  alternates: { canonical: "/portfolio" },
}

const portfolioStats = [
  { value: "150+", label: "Projectos Concluídos" },
  { value: "5+", label: "Anos de Experiência" },
  { value: "98%", label: "Clientes Satisfeitos" },
  { value: "50+", label: "Profissionais" },
]

// Fotos em HEIC só aparecem quando servidas pelo Cloudinary (que as converte para formatos web)
const galleryImages = worksGallery.filter((img) => isImageAvailable(img.src))

export default function PortfolioPage() {
  return (
    <main id="conteudo" className="bg-[#f6f5f5] text-[#333]">
      <Navbar activePage="/portfolio" />

      <PageHeader
        title="Nosso Portfólio"
        subtitle="Conheça os projectos que já realizamos e veja a qualidade do nosso trabalho"
        backgroundImage="/Portfolio/OR.jpg"
      />

      {/* Projectos */}
      <section className="py-20 md:py-28 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Galeria de Projectos"
            title={
              <>
                Projectos <span className="text-[#fe9445]">Realizados</span>
              </>
            }
            description="Cada projecto é único e reflecte o nosso compromisso com a qualidade e satisfação do cliente."
          />

          <ProjectGallery projects={projects} />
        </div>
      </section>

      {/* Antes/Depois */}
      <section className="py-20 md:py-28 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Transformações"
            title={
              <>
                Antes e <span className="text-[#fe9445]">Depois</span>
              </>
            }
            description="Veja a transformação que podemos fazer no seu espaço. Deslize para comparar o antes e depois."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {beforeAfterItems.map((item) => (
              <BeforeAfterSlider key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Galeria de obras (nova) */}
      <section id="galeria" className="py-20 md:py-28 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Diário de Obra"
            title={
              <>
                Galeria de <span className="text-[#fe9445]">Obras</span>
              </>
            }
            description="Fotografias reais das nossas obras — das fundações aos acabamentos. Toque numa foto para ver em ecrã inteiro."
          />
          <BentoGallery images={galleryImages} showFilters pageSize={12} />
        </div>
      </section>

      {/* Estatísticas */}
      <section className="relative py-16 md:py-20 bg-[#232323] overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-70" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 text-center">
            {portfolioStats.map((stat) => (
              <div key={stat.label} data-reveal>
                <CountUp value={stat.value} className="block font-display text-4xl md:text-6xl font-extrabold text-[#fe9445]" />
                <div className="text-white/70 mt-2 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Tem um Projecto em Mente?"
        description="Entre em contacto connosco e transforme as suas ideias em realidade. Orçamento gratuito e sem compromisso."
        primaryButton={{ text: "Solicitar Orçamento", href: "/contact#orcamento" }}
        secondaryButton={{ text: "Fale Conosco", href: "/contact" }}
      />

      <Footer />
      <ScrollToTop />
    </main>
  )
}
