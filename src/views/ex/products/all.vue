<template lang="pug">
  .products-all
    kt-filters(:conditions='filters')
    .table
      table
        thead
          tr
            th 产品名称
            th.order-column(:class='[{active: query.sort_by === "balance"}, query.order]', @click='sortBy("balance")')
              | 存续金额
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
            th 更新状态
            th.order-column(:class='[{active: query.sort_by === "execute_status"}, query.order]', @click='sortBy("execute_status")')
              | 执行状态
              span.icon-order-group
                i.icon-icomoon.icon-arrow-top.asc
                i.icon-icomoon.icon-arrow-top.desc
        tbody
          tr(v-if='!products.length')
            td.text-center(colspan='9') 没有数据！
          tr(v-if='products.length', v-for='p in products', @click='trClick(p)')
            td
              router-link(:to='{name: "productDashboard", params: {id: p.id}}') {{p.name}}
            td {{p.balance | ktCurrency}}
            td {{p.annual_rate | ktPercent |ktChangeDate}}
            td {{p.sustained |ktChangeDate}}
            td {{p.due_at |ktChangeDate}}
            td {{p.open_type |ktChangeDate}}
            td {{p.consignee |ktChangeDate}}
            td.status-column
              i.icon-icomoon(:class='p.update_status | updateStatusIcon')
              span {{p.update_status}}
            td.status-column
              i.icon-icomoon(:class='p.execute_status| excuteStatusIcon')
              span {{p.execute_status}}
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
  products
} from '../../../common/resources.js'
import _ from 'lodash'
import productMixin from './mixin.js'
import exMixin from '../mixin.js'

export default {
  mixins: [exMixin, productMixin],
  components: {
    KtFilters,
    ElPagination: Pagination
  },

  methods: {
    trClick(product) {
      this.$router.push({
        name: 'productDashboard',
        params: {
          id: product.id
        }
      })
    },

    async getProducts() {
      let routeQuery = {} // 修理参数
      _.each(this.$route.query, (v, k) => {
        routeQuery[k] = _.includes(['page', 'per_page'], k) ? parseInt(v) : v
      })

      this.query = Object.assign({}, {
        page: 1,
        per_page: 15
      }, routeQuery)

      this.instLoading = Loading.service({
        target: '.products-all .table'
      })
      let data = await products.get(this.query)
        .then(res => res.json())
        .catch(res => {
          this.instLoading.close()
        })

      this.products = data.virtual_assets
      this.total_count = data.total_count
      this.instLoading.close()
    }
  },

  data() {
    return {
      filters: [
        [{
          name: '产品名称',
          type: 'input',
          key: 'name'
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
        }, {
          name: '更新状态',
          type: 'select',
          key: 'update_status',
          options: [{
            name: '请选择',
            selected: true,
            value: 'null'
          }, {
            name: '已更新'
          }, {
            name: '更新中'
          }, {
            name: '待更新'
          }]
        }, {
          name: '执行状态',
          type: 'select',
          key: 'execute_status',
          options: [{
            name: '请选择',
            selected: true,
            value: 'null'
          }, {
            name: '已执行'
          }, {
            name: '待执行'
          }, {
            name: '不可执行'
          }, {
            name: '已过期'
          }]
        }]
      ]
    }
  }
}
</script>

<style lang="scss">
.products-all {
  .pages {
    text-align: center;
    padding: 32px 0;
    margin-bottom: -90px;
  }
}
</style>
