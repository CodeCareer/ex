<template lang="pug">
  .filters
    .line.clfix(v-for='row in filters')
      dl(v-for='item in row')
        dt {{item.name}}
        dd(v-if='item.type === "input"')
          input(v-model='query[item.key]')
        dd(v-if='item.type === "select"')
          select(v-model='query[item.key]')
            options(v-for='item in item.options', :value='item.value || item.name') {{item.name}}
</template>

<script>
import _ from 'lodash'
export default {
  props: {
    filters: {
      type: Array,
      default () {
        return []
      }
    }
  },

  mounted() {
    let query = this.$route.query || {}
    _.each(_.flattenDeep(this.filters), v => {
      this.query[v.key] = query[v.key]
    })
  },

  data() {
    return {
      query: {}
    }
  }
}
</script>

<style lang="scss">
.filters {
  background: #ecf1f7;
  padding: 10px;
  border-radius: 3px 3px 0 0;
  dl {
    line-height: 25px;
    margin: 0;
    float: left;
    margin: 0 10px;
    dt,
    dd {
      float: left;
    }
    dt {
      color: #54637a;
    }
    dd {
      margin-left: 10px;
    }
  }
  input {
    border-radius: 3px;
    width: 130px;
    background: #ffffff;
    height: 100%;
    margin-left: 5px;
    padding-left: 5px;
    cursor: text;
    height: 25px;
    line-height: 25px;
  }
  select {
    border-radius: 3px;
    width: 130px;
    background: #ffffff;
    height: 100%;
    margin-left: 5px;
    padding-left: 5px;
    cursor: text;
  }
}
</style>
