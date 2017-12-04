<template>
  <div id="app" class="fillcontain" style="min-width: 1200px;">
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
