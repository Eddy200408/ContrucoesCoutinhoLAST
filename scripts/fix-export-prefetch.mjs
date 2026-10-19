#!/usr/bin/env node
// Corre automaticamente depois do `next build` (script "postbuild").
//
// No export estático do Next 16, o browser pede os ficheiros de pré-carregamento
// das páginas como "contact/__next.contact.__PAGE__.txt", mas o build grava-os em
// "contact/__next.contact/__PAGE__.txt". Resultado: erros 404 na consola e
// navegação mais lenta. Este script cria uma cópia com o nome esperado.

import { readdir, copyFile, stat } from "node:fs/promises"
import path from "node:path"

const OUT = path.join(process.cwd(), "out")
let created = 0

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (!entry.isDirectory()) continue
    if (entry.name.startsWith("__next.")) await flatten(full, entry.name)
    else if (entry.name !== "_next") await walk(full)
  }
}

// "__next.contact/__PAGE__.txt" → "__next.contact.__PAGE__.txt" (recursivo para segmentos aninhados)
async function flatten(dir, prefix) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await flatten(full, `${prefix}.${entry.name}`)
    } else if (entry.name.endsWith(".txt")) {
      await copyFile(full, path.join(rootOf(dir, prefix), `${prefix}.${entry.name}`))
      created++
    }
  }
}

// Pasta onde está o primeiro diretório "__next.*" desta cadeia
function rootOf(dir, prefix) {
  const depth = prefix.split(".").length - 2 // "__next.contact" = 0 níveis extra
  let root = path.dirname(dir)
  for (let i = 0; i < depth; i++) root = path.dirname(root)
  return root
}

try {
  await stat(OUT)
} catch {
  console.log("fix-export-prefetch: pasta out/ não encontrada — nada a fazer")
  process.exit(0)
}

await walk(OUT)
console.log(`fix-export-prefetch: ${created} ficheiros de pré-carregamento corrigidos`)
