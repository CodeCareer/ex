<template lang="pug">
	.echarts(ref='echart')
</template>

<script>
import echart from 'echarts/lib/echarts'
require('echarts/lib/chart/pie')
require('echarts/lib/model/series')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')

export default {
  data: function() {
    return {
      chart: 'nothing'
    }
  },

  mounted() {
    let myChart = echart.init(this.$refs.echart)
    console.log(myChart)
    myChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        x: '20px',
        left: '0px',
        top: 'center',
        data: ['恒大', '京东', '途牛', '小米', '聚宝汇'],
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
        data: [{
          value: 335,
          name: '恒大'
        }, {
          value: 310,
          name: '京东'
        }, {
          value: 234,
          name: '途牛'
        }, {
          value: 135,
          name: '小米'
        }, {
          value: 548,
          name: '聚宝汇'
        }]
      }],
      color: ['#35cec3', '#5ae0cb', '#42dac2', '#c4cbd8', '#98a4b9']
    })
  }
}
</script>

<style type="scss">
	.echarts{
		min-width:400px;
		width:400px;
		height:237px;
		margin:0 auto;
	}
</style>
