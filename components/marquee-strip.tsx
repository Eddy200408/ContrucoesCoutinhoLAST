const DEFAULT_ITEMS = [
  "Elaboração de Projetos",
  "Execução de Obras",
  "Remodelações",
  "Fiscalização",
  "Rede Eléctrica",
  "Rede Hidrosanitária",
  "Avaliação Imobiliária",
  "Materiais de Construção",
]

/** Faixa contínua com os serviços, inspirada na fita de sinalização das obras. */
export function MarqueeStrip({ items = DEFAULT_ITEMS }: { items?: string[] }) {
  const loop = [...items, ...items]
  return (
    <div className="relative overflow-hidden bg-[#232323] py-1.5" aria-label="Os nossos serviços">
      <div className="absolute inset-x-0 top-0 h-1.5 hazard-stripes opacity-90" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-1.5 hazard-stripes opacity-90" aria-hidden="true" />
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] py-4 md:py-5">
        {loop.map((item, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length}
            className="flex items-center gap-6 md:gap-10 pr-6 md:pr-10 font-display text-lg md:text-2xl font-bold uppercase tracking-wide text-white whitespace-nowrap"
          >
            {item}
            <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 text-[#fe9445]" fill="currentColor" aria-hidden="true">
              <path d="M2 20h20v2H2zM4 12h7v6H4zm9 0h7v6h-7zM8.5 5h7v6h-7z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  )
}
