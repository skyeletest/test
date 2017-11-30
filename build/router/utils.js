var fs = require('fs')
var glob = require('glob')
var _ = require('lodash')
var path = require('path')
var config = require('../config')
var resolve = path.resolve
var sep = path.sep
var relative = path.relative

var reqSep = /\//g
var sysSep = _.escapeRegExp(sep)
var normalize = string => string.replace(reqSep, sysSep)

exports.wp = function (p) {
  /* istanbul ignore if */
  if (/^win/.test(process.platform)) {
    p = p.replace(/\\/g, '\/')
  }
  return p
}

exports.resolve = function () {
  var dir = path.join.apply(null, arguments)
  return path.join(process.cwd(), dir)
}

exports.r = function (p) {
  return exports.wp(resolve(normalize(p)))
}

exports.relativeTo = function (dir, p) {
  // Resolve path
  var path = exports.r(p)
  // Make correct relative path
  var rp = relative(dir, path)
  if (rp[ 0 ] !== '.') {
    rp = './' + rp
  }
  return exports.wp(rp)
}

exports.cleanChildrenRoutes = function (routes, isChild) {
  var start = -1
  var routesIndex = []
  routes.forEach((route) => {
    if (/-index$/.test(route.name) || route.name === 'index') {
      // Save indexOf 'index' key in name
      var res = route.name.split('-')
      var s = res.indexOf('index')
      start = (start === -1 || s < start) ? s : start
      routesIndex.push(res)
    }
  })
  routes.forEach((route) => {
    route.path = (isChild) ? route.path.replace('/', '') : route.path
    if (route.path.indexOf('?') > -1) {
      var names = route.name.split('-')
      var paths = route.path.split('/')
      if (!isChild) {
        paths.shift()
      } // clean first / for parents
      routesIndex.forEach((r) => {
        var i = r.indexOf('index') - start //  children names
        if (i < paths.length) {
          for (var a = 0; a <= i; a++) {
            if (a === i) {
              paths[ a ] = paths[ a ].replace('?', '')
            }
            if (a < i && names[ a ] !== r[ a ]) {
              break
            }
          }
        }
      })
      route.path = (isChild ? '' : '/') + paths.join('/')
    }
    route.name = route.name.replace(/-index$/, '')
    if (route.children) {
      if (route.children.find((child) => child.path === '')) {
        delete route.name
      }
      route.children = exports.cleanChildrenRoutes(route.children, true)
    }
  })
  return routes
}

