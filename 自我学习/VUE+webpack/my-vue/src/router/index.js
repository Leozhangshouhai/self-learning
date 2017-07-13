import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello'
import second from '../components/second'
import Index from '../page/index'
import demo from '../components/demo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/second',
      name: 'second',
      component: second
    },
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/demo',
      name: 'demo',
      component: demo
    },
    {
      path: '/page/index',
      name: 'index',
      component: Index
    }

  ]
})
