import Vue from 'vue'
import Vuex from 'Vuex'

const debug=progress.env.NODE_ENV!=='production'

Vue.use(Vuex)

export default new Vuex.Store({
  strict:debug,
    plugins:debug?[createLogger()]:[]
})
export default {
  state:{},
  getters:{},
  mutations:{},
  modules{},
  strict:true,
  plugins:[]
}
