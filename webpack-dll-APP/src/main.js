// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";

switch (process.env.NODE_ENV) {
    case "development":
        Vue.prototype.chengdu = 'http://192.168.1.111'
        Vue.prototype.wuhou = 'http://uat.cdwh.org:7878'
        Vue.prototype.local_env = "uat";//判断使用uat文件夹的内容还是dist
        Vue.prototype.chongqing = 'http://192.168.1.111'
        break;
    case "uat":
        Vue.prototype.chengdu = 'http://uat.zaichengdu.com'
        Vue.prototype.wuhou = 'http://uat.cdwh.org:7878'
        Vue.prototype.local_env = "uat";
        Vue.prototype.chongqing = 'http://uat.zaichongqing.com:7878'
        break;
    case "production":
        Vue.prototype.chengdu = 'http://www.zaichengdu.com'
        Vue.prototype.wuhou = 'http://cdwh.org'
        Vue.prototype.local_env = "dist";
        Vue.prototype.chongqing = 'http://www.zaichongqing.com'
        break;
}
new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: {App}
});