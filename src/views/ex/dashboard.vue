<template lang="pug">
  .overview
    .today-overview
      h2 今日总览
      .overview-left.fl
        h3 当前存续金额（元）
        .overview-left-middle
          i(class="icon-icomoon icon-overview")
          span {{balance.total | ktCurrency('')}}
        .overview-left-down
          .Principal.fl
            span 存续本金
              em {{balance.principal | ktCurrency('')}}
          .Interest.fr
            span 存续利息
              em {{balance.interest | ktCurrency('')}}
      .overview-right.fr
        h3 今日存量产品占比分析
        .overview-right-middle
          kt-pie-echart(:chart-option="pieChartOption")

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
              td(:title="product.name")
                span {{product.name}}
              td(:title="product.inflow | ktCurrency")
                span(v-if="product.inflow_desc") {{product.inflow_desc}}
                  em.red-color {{product.inflow | ktCurrency}}
              td(:title="product.outflow | ktCurrency")
                span(v-if="product.outflow_desc") {{product.outflow_desc}}
                  em.green-color {{product.outflow | ktCurrency}}
              td(:title="product.net_cash_flow | ktFlow  | ktCurrency")
                span {{product.inflow >= product.outflow ? '净流入' : '净流出'}}
                  em(:class="[product.inflow >= product.outflow ? 'red-color' : 'green-color']") {{product.net_cash_flow | ktFlow | ktCurrency }}
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
  Tooltip,
  Loading
} from 'element-ui'
import exMixin from './mixin.js'
export default {
  mixins: [exMixin],
  components: {
    KtPieEchart,
    ElTooltip: Tooltip
  },

  methods: {

    // 查看单个产品详情总览
    toDetails(product) {
      this.$router.push({
        name: 'productDashboard',
        params: {
          id: product.id,
          name: product.name
        }
      })
    },

    // 当前存续金额（元）
    subsistGet() {
      return subsist.get().then(res => res.json()).then(data => {
        this.balance = data.balance
      })
    },

    // 今日存量产品占比分析
    stockGet() {
      return stock.get().then(res => res.json()).then(data => {
        this.pieChartOption = _.merge({}, this.pieChartOption, {
          legend: {
            data: _.map(data.balance.by_consignee, 'consignee')
          },
          series: [{
            name: '',
            type: 'pie',
            center: ['70%', '50%'],
            radius: ['50%', '80%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '25',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: _.map(data.balance.by_consignee, v => {
              return {
                name: v.consignee,
                value: v.balance
              }
            })
          }]
        })
      })
    },

    // 今日清算
    liquidationGet() {
      return liquidation.get().then(res => res.json()).then(data => {
        this.summary = data.summary
        this.virtualAssets = _.groupBy(data.virtual_assets, v => v.consignee)
      })
    }
  },

  mounted() {
    this.instLoading = Loading.service({
      target: '.overview'
    })

    Promise.all([
      this.subsistGet(),
      this.stockGet(),
      this.liquidationGet()
    ]).then(() => {
      this.instLoading.close()
    }).catch(res => {
      this.instLoading.close()
    })
  },

  data() {
    return {
      balance: '',
      pieChartOption: {},
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
  overflow-y: scroll;
}
</style>
