import Link from "next/link"

interface CTASectionProps {
  title: string
  description: string
  primaryButton: { text: string; href: string }
  secondaryButton: { text: string; href: string }
}

export function CTASection({ title, description, primaryButton, secondaryButton }: CTASectionProps) {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fe9445] via-[#e6b23a] to-[#fe9445]" />
      <div className="absolute inset-0 bg-[url('/img/São Vicente.jpg')] bg-cover bg-center opacity-10" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">{title}</h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">{description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={primaryButton.href}
            className="bg-white text-[#fe9445] px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg"
          >
            {primaryButton.text}
          </Link>
          <Link
            href={secondaryButton.href}
            className="bg-transparent text-white px-10 py-4 rounded-full font-bold border-2 border-white hover:bg-white/10 transition-colors"
          >
            {secondaryButton.text}
          </Link>
        </div>
      </div>
    </section>
  )
}
