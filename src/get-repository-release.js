const fetch = require('./fetch')

async function getRepositoryRelease (username, repositoryName) {
  const uri = `https://api.github.com/repos/${username}/${repositoryName}/releases`
  const repositoryRelease = await fetch(uri)
  const releaseBody = JSON.parse(repositoryRelease)[0].body

  return releaseBody
}

module.exports = getRepositoryRelease