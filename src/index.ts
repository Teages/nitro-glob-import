import { mkdir, writeFile } from 'node:fs/promises'

import type { Nitro, NitroModule } from 'nitropack'
import { glob } from 'fast-glob'
import { dirname, resolve } from 'pathe'

export default function nitroGlobImport(items: NitroGlobImportItem[]): NitroModule {
  return {
    name: '@teages/nitro-glob-import',
    async setup(nitro: Nitro) {
      await Promise.all(items.map(
        item => addGlobImport(nitro, item.path, item.globInput),
      ))
    },
  }
}

export interface NitroGlobImportItem {
  /**
   * The path to import the globbed files to.
   *
   * Must start with `#` and only contain alphanumeric characters, `-` and `_`.
   */
  path: `#${string}`

  /**
   * The glob pattern to import.
   * @see https://github.com/mrmlnc/fast-glob
   */
  globInput: string | string[]
}

async function addGlobImport(
  nitro: Nitro,
  path: `#${string}`,
  globInput: string | string[],
) {
  const cwd = nitro.options.srcDir
  const files = await glob(globInput, { cwd })

  const content = [
    'const modules = {',
    files.map(
      f => `  '${f}': () => import('${resolve(cwd, f)}')`,
    ).join(',\n'),
    '}',
    'export default modules',
  ].join('\n')

  const dts = [
    `declare const modules: {`,
    files.map(
      f => `  '${f}': () => Promise<typeof import('${resolve(cwd, f)}')>`,
    ).join(',\n'),
    `};`,
    `export default modules;`,
  ].join('\n')

  await addVirtual(nitro, path, content, dts)
}

async function addVirtual(
  nitro: Nitro,
  path: `#${string}`,
  content: string,
  dts?: string,
) {
  if (!/^#[A-Za-z0-9_-]+$/.test(path)) {
    throw new Error('Path must start with \'#\' and only contain alphanumeric characters, \'-\' and \'_\'.')
  }

  const id = path.slice(1)

  nitro.options.virtual[path] = content
  if (dts) {
    const buildDir = nitro.options.buildDir
    const filePath = resolve(buildDir, `./types/virtual/${id}.d.ts`)
    await mkdir(dirname(filePath), { recursive: true })
    await writeFile(filePath, dts)
    nitro.options.typescript.tsConfig ??= {}
    nitro.options.typescript.tsConfig.compilerOptions ??= {}
    nitro.options.typescript.tsConfig.compilerOptions.paths ??= {}
    nitro.options.typescript.tsConfig.compilerOptions.paths[path] = [
      filePath,
    ]
  }
}
