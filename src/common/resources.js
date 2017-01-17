import Vue from 'vue'

let sessions, accounts, products, registerProducts, subsist, stock, liquidation,
  essentialInformation, productLiquidation, update, productExecute, productStock,
  registeredProducts, investors, fees, updatedProducts, productOne, stockTrend, capitalTrend,
  consignees
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
  sessions = resource('sessions', {}, {}, commonOpts) // 登录
  accounts = resource('accounts', {}, {}, commonOpts) // 账户信息
  products = resource('virtual_assets/all', {}, {}, commonOpts) // 总产品列表
  productOne = resource('virtual_assets{/virtual_asset_id}{/action}', {}, {}, commonOpts) // 产品删除，添加，更新
  registerProducts = resource('registered_products', {}, {}, commonOpts) // 注册产品列表
  subsist = resource('statistics/balance', {}, {}, commonOpts) //存续金额
  stock = resource('statistics/balance/breakdown', {}, {}, commonOpts) //产品存量占比
  liquidation = resource('virtual_assets/settlement', {}, {}, commonOpts) //清算
  updatedProducts = resource('virtual_assets/updated', {}, {}, commonOpts) //更新
  essentialInformation = resource('virtual_assets{/virtual_asset_id}/detail', {}, {}, commonOpts) //产品基本信息
  productLiquidation = resource('virtual_assets{/virtual_asset_id}/settlement', {}, {}, commonOpts) //近期清算
  update = resource('virtual_assets{/virtual_asset_id}/updated', {}, {}, commonOpts) //今日更新
  productExecute = resource('virtual_assets{/virtual_asset_id}/execute', {}, {}, commonOpts) //产品执行post
  productStock = resource('virtual_assets{/virtual_asset_id}/balance/trends', {}, {}, commonOpts) //单个产品的存量
  registeredProducts = resource('virtual_assets{/virtual_asset_id}/registered_products', {}, {}, commonOpts) //单个产品下的存量登记产品列表
  investors = resource('registered_products{/registered_product_id}/investors', {}, {}, commonOpts) //单个登记产品下的客户
  fees = resource('virtual_assets{/virtual_asset_id}/fees', {}, {}, commonOpts) //单个产品的费用详情
  stockTrend = resource('statistics/balance/trends', {}, {}, commonOpts) //存量产品金额波动趋势
  capitalTrend = resource('statistics/fund/trends', {}, {}, commonOpts) //近期资金流动趋势
  consignees = resource('consignees/list', {}, {}, commonOpts) //机构列表
}

export {
  sessions,
  accounts,
  registerProducts,
  products,
  productOne,
  subsist,
  stock,
  liquidation,
  updatedProducts,
  essentialInformation,
  productLiquidation,
  update,
  productExecute,
  productStock,
  registeredProducts,
  investors,
  fees,
  stockTrend,
  capitalTrend,
  consignees
}
