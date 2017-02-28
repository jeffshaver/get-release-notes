const debug = require('debug')('get-release-notes')
const fs = require('fs')
const path = require('path')

function getDependenciesFromPackageJson (dir = __dirname) {
  let packageJson = ''
  const packageJsonUri = path.join(dir, 'package.json')

  debug(`loading ${packageJsonUri}`)

  try {
    packageJson = fs.readFileSync(path.join(dir, 'package.json'))
  } catch (e) {
    console.error('package.json not found')

    process.exit(1)
  }

  const json = JSON.parse(packageJson)
  const packageNames = Object.keys(Object.assign(
    {},
    json.dependencies || {},
    json.devDependencies || {}
  ))

  return packageNames
}

module.exports = getDependenciesFromPackageJson