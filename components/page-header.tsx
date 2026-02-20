import Image from "next/image"

interface PageHeaderProps {
  title: string
  subtitle?: string
  backgroundImage?: string
}

export function PageHeader({ title, subtitle, backgroundImage = "/img/São Vicente.jpg" }: PageHeaderProps) {
  return (
    <header className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
      <Image src={backgroundImage || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {title.split(" ").slice(0, -1).join(" ")} <span className="text-[#fe9445]">{title.split(" ").slice(-1)}</span>
        </h1>
        {subtitle && <p className="text-lg text-white/80 max-w-2xl mx-auto">{subtitle}</p>}
      </div>
    </header>
  )
}
