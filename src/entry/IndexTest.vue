<template>
  <div id="mocha"></div>
</template>
<script>
  import chai from 'chai'
  import mocha from 'mocha'
  import tests from '../../test'
  export default {
    created () {
      mocha.setup('bdd')
    },
    mounted () {
      tests(window.describe, window.it, chai.expect)
      mocha.run()
    }
  }
</script>
