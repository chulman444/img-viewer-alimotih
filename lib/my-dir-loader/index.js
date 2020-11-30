const fs = require('fs')
const path = require('path')

module.exports = function DirLoader(source) {
  const config = require(this.resourcePath)
  const dirname = config.path
  const files = readDirTree(dirname)
  shuffle(files)
  const code = `
module.exports = ${JSON.stringify(files, null, 2)}
`
  return code
}

function readDirTree(dirname) {
  return tree = fs.readdirSync(dirname)
    .filter(filename => {
      return [".jpg", ".png", ".jpeg", ".webp"].some(ext => filename.endsWith(ext))
    })
    .map(filename => path.join(dirname, filename))
}

// https://stackoverflow.com/a/2450976/3290525
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}