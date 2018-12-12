import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as io from 'socket.io-client'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
