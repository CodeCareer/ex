<template lang="pug">
  .bar-echart(ref="chart")
</template>
<script>
import echarts from 'echarts/lib/echarts'
require('echarts/lib/chart/bar')
  // require('echarts/')
require('echarts/lib/model/series')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
require('echarts/lib/component/grid')
require('echarts/lib/component/axis')
export default {
  components: {
    echarts
  },
  data() {
    return {
      barChart: null
    }
  },
  mounted() {
    this.barChart = echarts.init(this.$refs.chart)
    var option = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        orient: 'horizontal',
        // x: '20px',
        // left: '0px',
        // y: '280px',
        bottom: '0px',
        data: [{
          name: '存续本金',
          icon: 'circle' //示例图标设为圆形
        }, {
          name: '存续利息',
          icon: 'circle'
        }],

        itemwidth: 10, //示例图标宽度
        textStyle: {
          fontSize: 13, //示例文字size
          color: '#616a7b' //示例文字颜色
        }
      },
      grid: {
        show: false,
        left: '60px',
        right: '0',
        bottom: '60px'
      },
      xAxis: [{
        type: 'category',
        data: ['3.12', '3.13', '3.14', '3.15', '3.16', '3.17', '3.18', '3.19', '3.20', '3.21']
      }],
      yAxis: [{
        type: 'value'
      }],
      series: [{
        name: '存续本金',
        type: 'bar',
        stack: '广告',
        data: [10, 13002, 10100, 13400, 9000, 23000, 21000, 20030, 20010]
      }, {
        name: '存续利息',
        type: 'bar',
        stack: '广告',
        data: [2200, 1200, 1091, 2034, 2900, 3300, 3000, 2000, 2100]
      }],
      color: ['#35cec3', '#b4becf']
    }
    this.barChart.setOption(option)
  }
}
</script>
<style lang="scss">
.bar-echart {
  min-width: 500px;
  height: 100%;
  margin: 0 auto;
}
</style>
