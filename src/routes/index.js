export default [{
  path: '/',
  redirect: '/ex/dashboard'
}, {
  path: '/login',
  name: 'login',
  component: resolve => require(['../views/login.vue'], resolve),
  meta: { title: '开通金融-交易所产品管理系统', needLogin: false }
}, {
  path: '/ex',
  name: 'ex',
  redirect: '/ex/dashboard',
  component: resolve => require(['../views/ex_layout.vue'], resolve),
  children: [{
    path: 'dashboard',
    name: 'dashboard',
    component: resolve => require(['../views/ex/dashboard.vue'], resolve),
    meta: {
      title: '开通金融-交易所产品管理系统-今日总览',
      needLogin: true,
      crumbs: [{
        name: '产品管理',
        to: { name: 'ex' }
      }, {
        name: '产品总览',
        to: { name: 'dashboard' }
      }]
    }
  }, {
    path: 'dashboard/:id',
    name: 'productDashboard',
    component: resolve => require(['../views/ex/product_dashboard.vue'], resolve),
    meta: {
      title: '开通金融-交易所产品管理系统-单个产品总览',
      needLogin: true,
      crumbs: [{
        name: '产品管理',
        to: { name: 'ex' }
      }, {
        name: '产品列表',
        to: { name: 'products' }
      }, {
        placeholder: '产品总览',
        name: 'productName',
        to: { name: 'productDashboard' }
      }]
    }
  }, {
    path: 'products',
    name: 'products',
    redirect: '/ex/products/all',
    component: resolve => require(['../views/ex/products.vue'], resolve),
    children: [{
      path: 'all',
      name: 'productsAll',
      component: resolve => require(['../views/ex/products/all.vue'], resolve),
      meta: {
        title: '开通金融-交易所产品管理系统-产品总列表',
        needLogin: true,
        crumbs: [{
          name: '产品管理',
          to: { name: 'ex' }
        }, {
          name: '产品列表',
          to: { name: 'products' }
        }]
      }
    }, {
      path: ':id/edit',
      name: 'productForm',
      component: resolve => require(['../views/ex/products/product_form.vue'], resolve),
      meta: {
        title: '开通金融-交易所产品管理系统-产品表单',
        needLogin: true,
        crumbs: [{
          name: '产品管理',
          to: { name: 'ex' }
        }, {
          name: '产品列表',
          to: { name: 'products' }
        }, {
          placeholder: '编辑产品',
          name: 'productName',
          to: { name: 'productForm' }
        }]
      }
    }]
  }, {
    path: 'register_products',
    name: 'productsRegister',
    component: resolve => require(['../views/ex/products/register.vue'], resolve),
    meta: {
      title: '开通金融-交易所产品管理系统-登记产品总列表',
      needLogin: true,
      crumbs: [{
        name: '产品管理',
        to: { name: 'ex' }
      }, {
        name: '登记产品列表',
        to: { name: 'productsRegister' }
      }]
    }
  }]
}, {
  path: '*',
  redirect: '/'
}]
