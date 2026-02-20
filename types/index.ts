// Tipos TypeScript para o projeto Construções Coutinho

export interface Slide {
  image: string
  small: string
  title: string
  span: string
  description: string
  cta1: { text: string; href: string }
  cta2: { text: string; href: string }
}

export interface Stat {
  icon: string
  number: string
  title: string
  sub: string
}

export interface Service {
  image: string
  icon: string
  title: string
  desc: string
}

export interface ServiceCategory {
  title: string
  services: ServiceItem[]
}

export interface ServiceItem {
  image: string
  icon: string
  title: string
  desc: string
}

export interface Feature {
  icon: string
  title: string
  description: string
}

export interface ContactInfo {
  phone: string
  email: string
  address: string
}

export interface NavLink {
  href: string
  label: string
  active?: boolean
}

export interface Testimonial {
  name: string
  role: string
  image: string
  text: string
  rating: number
}

export interface Project {
  id: number
  title: string
  category: string
  description: string
  images: string[]
  location: string
  year: string
}

export interface BeforeAfter {
  id: number
  title: string
  description: string
  before: string
  after: string
  category: string
}
