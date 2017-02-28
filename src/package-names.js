const activateDebug = require('./activate-debug')
let packageNames = process.argv.slice(2)
const debugIndex = packageNames.findIndex(
  (package) => package === '--debug'
)

if (debugIndex !== -1) {
  packageNames = activateDebug(debugIndex, packageNames)
}

module.exports = packageNames