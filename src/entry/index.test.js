import Vue from 'vue'
import App from './IndexTest.vue'

const run = function () {
  return new Vue({
    el: '#app',
    components: { App },
    template: '<App/>'
  })
}

run()
