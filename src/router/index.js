import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'
Vue.use(VueRouter)

let routerConfig = {
  routes
}

export default new VueRouter(routerConfig)
