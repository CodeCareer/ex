<template lang="pug">
  el-dialog(:title="investorsDialog.title", v-model="investorsDialog.show", size="tiny")
    .table
      table
        colgroup
          col(width='180')
          col(width='250')
          col(width='180')
        thead
          tr
            th 客户名称
            th 持有金额（元）
            th 占比
      div.tbody-table
        table
          colgroup
            col(width='180')
            col(width='250')
            col(width='180')
          //- thead
            tr
              th 客户名称
              th 持有金额（元）
              th 占比
          tbody
            tr(v-if="investorsDialog.investors.length", v-for="investor in investorsDialog.investors")
              td {{investor.name}}
              td {{investor.price | ktRound(2)}}
              td {{investor.percentage | ktPercent}}
            tr(v-if="!investorsDialog.investors.length")
              td(colspan="3") 无客户信息
</template>

<script>
import {
  Dialog
} from 'element-ui'
import {
  investors
} from '../../../common/resources.js'

export default {
  components: {
    ElDialog: Dialog
  },

  methods: {
    async show(product) {
      let data = await investors.get({
        registered_product_id: product.id
      }).then(res => res.json())

      this.investorsDialog.title = product.product_code
      this.investorsDialog.show = true
      this.investorsDialog.investors = data.investors
    }
  },

  data() {
    return {
      investorsDialog: {
        show: false,
        investors: [],
        title: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .tbody-table{
    max-height: 300px;
    overflow-y: auto;
    border-radius: 4px;
  }
</style>
