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
  // Fonte variável: um só ficheiro cobre todos os pesos (300–900)
  variable: "--font-roboto",
  display: "swap",
})

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-roboto-condensed",
  display: "swap",
})

const ogImage = cldUrl("/service-slide3.jpg", { width: 1200 })
// URL absoluto (os dados estruturados não aceitam caminhos relativos)
const ogImageAbsolute = ogImage.startsWith("http") ? ogImage : `${company.baseUrl}${ogImage}`

// Coordenadas da sede (Mindelo, São Vicente) — as mesmas do mapa da página de contacto
const GEO = { latitude: 16.8843699, longitude: -24.9773892 }

export const metadata: Metadata = {
  metadataBase: new URL(company.baseUrl),
  title: {
    // Curto para não ser cortado nos resultados do Google (~60 caracteres)
    default: "Construções Coutinho | Construção Civil em Cabo Verde",
    template: "%s | Construções Coutinho",
  },
  description:
    "Construções Coutinho — empresa de construção civil em Mindelo, São Vicente, Cabo Verde. Construindo sonhos, Transformando Espaços: projetos, execução de obras e materiais com compromisso, qualidade e segurança.",
  applicationName: "Construções Coutinho",
  keywords: [
    "Construções Coutinho",
    "Construcoes Coutinho",
    "Coutinho construções",
    "construtora Cabo Verde",
    "empresa de construção Mindelo",
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
  // Ícones quadrados gerados por scripts/generate-icons.mjs — o Google mostra o favicon nos resultados
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
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
  robots: { index: true, follow: true, "max-image-preview": "large" },
  // Verificação do Google Search Console (definir NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION no Cloudflare)
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  // Sinais de localização (região de Cabo Verde)
  other: {
    "geo.region": "CV-SV",
    "geo.placename": "Mindelo, São Vicente, Cabo Verde",
    "geo.position": `${GEO.latitude};${GEO.longitude}`,
    ICBM: `${GEO.latitude}, ${GEO.longitude}`,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fe9445",
  viewportFit: "cover",
}

// Dados estruturados — ajuda o Google a mostrar a empresa nas pesquisas locais
const alternateNames = ["Construcoes Coutinho", "Coutinho Construções", "Construções Coutinho Cabo Verde"]

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      // Ajuda o Google a mostrar "Construções Coutinho" como nome do site nos resultados
      "@type": "WebSite",
      "@id": `${company.baseUrl}/#website`,
      name: company.name,
      alternateName: alternateNames,
      url: company.baseUrl,
      inLanguage: "pt-CV",
      publisher: { "@id": `${company.baseUrl}/#empresa` },
    },
    {
  "@type": "GeneralContractor",
  "@id": `${company.baseUrl}/#empresa`,
  name: company.name,
  alternateName: alternateNames,
  description: "Empresa de construção civil em Mindelo, São Vicente, Cabo Verde: elaboração de projetos, execução de obras e materiais de construção.",
  slogan: company.slogan,
  url: company.baseUrl,
  logo: `${company.baseUrl}/icon-512.png`,
  image: ogImageAbsolute,
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
  geo: { "@type": "GeoCoordinates", ...GEO },
  hasMap: `https://www.google.com/maps/search/?api=1&query=${GEO.latitude},${GEO.longitude}`,
  areaServed: { "@type": "Country", name: "Cabo Verde" },
  openingHours: ["Mo-Fr 08:00-18:00", "Sa 08:00-13:00"],
  sameAs: [company.social.facebook, company.social.instagram],
    },
  ],
}

// Evita que o loader "pisque" em recarregamentos dentro da mesma sessão
const introScript = `try{if(sessionStorage.getItem("cc-intro-seen")==="1")document.documentElement.classList.add("intro-seen")}catch(e){}`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-CV" className={`${roboto.variable} ${robotoCondensed.variable}`} suppressHydrationWarning>
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
        {/* O build do Cloudflare (next-on-pages) também define VERCEL=1, por isso exclui-se CF_PAGES */}
        {process.env.VERCEL && !process.env.CF_PAGES && <Analytics />}
      </body>
    </html>
  )
}
