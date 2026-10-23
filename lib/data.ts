// Conteúdo partilhado entre páginas — dados da empresa, galerias e projetos.
import type { Project, BeforeAfter, Stat, GalleryImage } from "@/types"

export const company = {
  name: "Construções Coutinho",
  slogan: "Construindo sonhos, Transformando Espaços",
  founded: 2021,
  phone: "+238 586 38 61",
  phoneHref: "tel:+2385863861",
  whatsapp: "https://wa.me/2385863861",
  whatsappMessage: (text: string) => `https://wa.me/2385863861?text=${encodeURIComponent(text)}`,
  email: "construcoescoutinho01@gmail.com",
  address: { street: "Mindelo, Ribeirinha", city: "São Vicente, Cabo Verde" },
  hours: ["Seg - Sex: 8h às 18h", "Sáb: 8h às 13h"],
  social: {
    facebook: "https://www.facebook.com/construcoes.coutinho",
    instagram: "https://www.instagram.com/construcoes_coutinho/",
  },
  baseUrl: (process.env.NEXT_PUBLIC_BASE_URL || "https://construcoescoutinho.cv").replace(/\/+$/, ""),
}

export const companyStats: Stat[] = [
  { icon: "/icon/experiencia.png", number: "5+", title: "Anos de Excelência", sub: "Referência em construção" },
  { icon: "/icon/cliente.png", number: "100+", title: "Clientes Satisfeitos", sub: "Histórias de transformação" },
  { icon: "/icon/projetoDone.png", number: "150+", title: "Projectos Concluídos", sub: "Obras de qualidade" },
  { icon: "/icon/satisfacao.png", number: "98%", title: "Taxa de Satisfação", sub: "Recomendação entre clientes" },
]

/** Galeria da página inicial */
export const homeGallery: GalleryImage[] = [
  { src: "/Galeria/2.jpg", alt: "Máquina de produção de blocos", category: "Blocos" },
  { src: "/Galeria/3.jpg", alt: "Preparação do terreno", category: "Terraplanagem" },
  { src: "/Galeria/4.jpg", alt: "Movimentação de terras", category: "Terraplanagem" },
  { src: "/Galeria/5.jpg", alt: "Betonagem de pavimento", category: "Betonagem" },
  { src: "/Galeria/6.jpg", alt: "Betonagem de laje", category: "Betonagem" },
  { src: "/Galeria/7.jpg", alt: "Equipa em obra", category: "Obra" },
  { src: "/Galeria/8.jpg", alt: "Escavação de fundações", category: "Fundações" },
  { src: "/Galeria/9.jpg", alt: "Escavação e contenção", category: "Fundações" },
  { src: "/Galeria/10.jpg", alt: "Abertura de valas para fundações", category: "Fundações" },
  { src: "/Galeria/12.jpg", alt: "Escavação e transporte de terras", category: "Terraplanagem" },
  { src: "/Galeria/13.png", alt: "Laje e pavimento exterior", category: "Estrutura" },
]

/** Galeria completa de obras (página de portfólio) */
export const worksGallery: GalleryImage[] = [
  { src: "/Galeria/1.jpg", alt: "Pavimento em blocos", category: "Obras" },
  ...homeGallery.map((img) => ({ ...img, category: "Obras" })),
  { src: "/Galeria/14.png", alt: "Armação de laje aligeirada", category: "Obras" },
  { src: "/Galeria/15.png", alt: "Betonagem de laje", category: "Obras" },
  { src: "/Galeria/16.png", alt: "Muro de suporte em execução", category: "Obras" },
  { src: "/Galeria/17.png", alt: "Reabilitação de fachada com andaimes", category: "Reabilitação" },
  { src: "/Galeria/18.png", alt: "Fachada reabilitada", category: "Reabilitação" },
  { src: "/Blocos/1.jpg", alt: "Produção de blocos", category: "Blocos" },
  { src: "/Blocos/2.jpg", alt: "Blocos de cimento", category: "Blocos" },
  { src: "/Blocos/4.jpg", alt: "Máquina de produção de blocos", category: "Blocos" },
  { src: "/ElaboracaodeProjetos/OR.jpg", alt: "Obra residencial", category: "Obras" },
  { src: "/ElaboracaodeProjetos/OC.jpeg", alt: "Obra comercial", category: "Obras" },
  { src: "/ElaboracaodeProjetos/OS.jpeg", alt: "Obra em curso", category: "Obras" },
  { src: "/ElaboracaodeProjetos/20201202_111602.jpg", alt: "Construção em alvenaria", category: "Obras" },
  { src: "/ElaboracaodeProjetos/20201202_111814.jpg", alt: "Estrutura em blocos", category: "Obras" },
  { src: "/ElaboracaodeProjetos/20251211_093302.jpg", alt: "Obra em curso", category: "Obras" },
  ...[
    "IMG-20241004-WA0001", "IMG-20241004-WA0003", "IMG-20241004-WA0007", "IMG-20241004-WA0013",
    "IMG-20241004-WA0014", "IMG-20241004-WA0015", "IMG-20241004-WA0016", "IMG-20241004-WA0019",
    "IMG-20241004-WA0021", "IMG-20241004-WA0022", "IMG-20241004-WA0024", "IMG-20241004-WA0025",
    "IMG-20241004-WA0026", "IMG-20241004-WA0027", "IMG-20241004-WA0029", "IMG-20241004-WA0033",
    "IMG-20241003-WA0001", "IMG-20241003-WA0004", "IMG-20241003-WA0011", "IMG-20240814-WA0030",
    "IMG-20240814-WA0031", "IMG-20240824-WA0002", "IMG-20240824-WA0004", "IMG-20240813-WA0013",
  ].map((name) => ({ src: `/Foto/${name}.jpg`, alt: "Reabilitação de interiores", category: "Reabilitação" })),
  ...["20250918_125418", "20251020_082326", "20260131_122438", "20260131_122508", "20260131_122516"].map(
    (name) => ({ src: `/ElaboracaodeProjetos/${name}.heic`, alt: "Obra recente", category: "Obras" }),
  ),
]

