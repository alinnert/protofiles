import { readFileSync } from 'fs'

export function getPackageData(filepath: string) {
  const packageJsonString = readFileSync(filepath, 'utf-8')

  return (() => {
    try {
      return JSON.parse(packageJsonString)
    } catch {
      return {}
    }
  })()
}
