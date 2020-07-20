import path from 'path'
import fs from 'fs'
import compiler from 'svelte/compiler.js'

export async function resolve(specifier, context, defaultResolve) {
  if (path.extname(specifier) === '.svelte') {
    const parentURL = new URL(context.parentURL)
    const parentPath = path.dirname(parentURL.pathname)
    const absolutePath = path.resolve(parentPath, specifier)

    return {
      url: `file://${absolutePath}`
    }
  }

  return defaultResolve(specifier, context, defaultResolve)
}

export async function getFormat(url, context, defaultGetFormat) {
  if (url.endsWith('.svelte')) {
    return { format: 'module' }
  }

  return defaultGetFormat(url, context, defaultGetFormat)
}

export async function getSource(href, context, defaultGetSource) {
  const url = new URL(href)

  if (url.protocol === "file:" && path.extname(href) === '.svelte') {
    const source = compile(url.pathname)

    return { source: adjustImports(source) }
  }

  return defaultGetSource(href, context, defaultGetSource)
}

function compile(path) {
  const source = fs.readFileSync(path, 'utf8')
  const output = compiler.compile(source, {
    generate: 'ssr',
    format: 'esm'
  })

  return output.js.code
}

/*
 * UGLY hack.
 * Without it it gives error:
 * "Directory import '.../node_modules/svelte/internal' is not supported resolving ES modules"
 */
function adjustImports(source) {
  return source.replace('from "svelte/internal";', 'from "svelte/internal/index.mjs";')
}
