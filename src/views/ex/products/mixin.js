import {
  pruneParams
} from '../../../common/helpers.js'

export default {
  watch: {
    '$route' (to, from) {
      this.queryChange = true
      this.instLoading && this.instLoading.close()
      this.getProducts()
    }
  },

  async mounted() {
    this.getProducts()
  },

  methods: {
    // 排序
    sortBy(field) {
      if (this.query.sort_by !== field) {
        this.query.order = null
      }

      let orderMap = {
        asc: 'desc',
        desc: null
      }
      let order = this.query.order ? orderMap[this.query.order] : 'asc'

      if (order) {
        this.query.order = order
        this.query.sort_by = field
      } else {
        this.query.order = null
        this.query.sort_by = null
      }

      this.$router.push({
        name: this.$route.name,
        query: pruneParams(this.query)
      })
    },

    // 分页
    pageChange(currentPage) {
      // if (this.queryChange) return
      this.query.page = currentPage
      this.$router.push({
        name: this.$route.name,
        query: this.query
      })
    }
  },

  data() {
    return {
      queryChange: false, // 控制
      query: {
        page: 1,
        per_page: 15
      },
      total_count: 1,
      products: []
    }
  }
}
