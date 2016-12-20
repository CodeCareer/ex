<template lang="pug">
  section.products
    kt-tabs
      kt-tab-item(:class="{'is-active': $route.name === 'productsAll'}")
        router-link(:to='{name: "productsAll"}') 产品总列表
      kt-tab-item(:class="{'is-active': $route.name === 'productsRegister'}")
        router-link(:to='{name: "productsRegister"}') 登记产品总列表
    .shared-pane
      router-view

</template>

<script>
import KtTabs from '../../components/kt-tabs.vue'
import KtTabItem from '../../components/kt-tab-item.vue'

export default {
  components: {
    KtTabs,
    KtTabItem
  },

  methods: {
    tabClick(tab) {
      let route = tab.$el.getAttribute('route-name')
      this.$router.push({
        name: route
      })
    }
  }
}
</script>

<style lang="scss">
.products {
  .el-tabs {
    vertical-align: top;
  }
  .shared-pane {
    margin-bottom: 40px;
    border-radius: 4px;
    position: relative;
    z-index: 9;
    padding: 10px;
    background: white;
  }
}
</style>
