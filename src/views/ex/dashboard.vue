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
                span {{product.net_cash_flow >= 0 ? '净流入' : '净流出'}}
                  em(:class="[product.net_cash_flow >= 0 ? 'red-color' : 'green-color']") {{product.net_cash_flow | ktFlow | ktCurrency }}
              td
                span.bg-color {{product.execute_method}}
              td.implement.status-column
                i.icon-icomoon(:class="product.execute_status | excuteStatusIcon")
                em.em-implement {{product.execute_status}}
              td
                span(v-show="product.execute_status === '待执行' ? true : false") 结算时限:
                  em {{product.due_at}}
    .today-square
      h2 今日更新
        el-tooltip(effect="dark",placement="right")
          .Prompt(slot="content") 展示今日需数据更新的所有产品，包括今日销售数据和赎回数据的传输 <br> 已更新-本期更新数据已经传输和处理完毕 <br> 待更新-本期应该有更新数据但尚未开始传输 <br> 更新中-本期更新数据正在传输或处理中 <br> 异常-当前时间已经晚于数据更新的最晚截止时间但仍未传输或处理完毕
          i(class="icon-icomoon icon-explain")
        .information.fr
          span {{updateSummary.updated}}
          em 条 已更新，
          span {{updateSummary.pending_update}}
          em 条 待更新，
          span {{updateSummary.updating}}
          em 条 更新中，
          span {{updateSummary.abnormal}}
          em 条 异常
      .overview-table
        table(v-for="(item,key) in updateVas")
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
                span {{product.net_cash_flow >= 0 ? '净流入' : '净流出'}}
                  em(:class="[product.net_cash_flow >= 0 ? 'red-color' : 'green-color']") {{product.net_cash_flow | ktFlow | ktCurrency }}
              td
              td.implement.status-column
                i.icon-icomoon(:class="product.update_status | updateStatusIcon")
                em.em-implement {{product.update_status}}
              td
                span(v-show="product.update_status === '已更新' ? true : false") 更新时间:
                  em {{product.updated_at}}
</template>

<script>
import _ from 'lodash'
import {
  subsist,
  stock,
  liquidation,
  updatedProducts
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
    },

    // 今日更新
    updatedProductsGet() {
      return updatedProducts.get().then(res => res.json()).then(data => {
        this.updateSummary = data.summary
        this.updateVas = _.groupBy(data.virtual_assets, v => v.consignee)
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
      this.liquidationGet(),
      this.updatedProductsGet()
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
      virtualAssets: '',
      updateSummary: '',
      updateVas: ''
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
