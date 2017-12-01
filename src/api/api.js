import axios from 'axios'

axios.defaults.baseURL = '/api'
// 设置默认请求头
axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}
// 带cookie请求
axios.defaults.withCredentials = true

axios.defaults.timeout = 2000

export default {
  getApi (url, options) {
    let res = axios.get(url, {
      params: options
    })
    return res
  },
  postApi (url, options) {
    let res = axios.post(url, options)
    return res
  }
}
