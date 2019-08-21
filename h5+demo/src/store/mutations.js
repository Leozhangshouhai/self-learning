
export default {
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
    IS_LOGIN(state, res) {
        state.userInfo=res
        state.is_login = true;
    },
    SHOW_NAV(state, change){
        state.show_nav=change;
    }
}
