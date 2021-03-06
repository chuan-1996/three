import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const home = () => import(/* webpackChunkName: '0' */ '../page/home');

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: home
    }
  ]
})
