import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Construções Coutinho",
  description:
    "Construindo sonhos, Transformando Espaços - Projetos e execução com compromisso, qualidade e segurança em Cabo Verde.",
  keywords: ["construção civil", "projetos", "arquitetura", "Cabo Verde", "São Vicente", "Mindelo"],
  authors: [{ name: "Construções Coutinho" }],
  icons: {
    icon: "/icon/logoWhite.png",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fe9445",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
