import { ensureDir, pathExists } from 'fs-extra'
import { resolve } from 'path'
import { applyTemplate } from './applyTemplate'
import { globalConfigDirectory } from './globals'

export async function fallbackAction(protofileName: string, options: any) {
  prepareProtofilesDirectory()
  const protofileDirectory = resolve(globalConfigDirectory, protofileName)

  if (await pathExists(protofileDirectory)) {
    applyTemplate(protofileDirectory)
  } else {
    console.log(`Template "${protofileName}" does not exist`)
  }
}

async function prepareProtofilesDirectory() {
  const dirExists = await pathExists(globalConfigDirectory)
  if (!dirExists) { await ensureDir(globalConfigDirectory) }
}