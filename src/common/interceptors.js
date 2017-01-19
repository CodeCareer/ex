import Vue from 'vue'
import _ from 'lodash'
import { MessageBox } from 'element-ui'
import store from '../vuex/store.js'

const CACHE_URLS = []

let alertOpt = {
  type: 'error'
}

export default [
  function(request, next) {
    let key = Vue.url(request.url, request.params)
    request.cache = _.includes(CACHE_URLS, key.split('?')[0])

    if (!request.params.no_cache && sessionStorage.getItem(key)) {
      next({
        status: 200,
        ok: true,
        headers: {},
        statusText: 'OK',
        data: sessionStorage.getItem(key) || '{}',
        body: sessionStorage.getItem(key) || '{}',
        json() {
          return JSON.parse(sessionStorage.getItem(key) || '{}')
        }
      })
    } else {
      next()
    }
  },
  function(request, next) {
    next((res) => {
      if (res.status === 419 || res.status === 401) {
        if (request.params.noNeedLogin) {
          store.dispatch('logout', true)
        } else {
          MessageBox.alert(res.body.error || res.body.errors || '无访问权限！', '提示', alertOpt)
          store.dispatch('logout')
        }
      } else if (res.status === 400) {
        MessageBox.alert(res.body.error || res.body.errors || '请求失败！', '提示', alertOpt)
      } else if (res.status === 403) {
        MessageBox.alert(res.body.error || res.body.errors || '您无此权限！', '提示', alertOpt)
      } else if (res.status === 500 || res.status === 502) { // 注释掉是为了接部分接口
        MessageBox.alert('抱歉！服务器忙。', '提示', alertOpt)
      } else if (res.status === 200) {
        if (request.cache) {
          let key = Vue.url(request.url, request.params)
          let body = _.isObject(res.body) ? JSON.stringify(res.body) : res.body
          sessionStorage.setItem(key, body)
        }
      }
    })
  }
]
