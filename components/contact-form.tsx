"use client"

import type React from "react"
import { useState } from "react"
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import emailjs from "@emailjs/browser"
import { WhatsAppIcon } from "@/components/icons"
import { company } from "@/lib/data"

interface FormData {
  nome: string
  email: string
  telefone: string
  assunto: string
  mensagem: string
}

const EMPTY: FormData = { nome: "", email: "", telefone: "", assunto: "", mensagem: "" }

const subjects: Record<string, string> = {
  orcamento: "Solicitar Orçamento",
  projecto: "Elaboração de Projecto",
  obra: "Execução de Obra",
  blocos: "Compra de Blocos",
  outro: "Outro Assunto",
}

const inputClass =
  "w-full px-4 py-3.5 border border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-[#fe9445] focus:border-transparent bg-[#f6f5f5] focus:bg-white transition-colors placeholder:text-gray-400"

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>(EMPTY)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus("idle")

    try {
      await emailjs.send(
        "service_83bw8aq",
        "template_uagx7lk",
        {
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
          assunto: formData.assunto,
          mensagem: formData.mensagem,
        },
        "RJIzcPvLJWuFrTalB",
      )

      setStatus("success")
      setFormData(EMPTY)
      setTimeout(() => setStatus("idle"), 8000)
    } catch (error) {
      console.error("Erro ao enviar:", error)
      setStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Alternativa: abre o WhatsApp já com a mensagem preenchida
  const whatsappHref = company.whatsappMessage(
    [
      "Olá! Gostaria de pedir um orçamento.",
      formData.nome && `Nome: ${formData.nome}`,
      formData.assunto && `Assunto: ${subjects[formData.assunto] ?? formData.assunto}`,
      formData.mensagem && `Mensagem: ${formData.mensagem}`,
    ]
      .filter(Boolean)
      .join("\n"),
  )

  return (
    <div id="orcamento" className="relative bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.25)] scroll-mt-24 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-1.5 hazard-stripes" aria-hidden="true" />
      <h3 className="font-display text-2xl md:text-3xl font-extrabold text-[#232323] mb-2">Solicitar Orçamento</h3>
      <p className="text-gray-600 mb-8">Preencha o formulário abaixo e entraremos em contacto consigo.</p>

      {status === "success" && (
        <div
          role="status"
          className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl mb-6 animate-fade-in"
        >
          <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
          Mensagem enviada com sucesso! Entraremos em contacto em breve.
        </div>
      )}
      {status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 animate-fade-in"
        >
          <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
          <span>
            Erro ao enviar mensagem. Tente novamente ou{" "}
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="font-bold underline">
              envie pelo WhatsApp
            </a>
            .
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="nome" className="block text-sm font-semibold text-[#232323] mb-2">
              Nome Completo *
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              required
              autoComplete="name"
              className={inputClass}
              placeholder="Seu nome"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-[#232323] mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              autoComplete="email"
              inputMode="email"
              className={inputClass}
              placeholder="seu@email.com"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="telefone" className="block text-sm font-semibold text-[#232323] mb-2">
              Telefone *
            </label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleInputChange}
              required
              autoComplete="tel"
              inputMode="tel"
              className={inputClass}
              placeholder="+238 XXX XXXX"
            />
          </div>
          <div>
            <label htmlFor="assunto" className="block text-sm font-semibold text-[#232323] mb-2">
              Assunto *
            </label>
            <select
              id="assunto"
              name="assunto"
              value={formData.assunto}
              onChange={handleInputChange}
              required
              className={inputClass}
            >
              <option value="">Selecione...</option>
              {Object.entries(subjects).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="mensagem" className="block text-sm font-semibold text-[#232323] mb-2">
            Mensagem *
          </label>
          <textarea
            id="mensagem"
            name="mensagem"
            value={formData.mensagem}
            onChange={handleInputChange}
            rows={5}
            required
            className={`${inputClass} resize-none`}
            placeholder="Descreva o seu projecto ou dúvida..."
          />
        </div>

        <div className="grid sm:grid-cols-[1fr_auto] gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#fe9445] to-[#e6b23a] text-white py-4 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(254,148,69,0.35)]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> A enviar...
              </>
            ) : (
              <>
                Enviar Mensagem
                <Send className="w-5 h-5" />
              </>
            )}
          </button>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold border-2 border-[#25D366] text-[#1a9e4b] hover:bg-[#25D366] hover:text-white transition-colors"
          >
            <WhatsAppIcon className="w-5 h-5" /> Via WhatsApp
          </a>
        </div>
        <p className="text-xs text-gray-500 text-center sm:text-left">Orçamento gratuito e sem compromisso.</p>
      </form>
    </div>
  )
}
