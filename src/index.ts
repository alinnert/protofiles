#!/usr/bin/env node
import cac from 'cac'
import { applyTemplateCommand } from './commands/applyTemplateCommand'
import { listTemplatesCommand } from './commands/listTemplatesCommand'

const cli = cac({ bin: 'proto', defaultOpts: { help: false, version: false } })

cli.command('*', { desc: 'The template command' }, (input, flags) => {
  const [command, ...args] = input
  if (command) {
    applyTemplateCommand(input[0], flags)
  } else {
    listTemplatesCommand()
  }
})

cli.parse()