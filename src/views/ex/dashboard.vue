<template lang="pug">
  .overview
    .today-overview
      h2 今日总览
      .overview-left.fl
        h3 当前存续金额（元）
        .overview-left-middle
          i(class="icon-icomoon icon-overview")
          span {{balance.total | KtOverview}}
        .overview-left-down
          .Principal.fl
            span 存续本金
              em {{balance.principal | KtOverview}}
          .Interest.fr
            span 存续利息
              em {{balance.interest | KtOverview}}
      .overview-right.fr
        h3 今日存量产品占比分析
        .overview-right-middle
          kt-pie-echart(:pie-balance="pieChart")

    .today-square
      h2 今日清算
        el-tooltip(effect="dark",placement="right")
          .Prompt(slot="content") 展示今日需资金清算的所有产品，包括今日流入资金的入账确认以及今日流出资金的划款确认 <br> 待执行-清算数据正常可以进行清算执行操作确认 <br> 不可执行-清算数据尚未更新或者异常导致无法执行清算确认 <br> 已执行-已经进行过清算执行操作确认 <br> 已过期-当前时间已经晚于需确认清算执行的最晚时限
          i(class="icon-icomoon icon-explain")
        .information.fr
          span {{summary.executed}}
          em 条 已执行，
          span {{summary.pending_execute}}
          em 条 待执行，
          span {{summary.cant_execute}}
          em 条 不可执行，
          span {{summary.expired}}
          em 条 已过期
      .overview-table
        table(v-for="(item,key) in virtualAssets")
          thead
            tr
              th {{key}}
          tbody(v-for="product in item")
            tr(@click="toDetails(product)")
              td
                span {{product.name}}
              td
                span(v-if="product.inflow_desc") {{product.inflow_desc}}
                  em.red-color {{product.inflow | ktCurrency}}
              td
                span(v-if="product.outflow_desc") {{product.outflow_desc}}
                  em.green-color {{product.outflow | ktCurrency}}
              td
                span {{product.inflow >= product.outflow ? '净流入' : '净流出'}}
                  em(:class="[product.inflow >= product.outflow ? 'red-color' : 'green-color']") {{product.net_cash_flow  | ktCurrency}}
              td
                span.bg-color {{product.execute_method}}
              td.implement.status-column
                i.icon-icomoon(:class="product.execute_status | excuteStatusIcon")
                em.em-implement {{product.execute_status}}
              td
                span(v-show="product.execute_status === '待执行' ? true : false") 结算时限:
                  em {{product.due_at}}


</template>

<script>
import _ from 'lodash'
import {
  subsist,
  stock,
  liquidation
} from '../../common/resources.js'
import KtPieEchart from '../../components/kt-pie-echart.vue'
import {
  Tooltip
} from 'element-ui'
import exMixin from './mixin.js'

export default {
  mixins: [exMixin],
  components: {
    KtPieEchart,
    ElTooltip: Tooltip
  },

  methods: {
    transformData(arr) {
      return _.groupBy(arr, v => v.consignee)
    },
    toDetails(product) {
      this.$router.push({
        name: 'productDashboard',
        params: {
          id: product.id
        }
      })
    },
    subsistGet() {
      subsist.get().then(res => res.json()).then(data => {
        this.balance = data.balance
      })
    },
    stockGet() {
      stock.get().then(res => res.json()).then(data => {
        let pieBalance = data.balance.by_consignee
        let pieChart = {
          legendData: [],
          seriesData: []
        }

        for (let i = 0; i < pieBalance.length; i++) {
          let obj = {}
          pieChart.legendData[i] = pieBalance[i].consignee
          obj['value'] = pieBalance[i].balance
          obj['name'] = pieBalance[i].consignee
          pieChart.seriesData[i] = obj
        }

        this.pieChart = pieChart
      })
    },
    liquidationGet() {
      liquidation.get().then(res => res.json()).then(data => {
        this.summary = data.summary
        // let virtualAssets = [{
        //   'id': '58076c76641b5447fb000001',
        //   'name': '恒存金-灵活理财',
        //   'consignee': '恒大金服',
        //   'inflow': 11212,
        //   'inflow_desc': '申购',
        //   'outflow': 1121,
        //   'outflow_desc': '赎回',
        //   'net_cash_flow': 0.0,
        //   'execute_method': '全额结算',
        //   'execute_status': '不可执行',
        //   'due_at': '12:00',
        //   'group_type': 'normal'
        // }, {
        //   'id': '47fb000001',
        //   'name': '灵活理财',
        //   'consignee': '金服',
        //   'inflow': null,
        //   'inflow_desc': null,
        //   'outflow': 22220,
        //   'outflow_desc': '赎',
        //   'net_cash_flow': 0,
        //   'execute_method': '结算',
        //   'execute_status': '已执行',
        //   'due_at': '2:00',
        //   'group_type': 'normal'
        // }]
        this.virtualAssets = this.transformData(data.virtual_assets) //data.virtual_assets
      })
    }
  },

  mounted() {
    this.subsistGet()
    this.stockGet()
    this.liquidationGet()
  },

  data() {
    return {
      balance: '',
      pieChart: null,
      summary: '',
      virtualAssets: ''
    }
  }
}
</script>

<style lang="scss" scope>
.fl {
  float: left;
}

.fr {
  float: right;
}

.overview {
  background: #ecf1f7;
  h2 {
    margin-bottom: 10px;
    font-size: 17px;
  }
}

.today-overview {
  overflow: hidden;
  .overview-left,
  .overview-right {
    border-radius: 4px;
    background: #fff;
    padding: 10px;
    width: 49.5%;
  }
  .overview-left {
    h3 {
      background: #ecf1f7;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      text-indent: 10px;
      border-radius: 4px;
    }
    .overview-left-middle {
      height: 164px;
      line-height: 164px;
      text-align: center;
      border-bottom: 1px solid #ecf1f7;
      i {
        font-size: 57px;
        color: #eef1f3;
        display: inline-block;
        vertical-align: middle;
      }
      span {
        position: relative;
        font-size: 35px;
        color: #66cebe;
        margin-left: 35px;
        margin-top: 3px;
        vertical-align: middle;
        &:before {
          content: "￥";
          font-size: 30px;
          color: #c4c4c4;
          margin-right: 10px;
          margin-top: 5px;
        }
      }
    }
    .overview-left-down {
      height: 72px;
      line-height: 72px;
      overflow: hidden;
      padding: 0 10px;
      .Principal {
        span {
          font-size: 14px;
        }
        em {
          font-style: normal;
          color: #66cebe;
          margin-left: 8px;
          &:before {
            content: "￥";
            font-size: 13px;
            color: #c4c4c4;
            margin-right: 7px;
          }
        }
      }
      .Interest {
        span {
          font-size: 14px;
        }
        em {
          font-style: normal;
          color: #66cebe;
          margin-left: 8px;
          &:before {
            content: "￥";
            font-size: 13px;
            color: #c4c4c4;
            margin-right: 7px;
          }
        }
      }
    }
  }
  .overview-right {
    h3 {
      background: #ecf1f7;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      text-indent: 10px;
      border-radius: 4px;
    }
    .overview-right-middle {
      height: 237px;
    }
  }
}

.today-square {
  margin-top: 25px;
  h2 {
    i {
      font-size: 15px;
      color: #b4becf;
      margin-left: 5px;
    }
    .information {
      font-size: 13px;
      span {
        color: #54c9b8;
      }
      em {
        font-style: normal;
      }
    }
  }
}

.overview-table {
  max-height: 500px;
  overflow-y:scroll;
}
</style>
