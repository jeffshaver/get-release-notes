const getPackage = require('./get-package')

async function getAllPackages (packageNames) {
  const packages = []

  for (let i = 0; i < packageNames.length; i++) {
    const package = await getPackage(packageNames[i])

    packages.push(package)
  }

  return packages
}

module.exports = getAllPackages