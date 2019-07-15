import { pathExists, writeFile, ensureFile } from 'fs-extra'
import { prompt } from 'inquirer'
import { resolve } from 'path'
import { configFilename } from './globals'
import { renderInternalTemplate, renderProtofileTemplate } from './templates'

interface IProtofileTemplateDescriptor {
  template: string
  outputPath: string
}

interface IProtofileTemplateDescriptorWithOutput extends IProtofileTemplateDescriptor {
  output: string
}

export async function applyTemplate(protofileDirectory: string) {
  const config = await getProtofileConfig(protofileDirectory)
  if (!config) {
    console.log(`The config file "${configFilename}" is missing from directory ${protofileDirectory}`)
    return
  }

  console.log(await renderInternalTemplate('confirm-apply-message', config))

  if (typeof config.inputs === 'object') {
    const mergeDefaults = (input: any) => ({ ...questionDefaults, ...input })
    const questionDefaults = { type: 'input' }
    const questions = config.inputs.map(mergeDefaults)
    const answers = await prompt(questions)
    const fileDescriptors = config.files(answers)
    const renderResult = fileDescriptors.map(
      async (fileDescriptor: IProtofileTemplateDescriptor) => ({
        ...fileDescriptor,
        output: await renderProtofileTemplate(
          resolve(protofileDirectory, `${fileDescriptor.template}.mustache`),
          typeof answers === 'object' && answers !== null ? answers : {}
        )
      })
    )
    const outputs = await Promise.all(renderResult)
    await Promise.all([
      ...outputs.map(async ({ output, outputPath }: any) => {
        await ensureFile(outputPath)
        return writeFile(outputPath, output)
      })
    ])
  }
}

async function getProtofileConfig(protofileDirectory: string) {
  const configFilePath = resolve(protofileDirectory, configFilename)
  return await pathExists(configFilePath) ? require(configFilePath) : null
}