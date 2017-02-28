#!/usr/bin/env node

const program = require('commander')

let packageNames = []

function programAction (...packages) {
  if (program.debug) {
    process.env.DEBUG = 'get-release-notes'
  }
  if (!program.packageJson) {
    packageNames = packages.slice(0, -1)

    return
  }

  const getDependenciesFromPackageJson = require('./src/get-dependencies-from-package-json')

  packageNames = getDependenciesFromPackageJson(__dirname)
}

program
  .version('0.0.1')
  .option('-D, --debug', 'debug mode')
  .option('-P, --package-json', 'pull dependencies from package.json')
  .action(programAction)
  .parse(process.argv)

// fix bug where just calling get-release-notes with no
// arguments wont call the action
if (program.args.length === 0) {
  programAction()
}

if (typeof packageNames === 'undefined' && !program.packageJson) {
  console.error('Please specify the packages to fetch')
  console.log('  ' + program.name() +  ' <package> [other-packages...]')
  console.log()
  console.log('For example:')
  console.log('  ' + program.name() + ' get-release-notes')
  console.log()
  console.log('Run ' + program.name() + ' --help for all options')
  process.exit(1)
}

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

  if (!program.debug) {
    process.stdout.write(process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H')
  }

  for (let i = 0; i < packageNames.length; i++) {
    process.stdout.write(
      marked(
        `# ${packageNames[i]}\n${releaseNotes[i] || 'No release notes found'}`
      )
    )
  }
}

run()