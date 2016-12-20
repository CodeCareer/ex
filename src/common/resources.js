import Vue from 'vue'

let sessions, accounts, products

let previousRequestMap = {}
let commonOpts = {
  before(request) {
    let key = Vue.url(request.url, request.params)

    if (previousRequestMap[key]) {
      previousRequestMap[key].abort()
    }

    previousRequestMap[key] = request
  }
}

export default function setResources(resource) {
  sessions = resource('sessions', {}, {}, commonOpts) // 新闻
  accounts = resource('accounts', {}, {}, commonOpts) // 新闻
  products = resource('virtual_assets/all', {}, {}, commonOpts) // 新闻
}

export { sessions, accounts, products }
