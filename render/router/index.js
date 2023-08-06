import Vue from 'vue'
import Router from 'vue-router'
import home from '../views/home'
import tinymce from '../views/tinymce'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: home
      // component: tinymce
    }
  ]
})
