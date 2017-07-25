import Vue from "vue";
import Router from "vue-router";
import {Indicator} from "mint-ui";
import store from "../store";
//路由页面按需加载
const index = resolve => require(['../components/index'], resolve);
const login = resolve => require(['../components/login'], resolve);
const airIndex = resolve => require(['../components/air-index'], resolve);
Vue.use(Router);

const router = new Router({
	mode: 'hash',
	routes: [
		{path: '/', component: airIndex,meta:{title:'机票入口页'}},
		{path: '/index', name: 'index', component: index},
		{path: '/air-index', name: 'air-index', component: airIndex,meta:{title:'机票入口页'}},
		{path: '/login', name: 'login', component: login, meta: {keepAlive: true}},//如果要缓存某个页面的数据，则在路由后面加上meta: {keepAlive: true}
	]
});
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = binding.value
  }
})
router.beforeEach((to, from, next) => {
	//定义一个可以记录路由路径变化的数组，这里用在vuex，其实也可以用sessionStorage,或者在window.routeChain等变量
	//不一定要用到vuex
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
	console.log(`路由开始：${from.path}`);
	Indicator.open('加载中...');
	next();
});

router.afterEach(route => {
	setTimeout(() => {
		Indicator.close();
	}, 1000);
	console.log(`路由结束：${route.path}`);
});
export default router;