exports.createRoutes = function (files) {
  var routes = []
  files.forEach((file) => {
    var keys = file.replace(/^pages/, '').replace(/(\.vue|\.js)$/, '').replace(/\/{2,}/g, '/').split('/').slice(1)
    var route = { name: '', path: '', component: file }
    var parent = routes
    keys.forEach((key, i) => {
      route.name = route.name ? route.name + '-' + key.replace('_', '') : key.replace('_', '')
      route.name += (key === '_') ? 'all' : ''
      var child = _.find(parent, { name: route.name })
      if (child) {
        if (!child.children) {
          child.children = []
        }
        parent = child.children
        route.path = ''
      } else {
        if (key === 'index' && (i + 1) === keys.length) {
          route.path += (i > 0 ? '' : '/')
        } else {
          route.path += '/' + (key === '_' ? '*' : key.replace('_', ':'))
          if (key !== '_' && key.indexOf('_') !== -1) {
            route.path += '?'
          }
        }
      }
    })
    // Order Routes path
    parent.push(route)
    parent.sort((a, b) => {
      if (!a.path.length || a.path === '/') {
        return -1
      }
      if (!b.path.length || b.path === '/') {
        return 1
      }
      var res = 0
      var _a = a.path.split('/')
      var _b = b.path.split('/')
      for (var i = 0; i < _a.length; i++) {
        if (res !== 0) {
          break
        }
        var y = (_a[ i ].indexOf('*') > -1) ? 2 : (_a[ i ].indexOf(':') > -1 ? 1 : 0)
        var z = (_b[ i ].indexOf('*') > -1) ? 2 : (_b[ i ].indexOf(':') > -1 ? 1 : 0)
        res = y - z
        if (i === _b.length - 1 && res === 0) {
          res = 1
        }
      }
      return res === 0 ? -1 : res
    })
  })
  return exports.cleanChildrenRoutes(routes, false)
}
function recursiveRoutes (routes, tab, components) {
  var res = ''
  routes.forEach((route, i) => {
    route._name = route.name ? route.name.replace(/-[a-zA-Z0-9]{1}/g, (word) => {
      return word[ 1 ].toUpperCase()
    }) : '_' + Math.ceil(Math.random() * 100000)
    route.path = route.path.replace(/^\/pages/, config.routePrefix)
    components.push({
      component: exports.relativeTo('src/router', route.component),
      _name: route._name,
      path: route.path
    })
    res += tab + '{\n'
    res += tab + 'path: \'' + route.path + '\',\n'
    res += tab + 'component: ' + route._name
    res += (route.name) ? ',\n' + tab + 'name: \'' + route.name + '\'' : ''
    res += (route.children) ? ',\n' + tab + 'children: [\n' + recursiveRoutes(routes[ i ].children, tab + '\t', components) + '\n\t' + tab + ']' : ''
    res += '\n' + tab + '}' + (i + 1 === routes.length ? '' : ',')
  })
  return res
}
exports.flatRoutes = function (router, path, routes, map) {
  router.forEach((r) => {
    if (!r.path.includes(':') && !r.path.includes('*')) {
      /* istanbul ignore if */
      if (r.children) {
        exports.flatRoutes(r.children, path + r.path + '/', routes)
      } else {
        routes.push({
          fullpath: (r.path === '' && path[ path.length - 1 ] === '/' ? path.slice(0, -1) : path) + r.path,
          component: exports.relativeTo('src/router', r.component)
        })
      }
    }
  })
  return routes
}
exports.getCompToFullpathMap = function (router) {
  var flatRoutes = exports.flatRoutes(router, '', [])
  var compTofullpathMap = {}
  var routerChuck = config.routerChuck
  _.forEach(flatRoutes, function (val) {
    if (routerChuck[ val.fullpath ]) {
      compTofullpathMap[ val.component ] = routerChuck[ val.fullpath ]
    }
  })
  return compTofullpathMap
}
exports.generateRoutesAndFiles = function () {
  var _components = []
  glob('src/pages/**/*.@(vue|js)', { nonull: false }, (err, files) => {
    if (err) throw err
    if (!files.length) {
      fs.writeFile('./src/router/routes.js', 'let routes = []\nexport default routes\n', (_err) => {
        if (_err) throw _err
      })
      return
    }
    var routerList = exports.createRoutes(files)
    var routes = recursiveRoutes(routerList, '\t', _components)
    var compTofullpathMap = exports.getCompToFullpathMap(routerList)
    var _import = '/* eslint-disable */\n'
    _.uniqBy(_components, '_name').forEach(d => {
      if (config.lazyLoad) {
        if (compTofullpathMap[ d.component ]) {
          _import += 'const ' + d._name + ' = r => require.ensure([], () => r(require(\'' + d.component + '\')), \'' + compTofullpathMap[ d.component ] + '\')\n'
        } else {
          _import += 'const ' + d._name + ' = r => require([\'' + d.component + '\'], r)\n'
        }
      } else {
        _import += 'const ' + d._name + ' = require(\'' + d.component + '\')\n'
      }
    })
    fs.writeFile('./src/router/routes.js', _import + 'let routes = [' + routes + ']\nexport default routes\n', (_err) => {
      if (_err) throw _err
      console.log('路由更改...')
    })
  })
}

exports.refreshFiles = _.debounce(function () {
  exports.generateRoutesAndFiles()
}, 200)