export const projects: Project[] = [
  {
    id: 1,
    title: "Residência Familiar em Mindelo",
    category: "Residencial",
    description:
      "Construção completa de moradia de dois pisos com acabamentos de alta qualidade. Projecto incluiu design arquitectónico personalizado, estrutura em betão armado e acabamentos premium.",
    images: ["/Foto/IMG-20241004-WA0001.jpg", "/Foto/IMG-20241004-WA0002.jpg", "/Foto/IMG-20241004-WA0003.jpg"],
    location: "Mindelo, São Vicente",
    year: "2024",
  },
  {
    id: 2,
    title: "Edifício Comercial Centro",
    category: "Comercial",
    description:
      "Construção de edifício comercial moderno com múltiplas lojas e escritórios. Estrutura sólida com design contemporâneo.",
    images: ["/Foto/IMG-20241004-WA0010.jpg", "/Foto/IMG-20241004-WA0011.jpg", "/Foto/IMG-20241004-WA0012.jpg"],
    location: "São Vicente",
    year: "2024",
  },
  {
    id: 3,
    title: "Moradia Moderna",
    category: "Residencial",
    description:
      "Projecto residencial com arquitectura moderna, amplas áreas sociais e acabamentos de luxo. Inclui piscina e área de lazer.",
    images: ["/Galeria/1.jpg", "/Galeria/2.jpg", "/Galeria/3.jpg"],
    location: "São Vicente",
    year: "2023",
  },
  {
    id: 4,
    title: "Remodelação Completa",
    category: "Remodelação",
    description:
      "Remodelação total de habitação antiga, incluindo reforço estrutural, nova instalação eléctrica e acabamentos modernos.",
    images: ["/Portfolio/Remodelacao/1.jpg", "/Portfolio/Remodelacao/2.jpg", "/Portfolio/Remodelacao/3.jpg"],
    location: "Mindelo",
    year: "2024",
  },
  {
    id: 5,
    title: "Projecto Elaboração Técnica",
    category: "Projectos",
    description:
      "Elaboração de projecto arquitectónico completo com plantas, alçados e detalhes construtivos para aprovação camarária.",
    images: ["/ElaboracaodeProjetos/1.jpg", "/ElaboracaodeProjetos/2.jpg", "/ElaboracaodeProjetos/3.jpg"],
    location: "São Vicente",
    year: "2024",
  },
  {
    id: 6,
    title: "Habitação Unifamiliar",
    category: "Residencial",
    description:
      "Construção de habitação unifamiliar térrea com garagem integrada e jardim. Design funcional e eficiente.",
    images: ["/Galeria/4.jpg", "/Galeria/5.jpg", "/Galeria/6.jpg"],
    location: "São Vicente",
    year: "2023",
  },
  {
    id: 7,
    title: "Estrutura em Blocos",
    category: "Estrutural",
    description:
      "Execução de estrutura em blocos de cimento com armação em betão. Trabalho de alta precisão e qualidade.",
    images: ["/Blocos/1.jpg", "/Blocos/2.jpg", "/Blocos/4.jpg"],
    location: "Mindelo",
    year: "2024",
  },
  {
    id: 8,
    title: "Acabamentos Interiores",
    category: "Acabamentos",
    description:
      "Trabalhos de acabamentos interiores incluindo pintura, revestimentos cerâmicos e instalação de carpintaria.",
    images: ["/Foto/IMG-20241004-WA0020.jpg", "/Foto/IMG-20241004-WA0021.jpg", "/Foto/IMG-20241004-WA0022.jpg"],
    location: "São Vicente",
    year: "2024",
  },
  {
    id: 9,
    title: "Obra de Grande Porte",
    category: "Comercial",
    description:
      "Construção de edifício de grande porte com múltiplos andares. Projecto complexo com coordenação de várias especialidades.",
    images: ["/Galeria/7.jpg", "/Galeria/8.jpg", "/Galeria/9.jpg"],
    location: "São Vicente",
    year: "2023",
  },
]

export const beforeAfterItems: BeforeAfter[] = [
  {
    id: 1,
    title: "Renovação de Fachada",
    description: "Transformação completa da fachada com novo reboco, pintura e detalhes arquitectónicos modernos.",
    before: "/Portfolio/AB/1.jpg",
    after: "/Portfolio/AB/2.jpg",
    category: "Remodelação",
  },
  {
    id: 2,
    title: "Construção Nova Residência",
    description:
      "De terreno vazio a casa de sonho. Acompanhamento completo desde a fundação até aos acabamentos finais.",
    before: "/Portfolio/AAB/1.png",
    after: "/Portfolio/AAB/2.png",
    category: "Construção",
  },
  {
    id: 3,
    title: "Ampliação Residencial",
    description:
      "Ampliação de moradia existente com novo piso e acabamentos de alta qualidade mantendo a harmonia arquitectónica.",
    before: "/Portfolio/ARAB/1.png",
    after: "/Portfolio/ARAB/2.png",
    category: "Ampliação",
  },
]
