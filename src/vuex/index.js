import Vue from 'vue'
import Vuex from 'vuex'
import types from './mutationTypes'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import frame from 'FRAME'

Vue.use(Vuex)
// 在Vue实例中通过this.vxMutations进行使用
frame.vueInstall({ module: 'vx', name: 'mutations' }, types)

const state = {}

const _mutations = Object.assign({}, mutations)
const _getters = Object.assign({}, getters)
const _actions = Object.assign({}, actions)

export default new Vuex.Store({
  strict: process.SkyEye.ENV === 'dev', // 官方不建议在生产模式下开启strict模式
  state,
  mutations: _mutations,
  getters: _getters,
  actions: _actions
})
