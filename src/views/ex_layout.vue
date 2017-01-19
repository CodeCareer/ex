<template lang="pug">
.ex-container
  header
    img.logo(:src='user.institution_logo')
    .status(v-if='user.email')
      span
        i.icon-icomoon.icon-user
        | hi，{{user.name}}
      span.log-out(@click='logout()') 退出
  section.container(:style='containerStyles')
    aside(style='')
      el-menu(:unique-opened='true', :router='true', :default-openeds='["1"]', ref='menus')
        el-submenu(index='1')
          template(slot='title')
            i.icon-icomoon.icon-list
            | 产品管理
          el-menu-item(index='1-1', :route='{name: "dashboard"}', :class='{"is-active": startsWith($route.path,menuActiveStatusMap.dashboard)}') 今日总览
          el-menu-item(index='1-2', :route='{name: "productsAll"}', :class='{"is-active": startsWith($route.path,menuActiveStatusMap.productsAll)}') 产品总列表
          el-menu-item(index='1-3', :route='{name: "productsRegister"}', :class='{"is-active": startsWith($route.path,menuActiveStatusMap.productsRegister)}') 登记产品总列表
    .body(:style='containerStyles')
      el-breadcrumb
        el-breadcrumb-item(v-for="crumb in crumbs", :to="crumb.to") {{crumb.name}}
      router-view
      footer
        p(style="margin-bottom: 10px;") 联系电话：010-84554188   京ICP备150220058号-1
        p ©2016 开通金融信息服务（北京）有限公司
</template>

<script>
import {
  Row,
  Col,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Breadcrumb,
  BreadcrumbItem
} from 'element-ui'
import {
  mapGetters,
  mapActions
} from 'vuex'
import {
  updateCrumbs
} from '../common/crossers.js'
import _ from 'lodash'

let headerH = 60 // header高度

export default {
  components: {
    ElRow: Row,
    ElCol: Col,
    ElMenu: Menu,
    ElSubmenu: Submenu,
    ElBreadcrumb: Breadcrumb,
    ElBreadcrumbItem: BreadcrumbItem,
    ElMenuItem: MenuItem,
    ElMenuItemGroup: MenuItemGroup
  },

  watch: {
    '$route' (to, from) {
      this.breadcrumbRefresh()
      setTimeout(() => {
        this.amendMenuActiveStatus(this.$refs.menus)
      }, 100)
    }
  },

  created() {
    this.breadcrumbRefresh()
  },

  mounted() {
    // 更新面包屑中的占位符
    updateCrumbs.$on('update-crumbs', crumbs => {
      _.each(crumbs, cr => {
        let co = _.find(this.crumbs, c => c.id === cr.id)
        if (co) {
          co.name = cr.name
          co.placeholder = ''
        }
      })
    })

    window.addEventListener('resize', e => {
      this.containerStyles.minHeight = `${window.innerHeight - headerH}px`
    })
  },

  methods: {
    startsWith: _.startsWith,
    // 修正menu的激活状态
    amendMenuActiveStatus(menus) {
      _.each(menus.$children, (v) => {
        if (v.route) {
          v.$el.className = _.startsWith(this.$route.path, this.menuActiveStatusMap[v.route.name]) ? 'el-menu-item is-active' : 'el-menu-item'
        }

        if (v.$children.length) {
          this.amendMenuActiveStatus(v)
        }
      })
    },

    // 刷新面包屑
    breadcrumbRefresh() {
      this.crumbs = this.$route.meta.crumbs
    },
    ...mapActions(['logout'])
  },

  computed: {
    ...mapGetters(['user'])
  },

  data() {
    return {
      crumbs: [],
      menuActiveStatusMap: {
        dashboard: '/ex/dashboard',
        products: '/ex/products',
        productsAll: '/ex/products',
        productsRegister: '/ex/register_products'
      },
      containerStyles: {
        minHeight: (window.innerHeight - headerH) + 'px'
      }
    }
  }
}
</script>

<style lang="scss">
$headerHeight: 60px;
$menuWidth: 150px;
$menuHeight: 40px;
.ex-container {
  .el-breadcrumb {
    margin-bottom: 15px;
  }
  header {
    .logo {
      margin-left: 20px;
    }
    // padding-left: 20px;
  }
  .status {
    float: right;
    height: 100%;
    line-height: $headerHeight;
    .icon-user {
      color: #a1aab7;
      margin-right: 5px;
    }
    &>span {
      float: left;
      padding: 0 25px;
      text-align: center;
    }
    .log-out {
      cursor: pointer;
      &:hover {
        color: #18b8ba;
      }
      &:active {
        color: white;
        background: #18b8ba;
      }
      border-left: 1px solid #565a6d;
    }
  }
  .container {
    padding-left: $menuWidth;
    position: relative;
    top: $headerHeight;
    aside {
      background: #55627b;
      position: fixed;
      z-index: 99;
      left: 0;
      width: $menuWidth;
      top: $headerHeight;
      bottom: 0;
      overflow-y: auto;
    }
  }
  .body {
    position: relative;
    z-index: 1;
    padding: 15px 15px 150px;
  }
  footer {
    // left: $menuWidth;
    width: auto;
    right: 0;
  }
  .el-menu {
    background: none;
    user-select: none;
  }
  .el-submenu {
    .el-submenu__title {
      height: 48px;
      line-height: 48px;
      background: #79859a;
      color: white;
      font-size: 16px;
      .icon-icomoon {
        margin-left: -10px;
      }
    }
    .icon-icomoon {
      vertical-align: -1px;
      margin-right: 5px;
    }
    .el-menu-item {
      color: white;
      height: $menuHeight;
      line-height: $menuHeight;
      padding: 0 20px 0 30px!important;
      a {
        color: white;
      }
      &:hover,
      &.is-active {
        background: #18b8ba;
      }
    }
    .el-menu {
      background: none;
      border-radius: 0;
    }
  }
  .red-color {
    color: #e6695e;
  }
  .green-color {
    color: #54c9b8;
  }
  .gray-color {
    color: #c3cad2;
  }
  .status-column {
    .icon-icomoon {
      color: #c8cfd6;
      margin-right: 5px;
    }
    .icon-wait {
      & + span,
      & + em {
        @extend .gray-color;
      }
      &.ignore-status + span,
      &.ignore-status + em {
        @extend .red-color;
      }
      &.status-now+em {
        @extend .green-color;
      }
    }
    .icon-warn {
      &+em {
        @extend .gray-color;
      }
    }
    .icon-success {
      font-size: 12px;
      & + span,
      & + em {
        @extend .green-color;
      }
    }
  }
}

// .status-update {
//   .icon-icomoon{
//     color:#c8cfd6;
//   }
//   .icon-wait{
//     &+em{
//       @extend .gray-color;
//     }
//     &.status-now+em{
//       @extend .green-color;
//     }
//   }
//   .icon-warn{
//     &+em{
//       @extend .red-color;
//     }
//   }
//   .icon-success{
//     &+em{
//       @extend .green-color;
//     }
//   }
// }
</style>
