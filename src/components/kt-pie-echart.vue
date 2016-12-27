<template lang="pug">
  .pie-echarts(ref='echart')
</template>

<script>
import _ from 'lodash'
import Vue from 'vue'
import echart from 'echarts/lib/echarts'
require('echarts/lib/chart/pie')
require('echarts/lib/model/series')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')

export default {
  props: ['chartOption'],
  data() {
    return {
      chart: null
    }
  },

  mounted() {
    this.chart = echart.init(this.$refs.echart)
    let option = {
      tooltip: {
        show: true,
        trigger: 'item',
        formatter: (params, ticket, callback) => {
          return '<div style="text-align:center; font-size:14px;">' + params.name + params.name + '<br/>' + Vue.filter('ktCurrency')(params.value) + '(' + params.percent + '%)' + '</div>'
        }
      },
      color: ['#21a9e1', '#35cbef', '#1fdab1', '#92e68d'],
      legend: {
        orient: 'vertical',
        x: '20px',
        left: '0px',
        top: 'center',
        // data: this.chartOption.legendData,
        data: [],
        textStyle: {
          fontSize: 14, //示例文字size
          color: '#262c38' //示例文字颜色
        },
        itemWidth: 16,
        itemHeight: 16,
        itemGap: 20
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
        data: []
      }]
    }

    this.chart.setOption(_.merge({}, option, this.chartOption))
  },

  watch: {
    chartOption() {
      this.chart.setOption(this.chartOption)
    }
  }
}
</script>

<style type="scss">
  .pie-echarts{ min-width:400px; width:400px; height:237px; margin:0 auto; }
</style>
