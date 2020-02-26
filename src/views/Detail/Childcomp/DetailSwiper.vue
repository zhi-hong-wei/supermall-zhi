<template>
    <Swiper class="swiper-detail">   <!-- 引入轮播图-->
      <SwiperItem v-for="item in topImages">
        <img :src="item" alt="">    <!--插槽替换-->
      </SwiperItem>
    </Swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
        name: "DetailSwiper",
    components:{
      Swiper,
      SwiperItem
    },
      props:{
          topImages:{
            type:Array,
            default(){
              return[]
            }
          }
      }
    }
</script>

<style scoped>
.swiper-detail{
  height: 300px;
  overflow: hidden;
}
</style>
