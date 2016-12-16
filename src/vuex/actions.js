import { router } from '../router.js'
import { sessions, accounts } from '../common/resources.js'
import Vue from 'vue'

export default {
  updateUser: function({ commit }, user = {}) {
    window.localStorage.user = JSON.stringify(user)
    commit('updateUser', user)
  },

  updateToken({ commit }, token = '') {
    window.localStorage.token = token
    Vue.http.headers.common['Authorization'] = token
    commit('updateToken', token)
  },

  async getUser({ commit, dispatch }) {
    let data = await accounts.get().then(res => res.json())
    dispatch('updateUser', data.account)
  },

  async login({ commit, dispatch }, user) {
    let data = await sessions.save({}, user).then(res => res.json())
    dispatch('updateToken', data.token)
    dispatch('getUser')
  },

  logout({ commit }, silent) {
    window.localStorage.user = '{}'
    window.localStorage.token = ''
    commit('updateUser', {})
    commit('updateToken')

    if (silent) return

    router.push({
      name: 'login'
    })
  }
}
