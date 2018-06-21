import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import Toast from './components/toast.js'
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Toast)
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
