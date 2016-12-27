<template lang="pug">
  .bar-echart(ref="chart")
</template>

<script>
import echarts from 'echarts/lib/echarts'
require('echarts/lib/chart/bar')
require('echarts/lib/model/series')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
require('echarts/lib/component/grid')
require('echarts/lib/component/axis')
import _ from 'lodash'

export default {
  props: ['chartOption'],
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
        data: [],
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
      xAxis: {
        type: 'category',
        data: [] //this.barChart.dateArr
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      },
      series: [],
      color: ['#35cec3', '#b4becf'],
      textStyle: {
        fontFamily: 'Helvetica,microsoft yahei,Arial,Verdana,sans-serif'
      }
    }
    this.barChart.setOption(_.extend({}, option, this.chartOption))
  },

  watch: {
    chartOption() {
      this.barChart.setOption(this.chartOption)
    }
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
