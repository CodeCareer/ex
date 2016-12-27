import Vue from 'vue'

let sessions, accounts, products, registerProducts, subsist, stock, liquidation,
  essentialInformation, productLiquidation, update, productExecute, productStock,
  registeredProducts, investor, fees

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
  essentialInformation = resource('virtual_assets{/virtual_asset_id}/detail', {}, {}, commonOpts) //产品基本信息
  productLiquidation = resource('virtual_assets{/virtual_asset_id}/settlement', {}, {}, commonOpts) //近期清算
  update = resource('virtual_assets{/virtual_asset_id}/updated', {}, {}, commonOpts) //今日更新
  productExecute = resource('virtual_assets{/virtual_asset_id}/execute', {}, {}, commonOpts) //产品执行post
  productStock = resource('virtual_assets{/virtual_asset_id}/balance/trends', {}, {}, commonOpts) //单个产品的存量
  registeredProducts = resource('virtual_assets{/virtual_asset_id}/registered_products', {}, {}, commonOpts) //单个产品下的存量登记产品列表
  investor = resource('registered_products{/registered_product_id}/investors', {}, {}, commonOpts) //单个登记产品下的客户
  fees = resource('virtual_assets{/virtual_asset_id}/fees', {}, {}, commonOpts) //单个产品的费用详情
}

export {
  sessions,
  accounts,
  registerProducts,
  products,
  subsist,
  stock,
  liquidation,
  essentialInformation,
  productLiquidation,
  update,
  productExecute,
  productStock,
  registeredProducts,
  investor,
  fees
}
