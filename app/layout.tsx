import type React from "react"
import type { Metadata, Viewport } from "next"
import { Roboto, Roboto_Condensed } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { IntroLoader } from "@/components/intro-loader"
import { RevealObserver } from "@/components/reveal-observer"
import { ScrollProgress } from "@/components/scroll-progress"
import { FloatingActions } from "@/components/floating-actions"
import { company } from "@/lib/data"
import { cldUrl } from "@/lib/cloudinary"
import "./globals.css"

// Fontes servidas localmente pelo Next (sem pedidos ao Google em tempo real, sem "saltos" de layout)
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
})

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-roboto-condensed",
  display: "swap",
})

const ogImage = cldUrl("/service-slide3.jpg", { width: 1200 })

export const metadata: Metadata = {
  metadataBase: new URL(company.baseUrl),
  title: {
    default: "Construções Coutinho | Construção Civil em São Vicente, Cabo Verde",
    template: "%s | Construções Coutinho",
  },
  description:
    "Construindo sonhos, Transformando Espaços - Projetos e execução com compromisso, qualidade e segurança em Cabo Verde.",
  keywords: [
    "construção civil",
    "projetos",
    "arquitetura",
    "Cabo Verde",
    "São Vicente",
    "Mindelo",
    "execução de obras",
    "remodelação",
    "blocos de cimento",
    "fiscalização de obras",
  ],
  authors: [{ name: "Construções Coutinho" }],
  icons: {
    icon: "/icon/logoWhite.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    siteName: "Construções Coutinho",
    title: "Construções Coutinho — Construindo sonhos, Transformando Espaços",
    description: "Projetos, execução de obras e materiais de construção em São Vicente, Cabo Verde.",
    images: [{ url: ogImage, width: 1200, height: 675, alt: "Obra da Construções Coutinho" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Construções Coutinho",
    description: "Construção civil com compromisso, qualidade e segurança em Cabo Verde.",
    images: [ogImage],
  },
  alternates: { canonical: "/" },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fe9445",
  viewportFit: "cover",
}

// Dados estruturados — ajuda o Google a mostrar a empresa nas pesquisas locais
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: company.name,
  slogan: company.slogan,
  url: company.baseUrl,
  logo: `${company.baseUrl}/icon/logoWhite.png`,
  image: ogImage,
  telephone: company.phone.replace(/\s/g, ""),
  email: company.email,
  foundingDate: String(company.founded),
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ribeirinha",
    addressLocality: "Mindelo",
    addressRegion: "São Vicente",
    addressCountry: "CV",
  },
  areaServed: "Cabo Verde",
  openingHours: ["Mo-Fr 08:00-18:00", "Sa 08:00-13:00"],
  sameAs: [company.social.facebook, company.social.instagram],
}

// Evita que o loader "pisque" em recarregamentos dentro da mesma sessão
const introScript = `try{if(sessionStorage.getItem("cc-intro-seen")==="1")document.documentElement.classList.add("intro-seen")}catch(e){}`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt" className={`${roboto.variable} ${robotoCondensed.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-sans antialiased overflow-x-hidden">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:bg-[#fe9445] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Saltar para o conteúdo
        </a>
        <ScrollProgress />
        <div data-intro-loader>
          <IntroLoader />
        </div>
        {children}
        <FloatingActions />
        <RevealObserver />
        {/* A Vercel Analytics só funciona quando o site está alojado na Vercel */}
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  )
}
