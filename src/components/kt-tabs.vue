<template lang="pug">
  .kt-tabs(:class='[type]')
    slot

</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.kt-tabs {
  margin: 0;
  border-bottom: 0;
  padding-left: 10px;
  &:after {
    content: '';
    display: block;
    clear: both;
  }
}
</style>
