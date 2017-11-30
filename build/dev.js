var webpack = require('webpack')
var config = require('./config')
var utils = require('./utils')
var express = require('express')
var fs = require('fs')
var chalk = require('chalk')
var path = require('path')
var gulpUtil = require('gulp-util')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var proxyMiddleware = require('http-proxy-middleware')
var generateRouter = require('./router/index')
if (utils.hasDll() && !fs.existsSync(path.resolve('./.dll'))) {
  console.log(chalk.red('请先执行npm run dll\n'))
  process.exit(0)
}

var webpackConfig = require('./webpack.dev.config.js')
module.exports = function () {
  // web server
  var server = express()
  server.listen(config.custom.devServer.port, config.custom.devServer.host, function (err) {
    var init = 1
    if (err) {
      throw new gulpUtil.PluginError('webpack', err)
    }
    gulpUtil.log(utils.strBordered('Dev Server is running at http://' + config.custom.devServer.host + ':' + config.custom.devServer.port))
    // compiler
    var compiler = webpack(webpackConfig)
    // dev中间件
    server.use(webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      stats: {
        colors: true,
        chunks: false
      },
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    }))
    // hot-load中间件
    server.use(webpackHotMiddleware(compiler))
    compiler.plugin('done', function () {
      if (init) {
        // 代理服务
        if (config.custom.devServer.proxy instanceof Function) {
          config.custom.devServer.proxy(server, proxyMiddleware)
        } else if (config.custom.devServer.proxy instanceof Array) {
          config.custom.devServer.proxy.forEach(function (item) {
            server.use(item.path, proxyMiddleware(item.config))
          })
        }
        if (config.custom.router.enable) {
          generateRouter()
        }
      }
      init = 0
    })
  })
  // 静态资源服务
  server.use(express.static(config.contextAbsolutePath))
  server.engine('ejs', require('ejs').renderFile)
  server.set('views', config.viewsAbsolutePath)
  // Page Router
  config.custom.entryArray.forEach(function (item) {
    server.get(item.router, function (req, res) {
      item.assets = utils.getThisChunkAssets(config.custom, item.name)
      item.dll = []
      if (utils.hasDll()) {
        item.dll = '/.dll/dll.js'
      }
      res.render(item.name + '.ejs', item)
    })
  })
}
