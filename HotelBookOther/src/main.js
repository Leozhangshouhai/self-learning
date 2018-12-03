// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api  from './server'
import 'mint-ui/lib/style.css'

Vue.config.productionTip = false ;
Vue.prototype.$api = api;

const href = window.location.href;
if(href.indexOf("https://uat.abcbooking.cn:82") == 0){
    //uat环境
    // Vue.prototype.codeTxt = "wxf98412fbeb02232b"
}else if(href.indexOf("http://pro.abcbooking.cn") == 0){
    //pro环境
    // Vue.prototype.codeTxt = "wxa71187acb2a6d992"
}else{
    //dev环境
    // Vue.prototype.codeTxt = "wxf98412fbeb02232b"
    //  Vue.prototype.codeTxt = "wxf98412fbeb02232b"
}

/* eslint-disable no-new */
new Vue( {
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
} )
