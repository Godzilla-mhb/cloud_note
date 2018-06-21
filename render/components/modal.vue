<template>
    <div class="modal-page" v-if="isOpen">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'modal', // 模态框
  data () {
    return {
      isOpen: this.value
    }
  },
  methods: {

  },
  watch: {
    value: function (newval, oldval) {
      this.isOpen = newval
    },
    isOpen: function (newval, oldval) {
      this.$emit('input', newval)
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
.modal-page{
  position: absolute;
  top:0;
  left:0;
  bottom: 0;
  right: 0;
  z-index: 1000;
}
</style>

