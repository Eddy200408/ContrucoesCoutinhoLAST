#!/usr/bin/env node
// Gera os ícones do site (favicon, ícone Apple, ícones da app) a partir do logótipo.
// Uso: node scripts/generate-icons.mjs
//
// O Google mostra o favicon nos resultados de pesquisa e exige um ícone quadrado,
// com pelo menos 48×48 px e visível sobre fundo branco.

import sharp from "sharp"
import { writeFile } from "node:fs/promises"

const LOGO = "public/icon/logoWhiteCopia.png" // linhas brancas + pá laranja
const BG = "#232323"

const BASE = 1024 // trabalha em alta resolução e reduz no fim

// As linhas do logótipo são muito finas: engrossam-se para continuarem visíveis
// em tamanhos pequenos (o Google mostra o favicon a ~16–28 px)
async function boldLogo(targetSize) {
  const trimmed = await sharp(LOGO)
    .trim()
    .resize(BASE, BASE, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()
  // espessura desejada no tamanho final (~2,2 px), convertida para a escala BASE
  const sigma = Math.min(28, Math.max(2, ((2.2 * BASE) / targetSize) * 0.35))

  const { data } = await sharp(trimmed).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const lines = Buffer.alloc(BASE * BASE)
  const shovel = Buffer.alloc(BASE * BASE)
  for (let i = 0; i < BASE * BASE; i++) {
    const [r, b, a] = [data[i * 4], data[i * 4 + 2], data[i * 4 + 3]]
    if (a < 40) continue
    if (r - b > 80) shovel[i] = 255 // laranja: muito vermelho, pouco azul
    else lines[i] = 255 // branco/cinzento
  }
  const dilate = (buf, s) =>
    sharp(buf, { raw: { width: BASE, height: BASE, channels: 1 } }).blur(s).threshold(18).extractChannel(0).raw().toBuffer()
  const [linesBold, shovelBold] = await Promise.all([dilate(lines, sigma), dilate(shovel, sigma * 0.8)])

  const out = Buffer.alloc(BASE * BASE * 4)
  for (let i = 0; i < BASE * BASE; i++) {
    const color = shovelBold[i] ? [0xfe, 0x94, 0x45] : linesBold[i] ? [0xff, 0xff, 0xff] : null
    if (!color) continue
    out.set([...color, 255], i * 4)
  }
  return sharp(out, { raw: { width: BASE, height: BASE, channels: 4 } }).png().toBuffer()
}

async function makeIcon(size, { padding = 0.14, radius = 0 } = {}) {
  const inner = Math.round(size * (1 - padding * 2))
  const logo = await sharp(await boldLogo(inner))
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer()

  const mask = radius
    ? Buffer.from(`<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="#fff"/></svg>`)
    : null

  let img = sharp({ create: { width: size, height: size, channels: 4, background: BG } }).composite([
    { input: logo, gravity: "center" },
    ...(mask ? [{ input: mask, blend: "dest-in" }] : []),
  ])
  return img.png({ compressionLevel: 9 }).toBuffer()
}

// Ficheiro .ico com imagens PNG embutidas (formato suportado por todos os browsers atuais)
function buildIco(pngs) {
  const header = Buffer.alloc(6 + 16 * pngs.length)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(pngs.length, 4)
  let offset = header.length
  pngs.forEach(({ size, data }, i) => {
    const e = 6 + i * 16
    header.writeUInt8(size >= 256 ? 0 : size, e)
    header.writeUInt8(size >= 256 ? 0 : size, e + 1)
    header.writeUInt8(0, e + 2)
    header.writeUInt8(0, e + 3)
    header.writeUInt16LE(1, e + 4)
    header.writeUInt16LE(32, e + 6)
    header.writeUInt32LE(data.length, e + 8)
    header.writeUInt32LE(offset, e + 12)
    offset += data.length
  })
  return Buffer.concat([header, ...pngs.map((p) => p.data)])
}

const icoSizes = [16, 32, 48]
const icoPngs = await Promise.all(icoSizes.map(async (size) => ({ size, data: await makeIcon(size, { padding: 0.08 }) })))
await writeFile("public/favicon.ico", buildIco(icoPngs))
await writeFile("public/favicon-48x48.png", icoPngs[2].data)
await writeFile("public/icon-192.png", await makeIcon(192))
await writeFile("public/icon-512.png", await makeIcon(512))
await writeFile("public/apple-touch-icon.png", await makeIcon(180))
await writeFile("public/icon-maskable-512.png", await makeIcon(512, { padding: 0.22 }))

console.log("Ícones gerados: favicon.ico, favicon-48x48.png, icon-192.png, icon-512.png, apple-touch-icon.png, icon-maskable-512.png")
