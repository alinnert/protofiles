import { readFile } from 'fs-extra'
import * as Mustache from 'mustache'
import { dirname, resolve } from 'path'

// @ts-ignore
Mustache.escape = (it: any) => it

export async function renderInternalTemplate(filename: string, view: Object) {
  const templatePath = resolve(dirname(__dirname), 'templates', `${filename}.mustache`)
  const fileContent = await readFile(templatePath, 'utf-8')
  return Mustache.render(fileContent, view)
}

export async function renderProtofileTemplate(filename: string, view: Object) {
  const fileContent = await readFile(filename, 'utf-8')
  return Mustache.render(fileContent, view)
}