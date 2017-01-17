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
import Vue from 'vue'

export default {
  props: ['chartOption'],
  data() {
    return {
      echart: null
    }
  },

  mounted() {
    this.echart = echarts.init(this.$refs.chart)
    var option = {
      tooltip: {
        trigger: 'axis',
        formatter: (params, ticket, callback) => {
          if (!params.length) return
          return _.concat([`<table class="chart-tooltip"><tr><th colspan="2">${params[0].name}</th><tr>`],
            params.map(v => {
              return `<tr class="line">
                        <td class="left"><i class="circle" style="color:${v.color}"></i>${v.seriesName}：</td>
                        <td class="right">${Vue.filter('ktCurrency')(v.value)}</td>
                      </tr>`
            }), '</table>').join('')
        }
      },
      legend: {
        orient: 'horizontal',
        // x: '20px',
        // left: '0px',
        // y: '280px',
        bottom: 20,
        data: [],
        itemwidth: 10, //示例图标宽度
        textStyle: {
          fontSize: 12, //示例文字size
          color: '#262c38' //示例文字颜色
        }
      },
      grid: {
        show: false,
        left: 100,
        right: 20,
        bottom: 80
      },
      xAxis: {
        type: 'category',
        data: [] //this.echart.dateArr
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

    this.echart.setOption(_.merge({}, option, this.chartOption))

    window.addEventListener('resize', () => {
      this.echart.resize()
    })
  },

  watch: {
    chartOption() {
      this.echart.setOption(this.chartOption)
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
