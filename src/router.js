import Vue from 'vue'
import Router from 'vue-router'

const login = () => import('./views/login.vue')
const wechat = () => import('./views/wechat.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },{
      path: '/wechat',
      name: 'wechat',
      component: wechat
    }
  ]
})
