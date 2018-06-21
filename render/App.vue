<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'electron-vue'
}
</script>

<style>
#app{
  height: 100vh;
}
body{
  margin:0;
  padding:0;
  font-family: "Miscoft-Yahei";
}
input,button,select,textarea{outline:none}
</style>
