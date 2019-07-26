// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import axios from "axios";
// import Validator from 'vue-validator'
// import indeHeader from './components/index-header.vue';
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
import fly from './assets/js/linyer.js';
import mui from '@/assets/js/mui.min.js';  
import './assets/css/mui.min.css';
require('es6-promise').polyfill()
Es6Promise.polyfill()
// Vue.use(Validator)
Vue.prototype.axios=axios;
Vue.prototype.$mui=mui;
window.mui=mui;
mui.init({
    gestureConfig:{
     tap: true, //默认为true
     doubletap: true, //默认为false
     longtap: true, //默认为false
     swipe: true, //默认为true
     drag: true, //默认为true
     hold:false,//默认为false，不监听
     release:false//默认为false，不监听
    }
  });
// import Vconsole from 'vconsole';
// let vConsole=new Vconsole();
import VueClipboard from 'vue-clipboard2';
Vue.use(VueClipboard)
// Vue.component('my-index-header',indeHeader);

switch (process.env.NODE_ENV) {
    case "development":
        Vue.prototype.chengdu = 'http://192.168.1.111'
        Vue.prototype.wuhou = 'http://uat.cdwh.org:7878'
        Vue.prototype.local_env = "uat";//判断使用uat文件夹的内容还是dist
        Vue.prototype.chongqing = 'http://192.168.1.111'
        // Vue.prototype.$wapian = 'http://www.wapian.live/'
        window.$_wapian='http://118.24.159.253:8089/';
        Vue.prototype.$wapian = `http://${window.location.host}`;
        // Vue.prototype.$wapian = 'http://118.24.159.253:8089/'
        break;
    case "uat":
        Vue.prototype.chengdu = 'http://uat.zaichengdu.com'
        Vue.prototype.wuhou = 'http://uat.cdwh.org:7878'
        Vue.prototype.local_env = "uat";
        Vue.prototype.chongqing = 'http://uat.zaichongqing.com:7878'
        //  测试环境
        // // 正式环境
        // Vue.prototype.$wapian = 'http://www.wapian.live/';
        //  Vue.prototype.$wapian = 'http://118.24.159.253:8089/'
        Vue.prototype.$wapian = `//${window.location.host}`;
        // window.$_wapian='http://www.wapian.live/';
        break;
    case "production":
        Vue.prototype.chengdu = 'http://www.zaichengdu.com'
        Vue.prototype.wuhou = 'http://cdwh.org'
        Vue.prototype.local_env = "dist";
        Vue.prototype.chongqing = 'http://www.zaichongqing.com'
        Vue.prototype.$wapian = 'http://118.24.159.253:8089/'
         //  测试环境
        // window.$_wapian='http://118.24.159.253:8081/';
        // Vue.prototype.$wapian = 'http://118.24.159.253:8081/'
        // Vue.prototype.$wapian = 'http://www.wapian.live/';
         Vue.prototype.$wapian = 'http://118.24.159.253:7089/'
        //  Vue.prototype.$wapian = 'http://118.24.159.253:8081/'
        break;
}

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: {App}
});