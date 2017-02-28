const debug = require('debug')('get-release-notes')
const getNpmInfo = require('./get-npm-info')

async function getPackage (packageName) {
  let package

  debug('fetching package', packageName)

  try {
    package = await getNpmInfo(packageName)
  } catch (e) {
    package = undefined
  }

  return package
}

module.exports = getPackage