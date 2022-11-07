import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "IntegralView" */ '../views/LoginView.vue')
  },
  {
    path: '/index',
    name: 'integral',
    component: () => import(/* webpackChunkName: "IntegralView" */ '../views/HomeDap.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
