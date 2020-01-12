// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
import Util from '@/assets/js/util'
import '@/assets/js/components'
Vue.use(iView)

Vue.config.productionTip = false

axios.defaults.baseURL = Util.serverUrl()
Vue.$http = Vue.prototype.$http = axios

let user = Util.getUser()
axios.defaults.headers.Token = user ? user.token : ''
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
