import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./action";
import getters from "./getters";

Vue.use(Vuex)
//所有的状态树
const state = {
	pageDirection: 'fade',//转场动画，前进后退必须
	routeChain:[],//转场动画，前进后退必须
    userInfo: [
        {
            username: "11",
            password: "11"
        },
        {
            username: "111",
            password: "111"
        }
        , {
            username: "1111",
            password: "1111"
        }
    ],
    is_login:false
};

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})