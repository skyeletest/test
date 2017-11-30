/**
 * 配置请勿随意修改, 除非你熟练使用webpack
 */
var path = require('path')
var _ = require('lodash')
// custom
var custom = require('../config.custom')
exports.custom = custom
exports.routePrefix = (custom.router.routePrefix || '').replace(/\/$/, '')
exports.lazyLoad = custom.router.lazyLoad
exports.routerChuck = (function () {
  var chuck = custom.router.chuck
  var pathTochuckMap = {}
  if (chuck) {
    _.forEach(chuck, function (val, key) {
      if (typeof +key === 'number' && !isNaN(+key)) {
        pathTochuckMap[val] = 'router-chuck'
      } else {
        _.forEach(val, function (v) {
          pathTochuckMap[v] = key
        })
      }
    })
    return pathTochuckMap
  } else {
    return {}
  }
})()
// context
var contextRelativePath = '../'
exports.contextAbsolutePath = path.resolve(__dirname, contextRelativePath)

// package.json
var PACKAGE_JSON = custom.PACKAGE_JSON
exports.PACKAGE_JSON = PACKAGE_JSON

// templates
exports.templatesAbsolutePath = clearPathLastChar(custom.buildDist.template)

// dist(output)
var distRelativePath = '../dist'
var distAbsolutePath = path.resolve(__dirname, distRelativePath)
var distPublicPath = addPathLastChar(custom.buildDist.public)
var distProAbsolutePath = clearPathLastChar(custom.buildDist.bundle)
exports.distRelativePath = distRelativePath
exports.distAbsolutePath = distAbsolutePath
exports.distPublicPath = distPublicPath
exports.distProAbsolutePath = distProAbsolutePath
// dll (output)
// assets
var assetsRelativePath = '../assets'
var assetsAbsolutePath = path.resolve(__dirname, assetsRelativePath)
exports.assetsRelativePath = assetsRelativePath
exports.assetsAbsolutePath = assetsAbsolutePath

// src
var srcRelativePath = '../src'
var srcAbsolutePath = path.resolve(__dirname, srcRelativePath)
exports.srcRelativePath = srcRelativePath
exports.srcAbsolutePath = srcAbsolutePath

// entry
var entryRelativePath = srcRelativePath + '/entry'
var entryAbsolutePath = path.resolve(__dirname, entryRelativePath)
exports.entryRelativePath = entryRelativePath
exports.entryAbsolutePath = entryAbsolutePath

// views
var viewsRelativePath = '../views'
var viewsAbsolutePath = path.resolve(__dirname, viewsRelativePath)
exports.viewsRelativePath = viewsRelativePath
exports.viewsAbsolutePath = viewsAbsolutePath

// webpack-assets.json
var webpackAssetsJsonRelativePath = '../webpack-assets.json'
var webpackAssetsJsonAbsolutePath = path.resolve(__dirname, webpackAssetsJsonRelativePath)
exports.webpackAssetsJsonRelativePath = webpackAssetsJsonRelativePath
exports.webpackAssetsJsonAbsolutePath = webpackAssetsJsonAbsolutePath

/**
 * 去掉末尾'/'字符
 * @param str
 * @returns {*}
 */
function clearPathLastChar (str) {
  var l = str.length
  var c = str.charAt(l - 1)
  if (c === '/') {
    str = str.slice(0, l - 1)
  }
  return str
}

/**
 * 末尾增加'/'字符
 * @param str
 * @returns {*}
 */
function addPathLastChar (str) {
  var l = str.length
  var c = str.charAt(l - 1)
  if (c !== '/') {
    str = str + '/'
  }
  return str
}
