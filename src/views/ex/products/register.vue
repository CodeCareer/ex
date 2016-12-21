<template lang="pug">
  .products-register
    kt-filters(:conditions='filters')
    .table
      table
        thead
          tr
            th 产品代码
            th.order-column(:class='[{active: query.sort_by === "balance"}, query.order]', @click='sortBy("balance")')
              | 规模
              span.icon-order-group
                i.icon-icomoon.icon-arrow-top.asc
                i.icon-icomoon.icon-arrow-top.desc
            th.order-column(:class='[{active: query.sort_by === "rate"}, query.order]', @click='sortBy("rate")')
              | 利率
              span.icon-order-group
                i.icon-icomoon.icon-arrow-top.asc
                i.icon-icomoon.icon-arrow-top.desc
            th.order-column(:class='[{active: query.sort_by === "sustained"}, query.order]', @click='sortBy("sustained")')
              | 期限
              span.icon-order-group
                i.icon-icomoon.icon-arrow-top.asc
                i.icon-icomoon.icon-arrow-top.desc
            th.order-column(:class='[{active: query.sort_by === "expired_at"}, query.order]', @click='sortBy("expired_at")')
              | 到期日
              span.icon-order-group
                i.icon-icomoon.icon-arrow-top.asc
                i.icon-icomoon.icon-arrow-top.desc
            th 产品类型
            th 发行平台
            th 客户数量
        tbody
          tr(v-if='!products.length')
            td.text-center(colspan='8') 没有数据！
          tr(v-if='products.length', v-for='p in products')
            td {{p.product_code}}
            td {{p.balance | ktCurrency}}
            td {{p.annual_rate | ktPercent}}
            td {{p.sustained}}
            td {{p.due_at}}
            td {{p.open_type}}
            td {{p.consignee}}
            td {{p.investor_count}}
    .pages
      el-pagination(small, :current-page='query.page', :total='total_count', :page-size='query.per_page', layout='prev, pager, next, total, jumper', @current-change='pageChange')
</template>

<script>
import KtFilters from '../../../components/kt-filters.vue'
import {
  Pagination,
  Loading
} from 'element-ui'
import {
  registerProducts
} from '../../../common/resources.js'
import _ from 'lodash'
import ProductMixin from './mixin.js'

export default {
  mixins: [ProductMixin],
  components: {
    KtFilters,
    ElPagination: Pagination
  },

  methods: {
    async getProducts() {
      let routeQuery = {} // 修理参数
      _.each(this.$route.query, (v, k) => {
        routeQuery[k] = _.includes(['page', 'per_page'], k) ? parseInt(v) : v
      })

      this.query = Object.assign({}, {
        page: 1,
        per_page: 15
      }, routeQuery)

      let instLoading = Loading.service({
        target: '.products-register .table'
      })
      let data = await registerProducts.get(this.query)
        .then(res => res.json())
        .catch(res => {
          instLoading.close()
        })

      this.products = data.registered_products
      this.total_count = data.total_count
      instLoading.close()
    }
  },

  data() {
    return {
      filters: [
        [{
          name: '产品代码',
          type: 'input',
          key: 'product_code'
        }, {
          name: '发行平台',
          type: 'input',
          key: 'consignee'
        }],
        [{
          name: '产品类型',
          type: 'select',
          key: 'open_type',
          options: [{
            name: '请选择',
            selected: true,
            value: 'null'
          }, {
            name: '定期'
          }, {
            name: '活期'
          }]
        }]
      ]
    }
  }
}
</script>

<style lang="scss">
.products-register {
  .pages {
    text-align: center;
    padding: 32px 0;
    margin-bottom: -90px;
  }
}
</style>
