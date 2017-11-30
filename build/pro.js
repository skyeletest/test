var webpack = require('webpack')
var fs = require('fs')
var utils = require('./utils')
var config = require('./config')
var gulp = require('gulp')
var gulpEjs = require('gulp-ejs')
var gulpUtil = require('gulp-util')
var generateRouter = require('./router')

var webpackConfig = require('./webpack.pro.config.js')

console.log('generate router.js\n')
if (config.custom.router.enable) {
  generateRouter()
}
console.log('finished router.js\n')

module.exports = function (callback) {
  webpack(webpackConfig, function (err, stats) {
    if (err) {
      throw new gulpUtil.PluginError('webpack', err)
    } else {
      gulpUtil.log('[webpack]\n',
        stats.toString({
          hash: true,
          version: true,
          timings: true,
          assets: true,
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkOrigins: false,
          chunkModules: false,
          errorDetails: true
        }) + '\n'
      )

      // externals
      config.custom.externals.forEach(function (item) {
        if (!item.CDN) {
          item.path = utils.copyFileToDistProAbsolutePath(item.path)
        }
      })

      // favicon
      config.custom.assets.favicon.forEach(function (item) {
        if (!item.CDN) {
          item.path = utils.copyFileToDistProAbsolutePath(item.path)
        }
      })

      // css
      config.custom.assets.css.forEach(function (item) {
        if (!item.CDN) {
          item.path = utils.copyFileToDistProAbsolutePath(item.path)
        }
      })

      // render html
      config.custom.entryArray.forEach(function (item) {
        item.assets = utils.getThisChunkAssets(config.custom, item.name)
        item.dll = null
        gulp.src(config.viewsAbsolutePath + '/' + item.name + '.ejs')
          .pipe(gulpEjs(item, { ext: '.html' }))
          .pipe(gulp.dest(config.templatesAbsolutePath))
      })
      callback()
    }
  })
}
