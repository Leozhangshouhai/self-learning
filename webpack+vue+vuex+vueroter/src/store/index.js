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
	
};

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})