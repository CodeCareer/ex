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

    .today-square

</template>

<script>
export default {

}
</script>

<style lang="scss">
.fl{
  float:left;
}
.fr{
  float:right;
}
.overview {
  background: #ecf1f7;
  h2{
    margin-bottom:10px;
    font-size:17px;
    font-weight:bold;
  }
}
.today-overview{
  .overview-left,.overview-right{
    border-radius: 4px;
    background: #fff;
    padding:10px;
    width:47.5%;
  }
  .overview-left{
    h3{
      background: #ecf1f7;
      height:40px;
      line-height: 40px; 
      font-size:14px;
      text-indent: 10px;
      border-radius:4px;
    }
    .overview-left-middle{
      height:164px;
      line-height: 164px;
      text-align:center;
      border-bottom:1px solid #ecf1f7;
      i{
        font-size:57px;
        color:#eef1f3;
        display: inline-block;
        vertical-align:middle;
      }
      span{
        position:relative;
        font-size:35px;
        color:#95dbcf;
        margin-left:35px;
        margin-top:3px;
        vertical-align:middle;
        &:before{
          content:"￥";
          font-size:30px;
          color:#c4c4c4;
          margin-right:10px;
          margin-top:5px;
        }
      }
    }

    .overview-left-down{
      height:72px;
      line-height:72px;
      overflow:hidden;
      padding:0 10px;
      .Principal{
        span{
          font-size:14px;
        }
        em{
          font-style:normal;
          color:#95dbcf;
          margin-left:8px;
          &:before{
            content:"￥";
            font-size:13px;
            color:#c4c4c4;
            margin-right:7px;
          }
        }
      }
      .Interest{
        span{
          font-size:14px;
        }
        em{
          font-style:normal;
          color:#95dbcf;
          margin-left:8px;
          &:before{
            content:"￥";
            font-size:13px;
            color:#c4c4c4;
            margin-right:7px;
          }
        }
      }
    }

  }
  .overview-right{
    h3{
      background: #ecf1f7;
      height:40px;
      line-height: 40px; 
      font-size:14px;
      text-indent: 10px;
      border-radius:4px;
    }
    .overview-right-middle{
      height:237px;
    }
  }
}
</style>
