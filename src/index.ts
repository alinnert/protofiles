#!/usr/bin/env node
import cac from 'cac'
import { applyTemplateAction } from './actions/applyTemplateAction'
import { mainAction } from './actions/mainAction'

const cli = cac({ bin: 'proto' })

cli.command('*', { desc: 'The default command' }, (input, flags) => {
  if (input[0]) {
    applyTemplateAction(input[0], flags)
  } else {
    mainAction()
  }
})

cli.parse()