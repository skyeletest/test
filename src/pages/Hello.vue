<template>
  <div id="HelloWorld"
       v-show="show">
    <div>
      <h1>{{ message }}</h1>
      <ul>
        <li v-for="item in links">
          <a :href="item.url" target="_blank">
            {{ item.text }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import '../commons/base.less'

  export default{
    data () {
      return {
        message: 'Hello World :)',
        show: false,
        links: []
      }
    },
    mounted () {
      this.show = true
      this.links = [{
        url: 'https://confluence.b.360.cn/pages/viewpage.action?pageId=10092607',
        text: '教程'
      }, {
        url: 'http://10.95.24.22:5011/package/@qnpm/skyfenv',
        text: 'skyfenv'
      }, {
        url: '/mochatest/index',
        text: 'Mocha单元测试'
      }]
      this.$fLogs.info('[HelloWorld]HelloWorld is ready !!!')
    }
  }
</script>
<style lang="less" scoped>
  @import "../commons/base.vars.less";

  #HelloWorld {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      color: orange;
    }
  }
</style>
