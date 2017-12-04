<template>
  <div class="head-container">
    <fui-breadcrumb separator="/">
      <fui-breadcrumb-item href="/manage">首页</fui-breadcrumb-item>
      <fui-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{ item }}</fui-breadcrumb-item>
    </fui-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'headTop'
}
</script>

<style lang="less" scoped>
  .head-container {
    height: 60px;
    padding-left: 20px;
    display: flex;
    align-items: center;
    background-color: #eff2f7;
  }

  .fui-breadcrumb > span {
    color: #a6aab3;
  }

  .fui-breadcrumb > span:last-child {
    color: #48576a;
  }
</style>
