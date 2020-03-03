export default {
  namespaced: true,
  state: {
    pageDirection: 'fade', // 转场动画，前进后退必须
    routeChain: [], // 转场动画，前进后退必须
  },
  mutations: {
    /**
     * 书写所有的状态管理逻辑函数
     * Mutations必须是同步函数
     * @constructor
     */
    ADD_ROUTE_CHAIN(state, route) {
      state.routeChain.push(route);
    },
    POP_ROUTE_CHAIN(state) {
      state.routeChain.pop();
    },
    SET_PAGE_DIRECTION(state, dir) {
      state.pageDirection = dir;
    },
  },
};
