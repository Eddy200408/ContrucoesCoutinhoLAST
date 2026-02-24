import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-gray-400">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto py-16 px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo e descrição */}
          <div className="lg:col-span-1">
            <Image src="/icon/logoWhite.png" alt="Logo Construções Coutinho" width={160} height={100} className="mb-4" />
            <p className="text-sm leading-relaxed mb-6">
              Construindo sonhos e transformando espaços em Cabo Verde desde 2009. Qualidade, compromisso e excelência
              em cada projecto.
            </p>
            <div className="flex gap-3">
              <Link
                href="https://www.facebook.com/construcoes.coutinho"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#00387d] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.instagram.com/construcoes_coutinho/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#fc018a] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://wa.me/2389944212"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#25D366] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h5 className="text-white font-bold mb-6 text-lg">Links Rápidos</h5>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-[#fe9445] transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#fe9445] transition-colors">
                  Serviços
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-[#fe9445] transition-colors">
                  Portfólio
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#fe9445] transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#fe9445] transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Serviços */}
          <div>
            <h5 className="text-white font-bold mb-6 text-lg">Serviços</h5>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="hover:text-[#fe9445] transition-colors">
                  Elaboração de Projectos
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#fe9445] transition-colors">
                  Execução de Obras
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#fe9445] transition-colors">
                  Produção de Blocos
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#fe9445] transition-colors">
                  Fiscalização
                </Link>
              </li>
            </ul>
          </div>

          {/* Contatos */}
          <div>
            <h5 className="text-white font-bold mb-6 text-lg">Contactos</h5>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#fe9445] mt-0.5 flex-shrink-0" />
                <span className="text-sm">
                  Mindelo, Ribeirinha
                  <br />
                  São Vicente, Cabo Verde
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#fe9445] flex-shrink-0" />
                <span className="text-sm">+238 994 42 12</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#fe9445] flex-shrink-0" />
                <span className="text-sm">construcoescoutinho01@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto py-6 px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-center md:text-left">
            &copy; 2026 Construções Coutinho. Todos os direitos reservados.
          </p>
          <p className="text-sm flex items-center gap-2">
            Desenvolvido por <span className="text-[#fe9445] font-semibold">Eddy Coutinho</span>
            <Link href="https://www.instagram.com/eddycoutinhosantos/" target="_blank" className="hover:text-[#fe9445]">
              <Instagram className="w-4 h-4" />
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
