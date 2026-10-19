import type { Metadata } from "next"
import type { CSSProperties } from "react"
import Link from "next/link"
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Navigation } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { PageHeader } from "@/components/page-header"
import { ContactForm } from "@/components/contact-form"
import { SectionHeading } from "@/components/section-heading"
import { WhatsAppIcon } from "@/components/icons"
import { company } from "@/lib/data"

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Fale com a Construções Coutinho: peça um orçamento gratuito por formulário, WhatsApp ou telefone. Mindelo, São Vicente, Cabo Verde.",
  alternates: { canonical: "/contact" },
}

const contactCards = [
  {
    icon: Phone,
    title: "Telefone",
    lines: [company.phone],
    href: company.phoneHref,
    action: "Ligar agora",
  },
  {
    icon: Mail,
    title: "Email",
    lines: [company.email],
    href: `mailto:${company.email}`,
    action: "Enviar email",
  },
  {
    icon: MapPin,
    title: "Endereço",
    lines: [company.address.street, company.address.city],
    href: "https://www.google.com/maps/search/?api=1&query=16.8843699,-24.9773892",
    action: "Abrir no mapa",
  },
  {
    icon: Clock,
    title: "Horário",
    lines: company.hours,
  },
]

export default function ContactPage() {
  return (
    <main id="conteudo" className="bg-[#f6f5f5] text-[#333]">
      <Navbar activePage="/contact" />

      <PageHeader
        title="Fale Conosco"
        subtitle="Estamos prontos para ajudar no seu próximo projecto"
        backgroundImage="/ElaboracaodeProjetos/3.jpg"
      />

      {/* Contacto */}
      <section className="py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-12">
            {/* Informações */}
            <div>
              <SectionHeading
                align="left"
                eyebrow="Informações"
                className="!mb-8"
                title={
                  <>
                    Contactos da <span className="text-[#fe9445]">Empresa</span>
                  </>
                }
              />

              <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4 mb-10">
                {contactCards.map((card, i) => {
                  const content = (
                    <>
                      <div className="w-12 h-12 rounded-xl bg-[#fe9445]/10 group-hover:bg-[#fe9445] flex items-center justify-center flex-shrink-0 transition-colors">
                        <card.icon className="w-6 h-6 text-[#fe9445] group-hover:text-white transition-colors" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-[#232323] mb-1">{card.title}</h4>
                        {card.lines.map((line) => (
                          <p key={line} className="text-gray-600 text-sm break-words">
                            {line}
                          </p>
                        ))}
                        {card.action && (
                          <span className="inline-block mt-1.5 text-xs font-bold text-[#fe9445]">{card.action} →</span>
                        )}
                      </div>
                    </>
                  )
                  const className =
                    "group flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                  const style = { "--reveal-delay": `${i * 80}ms` } as CSSProperties
                  return card.href ? (
                    <a
                      key={card.title}
                      href={card.href}
                      target={card.href.startsWith("http") ? "_blank" : undefined}
                      rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={className}
                      data-reveal
                      style={style}
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={card.title} className={className} data-reveal style={style}>
                      {content}
                    </div>
                  )
                })}
              </div>

              {/* Redes sociais */}
              <div data-reveal>
                <h4 className="font-bold text-[#232323] mb-4">Siga-nos nas Redes Sociais</h4>
                <div className="flex gap-3">
                  <Link
                    href={company.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-12 h-12 rounded-xl bg-[#00387d] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                  >
                    <Facebook className="w-6 h-6" />
                  </Link>
                  <Link
                    href={company.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-12 h-12 rounded-xl bg-[#fc018a] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                  >
                    <Instagram className="w-6 h-6" />
                  </Link>
                  <Link
                    href={company.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                  >
                    <WhatsAppIcon className="w-6 h-6" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Formulário */}
            <div data-reveal="right">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section className="py-16 md:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Localização"
            title={
              <>
                Onde <span className="text-[#fe9445]">Estamos</span>
              </>
            }
          />
          <div className="relative rounded-3xl overflow-hidden shadow-xl h-[320px] md:h-[440px] bg-[#f0edec]" data-reveal>
            <iframe
              title="Mapa — Construções Coutinho, Mindelo"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3436.562696528632!2d-24.9773892!3d16.8843699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDUzJzAzLjciTiAyNMKwNTgnMzguNiJX!5e0!3m2!1sen!2sus!4v1707660000000"
            />
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=16.8843699,-24.9773892"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 left-4 inline-flex items-center gap-2 bg-[#232323] text-white px-5 py-3 rounded-full text-sm font-bold shadow-xl hover:bg-[#fe9445] transition-colors"
            >
              <Navigation className="w-4 h-4" /> Como chegar
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  )
}
