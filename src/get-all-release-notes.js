const fetch = require('./fetch')

async function getAllReleaseNotes (repositoryUris) {
  const releaseNotes = []

  for (let i = 0; i < repositoryUris.length; i++) {
    if (!repositoryUris[i]) {
      releaseNotes.push(repositoryUris[i])

      continue
    }

    const packageReleaseNotes = await fetch(repositoryUris[i], true)
    const json = JSON.parse(packageReleaseNotes)
    const latestReleaseNotes = json[0] && json[0].body || undefined

    releaseNotes.push(latestReleaseNotes)
  }

  return releaseNotes
}

module.exports = getAllReleaseNotes