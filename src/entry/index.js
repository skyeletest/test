import Vue from 'vue'
import App from './Index.vue'
import Store from '../vuex'
import config from '../commons/config'
import frame from 'FRAME'
import router from '../router'
import d3 from 'd3'
import echarts from 'echarts'
import SCharts from '@qnpm/skyfchart'
import FUI from '@qnpm/FUI'
import '@qnpm/FUI/dist/styles/fui.min.css'

Vue.use(FUI)
Vue.use(SCharts, {name: 's-chart', d3, echarts})
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
