<template lang="pug">
  .content
    .h1 甜穗宝1号理财计划D056
    .today-overview
      h2 今日总览
      .overview-left.fl
        h3 当前存续金额（元）
        .overview-left-middle
          i(class="icon-icomoon icon-overview")
          span {{23333333 | KtOverview}}
        .overview-left-down
          .Principal.fl
            span 存续本金
              em.em-money {{4534534534 | KtOverview}}
          .Interest.fr
            span 存续利息
              em.em-money {{232322332 | KtOverview}}
      .overview-right.fr
        h3 已清算金额（元）
        .product-right-middle
          .overview-rm-top
            span {{232323 | ktOverview}}
          .overview-rm-down
            .overivew-rmd-principal.fl
              span 已清算本金
                em.em-money {{2323232 | ktOverview}}
            .overview-rmd-interest.fr
              span 已清算利息
                em.em-money {{322323 | ktOverview}}
        h3 累积募集金额（元）
        .overview-right-down
          span {{12121212 | ktOverview}}
    .today-detailed
      h2 今日明细
      .today-detailed-left.fl
        .ex-product-table
          h3 今日清算
          .product-table
            table
              tbody
                tr
                  td
                    span 发行
                      em {{23232323 |ktCurrency}}
                  td
                    span
                      em
                  td
                    span 净流入
                      em {{1212100 | ktCurrency}}
        .today-update
          h3 今日更新
            .update-data.fr
              span.update-status
                i(class="icon-icomoon icon-wait")
                em 已更新
                el-tooltip(effect="dark",placement="top")
                  .Prompt(slot="content") 已更新-本期更新数据已经传输和处理完毕 <br> 待更新-本期应该有更新数据但尚未开始传输 <br> 更新中-本期更新数据正在传输或处理中 <br> 异常-当前时间已经晚于数据更新的最晚截止时间但仍未传输或处理完毕
                  i(class="icon-icomoon icon-explain")
              span.update-time 更新时间
                em 9:00
          .product-table
            table
              tbody
                tr
                  td
                    span 发行
                      em {{232323434 | ktCurrency}}
                  td
                    span
                      em
                  td
                    span 净流入
                      em {{345345345 | ktCurrency}}

      .today-detailed-right.fr
        .detailed-top
          .detailed-top-left.fl 全额结算
          .update-data.fr
            span.update-status
              i(class="icon-icomoon icon-wait")
              em 已更新
              el-tooltip(effect="dark",placement="top")
                .Prompt(slot="content") 待执行-清算数据正常可以进行清算执行操作确认<br> 不可执行-清算数据尚未更新或者异常导致无法执行清算确认 <br> 已执行-已经进行过清算执行操作确认 <br> 已过期-当前时间已经晚于需确认清算执行的最晚时限
                i(class="icon-icomoon icon-explain")
            span.update-time 更新时间
              em 9:00

        .detailed-middle
          ul
            li
              span 用户名:
              em 32323fsvd
            li
              span 账 &nbsp &nbsp户:
              em 23232323sdfs
            li
              span 开户行:
              em 2232323sf
          .sure 确认执行
    .stock
      h2 存量情况
      .stock-all
        .stock-all-left.fl
          bar-chart
        .stock-all-right.fr
          h3 存量登记产品详情
          .table-one
            table
              tbody
                tr
                  td 产品代码
                  td 规模
                  td 客户数量
          .table-two
            table
              tbody
                tr
                  td ydsf2323
                  td {{234243 | ktCurrency}}
                  td 123
                tr
                  td ydsf2323
                  td {{234243 | ktCurrency}}
                  td 123
                tr
                  td ydsf2323
                  td {{234243 | ktCurrency}}
                  td 123
                tr
                  td ydsf2323
                  td {{234243 | ktCurrency}}
                  td 123
                tr
                  td ydsf2323
                  td {{234243 | ktCurrency}}
                  td 123
                tr
                  td ydsf2323
                  td {{234243 | ktCurrency}}
                  td 123
                tr
                  td ydsf2323
                  td {{234243 | ktCurrency}}
                  td 123
                tr
                  td ydsf2323
                  td {{234243 | ktCurrency}}
                  td 123
                tr
                  td ydsf2323
                  td {{234243 | ktCurrency}}
                  td 123
                tr
                  td ydsf2323
                  td {{234243 | ktCurrency}}
                  td 123
                tr
                  td ydsf2323
                  td {{234243 | ktCurrency}}
                  td 123
                tr
                  td ydsf2323
                  td {{234243 | ktCurrency}}
                  td 123
                tr
                  td ydsf2323
                  td {{234243 | ktCurrency}}
                  td 123
                tr
                  td ydsf2323
                  td {{234243 | ktCurrency}}
                  td 123
                tr
                  td ydsf2323
                  td {{234243 | ktCurrency}}
                  td 123
                tr
                  td ydsf2323
                  td {{234243 | ktCurrency}}
                  td 123
                tr
                  td ydsf2323
                  td {{234243 | ktCurrency}}
                  td 123
                tr
                  td ydsf2323
                  td {{234243 | ktCurrency}}
                  td 123
                tr
                  td ydsf2323
                  td {{234243 | ktCurrency}}
                  td 123
                tr
                  td ydsf2323
                  td {{234243 | ktCurrency}}
                  td 123
                tr
                  td ydsf2323
                  td {{234243 | ktCurrency}}
                  td 123
                tr
                  td ydsf2323
                  td {{234243 | ktCurrency}}
                  td 123
                tr
                  td ydsf2323
                  td {{234243 | ktCurrency}}
                  td 123
                tr
                  td ydsf2323
                  td {{234243 | ktCurrency}}
                  td 123
    .essential-information
      .essential-information-left.fl.essential-information-all
        h3 基本信息
        ul
          li
            span 产品全称：
            em 甜穗宝1号理财计划B020
          li
            span 产品全称：
            em 甜穗宝1号理财计划B020
          li
            span 产品全称：
            em 甜穗宝1号理财计划B020
          li
            span 产品全称：
            em 甜穗宝1号理财计划B020
          li
            span 产品全称：
            em 甜穗宝1号理财计划B020
          li
            span 产品全称：
            em 甜穗宝1号理财计划B020
          li
            span 产品全称：
            em 甜穗宝1号理财计划B020
          li
            span 产品全称：
            em 甜穗宝1号理财计划B020
          li
            span 产品全称：
            em 甜穗宝1号理财计划B020
          li
            span 产品全称：
            em 甜穗宝1号理财计划B020
      .essential-information-right.fr.essential-information-all
        h3 关键日期和期限
        ul
          li
            span 产品全称：
            em 甜穗宝1号理财计划B020
          li
            span 产品全称：
            em 甜穗宝1号理财计划B020
          li
            span 产品全称：
            em 甜穗宝1号理财计划B020
          li
            span 产品全称：
            em 甜穗宝1号理财计划B020
          li
            span 产品全称：
            em 甜穗宝1号理财计划B020
          li
            span 产品全称：
            em 甜穗宝1号理财计划B020
          li
            span 产品全称：
            em 甜穗宝1号理财计划B020
          li
            span 产品全称：
            em 甜穗宝1号理财计划B020
          li
            span 产品全称：
            em 甜穗宝1号理财计划B020
          li
            span 产品全称：
            em 甜穗宝1号理财计划B020
