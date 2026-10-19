#!/usr/bin/env node
// Envia todas as imagens de /public para o Cloudinary e atualiza lib/cloudinary-manifest.json.
//
// Uso:
//   1. Copiar .env.example para .env.local e preencher as credenciais do Cloudinary
//   2. npm run cloudinary:upload            (envia apenas imagens novas)
//      npm run cloudinary:upload -- --force (reenvia tudo)
//      npm run cloudinary:upload -- --dry   (mostra o que seria enviado)

import { v2 as cloudinary } from "cloudinary"
import { config } from "dotenv"
import { glob } from "glob"
import { readFile, writeFile } from "node:fs/promises"
import path from "node:path"

config({ path: ".env.local", quiet: true })
config({ quiet: true })

const ROOT = process.cwd()
const PUBLIC_DIR = path.join(ROOT, "public")
const MANIFEST_PATH = path.join(ROOT, "lib", "cloudinary-manifest.json")
const FOLDER = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || "construcoes-coutinho"
const CONCURRENCY = 4

const force = process.argv.includes("--force")
const dryRun = process.argv.includes("--dry")

// Mantém-se igual a toPublicId() em lib/cloudinary.ts
function toPublicId(relativePath) {
  const id = relativePath
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\.([a-z0-9]+)$/i, "_$1")
    .replace(/[^A-Za-z0-9/_-]+/g, "_")
  return `${FOLDER}/${id}`
}

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME
if (!dryRun && (!cloudName || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET)) {
  console.error(
    "\n✖ Credenciais em falta. Defina NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY e CLOUDINARY_API_SECRET em .env.local\n",
  )
  process.exit(1)
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8").catch(() => "{}"))

const files = (
  await glob("**/*.{jpg,jpeg,png,webp,gif,avif,heic,svg,JPG,JPEG,PNG,WEBP,HEIC}", {
    cwd: PUBLIC_DIR,
    nodir: true,
    posix: true,
  })
).sort()

// Deteta colisões de public_id antes de enviar
const seen = new Map()
for (const file of files) {
  const id = toPublicId(file)
  if (seen.has(id)) {
    console.error(`✖ Colisão de public_id: "${file}" e "${seen.get(id)}" → ${id}`)
    process.exit(1)
  }
  seen.set(id, file)
}

const pending = files.filter((file) => force || !manifest[file.normalize("NFC")])
console.log(`\n${files.length} imagens encontradas · ${pending.length} para enviar\n`)

if (dryRun) {
  pending.forEach((file) => console.log(`  ${file} → ${toPublicId(file)}`))
  process.exit(0)
}

let done = 0
let failed = 0

async function upload(file) {
  const publicId = toPublicId(file)
  try {
    const result = await cloudinary.uploader.upload(path.join(PUBLIC_DIR, file), {
      public_id: publicId,
      resource_type: "image",
      overwrite: force,
      unique_filename: false,
      use_filename: false,
    })
    manifest[file.normalize("NFC")] = { publicId: result.public_id, width: result.width, height: result.height }
    done++
    console.log(`✔ [${done + failed}/${pending.length}] ${file}`)
  } catch (error) {
    failed++
    console.error(`✖ [${done + failed}/${pending.length}] ${file}: ${error?.message || error?.error?.message || error}`)
  }
}

const queue = [...pending]
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) await upload(queue.shift())
  }),
)

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)))
await writeFile(MANIFEST_PATH, JSON.stringify(sorted, null, 2) + "\n")

console.log(`\nConcluído: ${done} enviadas, ${failed} falharam. Manifesto atualizado em lib/cloudinary-manifest.json`)
console.log("Volte a fazer o build (npm run build) para o site passar a usar o Cloudinary.\n")
if (failed) process.exit(1)
