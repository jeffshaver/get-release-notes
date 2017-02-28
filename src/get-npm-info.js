const Promise = require('bluebird')
const RegistryClient = require('silent-npm-registry-client')
const baseUri = 'https://registry.npmjs.org/'
const client = new RegistryClient()

function getNpmInfo (packageName) {
  return new Promise((resolve, reject) => {
    client.get(`${baseUri}${packageName}`, {timeout: 1000}, function (err, data) {
      if (err) {
        return reject(err)
      }

      return resolve(data)
    })
  })
}

module.exports = getNpmInfo