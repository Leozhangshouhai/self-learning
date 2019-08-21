import Vue from "vue";
import Router from "vue-router";
import store from "../store";
import {Toast, Indicator,MessageBox} from "mint-ui"
import VueClipboard from 'vue-clipboard2';
VueClipboard.config.autoSetContainer = true 
Vue.use(VueClipboard)
Vue.prototype.Toast = Toast;
Vue.prototype.Indicator = Indicator;
Vue.prototype.MessageBox = MessageBox;
Vue.config.productionTip = false;
import {
	INDEXLISTS
} from '../assets/js/tools.js';
//路由页面按需加载
const register = resolve => require(['../pages/register'], resolve);
const adIndex = resolve => require(['../pages/ad-index'], resolve);
const index = resolve => require(['../pages/index'], resolve);
// const test = resolve => require(['../components/index'], resolve);
Vue.use(Router);
const CANPATHS=INDEXLISTS;
const WEBCANPATHS=['/register','/adIndex'];
const router = new Router({
	mode: 'hash',
	routes: [
		//如果要缓存某个页面的数据，则在路由后面加上meta: {keepAlive: true}
		{path: '/', component: register, meta: {title: "首页"}},
		{path: '/quotation', component: index, meta: {title: "启动图"}},
		{path: '/index', component: index, meta: {title: "启动图"}},
		{path: '/discover', component: index, meta: {title: "启动图"}},
		{path: '/wealth', component: index, meta: {title: "启动图"}},
		{path: '/adIndex', component: adIndex, meta: {title: "启动图"}},
		{path: '/register', component: register, meta: {title: "注册"}},
	],
	scrollBehavior (to, from, savedPosition) {
		return { x: 0, y: 0 }
		// if (savedPosition) {
		// 	return savedPosition
		//   } else {
		// 	return { x: 0, y: 0 }
		//   }
		// return { x: 0, y: 0 }
	  }
	 
});
router.beforeEach((to, from, next) => {
	//定义一个可以记录路由路径变化的数组，这里用在vuex，其实也可以用sessionStorage,或者在window.routeChain等变量
	// 埋点
	// 兼容莫名情况，mint-msgbox 有问题
	// var msg=document.getElementsByClassName('mint-msgbox-wrapper');
	// var popup=document.getElementsByClassName('mint-indicator');
	// var vModal=document.getElementsByClassName('v-modal'); 
	// if(msg.length>0){
	// 	msg[0].parentNode.removeChild(msg[0]);
	// }
	// if(popup.length>0){
	// 	popup[0].parentNode.removeChild(popup[0]);
	// }
	// if(vModal.length>0){
	// 	vModal[0].parentNode.removeChild(vModal[0]);
	// }
// 	Indicator.open("加载中...");
	let routeLength = store.state.routeChain.length;
	let isLogin= store.state.is_login;
	console.log(store.state)
	// this.$store.state.show_nav=true;
	// store.commit('SHOW_NAV', true);
	if (routeLength === 0) {
		store.commit('SET_PAGE_DIRECTION', 'fade');
		if (to.path === from.path && to.path === '/') {
			//当直接打开根路由的时候
			store.commit('ADD_ROUTE_CHAIN', to);
		} else {
			//直接打开非根路由的时候其实生成了两个路径，from其实就是根路由
			store.commit('ADD_ROUTE_CHAIN', from);
			store.commit('ADD_ROUTE_CHAIN', to);
		}
	} else if (routeLength === 1) {
		store.commit('SET_PAGE_DIRECTION', 'slide-left');
		store.commit('ADD_ROUTE_CHAIN', to);
	} else {
		let lastBeforeRoute = store.state.routeChain[routeLength - 2];
		if (lastBeforeRoute.path === to.path) {
			store.commit('POP_ROUTE_CHAIN');
			store.commit('SET_PAGE_DIRECTION', 'slide-right');
		} else {
			store.commit('ADD_ROUTE_CHAIN', to);
			store.commit('SET_PAGE_DIRECTION', 'slide-left');
		}
	};
	//- -  -开发
	  // next();

	//   正式--APP
	if(isLogin){
		next();
	}else if( CANPATHS.indexOf(to.path) >-1){
		next();
	}else{
		next('/index');
	}
	//  正式 邀请页面
	//  if( WEBCANPATHS.indexOf(to.path) >-1){
	// 	next();
	// }else{
	// 	next(WEBCANPATHS[0]);
	// }
});

router.afterEach(route => {
	// 从路由的元信息中获取 title 属性
	if (route.meta.title) {
		document.title = route.meta.title;
		// // 如果是 iOS 设备，则使用如下 hack 的写法实现页面标题的更新
		if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
			var i = document.createElement('iframe');
			i.src = '/favicon.ico';
			i.style.display = 'none';
			i.onload = function () {
				setTimeout(function () {
					i.remove();
				}, 10)
			}
			document.body.appendChild(i);
		}
	}
});
export default router;
