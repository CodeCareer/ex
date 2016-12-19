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
      el-menu(:unique-opened='true', :router='true', :default-openeds='["1"]')
        el-submenu(index='1')
          template(slot='title')
            i.icon-icomoon.icon-list
            | 产品管理
          el-menu-item(index='1-1', :route='{name: "dashboard"}', :class='{"is-active": $route.path.startsWith("/ex/dashboard")}') 今日总览
          el-menu-item(index='1-2', :route='{name: "products"}', :class='{"is-active": $route.path.startsWith("/ex/products")}') 产品汇总
    .body
      router-view
      footer
        p(style="margin-top: 10px;") 联系电话：010-84554188   京ICP备150220058号-1
        p ©2016 开通金融信息服务（北京）有限公司
</template>

<script>
import {
  Row,
  Col,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup
} from 'element-ui'
import {
  mapGetters,
  mapActions
} from 'vuex'

let headerH = 60 // header高度

export default {
  components: {
    ElRow: Row,
    ElCol: Col,
    ElMenu: Menu,
    ElSubmenu: Submenu,
    ElMenuItem: MenuItem,
    ElMenuItemGroup: MenuItemGroup
  },

  mounted() {
    window.addEventListener('resize', e => {
      this.containerStyles.height = `${window.innerHeight - headerH}px`
    })
  },

  methods: {
    ...mapActions(['logout'])
  },

  computed: {
    ...mapGetters(['user'])
  },

  data() {
    return {
      containerStyles: {
        height: (window.innerHeight - headerH) + 'px'
      }
    }
  }
}
</script>

<style lang="scss">
$headerHeight: 60px;
$menuWidth: 140px;
$menuHeight: 40px;
.ex-container {
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
    .icon-user{
      color: #a1aab7;
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
      left: 0;
      width: $menuWidth;
      top: $headerHeight;
      bottom: 0;
      overflow-y: auto;
    }
  }
  .body{
    padding: 20px;
  }
  footer {
    left: $menuWidth;
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
    }
    .el-menu-item {
      color: white;
      height: $menuHeight;
      line-height: $menuHeight;
      padding: 0 20px 0 30px;
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
}
</style>
