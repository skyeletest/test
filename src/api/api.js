import vue from 'vue'
import axios from 'axios'

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
