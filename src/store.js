import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName:null,
    userAvatar:null
  },
  getters:{
    doneUser: state => {
      return { name: state.userName,
               avatar: state.userAvatar
              }
    }
  },
  mutations: {
    setUserInfo(state,data){
      state.userName = data.name;
      state.userAvatar = data.avatar;
    }
  },
  actions: {
    setUserInfo(context,data){
      context.commit('setUserInfo',data)
    }
  }
})
