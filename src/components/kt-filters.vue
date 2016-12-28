<template lang="pug">
  .filters
    .line.clfix(v-for='row in conditions')
      dl(v-for='item in row')
        dt {{item.name}}
        dd(v-if='item.type === "input"')
          input(v-model='query[item.key]', @keyup.stop.enter='search()')
        dd(v-if='item.type === "select"')
          select(v-model='query[item.key]', :class='{"no-valid-value": query[item.key] === "null"}', @change.prevent='search()')
            option(v-for='o in item.options', :value='o.value || o.name') {{o.name}}
          i.icon-icomoon.icon-select-down
    section.buttons
      button.kt-btn.kt-btn-primary(@click='search()')
        i.icon-icomoon.icon-search
        | 查询
      button.kt-btn.kt-btn-gray(@click='clear()') 清除
</template>

<script>
import _ from 'lodash'
let defaultQuery = {
  page: 1,
  per_page: 15
}

export default {
  props: {
    conditions: { // 命名为filters的时候会无法收到初始化传值，很奇怪
      type: Array,
      default () {
        return []
      }
    }
  },

  watch: {
    '$route' (to, from) {
      if (to.name === from.name && to.fullPath !== from.fullPath) {
        this.update()
      }
    }
  },

  methods: {
    search() {
      let query = _.extend({}, defaultQuery, this.query)
      _.each(query, (v, k) => {
        if (v === 'null' || _.isNil(v) || v === '') {
          delete query[k]
        }
      })

      this.$router.push({
        name: this.$route.name,
        query
      })
    },

    clear() {
      // 重置select默认值
      _.each(_.flattenDeep(this.conditions), v => {
        this.query[v.key] = (v.type === 'select' ? (v.options[0].value || v.options[0].name) : null)
      })

      this.$router.push({
        name: this.$route.name,
        query: defaultQuery
      })
    },

    update() {
      let query = updateQuery.call(this)
      this.query = query
    }
  },

  data() {
    // let params = this.$route.query || {}
    // let query = Object.assign({}, defaultQuery)

    // // 初始化select类型的filter值
    // _.each(_.flattenDeep(this.conditions), v => {
    //   query[v.key] = params[v.key] || (v.type === 'select' ? (v.options[0].value || v.options[0].name) : null)
    // })

    let query = updateQuery.call(this)

    return {
      query: query
    }
  }
}

function updateQuery() {
  let params = this.$route.query || {}
  let query = Object.assign({}, defaultQuery)

  // 初始化select类型的filter值
  _.each(_.flattenDeep(this.conditions), v => {
    query[v.key] = params[v.key] || (v.type === 'select' ? (v.options[0].value || v.options[0].name) : null)
  })

  return query
}
</script>

<style lang="scss">
.filters {
  background: #ecf1f7;
  padding: 10px;
  border-radius: 3px 3px 0 0;
  position: relative;
  .line {
    margin-bottom: 15px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
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
  input,
  textarea,
  select {
    &:focus {
      box-shadow: 0 0 0px 1px #18b8ba;
    }
  }
  input {
    border-radius: 4px;
    width: 130px;
    background: #ffffff;
    height: 100%;
    box-sizing: border-box;
    // margin-left: 5px;
    padding-left: 5px;
    cursor: text;
    height: 25px;
    line-height: 26px;
    -webkit-appearance: none;
    font-size: 12px;
  }
  select {
    font-size: 12px;
    & + .icon-select-down {
      font-size: 12px;
      margin-left: -1.5em;
      color: #68d3c3;
      vertical-align: -1px;
      transform: scale(.7);
      display: inline-block;
    }
    &.no-valid-value {
      color: #000;
    }
  }
  .buttons {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
}
</style>
