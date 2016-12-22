<template lang="pug">
  .pie-echarts(ref='echart')
</template>

<script>
// import _ from 'lodash'
// import moment from 'moment'
import Vue from 'vue'
import echart from 'echarts/lib/echarts'
require('echarts/lib/chart/pie')
require('echarts/lib/model/series')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')

export default {
  props: ['pieBalance'],
  data() {
    return {
      chart: null
    }
  },
  // methods: {
  //   filter(value, prefix = '￥') {
  //     return prefix + numeral(_.round(value, 2)).format('0,0.00')
  //   }
  // },
  mounted() {
    this.chart = echart.init(this.$refs.echart)
    let option = {
      tooltip: {
        show: true,
        trigger: 'item',
        formatter: (params, ticket, callback) => {
          debugger
          return '<div style="text-align:center; font-size:14px;">' + params.name + params.name + '<br/>' + Vue.filter('ktCurrency')(params.value) + '(' + params.percent + '%)' + '</div>'
        }
      },
      color: ['#21a9e1', '#35cbef', '#1fdab1', '#92e68d']
    }
    this.chart.setOption(option)
  },

  watch: {
    pieBalance() {
      let option = {
        legend: {
          orient: 'vertical',
          x: '20px',
          left: '0px',
          top: 'center',
          data: this.pieBalance.legendData,
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
          data: this.pieBalance.seriesData
        }]
      }

      this.chart.setOption(option)
    }
  }
}
</script>

<style type="scss">
  .pie-echarts{ min-width:400px; width:400px; height:237px; margin:0 auto; }
</style>
