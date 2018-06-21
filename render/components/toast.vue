<template>
    <div :class="['toast-wrapper', isOpen ? 'easing': '']" v-show="isOpen">
        <img src="../assets/correct.png" alt="正确" v-if="type=='success'">
        <img src="../assets/error.png" alt="错误" v-if="type=='error'">
        <span>{{msg}}</span>
    </div>
</template>

<script>
export default {
  data () {
    return {
      // 指令 暴露方法 success, error
      // 调用 this.$toast.success('操作成功') this.$toast.error('操作失败')
      type: '', // success error
      msg: '',
      isOpen: false // 是否打开
    }
  },
  methods: {
    // 打开提示
    openToast (type, msg) {
      this.isOpen = true
      this.type = type
      this.msg = msg
    },
    closeToast () {
      this.isOpen = false
    }
  }
}
</script>

<style lang="less" scoped>
.easing{
    background-color: #edf2fc!important;
    transition: all 1s;
}
.toast-wrapper{
    transition: all 1s;
    position: absolute;
    top: 50px;
    right: 200px;
    height: 30px;
    line-height: 30px;
    color:#fff;
    background-color: #1e1e1e;
    color:#909399;
    padding: 0 5px;
    display: flex;
    align-items: center;
    font-size:12px;
    img{
        width: 16px;
        height: 16px;
    }
}
</style>