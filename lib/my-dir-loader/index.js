const fs = require('fs')
const path = require('path')

module.exports = function DirLoader(source) {
  const config = require(this.resourcePath)
  const dirname = config.path
  const code = `
module.exports = ${JSON.stringify(readDirTree(dirname), null, 2)}
`
  return code
}

function readDirTree(dirname) {
  return tree = fs.readdirSync(dirname)
    .filter(filename => {
      return [".jpg", ".png"].some(ext => filename.endsWith(ext))
    })
    .map(filename => path.join(dirname, filename))
}