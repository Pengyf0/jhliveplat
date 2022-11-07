import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 60,//定时更新时间
    isJiFen: false,
    isAni: true,
  },
  getters: {
  },
  mutations: {
    changeCount(state) {
      if (state.count == 0) {
        state.count = 60
      } else {
        state.count--
      }
    },
    hdCount(state) {
      state.count = 60
    },
    hdIsJiFen(state, payload) {
      sessionStorage.setItem('jifen', JSON.stringify(payload))
      state.isJiFen = payload
    },
    // 切换动画，加异步
    changeIsAni(state, payload) {
      state.isAni = payload
    },

  },
  actions: {
    // 切换动画效果
    asyncChangeIsAni({ commit }, payload) {
      setTimeout(() => {
        commit("changeIsAni", payload)
      });
    }
  },
  modules: {
  }
})
