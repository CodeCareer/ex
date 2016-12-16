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
      title: '开通金融-交易所产品管理系统-总览',
      needLogin: true
    }
  }]
}, {
  path: '*',
  redirect: '/'
}]
