<template>
    <div class="confirm" v-if="isOpen">
        <Modal v-model="isOpen">
            <div class="confirm-wrapper">
                <div class="confirm-top">
                    <slot name="title"></slot>
                </div>
                <div class="confirm-content">
                    <slot name="content"></slot>
                </div>
                <div class="confirm-bottom">
                    <!-- <slot name="bottom"></slot> -->
                        <span class="add" @click="confirm">确认</span>
                        <span class="cancel" @click="cancel">取消</span>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
import Modal from './modal.vue'
export default {
  name: 'confirm', // 确认框(暴露三个插槽)
  data () {
    return {
      isOpen: this.value
    }
  },
  methods: {
    // 点击确认
    confirm () {
      this.$emit('on-confirm')
    },
    // 点击取消
    cancel () {
      this.isOpen = false // 关闭
    }
  },
  watch: {
    value: function (newval, oldval) {
      this.isOpen = newval
    },
    isOpen: function (newval, oldval) {
      this.$emit('input', newval)
    }
  },
  components: {
    Modal
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
.confirm-wrapper{
    color: #fff;
    width: 300px;
    border-radius: 4px;
    background: gray;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    .confirm-top{
        height: 30px;
        border-bottom: 1px solid #eee;
        font-weight: bold;
        text-align: center;
        line-height: 30px;
    }
    .confirm-content{
        padding: 20px;
        height: auto;
    }
    .confirm-bottom{
        height: 30px;
        line-height: 30px;
        border-top: 1px solid #eee;
        display: flex;
        .add{
            flex:1;
            text-align: center;
            border-right: 1px solid #eee;
            cursor: pointer;
        }
        .cancel{
            flex:1;
            text-align: center;
            cursor: pointer;
        }
    }
}
</style>

