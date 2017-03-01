const opn = require('opn')

function getPackageRepositoryUris (packages, openInBrowser) {
  return packages.map((package) => {
    if (!package) return package

    const host = 'github.com'
    const repositoryUri = package.repository.url
      .substring(4, package.repository.url.length - 4)
    const [, , , username, repositoryName] = repositoryUri.split('/')

    if (openInBrowser) {
      opn(
        `https://${host}/${username}/${repositoryName}/releases`
      )

      return
    }

    return {
      headers: {
        'User-Agent': 'node'
      },
      host: 'api.github.com',
      path: `/repos/${username}/${repositoryName}/releases`
    }
  })
}

module.exports = getPackageRepositoryUris