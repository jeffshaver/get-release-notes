function getPackageRepositoryUris (packages) {
  return packages.map((package) => {
    if (!package) return package
    
    const repositoryUri = package.repository.url
      .substring(4, package.repository.url.length - 4)
    const [, , , username, repositoryName] = repositoryUri.split('/')

    return {
      headers: {
        'User-Agent': 'node'
      },
      host: 'api.github.com',
      path: `/repos/${username}/${repositoryName}/releases`
    }

    return `https://api.github.com/repos/${username}/${repositoryName}/releases`
  })
}

module.exports = getPackageRepositoryUris