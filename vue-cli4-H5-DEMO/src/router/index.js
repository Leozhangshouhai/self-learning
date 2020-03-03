import Vue from "vue";
import Router from "vue-router";
import store from "../store/index.js";

Vue.use(Router);
const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import( /* webpackChunkName: "login" */ '@/views/login.vue'),
      meta: {
        auth: false,
        title: "登录",
        keepAlive: false,
      },
    },
    {
      path: '/index',
      name: 'index',
      component: () => import( /* webpackChunkName: "index" */ '@/views/index/index.vue'),
      meta: {
        auth: false,
        title: "",
        keepAlive: false,
      },
    },
    {
      path: '*',
      redirect: '/index',
    },
  ],
});
router.beforeEach((to, from, next) => {
  let auth = to.meta.auth;
  let token = store.getters.token;
  // 定义一个可以记录路由路径变化的数组，这里用在vuex，其实也可以用sessionStorage,或者在window.routeChain等变量
  const routeLength = store.state.pageDirection.routeChain.length;
  if (routeLength === 0) {
    store.commit('pageDirection/SET_PAGE_DIRECTION', 'fade');
    if (to.path === from.path && to.path === '/') {
      // 当直接打开根路由的时候
      store.commit('pageDirection/ADD_ROUTE_CHAIN', to);
    } else {
      // 直接打开非根路由的时候其实生成了两个路径，from其实就是根路由
      store.commit('pageDirection/ADD_ROUTE_CHAIN', from);
      store.commit('pageDirection/ADD_ROUTE_CHAIN', to);
    }
  } else if (routeLength === 1) {
    store.commit('pageDirection/SET_PAGE_DIRECTION', 'slide-left');
    store.commit('pageDirection/ADD_ROUTE_CHAIN', to);
  } else {
    const lastBeforeRoute = store.state.pageDirection.routeChain[routeLength - 2];
    if (lastBeforeRoute.path === to.path) {
      store.commit('pageDirection/POP_ROUTE_CHAIN');
      store.commit('pageDirection/SET_PAGE_DIRECTION', 'slide-right');
    } else {
      store.commit('pageDirection/ADD_ROUTE_CHAIN', to);
      store.commit('pageDirection/SET_PAGE_DIRECTION', 'slide-left');
    }
  }
  if (auth) {
    // 需要登录
    if (token) {
      next()
    } else {
      next({
        name: 'login',
        query: {
          redirect: to.path
        },
      })
    }
  } else {
    next()
  }
});

router.afterEach((route) => {
  // 从路由的元信息中获取 title 属性
  if (route.meta.title) {
    document.title = route.meta.title;
    // 如果是 iOS 设备，则使用如下 hack 的写法实现页面标题的更新
    if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
      const i = document.createElement('iframe');
      i.src = '/favicon.ico';
      i.style.display = 'none';
      i.onload = () => {
        setTimeout(() => {
          i.remove();
        }, 10);
      };
      document.body.appendChild(i);
    }
  }
});
export default router;
