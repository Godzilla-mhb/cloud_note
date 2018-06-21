import ToastComponent from './toast.vue'
let $vm
const toastPlugin = {
  install: function (Vue, options) {
    const Toast = Vue.extend(ToastComponent)
    if (!$vm) {
      $vm = new Toast({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }
    Vue.prototype.$toast = {
      success: function (msg) {
        $vm.openToast('success', msg)
        setTimeout(() => {
          $vm.closeToast()
        }, 2000)
      },
      error: function (msg) {
        $vm.openToast('error', msg)
        setTimeout(() => {
          $vm.closeToast()
        }, 2000)
      }
    }
  }
}

export default toastPlugin
