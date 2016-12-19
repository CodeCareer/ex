<template lang="pug">
  .products-all
    .products-all-header
      kt-filters(:fitlers="filters")
</template>

<script>
import KtFilters from '../../../components/kt-filters.vue'
// import _ from 'lodash'

export default {
  components: {
    KtFilters
  },
  data() {
    // let fitlers = _.clone(this.$route.query || {})
    return {
      filters: [
        [{
          name: '产品名称',
          type: 'input',
          key: 'name'
        }, {
          name: '发行平台',
          type: 'input',
          key: 'consignee'
        }],
        [{
          name: '产品类型',
          type: 'select',
          key: 'open_type',
          options: [{
            name: '定期'
          }, {
            name: '活期'
          }]
        }, {
          name: '更新状态',
          type: 'select',
          key: 'update_status',
          options: [{
            name: '已更新'
          }, {
            name: '更新中'
          }, {
            name: '待更新'
          }]
        }, {
          name: '执行状态',
          type: 'select',
          key: 'execute_status',
          options: [{
            name: '已执行'
          }, {
            name: '待执行'
          }, {
            name: '不可执行'
          }, {
            name: '已过期'
          }]
        }]
      ]
    }
  }
}
</script>

<style lang="scss">
.products-all {
  // @import './products.scss';
}
</style>