</template>
<script>
import {
  Tooltip
} from 'element-ui'
import barChart from '../../components/kt-bar-echart.vue'
export default {
  components: {
    barChart,
    ElTooltip: Tooltip
  },
  directives: {
    // scroll: {
    //   bind: function(el, binding) {
    //     el.on('scroll', () => {
    //       if (el.scrollTop() >= el[0].scrollHeight - el.height()) {
    //         let newhtml = '<tr>' + '<td>田丽媛</td>' + '<td>323232323</td>' + '<td>323</td></tr>'
    //         el.children().append(newhtml)
    //       }
    //     })
    //   }
    // }
  }
}
</script>
<style lang="scss">
.content {
  background: #ecf1f7;
  .h1 {
    font-size: 17px;
    color: #289685;
    border-bottom: 2px solid #18b8ba;
    width: 100%;
    height: 30px;
  }
  h2 {
    margin-bottom: 10px;
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
        &:nth-of-type(2) {
          border-top: 1px solid #e5e9f3;
          border-bottom: 1px solid #e5e9f3;
        }
        // height:35px;
        line-height: 35px;
        padding:0px 25%;
        span {
          text-align: right;
          min-width: 70px;
          margin-right: 10px;
          color: #8e98a9;
        }
        em {
          color: #55627b;
          width: 110px;
          line-height: 15px;
          vertical-align: middle;
          display: inline-block;
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
  .stock-all-left {
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
.essential-information{
  margin-top:10px;
  overflow:hidden;

  .essential-information-all{
    background: #fff;
    border-radius:4px;
    padding:10px;
    width:49.5%;
    height:432px;
    h3{
      height: 40px;
      width: 100%;
      line-height: 40px;
      color: #fff;
      background: #b4becf;
      text-align: center;
      border-radius: 4px 4px 0 0;
    }
    ul{
      width:100%;
      li{
        height:38px;
        line-height: 38px;
        border-top:1px solid #e5e9f3;
        &:nth-of-type(1){
          border:none;
        }
        span{
          display: inline-block;
          margin-right:3%;
          color:#8e98a9;
          width:47%;
          text-align: right;
        }
        em{
          width:47%;
          display: inline-block;
          font-style:normal;
          color:#616a7b;
        }
      }
    }
  }
}
</style>
