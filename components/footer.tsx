import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, ArrowUpRight } from "lucide-react"
import { WhatsAppIcon } from "@/components/icons"
import { company } from "@/lib/data"

const quickLinks = [
  { href: "/", label: "Início" },
  { href: "/services", label: "Serviços" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/about", label: "Sobre Nós" },
  { href: "/contact", label: "Contacto" },
]

const serviceLinks = ["Elaboração de Projectos", "Execução de Obras", "Produção de Blocos", "Fiscalização"]

export function Footer() {
  return (
    <footer className="relative bg-[#1a1a1a] text-gray-400 overflow-hidden">
      <div className="h-1.5 hazard-stripes" aria-hidden="true" />
      <div className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none" aria-hidden="true" />

      {/* Rodapé principal */}
      <div className="relative max-w-6xl mx-auto py-14 md:py-16 px-5 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 lg:gap-10">
          {/* Logo e descrição */}
          <div className="col-span-2 lg:col-span-1">
            <Image src="/icon/logoWhite.png" alt="Logo Construções Coutinho" width={160} height={104} className="mb-4 w-36 h-auto" />
            <p className="text-sm leading-relaxed mb-6 max-w-sm">
              Construindo sonhos e transformando espaços em Cabo Verde desde {company.founded}. Qualidade, compromisso e
              excelência em cada projecto.
            </p>
            <div className="flex gap-3">
              <Link
                href={company.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#00387d] hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href={company.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#fc018a] hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href={company.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors"
              >
                <WhatsAppIcon />
              </Link>
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h5 className="font-display text-white font-bold mb-5 text-lg">Links Rápidos</h5>
            <ul className="space-y-1">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-block py-1.5 hover:text-[#fe9445] hover:translate-x-1 transition-all">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Serviços */}
          <div>
            <h5 className="font-display text-white font-bold mb-5 text-lg">Serviços</h5>
            <ul className="space-y-1">
              {serviceLinks.map((label) => (
                <li key={label}>
                  <Link href="/services" className="inline-block py-1.5 hover:text-[#fe9445] hover:translate-x-1 transition-all">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contactos */}
          <div className="col-span-2 lg:col-span-1">
            <h5 className="font-display text-white font-bold mb-5 text-lg">Contactos</h5>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#fe9445] mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  {company.address.street}
                  <br />
                  {company.address.city}
                </span>
              </div>
              <a href={company.phoneHref} className="flex items-center gap-3 hover:text-[#fe9445] transition-colors">
                <Phone className="w-5 h-5 text-[#fe9445] flex-shrink-0" />
                <span className="text-sm">{company.phone}</span>
              </a>
              <a href={`mailto:${company.email}`} className="flex items-center gap-3 hover:text-[#fe9445] transition-colors">
                <Mail className="w-5 h-5 text-[#fe9445] flex-shrink-0" />
                <span className="text-sm break-all">{company.email}</span>
              </a>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#fe9445] mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  {company.hours.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </div>
              <Link
                href="/contact#orcamento"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#fe9445] hover:gap-2.5 transition-all"
              >
                Pedir orçamento <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative border-t border-white/10">
        <div className="max-w-6xl mx-auto py-6 px-5 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Construções Coutinho. Todos os direitos reservados.
          </p>
          <p className="text-sm flex items-center gap-2">
            Desenvolvido por <span className="text-[#fe9445] font-semibold">Eddy Coutinho</span>
            <Link
              href="https://www.instagram.com/eddycoutinhosantos/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Eddy Coutinho"
              className="hover:text-[#fe9445] p-1"
            >
              <Instagram className="w-4 h-4" />
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
