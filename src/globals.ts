import { resolve } from 'path'
import { homedir } from 'os'

export const globalConfigDirectory = resolve(homedir(), '.protofiles')
export const configFilename = 'protofile.js'
