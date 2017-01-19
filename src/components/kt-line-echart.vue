<template lang="pug">
  .line-echart(ref="lineEchart")
</template>

<script>
import echarts from 'echarts/lib/echarts'
require('echarts/lib/chart/bar')
require('echarts/lib/chart/line')
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
    this.echart = echarts.init(this.$refs.lineEchart)
    var option = {
      legend: {
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 20,
        textStyle: {
          color: '#262c38',
          fontSize: 12
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params, ticket, callback) => {
          if (!params.length) return
          return _.concat([`<table class="chart-tooltip"><tr><th colspan="2">${params[0].name}</th><tr>`],
            _.map(params, v => {
              return `<tr class="line">
                        <td class="left"><i class="circle" style="color:${v.color}"></i>${v.seriesName}：</td>
                        <td class="right">${Vue.filter('ktCurrency')(v.value)}</td>
                      </tr>`
            }), '</table>').join('')
        }
      },
      xAxis: {
        type: 'category',
        // data: _.map(data.fund_trends, v => moment(v.date).format('MM-DD')),
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        name: '',
        interval: 0,
        axisLabel: {
          show: true,
          formatter: '{value}'
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#000'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      grid: {
        show: false,
        left: 100,
        right: 20,
        bottom: 60
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
.line-echart {
  min-width: 500px;
  height: 100%;
  margin: 0 auto;
}
</style>
