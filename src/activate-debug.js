const activateDebug = (debugIndex, packageNames = []) => {
  process.env.DEBUG = 'get-release-notes'

  return packageNames.slice(0, debugIndex)
    .concat(packageNames.slice(debugIndex + 1))
}

module.exports = activateDebug