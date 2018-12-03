
import Vue from 'vue'
import App from './App'
import routers from './router/'
import {routerMode} from './config/env'
// import './config/rem'
import VueRouter from 'vue-router'
import FastClick from 'fastclick'
import api from './config/api'
Vue.prototype.$api=api;
import YDUI from 'vue-ydui'; /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
Vue.use(YDUI);
import 'vue-ydui/dist/ydui.rem.css';
Vue.config.productionTip=false;
Vue.use(VueRouter);
let router = new VueRouter({
  routes:routers,
  mode: routerMode,
  strict:false //"use strict"
})
router.beforeEach(function (to, from, next) {
  window.scrollTo(0,0)

  next();
})
router.afterEach(function (transition) {

  if (transition.name) {
    document.title = transition.name;
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
//new Vue({ router:router }).$mount('#app');
