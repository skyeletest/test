import Vue from 'vue'
import App from './Index.vue'
import Store from '../vuex'
import config from '../commons/config'
import frame from 'FRAME'
import router from '../router'

Vue.use(frame)
frame.vueInstall({ module: 'v', name: 'config' }, config) // 在Vue实例中通过this.vConfig进行使用

const run = function () {
  return new Vue({
    el: '#app',
    store: Store,
    router,
    components: {App},
    template: '<App/>'
  })
}

run()
