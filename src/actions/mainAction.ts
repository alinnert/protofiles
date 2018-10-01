import { globalConfigDirectory } from '../lib/globals'
import { readdir, readFile } from 'fs-extra'
import { resolve } from 'path'
import { table, getBorderCharacters } from 'table'
import chalk from 'chalk'

export async function mainAction() {
  const templateNames = await readdir(globalConfigDirectory)

  if (templateNames.length) {
    console.log(`  ${chalk.cyan('{{')} ${chalk.cyanBright('PROTOFILES')} ${chalk.cyan('}}')}\n`)
    console.log(`  The following templates are available.`)
    console.log(`  Run '${chalk.yellowBright('proto <id>')}' to apply one of them.\n`)

    const data = [
      ['ID', 'Description'].map(it => chalk.whiteBright(it)),
      ['--', '-----------'].map(it => chalk.gray(it)),
      ...templateNames.map(
        template => {
          const config = require(resolve(globalConfigDirectory, template, 'protofile.js'))
          const { description } = config
          return [template, description]
        }
      )
    ]

    const options = {
      border: getBorderCharacters('void'),
      drawHorizontalLine: (index: number) => false,
      columns: {
        0: { width: 20 - 3, paddingLeft: 2 },
        1: { width: 80 - 20 - 5, wrapWord: true }
      }
    }

    console.log(table(data, options))
  } else {
    console.log('No templates available.')
  }
}