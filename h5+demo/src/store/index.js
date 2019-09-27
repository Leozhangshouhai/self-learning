import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./action";
import getters from "./getters";
import fly from "../assets/js/linyer.js" 
Vue.use(Vuex)
//所有的状态树
const state = {
	pageDirection: 'fade',//转场动画，前进后退必须
    routeChain:[],//转场动画，前进后退必须
	show_nav:true,
	my_session:fly.localStore('my_session')||'',
    userInfo: fly.localStore('my_userInfo')||{},
	is_login:fly.localStore('my_session')  ?  true:false,
	selectedIndex:'',
	SHOWNAVBAR:false,
	total_amount_rmb:'',
	is_first_login:true, // 主页首次加载
};

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})