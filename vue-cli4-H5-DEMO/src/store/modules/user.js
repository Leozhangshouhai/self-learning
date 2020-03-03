const state = {
  token: '',
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
};

const actions = {
  // 用户登陆
  login({ commit }, userInfo) {
    const { username, password, code } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password, code: code }).then((response) => {
        const { data } = response
        commit('SET_TOKEN', data.session_id)
        setToken(data.session_id)
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
