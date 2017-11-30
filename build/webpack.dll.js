/**
 * Created by leijunping on 2017/1/23.
 */
var config = require('./config')
var webpack = require('webpack')
var path = require('path')
var utils = require('./utils')
var chalk = require('chalk')

if (!utils.hasDll()) {
  console.log(chalk.yellow('如果要执行dll的话，请在custom.config.js里面配置dll选项'))
  process.exit(0)
}
var compiler = webpack({
  output: {
    path: path.resolve('./.dll'),
    filename: 'dll.js',
    library: 'dll'
  },
  entry: {
    dll: config.custom.dll
  },
  plugins: [
    new webpack.DllPlugin({
      context: path.resolve('./.dll'),
      path: path.resolve('./.dll', 'dll.manifest.json'),
      name: '[name]'
    })
  ]
})

compiler.run(function (err, stats) {
  if (err) throw err
  process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n')
})
