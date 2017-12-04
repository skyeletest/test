<template>
  <div class="manage fillcontain">
    <fui-row style="height: 100%;">
      <fui-col :span="4" style="min-height: 100%; background-color: #324057;">
        <fui-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
          <fui-menu-item index="manage">
            <fui-icon type="Home"></fui-icon>首页
          </fui-menu-item>

          <fui-submenu index="2">
            <template slot="title">
              <fui-icon type="Email"></fui-icon>导航一
            </template>
            <fui-menu-item index="optionOne">选项1</fui-menu-item>
            <fui-menu-item index="optionTwo">选项2</fui-menu-item>
          </fui-submenu>

          <fui-submenu index="3">
            <template slot="title">
              <fui-icon type="File-text"></fui-icon>导航二
            </template>
            <fui-menu-item index="optionThree">选项1</fui-menu-item>
            <fui-menu-item index="optionFour">选项2</fui-menu-item>
            <fui-menu-item index="optionFive">选项3</fui-menu-item>
          </fui-submenu>

        </fui-menu>
      </fui-col>

      <fui-col :span="20" style="min-height: 100%;">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </fui-col>
    </fui-row>
  </div>
</template>

<script>
export default {
  name: 'manage',
  data () {
    return {}
  },
  computed: {
    defaultActive () {
      return this.$route.path.replace('/', '')
    }
  }
}
</script>

<style style="less">

</style>
