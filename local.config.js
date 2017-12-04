module.exports = {
  // devServer
  // proxy: Array or Function
  // 当为函数时接受两个形参[server, proxyMiddleware],
  // 当为数组时 `path`的设置参考http://expressjs.com/en/4x/api.html#app.use, `config`的设置参考https://www.npmjs.com/package/http-proxy-middleware
  devServer: {
    host: '127.0.0.1',
    port: 3000,
    proxy: [ {
      path: [/\/api/], // your backend url path rules
      config: {
        target: 'http://10.95.38.32:5200/mock/5a215088ddb50458805ac050',
        changeOrigin: true,
        logLevel: 'debug',
        ws: true
      }
    } ]
  }
}
