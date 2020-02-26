<template>
    <div class="recommend">
      <div v-for="item in recommends" class="home-recommend-item" :key="item.link">
        <a :href="item.link">
          <img :src="item.image" alt="">
          <div>{{item.title}}</div>
        </a>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Recommend",

      /*从父组件获取数据*/
      props: {
        recommends: {
          type: Array,
          default(){
            return []
          }
        }
      }

    }
</script>

<style scoped>
  .recommend{
    display: flex;
    width: 100%;
    text-align: center;
    padding: 5px;
    border-bottom: 10px solid #eee;
    font-size: 12px;
  }

  .home-recommend-item{
    flex: 1;
  }

  .home-recommend-item img{
    width: 70px;
    height: 65px;
    border-radius: 100%;
  }
</style>
