import type { CSSProperties } from "react"
import { MessagesSquare, PencilRuler, HardHat, KeyRound } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"

const steps = [
  {
    icon: MessagesSquare,
    title: "Consulta & Visita",
    description: "Ouvimos as suas ideias, visitamos o terreno ou o espaço e avaliamos as necessidades.",
  },
  {
    icon: PencilRuler,
    title: "Projecto & Orçamento",
    description: "Elaboramos o projecto técnico e um orçamento detalhado, transparente e sem compromisso.",
  },
  {
    icon: HardHat,
    title: "Execução da Obra",
    description: "A nossa equipa executa a obra com acompanhamento técnico, segurança e cumprimento de prazos.",
  },
  {
    icon: KeyRound,
    title: "Entrega & Pós-obra",
    description: "Entregamos a obra pronta e mantemos o suporte pós-obra para a sua tranquilidade.",
  },
]

/** "Como Trabalhamos" — linha de progresso de obra com as 4 etapas. */
export function ProcessSection() {
  return (
    <section className="relative py-20 md:py-28 px-4 sm:px-6 bg-[#141414] text-white overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-80" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto">
        <SectionHeading
          dark
          eyebrow="Como Trabalhamos"
          title={
            <>
              Do projecto à <span className="text-[#fe9445]">entrega da chave</span>
            </>
          }
          description="Um processo claro, em quatro etapas, para que saiba sempre em que fase está a sua obra."
        />

        <div className="relative">
          {/* Linha de progresso (desktop: horizontal · mobile: vertical) */}
          <div
            data-reveal
            className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-1 rounded-full bg-white/10 overflow-hidden"
            aria-hidden="true"
          >
            <div className="grow-x h-full w-full origin-left bg-gradient-to-r from-[#fe9445] to-[#e6b23a]" />
          </div>
          <div className="md:hidden absolute left-8 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#fe9445] via-[#e6b23a] to-transparent" aria-hidden="true" />

          <ol className="relative grid gap-5 md:grid-cols-4 md:gap-6">
          {steps.map((step, i) => (
            <li
              key={step.title}
              data-reveal
              style={{ "--reveal-delay": `${i * 140}ms` } as CSSProperties}
              className="relative flex md:flex-col md:items-center md:text-center gap-5 md:gap-0"
            >
              <div className="relative z-10 shrink-0 w-16 h-16 rounded-2xl bg-[#232323] border border-[#fe9445]/40 flex items-center justify-center shadow-[0_0_0_6px_#141414] md:mb-6">
                <step.icon className="w-7 h-7 text-[#fe9445]" />
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#fe9445] text-[11px] font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <div className="pt-1 md:pt-0">
                <h3 className="font-display text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed md:max-w-[240px]">{step.description}</p>
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
