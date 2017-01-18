<template lang="pug">
  .content
    .h1
      .title {{virtualAsset.name}}
      small(v-if="virtualAsset.created_from === 'asset_management'") 产品代码：
        span {{virtualAsset.product_code | ktNull}}
      .right
        button.kt-btn.kt-btn-primary(@click="editProduct(virtualAsset)", :class="{disabled: virtualAsset.created_from !== 'asset_management'}") 编辑
        button.kt-btn.kt-btn-gray(@click="deleteProductChild(virtualAsset)", :class="{disabled: virtualAsset.created_from !== 'asset_management'}") 删除
    .today-overview
      h2 今日总览
      .overview-left.fl
        h3 当前存续金额（元）
        .overview-left-middle
          i(class="icon-icomoon icon-overview")
          span {{virtualAsset.balance | ktCurrency('')}}
        .overview-left-down
          .Principal.fl
            span 存续本金
              em.em-money {{virtualAsset.balance_principal | ktCurrency('')}}
          .Interest.fr
            span 存续利息
              em.em-money {{virtualAsset.balance_interest | ktCurrency('')}}
      .overview-right.fr
        h3 已清算金额（元）
        .product-right-middle
          .overview-rm-top
            span {{virtualAsset.settlement | ktCurrency('')}}
          .overview-rm-down
            .overivew-rmd-principal.fl
              span 已清算本金
                em.em-money {{virtualAsset.settlement_principal | ktCurrency('')}}
            .overview-rmd-interest.fr
              span 已清算利息
                em.em-money {{virtualAsset.settlement_interest | ktCurrency('')}}
        h3 累积募集金额（元）
        .overview-right-down
          span {{virtualAsset.subscription_amount | ktCurrency('') | ktNull}}
    .today-detailed
      h2 今日明细
      .today-detailed-left.fl
        .ex-product-table
          h3 今日清算
          .product-table(v-if="todayQserror")
            table
              tbody
                tr
                  td
                    span(v-if="settlement.total_inflow_desc") {{settlement.total_inflow_desc}}
                      em.red-color {{settlement.total_inflow | ktCurrency}}
                  td
                    span(v-if="settlement.total_outflow_desc") {{settlement.total_outflow_desc}}
                      em.green-color {{settlement.total_outflow | ktCurrency}}
                  td
                    span {{settlement.total_net_cash_flow >= 0?'净流入':'净流出'}}
                      em(:class="[settlement.total_net_cash_flow >= 0?'red-color':'green-color']") {{settlement.total_net_cash_flow | ktFlow | ktCurrency}}
          .update-square(v-if="!todayQserror") {{todayQs}}
        .today-update
          h3 今日更新
            .update-data.fr(v-if="todayUpdateerror")
              span.update-status.status-column
                i.icon-icomoon.dn(:class="updated.update_status | updateStatusIcon")
                em {{updated.update_status}}
                el-tooltip(effect="dark",placement="top")
                  .Prompt(slot="content") 已更新-本期更新数据已经传输和处理完毕 <br> 待更新-本期应该有更新数据但尚未开始传输 <br> 更新中-本期更新数据正在传输或处理中 <br> 异常-当前时间已经晚于数据更新的最晚截止时间但仍未传输或处理完毕
                  i(class="icon-icomoon icon-explain")
              span.update-time(v-if="updated.update_status == '待更新'?false:true") 更新时间
                em {{updated.updated_at}}
          .product-table(v-if="todayUpdateerror")
            table
              tbody
                tr
                  td
                    span {{updated.total_inflow_desc}}
                      em.red-color {{updated.total_inflow | ktCurrency}}
                  td
                    span {{updated.total_outflow_desc}}
                      em.green-color {{updated.total_outflow | ktCurrency}}
                  td
                    span {{updated.total_net_cash_flow >= 0?'净流入':'净流出'}}
                      em(:class="[updated.total_net_cash_flow >= 0?'red-color':'green-color']") {{updated.total_net_cash_flow | ktFlow | ktCurrency}}
          .update-square(v-if="!todayUpdateerror") {{todayUpdate}}
      .today-detailed-right.fr
        .detailed-top
          .detailed-top-left.fl 全额结算
          .update-data.fr(v-if="todayQserror")
            span.update-status.status-column
              i.icon-icomoon.dn(:class="settlement.execute_status | excuteStatusIcon")
              em {{settlement.execute_status}}
              el-tooltip(effect="dark",placement="top")
                .Prompt(slot="content") 待执行-清算数据正常可以进行清算执行操作确认<br> 不可执行-清算数据尚未更新或者异常导致无法执行清算确认 <br> 已执行-已经进行过清算执行操作确认 <br> 已过期-当前时间已经晚于需确认清算执行的最晚时限
                i(class="icon-icomoon icon-explain")
            span.update-time(v-if="settlement.execute_status === '待执行'?true:false") 结算时限
              em {{settlement.execute_at}}

        .detailed-middle
          ul
            li
              span 用户名:
              em {{virtualAsset.consignee_bank_account_name | ktNull}}
            li
              span 账 &nbsp &nbsp户:
              em {{virtualAsset.consignee_bank_account | ktNull}}
            li
              span 开户行:
              em {{virtualAsset.consignee_bank_name | ktNull}}
          .sure(:class="[settlement.execute_status === '待执行' ? '' : 'disabled']", @click.prevent="submit") 确认执行
    .essential-information
      .essential-information-left.fl.essential-information-all
        h3 基本信息
        ul
          li
            span 产品全称：
            em {{virtualAsset.name |ktNull}}
          li
            span 产品简称：
            em {{virtualAsset.product_short_name |ktNull}}
          li
            span 发行利率：
            em {{virtualAsset.annual_rate |ktPercent | ktNull}}
          li
            span 计划募集金额（元）：
            em {{virtualAsset.allocated_amount |ktCurrency |ktNull}}
          li
            span 待发行金额（元）：
            em {{virtualAsset.unissued_amount |ktCurrency |ktNull}}
          li
            span 兑付总额：
            em {{virtualAsset.cash_amount |ktCurrency |ktNull}}
          li
            span 起购金额（元）：
            em {{virtualAsset.min_subscription_amount |ktCurrency|ktNull}}
          li
            span 递增金额（元）：
            em {{virtualAsset.increase_amount |ktCurrency|ktNull}}
          li
            span 产品投向（范围）：
            em(:class="{look:virtualAsset.orientated_to}",@click="look") {{virtualAsset.orientated_to |ktLook|ktNull}}
          li
            span 产品风险等级：
            em {{virtualAsset.risk_level |ktNull}}
      .essential-information-right.fr.essential-information-all
        h3 关键日期和期限
        ul
          li
            span 上架日期 ：
            em {{virtualAsset.published_start_at |ktNull}}
          li
            span 下架日期 ：
            em {{virtualAsset.published_end_at | ktNull}}
          li
            span 募集期（天）：
            em {{virtualAsset.reserved_sustained |ktNull}}
          li
            span 起息日：
            em {{virtualAsset.value_at | ktNull}}
          li
            span 到期日：
            em {{virtualAsset.due_at | ktNull}}
          li
            span 还款日：
            em {{virtualAsset.repayment_at | ktNull}}
          li
            span 发行期限：
            em {{virtualAsset.sustained |ktNull}}
          li
            span 开放间隔期（天）：
            em {{virtualAsset.open_cycle |ktNull}}
          li
            span 开放日：
            em {{virtualAsset.open_at |ktNull}}
    .stock
      h2 存量情况
      .stock-all
        .stock-all-left.fl
          kt-bar-chart(:chart-option="stockChartOption")
          .no-chart-data(v-if="!stockData.balance_trends.length") 暂无数据
        .stock-all-right.fr
          h3 存量登记产品详情
          .table-one
            table
              tbody
                tr
                  td 产品代码
                  td 规模
                  td 客户数量
          .table-two(ref="dropDown")
            table
              tbody
                tr(v-for="registeredProduct in registeredProducts", v-if="registeredProducts.length")
                  td {{registeredProduct.product_code}}
                  td {{registeredProduct.balance | ktCurrency}}
                  td
                    a.link(@click="showInvestors(registeredProduct)") {{registeredProduct.investor_count}}
                tr(v-if="!registeredProducts.length")
                  td(colspan="3").text-center 暂无数据
    investors-dialog(ref="investorsDialog")
