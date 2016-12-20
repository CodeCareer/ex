<template lang="pug">
  .overview
   .today-overview
   	h2 今日总览
   	.overview-left
   		h3 当前存续金额（元）
   		.overview-left-middle
   			i(class="icon-icomoon icon-overview")
   			span(:text="")
   		.overview-left-down
   			.Principal
   			.Interest
   	.voerview-right
   .today-square
</template>

<script>
export default {

}
</script>

<style lang="scss">
.overview {
  background: #ecf1f7;
}
</style>
