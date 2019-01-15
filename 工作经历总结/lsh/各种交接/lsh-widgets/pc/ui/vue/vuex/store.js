import Vue from '../../third-party/vue';
import Vuex from '../../third-party/vuex';

Vue.use( Vuex );

export default new Vuex.Store( {
    state: {
        searchParams: {},
        pageNum: "",
        searchEnterDisable: false,  // 搜索禁用回车, 默认不禁用
        currentTab: ""
    },
    mutations: {
        SEARCH ( state, searchParams ) {
            state.searchParams = searchParams;
        },

        PAGINATE ( state, pageNum ) {
            state.pageNum = pageNum;
        },

        CURRENTTAB (state, currentTab) {
            state.currentTab = currentTab;
        },

        SEARCHENTERDISABLE (state, isDisable) {
            state.searchEnterDisable = isDisable;
        }
    }
} );