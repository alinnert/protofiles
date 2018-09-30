#!/usr/bin/env node
import * as commander from 'commander'
import { dirname, resolve } from 'path'
import { fallbackAction } from './defaultAction'
import { getPackageData } from './utils/packageJson'

const packageJson = getPackageData(resolve(dirname(__dirname), 'package.json'))

commander.version(packageJson.version, '-v, --version')

commander
  .command('* [inputs]')
  .action(fallbackAction)

commander.parse(process.argv)
