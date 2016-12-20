<template lang="pug">
  .overview
    .today-overview
      h2 今日总览
      .overview-left.fl
        h3 当前存续金额（元）
        .overview-left-middle
          i(class="icon-icomoon icon-overview")
          span(text="") 2999999999
        .overview-left-down
          .Principal.fl
            span 存续本金
              em(text="") 2999999
          .Interest.fr
            span 存续利息
              em(text="") 2999999
      .overview-right.fr
        h3 今日存量产品占比分析
        .overview-right-middle
          kt-echart

    .today-square
      h2 今日清算
        el-tooltip(effect="dark")
          .Prompt(slot="content") 展示今日需资金清算的所有产品，包括今日流入资金的入账确认以及今日流出资金的划款确认 <br> 待执行-清算数据正常可以进行清算执行操作确认 <br> 不可执行-清算数据尚未更新或者异常导致无法执行清算确认 <br> 已执行-已经进行过清算执行操作确认 <br> 已过期-当前时间已经晚于需确认清算执行的最晚时限
          i(class="icon-icomoon icon-explain")
          

</template>

<script>
import echart from '../../components/kt-overview-echart.vue'
import {Tooltip} from 'element-ui'
export default {
  components: {
    KtEchart: echart,
    ElTooltip: Tooltip
  }
}
</script>

<style lang="scss">
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
    font-weight: bold;
  }
}

.today-overview {
  overflow:hidden;
  .overview-left,
  .overview-right {
    border-radius: 4px;
    background: #fff;
    padding: 10px;
    width: 47.5%;
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
        color: #95dbcf;
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
          color: #95dbcf;
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
          color: #95dbcf;
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
.today-square{
  margin-top:25px;
  h2{
    i{
      font-size:15px;
      color:#b4becf;
      margin-left:5px;
    }
  }
}
</style>
