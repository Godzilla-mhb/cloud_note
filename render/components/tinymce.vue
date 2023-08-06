<template>
   <Editor
    :id="id"
    v-model="content"
    :init="initData"
    :disabled="disabled"
    @onClick="onClick"
  ></Editor>
</template>
​
<script>
import axios from 'axios'
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/icons/default/icons.min.js'
import 'tinymce/themes/silver/theme'
import 'tinymce/plugins/image' // 插入上传图片插件
import 'tinymce/plugins/media' // 插入视频插件
import 'tinymce/plugins/table' // 插入表格插件
import 'tinymce/plugins/link' // 超链接插件
import 'tinymce/plugins/code' // 代码块插件
import 'tinymce/plugins/lists' // 列表插件
import 'tinymce/plugins/contextmenu' // 右键菜单插件
import 'tinymce/plugins/wordcount' // 字数统计插件
import 'tinymce/plugins/colorpicker' // 选择颜色插件
import 'tinymce/plugins/textcolor' // 文本颜色插件
import 'tinymce/plugins/fullscreen' // 全屏
import 'tinymce/plugins/help' // 帮助
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/print' // 打印
import 'tinymce/plugins/preview' // 预览
// import skin_url from '../tinymce/skins/ui/oxide'
// import language_url from '../tinymce/langs/zh_CN.js'
import '../assets/tinymce/skins/ui/oxide/skin.min.css'
import '../assets/tinymce/skins/ui/oxide/content.inline.min.css'
import '../assets/tinymce/langs/zh-Hans.js'
export default {
  name: 'tinyme-editor',
  components: {
    Editor
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      editFlag: 0,
      initData: {
        branding: false, // 去掉底部水印
        min_height: 550, // 编辑区域的最小高度
        selector: '#' + this.id,
        skin_url: 'assets/tinymce/skins/ui/oxide',
        language_url: 'assets/tinymce/langs/zh-Hans.js',
        language: 'zh-Hans',
        plugins: [
          'link image paste code table wordcount contextmenu lists' // plugins中，用powerpaste替换原来的paste
        ],
        readonly: this.isReadOnly ? 1 : 0,
        powerpaste_word_import: 'propmt', // 参数可以是propmt, merge, clear，效果自行切换对比
        powerpaste_html_import: 'propmt', // propmt, merge, clear
        powerpaste_allow_local_images: true,
        paste_data_images: true,
        images_upload_url: '',
        image_dimensions: false,
        convert_urls: false,
        images_upload_handler: function (blobInfo, success, failure) {
          tinymce.activeEditor.getBody().setAttribute('contenteditable', false) // 这个函数主要处理word中的图片，并自动完成上传； // ajaxUpload是自己定义的一个函数；在回调中，记得调用success函数，传入上传好的图片地址； // blobInfo.blob() 得到图片的file对象；
          let api = ''
          let formData = new FormData()
          formData.append('file1', blobInfo.blob(), blobInfo.filename())
          formData.append('flag', '0')
          formData.append('userId', '1')
          const instance = axios.create({
            withCredentials: true
          })
          instance
            .post(api, formData)
            .then((rs) => {
              success(rs.data.body) // success 将url传给编辑器
              tinymce.activeEditor
                .getBody()
                .setAttribute('contenteditable', true)
            })
            .catch((err) => {
              tinymce.activeEditor
                .getBody()
                .setAttribute('contenteditable', true)
            })
        } // tinymce的其他配置参数
      },
      content: this.value
    }
  },
  mounted () {
    tinymce.init({})
  },
  watch: {
    value (newValue) {
      this.content = newValue
    },
    content (newValue) {
      this.$emit('input', newValue)
    }
  },
  activated () {
    tinymce.init({})
  },
  deactivated () {
    tinymce.remove()
  },
  beforeDestroy () {
    tinymce.remove()
  },
  methods: {
    onClick () {}
  }
}
</script>
​
<style>
</style>