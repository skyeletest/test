<template>
  <div id="app" class="fillcontain">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        processVars: process.SkyEye
      }
    }
  }
</script>

<style lang="less">
  @import '../commons/style/base';
</style>
