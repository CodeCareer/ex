import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import App from './App.vue'
import store from './vuex/store.js'
Vue.use(VueRouter)

let router = new VueRouter({
  mode: 'history',
  base: __dirname,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== undefined) {
    document.body.setAttribute('class', to.name)
  }

  let user = store.getters.user
  let token = store.getters.token
  if (to.meta.needLogin && (!token || !user.email)) {
    next({ name: 'login' })
  }
  next()
})

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
})

export default {
  run() {
    new Vue({
      render(h) {
        return h(App)
      },
      store,
      router
    }).$mount('#app')
  }
}

export { router }
