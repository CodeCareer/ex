<template lang="scss">
  <template v-for='p in products'>

  </template>
</template>

<script>
import {
  products
} from '../../../common/resources.js'

let query = {
  page: 1,
  per_page: 15
}

export default {
  components: {},
  async mounted() {
    let data = await products.get({
      ...query,
      ...this.$route.query
    }).then(res => res.json())

    this.products = data.virtual_assets
  },

  data() {
    return {
      products: []
    }
  }
}
</script>
