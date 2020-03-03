import Vue from "vue";
import {
  Toast,
} from 'vant'
import VConsole from 'vconsole'

import "normalize.css";
import "./styles/index.scss";
import App from "./App";
import router from "./router";
import store from "./store/index";
import * as filters from './filters/index'

Vue.prototype.$toast = Toast;
Vue.prototype.baseUrl = process.env.VUE_APP_BASE_API;

const vConsole = new VConsole();
vConsole.setOption({ maxLogNumber: 5000 });

// 注入全局过滤器
Object.keys(filters)
  .forEach((item) => {
    Vue.filter(item, filters[item])
  })


Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
