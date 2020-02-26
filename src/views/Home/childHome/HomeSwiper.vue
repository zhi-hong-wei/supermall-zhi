<template>
  <Swiper>
    <Swiper-item v-for="item in banners" :key="item.image">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad"> <!--经常要监听图片加载完@load-->
      </a>
    </Swiper-item>
  </Swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
          default(){
          return []
          }
      }
    },
    data(){    //用于计算一次
      return{
        isLoad:false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods:{
      imageLoad(){
        if(!this.isLoad){    //避免加载4次，计算一次
          this.$emit('swiperImgLoad');
          this.isLoad=true
        }
      }
    }
  }
</script>

<style scoped>

</style>
