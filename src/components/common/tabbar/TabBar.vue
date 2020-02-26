<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
    export default {
        name: "TabBar"
    }
</script>

<style scoped>
  body{
    padding: 0;
    margin: 0;
  }
  #tab-bar{
    height: 49px;
    display: flex;
    background: #cff;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 -1px 1px rgba(100,100,100,.2);
  }
</style>
