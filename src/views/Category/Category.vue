<template>
  <div class="wrapper">
    <h2>分类</h2>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
        name: "Category",
      data(){
          return {
            scroll: null
          }
      },
      mounted() {
        this.scroll = new BScroll(document.querySelector('.wrapper'),{
          probeType:3,
          pullUpLoad:true
        })
        this.scroll.on('scroll',(position)=>{

        })
        this.scroll.on('pullUpLoad',()=>{

        })
      }
    }
</script>

<style scoped>
.wrapper{
  height: 200px;
  overflow: hidden;
}
</style>
