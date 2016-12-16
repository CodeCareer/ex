import router from './router'
import setResources from './common/resources'
import interceptors from './common/interceptors'
import VueResource from 'vue-resource'
import Vue from 'vue'

Vue.use(VueResource)

// http初始化
Vue.http.options.root = '/internal/api/v1'
Vue.http.headers.common['Authorization'] = window.localStorage.token || ''

// 拦截器统一注入
interceptors.forEach((v) => {
  Vue.http.interceptors.push(v)
})

// 统一管理resource
setResources(Vue.resource)

// 激活ios设备上面css的active效果
document.body.addEventListener('touchstart', () => {})

// 启动路由
router.run()

// 隐藏加载等待元素
window.onload = function() {
  document.getElementById('loading').style.display = 'none'
}
