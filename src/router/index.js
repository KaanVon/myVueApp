import Vue from 'vue'
import Router from 'vue-router'
import Util from '@/assets/js/util'

import Routes from './routes'
import iView from 'iview'

Vue.use(Router)


var router = new Router({
  mode: 'history',
  routes: Routes
})


const whitePath = ['/login', '/loginpwd', '/qrcode', '/forget']

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  var user = Util.getUser()
  if (!user && !Util.oneOf(to.path, whitePath)) {
    // next({ path: '/login', query: { f: to.path } });
    next({ path: '/login' })
    iView.LoadingBar.finish()
  } else {
    next()
  }
})

router.afterEach(() => {
  iView.LoadingBar.finish()
  // window.scrollTo(0, 0)
})
export default router
