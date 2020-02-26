<template>
  <div id="app">
    <keep-alive exclude="Detail">  <!-- //home离开记录位置-->
      <router-view/>
    </keep-alive>
    <MainBar/>
  </div>
</template>

<script>
  import MainBar from 'components/content/MainBar'

  export default {
    name: 'app',
    components: {
      MainBar
    }
  }
</script>

<style>
  @import "assets/css/base.css";
</style>
