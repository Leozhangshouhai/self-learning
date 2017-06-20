// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//  引入VUE
import Vue from 'vue'
// 引入路由
import VueRouter from 'vue-router'
// 使用路由
Vue.use(VueRouter)
// 引入入口文件APP.vue
import App from './App'
// 引入配置文件规则
import routes from './config/routes'
const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  render: (h) => h(App)
})
