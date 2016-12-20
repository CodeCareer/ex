<template lang="pug">
  .products-all
    .products-all-header
      kt-filters(:conditions="filters")
      .table
        table
          thead
            tr
              th 产品名称
              th 存续金额
              th 利率
              th 期限
              th 到期日
              th 产品类型
              th 发行平台
              th 更新状态
              th 执行状态
          tbody
            tr(v-if='!products.length')
              td.text-center(colspan='9') 没有数据！
            tr(v-if='products.length', v-for='p in products')
              td {{p.name}}
              td {{p.balance | ktCurrency}}
              td {{p.annual_rate | ktPercent}}
              td {{p.sustained}}
              td {{p.due_at}}
              td {{p.open_type}}
              td {{p.consignee}}
              td.status-column
                i.icon-icomoon(:class='p.update_status | updateStatusIcon')
                span {{p.update_status}}
              td.status-column
                i.icon-icomoon(:class='p.execute_status| excuteStatusIcon')
                span {{p.execute_status}}
      .pages
        el-pagination(small, :current-page.sync='query.page', :total="query.total_count", :page-size='query.per_page', layout='prev, pager, next, total, jumper', @current-change='pageChange')

            //- router-view
</template>

<script>
import KtFilters from '../../../components/kt-filters.vue'
import {
  Table,
  TableColumn,
  Pagination
} from 'element-ui'
import {
  products
} from '../../../common/resources.js'
import _ from 'lodash'

// 更新状态icon映射
let updateStatusIconMap = {
  '已更新': 'icon-success',
  '更新中': 'icon-wait',
  '待更新': 'icon-wait',
  '异常': 'icon-wait'
}

// 执行状态icon映射
let excuteStatusIconMap = {
  '已执行': 'icon-success',
  '待执行': 'icon-wait',
  '不可执行': 'icon-wait',
  '已过期': 'icon-wait'
}

export default {
  components: {
    KtFilters,
    ElTable: Table,
    ElTableColumn: TableColumn,
    ElPagination: Pagination
  },

  watch: {
    '$route' (to, from) {
      this.getProducts(to.query)
    }
  },

  async mounted() {
    this.getProducts()
  },

  methods: {
    async getProducts() {
      let resetQuery = {} // 重置所有参数
      _.each(this.query, (v, k) => {
        if (this.$route.query[k]) {
          resetQuery[k] = v
        }
      })

      this.query = Object.assign({}, resetQuery, {
        page: 1,
        per_page: 15
      }, this.$route.query)
      let data = await products.get(this.query).then(res => res.json())

      this.products = data.virtual_assets
      this.query.total_count = data.total_count
    },

    pageChange(currentPage) {
      this.query.page = currentPage
      this.$router.push({
        name: this.$route.name,
        query: this.query
      })
    }
  },

  filters: {
    updateStatusIcon(value) {
      return updateStatusIconMap[value] || ''
    },
    excuteStatusIcon(value) {
      return excuteStatusIconMap[value] || ''
    }
  },

  data() {
    return {
      query: {
        page: 1,
        per_page: 15,
        total_count: 1
      },
      products: [],
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
  .status-column {
    .icon-icomoon {
      color: #c8cfd6;
      margin-right: 5px;
    }
    .icon-wait + span {
      color: #eb7c72;
    }
    .icon-success {
      font-size: 12px;
      &+ span {
        color: #46b1a0;
      }
    }
  }
  .pages {
    text-align: center;
    padding: 32px 0;
    margin-bottom: -90px;
  }
  .el-pagination--small {
    .btn-prev,
    .btn-next {
      margin: 0 2px;
      background: none;
      &:hover {
        color: #68d3c3;
      }
    }
    .btn-prev {
      .el-icon-arrow-left {
        margin-left: -2px;
      }
    }
    .btn-next {
      .el-icon-arrow-right {
        margin-right: -2px;
      }
    }
    .el-pager {
      li {
        margin: 0 2px;
        padding: 0 4px 0 3px;
        line-height: 1.8;
        color: #c3cad2;
        &.active {
          color: white;
          background-color: #96a3ba;
          border-color: #96a3ba;
          & + li {
            padding-left: 4px;
          }
        }
      }
    }
  }
  .el-pagination__editor {
    height: 20px;
    &:focus {
      border-color: #18b8ba;
    }
  }
  .el-pagination {
    display: inline-block;
    span {
      height: 22px;
      line-height: 22px;
    }
  }
}
</style>
