import Vue from "vue";
import Router from "vue-router";
import store from "../store";
import {Toast, Indicator} from "mint-ui"

Vue.prototype.Toast = Toast;
Vue.prototype.Indicator = Indicator;
Vue.config.productionTip = false;
//路由页面按需加载
const index = resolve => require(['../components/index'], resolve);
const login = resolve => require(['../components/login'], resolve);
const ES6demo = resolve => require(['../components/ES6DEMO'], resolve);
Vue.use(Router);
const router = new Router({
	mode: 'hash',
	routes: [//如果要缓存某个页面的数据，则在路由后面加上meta: {keepAlive: true}
		{path: '/', component: ES6demo, meta: {title: "我是首页"}},
		{path: '/index', name: 'index', component: index, meta: {title: "我是首页"}},
		{path: '/login', name: 'login', component: login, meta: {title: "我是登录页", keepAlive: true}},
	]
});
router.beforeEach((to, from, next) => {
	//定义一个可以记录路由路径变化的数组，这里用在vuex，其实也可以用sessionStorage,或者在window.routeChain等变量
	Indicator.open("加载中...");
	let routeLength = store.state.routeChain.length;
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
	}
	next();
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
