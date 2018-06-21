<template>
    <div class="context-menu" v-if="isOpen">
        <div v-for="item in list" @click="itemClick(item.type)">{{item.name}}</div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      isOpen: this.value,
      list: [
        {
          type: 'photo',
          name: '截图(Ctrl + a)'
        },
        {
          type: 'copy',
          name: '复制(Ctrl + c)'
        },
        {
          type: 'paste',
          name: '粘贴(Ctrl + v)'
        },
        {
          type: 'close',
          name: '关闭文件'
        },
        {
          type: 'save',
          name: '保存(Ctrl + s)'
        }
      ]
    }
  },
  methods: {
    itemClick (type) {

    }
  },
  watch: {
    value: function (newval, oldval) {
      this.isOpen = newval
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    clientX: {
      type: Number,
      required: true
    },
    clientY: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.context-menu{
    width: 300px;
    background: #fff;
    color:#000;
}
</style>
