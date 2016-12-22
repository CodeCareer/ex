import Vue from 'vue'

let sessions, accounts, products, registerProducts, subsist, stock, liquidation

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
  registerProducts = resource('registered_products', {}, {}, commonOpts) // 新闻
  subsist = resource('statistics/balance', {}, {}, commonOpts) //存续金额
  stock = resource('statistics/balance/breakdown', {}, {}, commonOpts) //产品存量占比
  liquidation = resource('virtual_assets/settlement', {}, {}, commonOpts) //清算
}

export { sessions, accounts, registerProducts, products, subsist, stock, liquidation }
