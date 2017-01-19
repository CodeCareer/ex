import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
// import 'babel-runtime/core-js'
import 'core-js/fn/promise' // for vuex
// import 'core-js/fn/string/starts-with'

// const debug = process.env.NODE_ENV !== 'production'
const state = {
  user: JSON.parse(window.localStorage.user || '{}'),
  token: window.localStorage.token
}

Vue.use(Vuex)

// Vue.config.debug = debug

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
