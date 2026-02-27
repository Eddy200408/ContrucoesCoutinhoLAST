"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Loader } from "@/components/loader"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScrollToTop } from "@/components/scroll-to-top"
import { PageHeader } from "@/components/page-header"
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Send } from "lucide-react"
import emailjs from "@emailjs/browser"

interface FormData {
  nome: string
  email: string
  telefone: string
  assunto: string
  mensagem: string
}

export default function ContactPage() {
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

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
        "RJIzcPvLJWuFrTalB"
      )

      setSubmitted(true)
      setFormData({ nome: "", email: "", telefone: "", assunto: "", mensagem: "" })
    } catch (error) {
      console.error("Erro ao enviar:", error)
      alert("Erro ao enviar mensagem.")
    }

    setIsSubmitting(false)
    setTimeout(() => setSubmitted(false), 5000)
  }

  if (loading) {
    return <Loader isLoading={loading} />
  }

  return (
    <main className="bg-[#f6f5f5] text-[#333]">
      <Navbar activePage="/contact" />

      <PageHeader
        title="Fale Conosco"
        subtitle="Estamos prontos para ajudar no seu próximo projecto"
        backgroundImage="/ElaboracaodeProjetos/3.jpg"
      />

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12">
            {/* Contact Info */}
            <div>
              <span className="text-[#fe9445] font-bold tracking-wider text-sm">INFORMAÇÕES</span>
              <h2 className="text-3xl font-bold text-[#232323] mt-2 mb-8">
                Contactos da <span className="text-[#fe9445]">Empresa</span>
              </h2>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-[#fe9445]/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#fe9445]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#232323] mb-1">Telefone</h4>
                    <p className="text-gray-600">+238 994 42 12</p>
                    <p className="text-gray-600">+238 994 42 12</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-[#fe9445]/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#fe9445]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#232323] mb-1">Email</h4>
                    <p className="text-gray-600">construcoescoutinho01@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-[#fe9445]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#fe9445]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#232323] mb-1">Endereço</h4>
                    <p className="text-gray-600">Mindelo, Ribeirinha</p>
                    <p className="text-gray-600">São Vicente, Cabo Verde</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-[#fe9445]/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#fe9445]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#232323] mb-1">Horário</h4>
                    <p className="text-gray-600">Seg - Sex: 8h às 18h</p>
                    <p className="text-gray-600">Sáb: 8h às 13h</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-bold text-[#232323] mb-4">Siga-nos nas Redes Sociais</h4>
                <div className="flex gap-3">
                  <Link
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-[#00387d] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                  >
                    <Facebook className="w-6 h-6" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-[#fc018a] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                  >
                    <Instagram className="w-6 h-6" />
                  </Link>
                  <Link
                    href="https://wa.me/2389944212"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-[#232323] mb-2">Solicitar Orçamento</h3>
              <p className="text-gray-600 mb-8">Preencha o formulário abaixo e entraremos em contacto consigo.</p>

              {submitted && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6">
                  Mensagem enviada com sucesso! Entraremos em contacto em breve.
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
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fe9445] focus:border-transparent bg-[#f6f5f5]"
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
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fe9445] focus:border-transparent bg-[#f6f5f5]"
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
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fe9445] focus:border-transparent bg-[#f6f5f5]"
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
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fe9445] focus:border-transparent bg-[#f6f5f5]"
                    >
                      <option value="">Selecione...</option>
                      <option value="orcamento">Solicitar Orçamento</option>
                      <option value="projecto">Elaboração de Projecto</option>
                      <option value="obra">Execução de Obra</option>
                      <option value="blocos">Compra de Blocos</option>
                      <option value="outro">Outro Assunto</option>
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fe9445] focus:border-transparent resize-none bg-[#f6f5f5]"
                    placeholder="Descreva o seu projecto ou dúvida..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#fe9445] to-[#e6b23a] text-white py-4 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
                >
                  {isSubmitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      Enviar Mensagem
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-10 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[#fe9445] font-bold tracking-wider text-sm">LOCALIZAÇÃO</span>
            <h2 className="text-3xl font-bold mt-2">
              Onde <span className="text-[#fe9445]">Estamos</span>
            </h2>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl h-[400px]">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3436.562696528632!2d-24.9773892!3d16.8843699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDUzJzAzLjciTiAyNMKwNTgnMzguNiJX!5e0!3m2!1sen!2sus!4v1707660000000"
            />
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  )
}
