<template>
  <div class="context-menu" v-if="isOpen" :style="style">
    <div class="menu-item" v-for="item in list" @click="itemClick(item.type)">{{item.name}}</div>
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
      console.log(type === 'photo')
      if (type === 'photo') {
        console.log('*********')
        this.lauchCatPhoto()
      }
    },
    lauchCatPhoto () {
      console.log('fuck************')
      var desktopCapturer = require('electron').desktopCapturer
      console.log('desktopCapturer', desktopCapturer)
      desktopCapturer.getSources({ types: ['window', 'screen'] }, function (error, sources) {
        if (error) throw error
        for (var i = 0; i < sources.length; ++i) {
          if (sources[i].name == 'Electron') {
            navigator.webkitGetUserMedia({
              audio: false,
              video: {
                mandatory: {
                  chromeMediaSource: 'desktop',
                  chromeMediaSourceId: sources[i].id,
                  minWidth: 1280,
                  maxWidth: 1280,
                  minHeight: 720,
                  maxHeight: 720
                }
              }
            }, gotStream, getUserMediaError)
            return
          }
        }
      })

      function gotStream (stream) {
        document.querySelector('video').src = URL.createObjectURL(stream)
      }

      function getUserMediaError (e) {
        console.log('getUserMediaError')
      }
    }
  },
  computed: {
    style () {
      return {
        left: this.clientX + 'px',
        top: this.clientY + 'px',
        position: 'absolute'
      }
    }
  },
  watch: {
    value: function (newval, oldval) {
      this.isOpen = newval
    },
    clientX (newval, oldval) {
      console.log('clientX', newval)
    },
    clientY (newval, oldval) {
      console.log('clientY', newval)
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    clientX: {
      type: [Number, String],
      required: true
    },
    clientY: {
      type: [Number, String],
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
  .context-menu {
    padding: 5px;
    width: 100px;
    background: #fff;
    color: #000;
    border-radius: 4px;
    font-size: 16px;
    .menu-item {
      line-height: 20px;
      &:hover {
        background-color: pink;
        cursor: pointer;
      }
    }
  }
</style>