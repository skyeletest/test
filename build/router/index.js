var utils = require('./utils')
var chokidar = require('chokidar')
module.exports = function () {
  const patterns = [ utils.resolve('src/pages/*.vue'), utils.resolve('src/pages/**/*.vue'), utils.resolve('src/pages/*.js'), utils.resolve('src/pages/**/*.js') ]
  chokidar.watch(patterns).on('add', utils.refreshFiles)
    .on('unlink', utils.refreshFiles)
}
