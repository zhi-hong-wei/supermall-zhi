<template>
  <div class="wrapper" ref="wrapper"><!--ref用于指定特定子组件this.$refs.wrapper调用-->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
        name: "Scroll",
      props:{
        probeType:{
          type:Number,
          default:0
        },
        pullUpLoad:{
          type:Boolean,
          default: false
        }
      },
      data(){
        return {
          scroll: null   //用于保存数据
        }
      },
      mounted() {
          //创建对象
        this.scroll = new BScroll(/*document.querySelector('.wrapper')*/this.$refs.wrapper,{
          probeType:this.probeType,
          pullUpLoad:this.pullUpLoad,
          click:true         //用于tabbar点击变化
        })
        //监听滚动
       this.scroll.on('scroll',(position)=>{
         /*console.log(position);*/
         this.$emit('scroll',position)     //子组件向父组件传值，传的是@事件
       })
        //监听上拉加载
        this.scroll.on('pullingUp',()=>{     //pullingUp是better-scroll事件之一
          this.$emit('pullUpLoad')
        })
      },
      methods:{
        refresh(){
          this.scroll && this.scroll.refresh()
        }
      }

    }
</script>

<style scoped>

</style>
