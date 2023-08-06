<template>
  <div>
    富文本
    <TinymceEditor :value="formData.content" @changeValue="changeValue" />
  </div>
</template>
<script>
import TinymceEditor from '../components/tinymce.vue'
export default {
  components: {
    TinymceEditor
  },
  data () {
    return {
      formData: {}
    }
  },
  methods: {
    // 富文本
    changeValue (value) {
      this.formData.content = value
    }
  }
}
</script>
