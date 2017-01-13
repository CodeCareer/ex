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

export default {
  props: ['chartOption'],
  data() {
    return {
      barChart: null
    }
  },

  mounted() {
    this.barChart = echarts.init(this.$refs.lineEchart)
    var option = {
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: 100
      }
    }

    this.barChart.setOption(_.merge({}, option, this.chartOption))
  },

  watch: {
    chartOption() {
      debugger
      this.barChart.setOption(this.chartOption)
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