</template>

<script>
import exMixin from './mixin.js'
import {
  MessageBox,
  Message,
  Loading,
  Dialog,
  Tooltip
} from 'element-ui'
import ktBarChart from '../../components/kt-bar-echart.vue'
import InvestorsDialog from './products/_investors_dialog.vue'
import {
  essentialInformation,
  productLiquidation,
  update,
  productExecute,
  productStock,
  registeredProducts
} from '../../common/resources.js'
import {
  updateCrumbs
} from '../../common/crossers.js'
import _ from 'lodash'
import moment from 'moment'

export default {
  mixins: [exMixin],
  components: {
    ktBarChart,
    InvestorsDialog,
    ElTooltip: Tooltip,
    ElDialog: Dialog
  },

  methods: {
    // 删除此产品
    deleteProductChild(product) {
      this.deleteProduct(product).then(() => {
        this.$router.back()
      })
    },

    // 投资人列表
    async showInvestors(product) {
      await this.$refs.investorsDialog.show(product)
    },

    //产品基本信息
    essentialInformationGet() {
      return essentialInformation.get({
        virtual_asset_id: this.$route.params.id
      }).then(res => res.json()).then(data => {
        updateCrumbs.$emit('update-crumbs', [{
          id: 'productName',
          name: data.virtual_asset.name
        }])

        this.virtualAsset = data.virtual_asset
      })
    },

    //近期清算
    productLiquidationGet() {
      return productLiquidation.get({
        virtual_asset_id: this.$route.params.id
      }).then(res => res.json()).then(data => {
        if (data.errors) {
          this.todayQs = data.errors
          this.todayQserror = false
        } else {
          this.settlement = data
        }
      })
    },

    //今日更新
    updateGet() {
      return update.get({
        virtual_asset_id: this.$route.params.id
      }).then(res => res.json()).then(data => {
        this.updated = data
        if (data.errors) {
          this.todayUpdate = data.errors
          this.todayUpdateerror = false
        } else {
          this.updated = data
        }
      })
    },

    //产品执行post
    productExecutePost() {
      return productExecute.save({
        virtual_asset_id: this.$route.params.id
      }, {}).then(res => res.json()).then(data => {
        this.settlement.execute_status = data.execute_status
      })
    },

    //单个产品的存量图表
    productStockGet() {
      return productStock.get({
        virtual_asset_id: this.$route.params.id
      }).then(res => res.json()).then(data => {
        this.stockData = data
        this.stockChartOption = _.merge({}, this.stockChartOption, {
          legend: {
            data: [{
              name: '存续本金',
              icon: 'circle' //示例图标设为圆形
            }, {
              name: '存续利息',
              icon: 'circle'
            }]
          },
          xAxis: [{
            type: 'category',
            data: _.map(data.balance_trends, v => moment(v.date).format('MM.DD')),
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }],
          series: [{
            name: '存续本金',
            type: 'bar',
            stack: '广告',
            data: _.map(data.balance_trends, 'principal'),
            barMaxWidth: 40
          }, {
            name: '存续利息',
            type: 'bar',
            stack: '广告',
            data: _.map(data.balance_trends, 'interest'),
            barMaxWidth: 40
          }]
        })
      })
    },

    //单个产品下的存量登记产品列表
    registeredProductsGet() {
      let loadingInstance = Loading.service({
        target: '.stock-all-right'
      })

      return registeredProducts.get({
        virtual_asset_id: this.$route.params.id,
        ...this.registeredProductPages
      }).then(res => res.json()).then(data => {
        if (!data.registered_products.length) this.$refs.dropDown.removeEventListener('scroll', this.onScroll)
        this.registeredProducts = this.registeredProducts.concat(data.registered_products)
        loadingInstance.close()
      }).catch(() => {
        loadingInstance.close()
      })
    },

    // 存量产品登记详情滚动事件
    onScroll(ev) {
      let dropdown = this.$refs.dropDown
      if (dropdown.scrollTop + dropdown.clientHeight >= dropdown.scrollHeight - 10) {
        this.registeredProductPages.page += 1
        this.registeredProductsGet()
      }
      ev.stopPropagation()
    },

    //存量产品登记详情滚动事件初始化
    scrollInit() {
      this.registeredProductPages.page = 1
      this.$refs.dropDown.removeEventListener('scroll', this.onScroll)
      this.$refs.dropDown.addEventListener('scroll', this.onScroll)
    },

    //点击执行提交
    submit() {
      if (this.settlement.execute_status !== '待执行') return

      MessageBox({
        title: '提示',
        message: '您确定要执行吗',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(action => {
        if (action === 'confirm') {
          this.productExecutePost().then(() => {
            Message({
              type: 'success',
              message: '执行成功'
            })
            this.fetchAllData()
          })
        } else {
          Message({
            type: 'info',
            message: '取消执行'
          })
        }
      })
    },
    // 产品投向
    look() {
      if (this.virtualAsset.orientated_to) {
        MessageBox({
          title: '产品投向（范围)',
          message: this.virtualAsset.orientated_to
        })
      } else {
        return
      }
    },

    fetchAllData() {
      let productLoading = Loading.service({
        target: '.content'
      })

      Promise.all([
        this.essentialInformationGet(),
        this.productLiquidationGet(),
        this.updateGet(),
        this.productStockGet(),
        this.registeredProductsGet()
        // this.feesGet()
      ]).then(() => {
        productLoading.close()
      }).catch(() => {
        productLoading.close()
      })

      this.scrollInit()
    }
    //单个产品的费用详情 暂时预留
    // feesGet() {
    //   fees.get({}).then(res => res.json()).then(data => {})
    // }
  },

  mounted() {
    this.fetchAllData()
  },

  filters: {
    ktReturnRate(value) {
      if (value) {
        return value * 100 + '%'
      } else {
        return value
      }
    },
    ktLook(value) {
      if (value) {
        return '查看'
      } else {
        return value
      }
    }
  },

  data() {
    return {
      stockData: {
        balance_trends: []
      },
      virtualAsset: '',
      updated: '',
      settlement: '',
      todayQs: '',
      todayUpdate: '',
      todayQserror: true,
      todayUpdateerror: true,
      stockChartOption: {},
      registeredProducts: [],
      registeredProductPages: {
        page: 1,
        per_page: 10
      }
    }
  }
}
</script>

<style lang="scss">
.content {
  background: #ecf1f7;
  .h1 {
    border-radius: 4px;
    font-size: 19px;
    color: white;
    background: #79859a;
    // border-bottom: 1px solid #18b8ba;
    margin-bottom: 20px;
    padding-left: 17px;
    padding-right: 10px;
    width: 100%;
    height: 38px;
    line-height: 38px;
    .title,
    small {
      display: inline-block;
      max-width: 400px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: -2px;
    }
    small {
      vertical-align: -3px;
      margin-left: 20px;
      font-size: 13px;
    }
    .right {
      float: right;
      line-height: 1.7;
    }
  }
  h2 {
    margin-bottom: 10px;
    font-size: 17px;
  }
}

.fl {
  float: left;
}

.fr {
  float: right;
}

.today-overview {
  margin-top: 10px;
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
      }
      .Interest {
        span {
          font-size: 14px;
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
    .product-right-middle {
      overflow: hidden;
      .overview-rm-top {
        height: 90px;
        line-height: 90px;
        text-align: center;
        span {
          font-size: 25px;
          color: #66cebe;
          &:before {
            content: '￥';
            font-size: 20px;
            color: #c4c4c4;
            margin-right: 10px;
            margin-top: 5px;
          }
        }
      }
      .overview-rm-down {
        height: 36px;
        span {
          font-size: 14px;
        }
      }
    }
    .overview-right-down {
      text-align: center;
      height: 70px;
      line-height: 70px;
      span {
        font-size: 25px;
        color: #66cebe;
        &:before {
          content: '￥';
          font-size: 20px;
          color: #c4c4c4;
          margin-right: 10px;
          margin-top: 5px;
        }
      }
    }
  }
}

.today-detailed {
  margin-top: 20px;
  overflow: hidden;
  h2 {
    margin-bottom: 10px;
  }
}

.today-detailed-left {
  width: 61%;
}

.ex-product-table {
  padding: 10px;
  border-radius: 4px;
  background: #fff;
  h3 {
    font-size: 15px;
  }
}

.today-update {
  margin-top: 20px;
  padding: 10px;
  border-radius: 4px;
  background: #fff;
  h3 {
    font-size: 15px;
  }
}

.today-detailed-right {
  width: 38%;
  padding: 10px 10px 10px 0;
  border-radius: 4px;
  height: 270px;
  background: #fff;
  .detailed-top {
    overflow: hidden;
    height: 40px;
    line-height: 40px;
    .detailed-top-left {
      height: 100%;
      width: 90px;
      text-align: center;
      font-size: 16px;
      color: #fff;
      background: #54c9b8;
      border-radius: 0 4px 4px 0;
    }
  }
  .detailed-middle {
    padding: 0px 0px 0px 10px;
    ul {
      margin-top: 20px;
      li {
        display: table-row;
        line-height: 35px;
        span {
          width: 30%;
          text-align: right;
          min-width: 80px;
          margin-right: 10px;
          color: #8e98a9;
          display: table-cell;
        }
        em {
          display: table-cell;
          color: #55627b;
          // width: 260px;
          padding: 0 10px;
          line-height: 15px;
          vertical-align: middle;
          // display: inline-block;
          word-wrap: break-word;
          word-break: break-all;
        }
      }
    }
    .sure {
      margin: 15px auto;
      background: #f6f8fb;
      width: 200px;
      height: 40px;
      line-height: 40px;
      border-radius: 4px;
      color: #49b0a1;
      font-size: 15px;
      text-align: center;
      cursor: pointer;
      &.disabled {
        color: #8e98a9;
        cursor: not-allowed;
        // pointer-events: none;
      }
      // . {
      //   color: #49b0a1;
      //   cursor: pointer;
      // }
    }
  }
}

.stock {
  margin-top: 20px;
  h2 {
    margin-bottom: 10px;
  }
}

.stock-all {
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  padding: 25px 20px;
  .no-chart-data {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%), translateY(-50%);
    z-index: 99;
  }
  .stock-all-left {
    position: relative;
    background: #fff;
    height: 300px;
    width: 52%;
    // padding:10px;
  }
  .stock-all-right {
    height: 300px;
    width: 42%;
    margin-left: 50px;
    h3 {
      height: 40px;
      width: 100%;
      line-height: 40px;
      color: #fff;
      background: #b4becf;
      text-align: center;
      border-radius: 4px 4px 0 0;
    }
    .table-one {
      table {
        table-layout: fixed;
        tr {
          background: #f6f8fb;
          height: 35px;
          line-height: 35px;
          &:hover {
            background: #f6f8fb;
          }
          td {
            padding: 0;
            text-align: center;
          }
        }
      }
    }
    .table-two {
      height: 220px;
      overflow: hidden;
      overflow-y: scroll;
      table {
        table-layout: fixed;
        tr {
          height: 35px;
          line-height: 35px;
          td {
            padding: 0;
            text-align: center;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}

.essential-information {
  margin-top: 10px;
  overflow: hidden;
  .essential-information-all {
    background: #fff;
    border-radius: 4px;
    padding: 10px;
    width: 49.5%;
    height: 432px;
    h3 {
      height: 40px;
      width: 100%;
      line-height: 40px;
      color: #fff;
      background: #b4becf;
      text-align: center;
      border-radius: 4px 4px 0 0;
    }
    ul {
      width: 100%;
      li {
        height: 38px;
        line-height: 38px;
        border-top: 1px solid #e5e9f3;
        &:nth-of-type(1) {
          border: none;
        }
        span {
          display: inline-block;
          margin-right: 3%;
          color: #8e98a9;
          width: 47%;
          text-align: right;
        }
        em {
          width: 47%;
          display: inline-block;
          vertical-align: middle;
          font-style: normal;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #616a7b;
        }
        .look {
          cursor: pointer;
          color: #54c9b8;
        }
      }
    }
  }
}
</style>
