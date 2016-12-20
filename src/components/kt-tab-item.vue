<template lang="pug">
 .kt-tab-item(@click='itemClick()')
    slot
</template>

<script>
export default {
  props: {
    tabClick: {
      type: Function,
      default: function() {}
    },
    index: {
      type: String
    }
  },

  methods: {
    itemClick() {
      this.tabClick(this.index)
    }
  }
}
</script>

<style lang="scss">
.kt-tab-item {
  float: left;
  background: #dee2ec;
  color: #657286;
  height: 35px;
  line-height: 35px;
  border: 0;
  border-radius: 4px 4px 0 0;
  margin-right: 10px;
  font-size: 15px;
  padding: 0 20px;
  a {
    display: block;
    height: 100%;
    color: currentColor;
  }
  &.is-active {
    background: white;
    color: #262c38;
    border: 0;
  }
}
</style>
