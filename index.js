const packageNames = require('./src/package-names')
const getAllPackages = require('./src/get-all-packages')
const getPackageRepositoryUris = require('./src/get-package-repository-uris')
const getAllReleaseNotes = require('./src/get-all-release-notes')
const marked = require('marked')
const TerminalRenderer = require('marked-terminal')
const debug = require('debug')('get-release-notes')

const renderer = new TerminalRenderer({
  showSectionPrefix: false,
  tab: 2
})

marked.setOptions({
  renderer
})

async function run () {
  debug(`will fetch the latest changelog(s) for ${packageNames.join(', ')}`)

  const packages = await getAllPackages(packageNames)
  const repositoryUris = getPackageRepositoryUris(packages)
  const releaseNotes = await getAllReleaseNotes(repositoryUris)

  for (let i = 0; i < packageNames.length; i++) {
    process.stdout.write(
      marked(
        `# ${packageNames[i]}\n${releaseNotes[i] || 'No release notes found'}`
      )
    )
  }
}

run()