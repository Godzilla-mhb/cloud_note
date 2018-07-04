import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import Toast from './components/toast.js'
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(Toast)

Vue.use({
  install (Vue, options) {
      Vue.prototype.$elRequire = global.elRequire;
      Vue.prototype.$BrowserWindow = global.BrowserWindow;
      Vue.prototype.$childProcess = global.childProcess;
      Vue.prototype.$fs = global.fs;
      Vue.prototype.$rc = global.rc;
      Vue.prototype.$shell = global.shell;
      Vue.prototype.$electron = global.electron;
      Vue.prototype.$path = global.path;
      Vue.prototype.$ipc = global.ipcRenderer || {};
      Vue.prototype.$remote = window.remote;
  }
});
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
